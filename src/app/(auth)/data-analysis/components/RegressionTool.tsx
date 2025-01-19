"use client"
import React, { useState } from 'react';
import { Typography, Select, Button, Row, Col, Table, message, Tooltip, Card, Alert, Space } from 'antd';
import { LineChartOutlined, InfoCircleOutlined } from '@ant-design/icons';
import DataSelector from './common/DataSelector';
import { RegressionDisplayData } from '../../../types/regressionTypes';
import MultipleRegression from '../../../utils/spss/multiRegression';
import { transformRegressionResults } from '../../../utils/spss/transformRegressionResult';
import { RegressionResults } from './spss/regressionResult';
const { Option } = Select;
const { Title, Text, Paragraph } = Typography;

const RegressionTool: React.FC = () => {
  const [data, setData] = useState<number[][]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [dependentVariable, setDependentVariable] = useState<string>('');
  const [independentVariables, setIndependentVariables] = useState<string[]>([]);
  const [regressionTFChartData, setRegressionTFChartData] = useState<RegressionDisplayData>();
  const [messageApi, contextHolder] = message.useMessage();
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleDataParse = (headers: string[], parsedData: any[][]) => {
    setHeaders(headers);
    setData(parsedData);
  };

  const handleDependentVariableChange = (value: string) => {
    if (independentVariables.includes(value)) {
      messageApi.warning(`"${value}" 已被选为自变量，不能同时作为因变量！`);
      return;
    }
    setDependentVariable(value);
  };

  const handleIndependentVariablesChange = (values: string[]) => {
    if (values.includes(dependentVariable)) {
      messageApi.warning(`"${dependentVariable}" 已被选为因变量，不能同时作为自变量！`);
      return;
    }
    setIndependentVariables(values);
  };

  const validateVariables = (x: number[][], independentVars: string[]): string | null => {
    // 检查固定值列
    const hasConstantColumn = independentVars.some((_, colIndex) => {
      const columnValues = x.map(row => row[colIndex]);
      return columnValues.every(v => v === columnValues[0]);
    });
    if (hasConstantColumn) {
      return '选择的自变量中包含固定值列，这会导致回归分析无法进行。请选择有变化的变量。';
    }

    // 检查多重共线性
    if (independentVars.length > 1) {
      const correlations = calculateCorrelations(x);
      const highCorrelation = correlations.some((row, i) =>
        row.some((corr, j) => i !== j && Math.abs(corr) > 0.8)
      );
      if (highCorrelation) {
        return '选择的自变量之间存在强相关性（相关系数>0.8），这可能导致多重共线性问题。建议选择相关性较低的变量。';
      }
    }

    // 检查样本量是否足够
    if (x.length < independentVars.length * 10) {
      return `样本量不足。对于${independentVars.length}个自变量，建议至少需要${independentVars.length * 10}个样本，当前仅有${x.length}个样本。`;
    }

    return null;
  };

  const calculateCorrelations = (x: number[][]): number[][] => {
    const numVars = x[0].length;
    const correlations = Array(numVars).fill(0).map(() => Array(numVars).fill(0));

    for (let i = 0; i < numVars; i++) {
      for (let j = 0; j < numVars; j++) {
        const col1 = x.map(row => row[i]);
        const col2 = x.map(row => row[j]);
        correlations[i][j] = calculateCorrelation(col1, col2);
      }
    }
    return correlations;
  };

  const calculateCorrelation = (x: number[], y: number[]): number => {
    const xMean = x.reduce((a, b) => a + b) / x.length;
    const yMean = y.reduce((a, b) => a + b) / y.length;

    let numerator = 0;
    let xDenom = 0;
    let yDenom = 0;

    for (let i = 0; i < x.length; i++) {
      const xDiff = x[i] - xMean;
      const yDiff = y[i] - yMean;
      numerator += xDiff * yDiff;
      xDenom += xDiff * xDiff;
      yDenom += yDiff * yDiff;
    }

    return numerator / Math.sqrt(xDenom * yDenom);
  };

  const performRegression = () => {
    if (!dependentVariable || independentVariables.length === 0) {
      messageApi.warning('请选择因变量和至少一个自变量！');
      return;
    }

    const dependentVariableIndex = headers.indexOf(dependentVariable);
    const independentVariableIndices = independentVariables.map((variable) =>
      headers.indexOf(variable)
    );

    const x = data.map((row) => independentVariableIndices.map((index) => row[index]));
    const y = data.map((row) => row[dependentVariableIndex]);

    // 数据验证
    const error = validateVariables(x, independentVariables);
    if (error) {
      setValidationError(error);
      return;
    }
    setValidationError(null);

    try {
      const regressionResult = MultipleRegression.analyze(x, y, independentVariables);
      const regressionChartData = transformRegressionResults(regressionResult, independentVariables, dependentVariable, x, y);
      setRegressionTFChartData(regressionChartData);
    } catch (err) {
      setValidationError(`回归分析失败: ${err.message}`);
    }
  };

  const previewData = data.slice(0, 100).map((row, index) => {
    const record = { key: index };
    headers.forEach((header, i) => {
      record[header] = row[i];
    });
    return record;
  });

  return (
    <div className="analysis-tool">
      {contextHolder}
      <Card title="回归分析工具" className="method-intro">
        <Title level={4}>方法介绍</Title>
        <Paragraph>
          多元线性回归分析是研究因变量与多个自变量之间线性关系的统计方法。它通过建立数学模型来描述变量间的关系,
          并可用于预测和解释变量之间的影响程度。
        </Paragraph>

        <Title level={4}>数据要求</Title>
        <Paragraph>
          - 因变量：连续型数值变量
          - 自变量：连续型或分类型变量
          - 样本量：建议不小于自变量个数的5-10倍
        </Paragraph>

        <Title level={4}>分析选项</Title>
        <Space direction="vertical" style={{ width: '100%' }}>
          <DataSelector
            onDataSelect={(type, data) => console.log(type, data)}
            onDataParse={handleDataParse}
          />

          {headers.length > 0 && (
            <>
              <Card size="small" title="数据预览">
                <Table
                  dataSource={previewData}
                  columns={headers.map(header => ({
                    title: header,
                    dataIndex: header,
                    key: header,
                  }))}
                  pagination={{ pageSize: 5 }}
                  size="small"
                  scroll={{ x: true }}
                />
              </Card>

              <Card size="small" title="变量选择">
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Text strong>因变量:</Text>
                    <Select
                      placeholder="选择因变量"
                      style={{ width: '100%', marginTop: '8px' }}
                      value={dependentVariable}
                      onChange={handleDependentVariableChange}
                    >
                      {headers.map((header) => (
                        <Option
                          key={header}
                          value={header}
                          disabled={independentVariables.includes(header)}
                        >
                          <Tooltip
                            title={
                              independentVariables.includes(header)
                                ? `"${header}" 已被选为自变量，不能同时作为因变量！`
                                : null
                            }
                          >
                            {header}
                          </Tooltip>
                        </Option>
                      ))}
                    </Select>
                  </Col>
                  <Col span={12}>
                    <Text strong>自变量:</Text>
                    <Select
                      mode="multiple"
                      placeholder="选择自变量"
                      style={{ width: '100%', marginTop: '8px' }}
                      value={independentVariables}
                      onChange={handleIndependentVariablesChange}
                    >
                      {headers.map((header) => (
                        <Option
                          key={header}
                          value={header}
                          disabled={header === dependentVariable}
                        >
                          <Tooltip
                            title={
                              header === dependentVariable
                                ? `"${header}" 已被选为因变量，不能同时作为自变量！`
                                : null
                            }
                          >
                            {header}
                          </Tooltip>
                        </Option>
                      ))}
                    </Select>
                  </Col>
                </Row>
                <Button
                  type="primary"
                  onClick={performRegression}
                  style={{ marginTop: '16px' }}
                  icon={<LineChartOutlined />}
                >
                  执行回归分析
                </Button>
              </Card>
            </>
          )}
        </Space>

        {validationError && (
          <Alert
            message="数据验证错误"
            description={
              <Space>
                <InfoCircleOutlined />
                {validationError}
              </Space>
            }
            type="error"
            showIcon
            style={{ marginTop: 16, marginBottom: 16 }}
          />
        )}

        <Alert
          message="结果说明"
          description={
            <ul>
              <li>R²：决定系数，表示模型解释变异的程度，取值0-1，越接近1表示模型拟合越好</li>
              <li>调整R²：考虑自变量数量的R²修正值</li>
              <li>F统计量：用于检验回归方程的显著性</li>
              <li>系数：表示每个自变量对因变量的影响程度</li>
              <li>P值：小于0.05表示该变量具有统计学意义</li>
            </ul>
          }
          type="info"
          showIcon
          style={{ marginTop: 16 }}
        />

        {regressionTFChartData && (
          <Card size="small" title="分析结果" style={{ marginTop: 16 }}>
            <RegressionResults data={regressionTFChartData} />
          </Card>
        )}
      </Card>
    </div>
  );
};

export default RegressionTool;