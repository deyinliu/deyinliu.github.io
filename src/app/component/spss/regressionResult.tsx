import React from 'react';
import { Table, Card, Row, Col } from 'antd';
import { RegressionDisplayData } from '../../types/regressionTypes';
import { VariableScatterPlots } from './plots';
import { metricLabels } from '../../types/labels';

interface Props {
  data: RegressionDisplayData;
}

export const RegressionResults: React.FC<Props> = ({ data }) => {
  const modelSummaryColumns = [
    { title: metricLabels.modelSummary.r, dataIndex: 'r' },
    { title: metricLabels.modelSummary.rSquared, dataIndex: 'rSquared' },
    { title: metricLabels.modelSummary.adjustedRSquared, dataIndex: 'adjustedRSquared' },
    { title: metricLabels.modelSummary.stdError, dataIndex: 'stdError' }
  ];

  const anovaColumns = [
    { title: metricLabels.anova.source, dataIndex: 'source' },
    { title: metricLabels.anova.ss, dataIndex: 'ss' },
    { title: metricLabels.anova.df, dataIndex: 'df' },
    { title: metricLabels.anova.ms, dataIndex: 'ms' },
    { title: metricLabels.anova.f, dataIndex: 'f' },
    { title: metricLabels.anova.sig, dataIndex: 'sig' }
  ];

  const coefficientsColumns = [
    { title: metricLabels.coefficients.variable, dataIndex: 'variable' },
    { title: metricLabels.coefficients.unstandardizedB, dataIndex: 'unstandardizedB' },
    { title: metricLabels.coefficients.stdError, dataIndex: 'stdError' },
    { title: metricLabels.coefficients.standardizedBeta, dataIndex: 'standardizedBeta' },
    { title: metricLabels.coefficients.tValue, dataIndex: 'tValue' },
    { title: metricLabels.coefficients.sigValue, dataIndex: 'sigValue' },
    {
      title: metricLabels.coefficients.confidenceInterval,
      children: [
        {
          title: metricLabels.coefficients.ciLower,
          dataIndex: 'confidenceIntervalLower'
        },
        {
          title: metricLabels.coefficients.ciUpper,
          dataIndex: 'confidenceIntervalUpper'
        }
      ]
    }
  ];

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[0, 24]}>
        <Col span={24}>
          <Card title="Model Summary">
            <Table
              dataSource={[data.modelSummary]}
              columns={modelSummaryColumns}
              pagination={false}
            />
          </Card>
        </Col>
        <Col span={24}>
          <Card title={metricLabels.anova.title}>
            <Table
              dataSource={data.anovaTable.rows}
              columns={anovaColumns}
              pagination={false}
            />
          </Card>
        </Col>
        <Col span={24}>
          <Card title={metricLabels.coefficients.title}>
            <Table
              dataSource={data.coefficients}
              columns={coefficientsColumns}
              pagination={false}
            />
          </Card>
        </Col>
        <Col span={24}>
          <VariableScatterPlots
            variableData={data.residualStats.variableScatterData}
            yAxisName={data.yAxisName}
          />
        </Col>
      </Row>
    </div>
  );
};