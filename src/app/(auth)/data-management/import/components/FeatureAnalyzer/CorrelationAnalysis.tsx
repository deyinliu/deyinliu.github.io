import { Card, Alert, Tag, Space, Select, Table } from 'antd';
import { Scatter } from '@ant-design/plots';
import { usePreprocessStore } from '../../store/usePreprocessStore';
import { useMemo, useState } from 'react';

const CORRELATION_THRESHOLD = 0.7;

// 相关性强度解释
const getCorrelationStrength = (value: number) => {
  const abs = Math.abs(value);
  if (abs >= 0.8) return { text: '极强', color: 'red' };
  if (abs >= 0.6) return { text: '强', color: 'orange' };
  if (abs >= 0.4) return { text: '中等', color: 'blue' };
  if (abs >= 0.2) return { text: '弱', color: 'green' };
  return { text: '极弱', color: 'gray' };
};

export const CorrelationAnalysis: React.FC = () => {
  const { processedData, featureAnalysis } = usePreprocessStore();
  const { dependentVariable, independentVariables } = featureAnalysis;
  const [selectedVars, setSelectedVars] = useState<string[]>([independentVariables[0]]);

  // 数据预处理和验证
  const validData = useMemo(() => {
    if (!processedData?.length || !dependentVariable) return [];

    return processedData.filter(row => {
      if (!row || typeof row !== 'object') return false;
      const depValue = Number(row[dependentVariable]);
      if (!Number.isFinite(depValue)) return false;
      return true;
    });
  }, [processedData, dependentVariable]);

  // 计算相关性
  const correlationResults = useMemo(() => {
    if (!validData.length || !selectedVars?.length) return [];

    return selectedVars.map(variable => {
      try {
        const correlation = calculateCorrelation(validData, dependentVariable, variable);
        const validCorrelation = Number.isFinite(correlation) ? correlation : 0;
        const { text, color } = getCorrelationStrength(validCorrelation);

        return {
          variable,
          correlation: validCorrelation,
          strength: text,
          color,
          direction: validCorrelation > 0 ? '正相关' : '负相关'
        };
      } catch (error) {
        console.error(`Error calculating correlation for ${variable}:`, error);
        return {
          variable,
          correlation: 0,
          strength: '无效',
          color: 'gray',
          direction: '-'
        };
      }
    }).sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation));
  }, [validData, selectedVars, dependentVariable]);

  // 散点图配置
  const scatterConfig = {
    data: validData,
    xField: dependentVariable,
    yField: selectedVars[0],
    size: 5,
    shape: 'circle',
    pointStyle: {
      fillOpacity: 0.8,
      stroke: '#fff',
    },
    meta: {
      [dependentVariable]: { alias: '因变量' },
      [selectedVars[0]]: { alias: '自变量' }
    }
  };

  // 添加相关性表格列定义
  const correlationColumns = [
    {
      title: '变量',
      dataIndex: 'variable',
      key: 'variable',
    },
    {
      title: '相关系数',
      dataIndex: 'correlation',
      key: 'correlation',
      render: (value: number) => (
        <Tag color={getCorrelationStrength(value).color}>
          {value > 0 ? '+' : ''}{value.toFixed(3)}
        </Tag>
      ),
      sorter: (a, b) => Math.abs(b.correlation) - Math.abs(a.correlation),
    },
    {
      title: '相关性强度',
      key: 'strength',
      render: (_, record) => (
        <Space>
          <Tag color={record.color}>{record.strength}</Tag>
          <span>{record.direction}</span>
        </Space>
      )
    }
  ];

  if (!validData.length) {
    return <Alert message="没有有效的数据可供分析" type="warning" showIcon />;
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="变量相关性分析">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            value={selectedVars}
            onChange={setSelectedVars}
            options={independentVariables.map(v => ({ label: v, value: v }))}
            placeholder="选择要分析的自变量（可多选）"
          />

          <Alert
            message={`与因变量 "${dependentVariable}" 的相关性分析`}
            type="info"
            showIcon
          />

          {selectedVars.length === 1 ? (
            // 单变量分析视图
            <>
              {correlationResults[0] && (
                <Alert
                  message={
                    <Space>
                      <span>相关性分析结果：</span>
                      <Tag color={correlationResults[0].color}>
                        {correlationResults[0].correlation}
                      </Tag>
                      <span>（{correlationResults[0].strength}{correlationResults[0].direction}）</span>
                    </Space>
                  }
                  type="info"
                  showIcon
                  style={{ marginBottom: 16 }}
                />
              )}
              <div style={{ height: 300 }}>
                <Scatter {...scatterConfig} />
              </div>
            </>
          ) : (
            // 多变量分析视图
            <Space direction="vertical" style={{ width: '100%' }}>
              <Table
                dataSource={correlationResults}
                columns={correlationColumns}
                size="small"
                pagination={false}
              />
              <div style={{ marginTop: 16 }}>
                <h4>变量选择建议：</h4>
                <ul>
                  {correlationResults
                    .filter(item => Math.abs(item.correlation) < 0.2)
                    .map(item => (
                      <li key={item.variable} style={{ color: '#666' }}>
                        {`变量 "${item.variable}" 与因变量相关性较弱，可考虑删除`}
                      </li>
                    ))}
                  {correlationResults
                    .filter(item => Math.abs(item.correlation) > CORRELATION_THRESHOLD)
                    .map(item => (
                      <li key={item.variable} style={{ color: '#ff4d4f' }}>
                        {`变量 "${item.variable}" 与因变量强相关，建议保留`}
                      </li>
                    ))}
                </ul>
              </div>
            </Space>
          )}
        </Space>
      </Card>

      <Card size="small" title="相关性说明">
        <Space direction="vertical">
          <div>• 相关系数范围：-1 到 1</div>
          <div>• |r| ≥ 0.8：极强相关</div>
          <div>• 0.6 ≤ |r| &lt; 0.8：强相关</div>
          <div>• 0.4 ≤ |r| &lt; 0.6：中等相关</div>
          <div>• 0.2 ≤ |r| &lt; 0.4：弱相关</div>
          <div>• |r| &lt; 0.2：极弱相关或无相关</div>
        </Space>
      </Card>
    </Space>
  );
};

function calculateCorrelation(data: Record<string, any>[], var1: string, var2: string): number {
  try {
    // 过滤无效值并转换为数值
    const validPairs = data
      .map(d => ({
        v1: typeof d[var1] === 'string' ? parseFloat(d[var1]) : Number(d[var1]),
        v2: typeof d[var2] === 'string' ? parseFloat(d[var2]) : Number(d[var2])
      }))
      .filter(pair => !isNaN(pair.v1) && !isNaN(pair.v2));

    if (validPairs.length < 2) {
      return 0; // 数据点不足以计算相关性
    }

    const values1 = validPairs.map(p => p.v1);
    const values2 = validPairs.map(p => p.v2);

    const mean1 = values1.reduce((a, b) => a + b, 0) / values1.length;
    const mean2 = values2.reduce((a, b) => a + b, 0) / values2.length;

    const numerator = values1.reduce((sum, v1, i) =>
      sum + (v1 - mean1) * (values2[i] - mean2), 0);

    const denom1 = Math.sqrt(values1.reduce((sum, v) =>
      sum + Math.pow(v - mean1, 2), 0));
    const denom2 = Math.sqrt(values2.reduce((sum, v) =>
      sum + Math.pow(v - mean2, 2), 0));

    if (denom1 === 0 || denom2 === 0) {
      return 0; // 避免除以零
    }

    const correlation = numerator / (denom1 * denom2);

    // 确保结果在 [-1, 1] 范围内
    return Math.max(-1, Math.min(1, correlation));
  } catch (error) {
    console.error('计算相关系数时出错:', error);
    return 0;
  }
}
