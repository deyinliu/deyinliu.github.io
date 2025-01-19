import { Alert, Card, Space, Tag, Tabs, Row, Col, Statistic, Button, Modal, Select, AlertProps, message } from 'antd';
import { Column } from '@ant-design/plots';
import { usePreprocessStore } from '../store/usePreprocessStore';
import { calculateDistributionStats } from '../utils/distribution';
import { useState } from 'react';
import { InfoCircleOutlined, LineChartOutlined } from '@ant-design/icons';

interface TransformConfig {
  type: 'log' | 'exp' | 'box-cox' | 'square' | 'sqrt' | 'standardize';
  label: string;
  description: string;
}

const TRANSFORM_OPTIONS: TransformConfig[] = [
  { type: 'log', label: '对数转换', description: '适用于右偏分布，压缩大值' },
  { type: 'exp', label: '指数转换', description: '适用于左偏分布，压缩小值' },
  { type: 'box-cox', label: 'Box-Cox转换', description: '自动寻找最佳转换参数' },
  { type: 'square', label: '平方转换', description: '增加数据差异' },
  { type: 'sqrt', label: '平方根转换', description: '减小数据差异' },
  { type: 'standardize', label: '标准化', description: '转换为均值0，标准差1' }
];

interface DistributionAnalyzerProps {
  onTransformRequest?: (variable: string, recommendedTransform: string) => void;
}

export const DistributionAnalyzer: React.FC<DistributionAnalyzerProps> = ({ onTransformRequest }) => {
  const {
    processedData,
    selectedColumns,
    distribution,
    setDistributionVariables,
    setProcessedData
  } = usePreprocessStore();

  const [selectedVariable, setSelectedVariable] = useState<string>(distribution.dependentVariable || '');
  const [transformModalVisible, setTransformModalVisible] = useState(false);
  const [selectedTransform, setSelectedTransform] = useState<string>('');
  const [transformingVariable] = useState<string>('');
  const [showResults, setShowResults] = useState(false);

  const handleTransform = (variable: string, stats: any) => {
    const recommendedTransform = getRecommendedTransform(stats);
    if (onTransformRequest) {
      onTransformRequest(variable, recommendedTransform);
    }
  };

  const applyTransformation = () => {
    const newData = processedData.map(row => ({
      ...row,
      [transformingVariable]: transformValue(
        Number(row[transformingVariable]),
        selectedTransform
      )
    }));
    setProcessedData(newData);
    setTransformModalVisible(false);
  };

  const handleStartAnalysis = () => {
    const variables = [distribution.dependentVariable, ...distribution.independentVariables].filter(Boolean);

    // 验证数据
    const hasInvalidData = variables.some(variable => {
      const values = processedData
        .map(row => Number(row[variable]))
        .filter(v => !isNaN(v));
      return values.length < 3; // 至少需要3个有效数据点
    });

    if (hasInvalidData) {
      message.error('部分变量数据点不足，无法进行分布分析');
      return;
    }

    // 预计算所有变量的统计量
    const statsMap = new Map(
      variables.map(variable => {
        const values = processedData
          .map(row => Number(row[variable]))
          .filter(v => !isNaN(v));
        return [variable, calculateDistributionStats(values)];
      })
    );

    // 检查是否有需要转换的变量
    const needsTransform = Array.from(statsMap.entries()).filter(
      ([, stats]) => !stats.isNormal
    );

    if (needsTransform.length > 0) {
      message.warning(
        `发现 ${needsTransform.length} 个变量分布不符合正态分布，请查看具体建议`
      );
    }

    setShowResults(true);
  };

  const renderVariableSelector = () => (
    <Card size="small" style={{ marginBottom: 16 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Select
          placeholder="选择因变量"
          style={{ width: '100%' }}
          value={distribution.dependentVariable}
          onChange={value => setDistributionVariables(value, distribution.independentVariables)}
          options={selectedColumns.map(col => ({ label: col, value: col }))}
        />
        <Select
          mode="multiple"
          placeholder="选择自变量（可多选）"
          style={{ width: '100%' }}
          value={distribution.independentVariables}
          onChange={values => setDistributionVariables(distribution.dependentVariable, values)}
          options={selectedColumns
            .filter(col => col !== distribution.dependentVariable)
            .map(col => ({ label: col, value: col }))}
        />
      </Space>
    </Card>
  );

  // 检查是否有选择变量
  if (!distribution.dependentVariable && distribution.independentVariables.length === 0) {
    return (
      <Space direction="vertical" style={{ width: '100%' }}>
        {renderVariableSelector()}
        <Alert
          message="请选择要分析的变量"
          type="info"
          showIcon
        />
      </Space>
    );
  }

  const renderDistributionAnalysis = (variable: string) => {
    const values = processedData
      .map(row => Number(row[variable]))
      .filter(v => !isNaN(v));

    const stats = calculateDistributionStats(values);

    const binCount = Math.min(20, Math.ceil(Math.sqrt(values.length)));
    const min = Math.min(...values);
    const max = Math.max(...values);
    const binWidth = (max - min) / binCount;

    const histogramData = Array(binCount).fill(0).map((_, i) => {
      const binStart = min + i * binWidth;
      const binEnd = binStart + binWidth;
      const count = values.filter(v => v >= binStart && v < binEnd).length;
      return {
        range: `${binStart.toFixed(1)}-${binEnd.toFixed(1)}`,
        count,
        binStart,
        binEnd
      };
    });

    const distributionShape = getDistributionShape(stats);

    return (
      <Card>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Row gutter={16}>
            <Col span={6}>
              <Statistic
                title="平均值"
                value={stats.mean.toFixed(2)}
                prefix={<InfoCircleOutlined />}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="中位数"
                value={stats.median.toFixed(2)}
                prefix={<InfoCircleOutlined />}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="标准差"
                value={stats.std.toFixed(2)}
                prefix={<InfoCircleOutlined />}
              />
            </Col>
            <Col span={6}>
              <Tag color={stats.isNormal ? 'success' : 'warning'} style={{ padding: '5px 10px' }}>
                {stats.isNormal ? '近似正态分布' : '非正态分布'}
              </Tag>
            </Col>
          </Row>

          <Alert
            message={`分布形状特征：${distributionShape.title}`}
            description={distributionShape.description}
            type={distributionShape.type as AlertProps['type']}
            showIcon
          />

          <div style={{ height: 300 }}>
            <Column
              data={histogramData}
              xField="range"
              yField="count"
              label={{
                // 修改 label 配置
                position: 'top',
                style: {
                  fill: '#000000',
                  opacity: 0.6,
                  fontSize: 12
                }
              }}
              tooltip={{
                formatter: (datum) => ({
                  name: '频数',
                  value: datum.count
                })
              }}
              columnStyle={{
                radius: [4, 4, 0, 0],
                fill: stats.isNormal ? '#52c41a' : '#faad14'
              }}
              // 添加 axis 配置
              yAxis={{
                grid: {
                  line: {
                    style: {
                      stroke: '#d9d9d9',
                      lineDash: [4, 4]
                    }
                  }
                }
              }}
              xAxis={{
                label: {
                  autoRotate: true,
                  autoHide: true
                }
              }}
            />
          </div>

          {stats.transformSuggestion && (
            <Alert
              message="数据转换建议"
              description={
                <Space direction="vertical">
                  <div>{stats.transformSuggestion}</div>
                  <Button
                    type="primary"
                    onClick={() => handleTransform(variable, stats)}
                  >
                    前往数据预处理进行转换
                  </Button>
                </Space>
              }
              type="info"
              showIcon
            />
          )}
        </Space>
      </Card>
    );
  };

  const items = [distribution.dependentVariable, ...distribution.independentVariables].map(variable => ({
    label: variable,
    key: variable,
    children: renderDistributionAnalysis(variable)
  }));

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Alert
        message="分布检验说明"
        description={
          <ul>
            <li>直方图展示了数据的分布形状，柱子越高表示该区间的数据越多</li>
            <li>绿色表示数据近似正态分布，黄色表示需要考虑数据转换</li>
            <li>正态分布特征：钟形对称，中位数接近平均值</li>
            <li>如果数据分布严重偏离正态，建议按照转换建议进行处理</li>
          </ul>
        }
        type="info"
        showIcon
      />

      {renderVariableSelector()}

      <Button
        type="primary"
        icon={<LineChartOutlined />}
        onClick={handleStartAnalysis}
        disabled={!distribution.dependentVariable && distribution.independentVariables.length === 0}
        style={{ marginBottom: 16 }}
      >
        开始分析
      </Button>

      {showResults && (
        <Tabs
          items={items}
          activeKey={selectedVariable}
          onChange={setSelectedVariable}
        />
      )}

      <Modal
        title="数据转换"
        open={transformModalVisible}
        onCancel={() => setTransformModalVisible(false)}
        onOk={applyTransformation}
        width={600}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Alert
            message={`正在转换变量: ${transformingVariable}`}
            type="info"
            showIcon
          />
          <Select
            style={{ width: '100%' }}
            value={selectedTransform}
            onChange={setSelectedTransform}
            options={TRANSFORM_OPTIONS.map(t => ({
              label: `${t.label} - ${t.description}`,
              value: t.type
            }))}
          />
          <div style={{ marginTop: 16 }}>
            <h4>转换预览:</h4>
            {renderTransformPreview(
              processedData,
              transformingVariable,
              selectedTransform
            )}
          </div>
        </Space>
      </Modal>
    </Space>
  );
};

const getDistributionShape = (stats: any) => {
  const { skewness, kurtosis } = stats;

  if (Math.abs(skewness) < 0.5 && Math.abs(kurtosis) < 0.5) {
    return {
      title: '对称分布',
      description: '数据呈现良好的对称性，平均值和中位数接近，适合直接用于回归分析。',
      type: 'success'
    };
  }

  if (skewness > 0.5) {
    return {
      title: '右偏分布',
      description: '数据分布向右倾斜，有较多大值，建议考虑对数转换。',
      type: 'warning'
    };
  }

  if (skewness < -0.5) {
    return {
      title: '左偏分布',
      description: '数据分布向左倾斜，有较多小值，建议考虑指数转换。',
      type: 'warning'
    };
  }

  if (kurtosis > 0.5) {
    return {
      title: '尖峰分布',
      description: '数据过于集中，波动较大，建议考虑Box-Cox转换。',
      type: 'warning'
    };
  }

  return {
    title: '平坦分布',
    description: '数据分布较为分散，可能需要进行标准化处理。',
    type: 'warning'
  };
};

// 获取推荐的转换方法
const getRecommendedTransform = (stats: any): string => {
  if (stats.skewness > 1) return 'log';
  if (stats.skewness < -1) return 'exp';
  if (stats.kurtosis > 1) return 'box-cox';
  if (Math.abs(stats.mean) > 10 * stats.std) return 'standardize';
  return 'log';
};

// 数据转换函数
const transformValue = (value: number, type: string): number => {
  switch (type) {
    case 'log':
      return Math.log(Math.max(value, 0.0001));
    case 'exp':
      return Math.exp(value);
    case 'square':
      return value * value;
    case 'sqrt':
      return Math.sqrt(Math.abs(value));
    case 'standardize':
      return value; // 需要在批量处理时计算均值和标准差
    case 'box-cox':
      return value; // 需要单独实现Box-Cox转换
    default:
      return value;
  }
};

// 转换预览
const renderTransformPreview = (data: any[], variable: string, transformType: string) => {
  const original = data.slice(0, 5).map(row => Number(row[variable]));
  const transformed = original.map(v => transformValue(v, transformType));

  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>原始值</th>
          <th>转换后</th>
        </tr>
      </thead>
      <tbody>
        {original.map((v, i) => (
          <tr key={i}>
            <td>{v.toFixed(2)}</td>
            <td>{transformed[i].toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
