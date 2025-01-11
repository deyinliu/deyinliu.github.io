import React from 'react';
import { Column, Line, Scatter } from '@ant-design/charts';
import { Statistic, Row, Col, Card } from 'antd';
import { ChartData, RegressionChartData, ScatterDataPoint } from '@/interface';

// 回归系数柱状图
const CoefficientChart = ({ data }: { data: ChartData[] }) => {
  const config = {
    data,
    xField: 'xAxis',
    yField: 'yAxis',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    meta: {
      xAxis: { alias: 'Feature' },
      yAxis: { alias: 'Coefficient' },
    },
  };
  return <Column {...config} />;
};

// 标准误差柱状图
const StandardErrorChart = ({ data }: { data: ChartData[] }) => {
  const config = {
    data,
    xField: 'xAxis',
    yField: 'yAxis',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    meta: {
      xAxis: { alias: 'Feature' },
      yAxis: { alias: 'Standard Error' },
    },
  };
  return <Column {...config} />;
};

// t 值柱状图
const TValueChart = ({ data }: { data: ChartData[] }) => {
  const config = {
    data,
    xField: 'xAxis',
    yField: 'yAxis',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    meta: {
      xAxis: { alias: 'Feature' },
      yAxis: { alias: 't-Value' },
    },
  };
  return <Column {...config} />;
};

// p 值柱状图
const PValueChart = ({ data }: { data: ChartData[] }) => {
  const config = {
    data,
    xField: 'xAxis',
    yField: 'yAxis',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    meta: {
      xAxis: { alias: 'Feature' },
      yAxis: { alias: 'p-Value' },
    },
  };
  return <Column {...config} />;
};

// 残差折线图
const ResidualChart = ({ data }: { data: ChartData[] }) => {
  const config = {
    data,
    xField: 'xAxis',
    yField: 'yAxis',
    point: {
      size: 4,
      shape: 'circle',
    },
    meta: {
      xAxis: { alias: 'Sample' },
      yAxis: { alias: 'Residual' },
    },
  };
  return <Line {...config} />;
};

// 置信区间误差条形图
const ConfidenceIntervalChart = ({ data }: { data: ChartData[] }) => {
  const config = {
    data,
    xField: 'xAxis',
    yField: 'yAxis',
    barStyle: {
      fill: '#8884d8',
    },
    errorField: 'error',
    meta: {
      xAxis: { alias: 'Feature' },
      yAxis: { alias: 'Coefficient' },
      error: { alias: 'Confidence Interval' },
    },
  };
  return <Column {...config} />;
};

// 单值指标展示
const SingleValueChart = ({ data }: { data: RegressionChartData }) => {
  return (
    <Row gutter={16}>
      <Col span={4}>
        <Statistic title="Intercept" value={data.intercept} />
      </Col>
      <Col span={4}>
        <Statistic title="R²" value={data.rSquared} />
      </Col>
      <Col span={4}>
        <Statistic title="Adjusted R²" value={data.adjustedRSquared} />
      </Col>
      <Col span={4}>
        <Statistic title="F Statistic" value={data.fStatistic} />
      </Col>
      <Col span={4}>
        <Statistic title="Durbin-Watson" value={data.durbinWatson} />
      </Col>
    </Row>
  );
};
const ScatterPlotMatrix = ({ data }: { data: ScatterDataPoint[] }) => {
  const features = Object.keys(data[0]); // 获取所有字段名
  const target = features.pop() || ''; // 因变量（假设最后一个字段是因变量）

  return (
    <Row gutter={16}>
      {features.map((feature, index) => (
        <Col span={8} key={index}>
          <Card title={`${feature} vs ${target}`}>
            <Scatter
              data={data}
              xField={feature}
              yField={target}
              pointStyle={{ fillOpacity: 0.8 }}
              meta={{
                [feature]: { alias: feature },
                [target]: { alias: target },
              }}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

// 主组件
const RegressionAnalysisCharts = ({ data }: { data: RegressionChartData }) => {
  return (
    <div>
      <Card title="单值指标">
        <SingleValueChart data={data} />
      </Card>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card title="回归系数">
            <CoefficientChart data={data.coefficients} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="标准误差">
            <StandardErrorChart data={data.standardErrors} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card title="t 值">
            <TValueChart data={data.tValues} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="p 值">
            <PValueChart data={data.pValues} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card title="残差">
            <ResidualChart data={data.residuals} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="置信区间">
            <ConfidenceIntervalChart data={data.confidenceIntervals} />
          </Card>
        </Col>
      </Row>
      <Card title="散点图矩阵">
        <ScatterPlotMatrix data={data.scatterMatrixData || []} />
      </Card>
    </div>
  );
};

export default RegressionAnalysisCharts;