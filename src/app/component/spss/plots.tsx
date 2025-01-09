import React, { useState } from 'react';
import { Card, Row, Col, Select, Empty } from 'antd';
import { Scatter } from '@ant-design/plots';
import type { VariableScatterData } from '../../types/regressionTypes';

interface Props {
  variableData: VariableScatterData[];
  yAxisName: string;
}

export const VariableScatterPlots: React.FC<Props> = ({
  variableData,
  yAxisName
}) => {
  const [selectedVariables, setSelectedVariables] = useState<string[]>(
    variableData.map(d => d.variable)
  );

  const scatterConfig = (variable: string) => {
    const plotData = variableData.find(d => d.variable === variable)?.data || [];
    console.log(`Plot data for ${variable}:`, plotData); // Debug log

    return {
      data: plotData,
      xField: 'xValue',
      yField: 'yValue',
      colorField: 'variableName',
      size: 5,
      shape: 'circle',
      appendPadding: 10,
      width: 400,
      height: 400,
      tooltip: {
        fields: ['xValue', 'yValue', 'variableName'],
        title: '数据点详情',
      },
      xAxis: {
        title: { text: variable },
        grid: { line: { style: { stroke: '#eee' } } },
        nice: true,
      },
      yAxis: {
        title: { text: yAxisName },
        grid: { line: { style: { stroke: '#eee' } } },
        nice: true,
      },
    };
  };

  return (
    <Card title="变量散点图分析 Variable Scatter Plots">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="选择要显示的变量"
            value={selectedVariables}
            onChange={setSelectedVariables}
            options={variableData.map(d => ({
              label: d.variable,
              value: d.variable,
            }))}
          />
        </Col>
        {selectedVariables.map(variable => (
          <Col span={12} key={variable}>
            <div style={{
              height: 450,
              border: '1px solid #f0f0f0',
              borderRadius: '2px',
              padding: '12px'
            }}>
              {variableData.find(d => d.variable === variable)?.data.length ? (
                <Scatter {...scatterConfig(variable)} />
              ) : (
                <Empty description="暂无数据" />
              )}
            </div>
          </Col>
        ))}
      </Row>
    </Card>
  );
};