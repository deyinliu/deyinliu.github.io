"use client";
import { Tabs, Card } from 'antd';
import {
  BarChartOutlined,
  LineChartOutlined,
  AreaChartOutlined,
  FundOutlined,
  RadarChartOutlined,
  PieChartOutlined,
  TableOutlined,
  NodeIndexOutlined
} from '@ant-design/icons';
import RegressionTool from "./components/RegressionTool";
import TTestTool from "./components/TTestTool";
import AnovaTool from "./components/AnovaTool";
import ChiSquareTool from "./components/ChiSquareTool";
import WilcoxonTool from "./components/WilcoxonTool";
import FisherTool from "./components/FisherTool";
import McnemarTool from "./components/McnemarTool";

const DataAnalysisPage = () => {
  const items = [
    {
      key: 'regression',
      label: (
        <span>
          <LineChartOutlined />
          回归分析
        </span>
      ),
      children: <RegressionTool />
    },
    {
      key: 'ttest',
      label: (
        <span>
          <AreaChartOutlined />
          T检验
        </span>
      ),
      children: <TTestTool />
    },
    {
      key: 'anova',
      label: (
        <span>
          <FundOutlined />
          方差分析
        </span>
      ),
      children: <AnovaTool />
    },
    {
      key: 'wilcoxon',
      label: (
        <span>
          <NodeIndexOutlined />
          秩和检验
        </span>
      ),
      children: <WilcoxonTool />
    },
    {
      key: 'chisquare',
      label: (
        <span>
          <PieChartOutlined />
          卡方检验
        </span>
      ),
      children: <ChiSquareTool />
    },
    {
      key: 'fisher',
      label: (
        <span>
          <TableOutlined />
          Fisher精确检验
        </span>
      ),
      children: <FisherTool />
    },
    {
      key: 'mcnemar',
      label: (
        <span>
          <RadarChartOutlined />
          配对卡方检验
        </span>
      ),
      children: <McnemarTool />
    }
  ];

  return (
    <Card
      title={
        <span style={{ fontSize: '18px', fontWeight: 500 }}>
          <BarChartOutlined style={{ marginRight: 8 }} />
          数据分析工具集
        </span>
      }
      className="analysis-card"
    >
      <Tabs
        defaultActiveKey="regression"
        items={items}
        type="card"
        size="large"
        className="analysis-tabs"
      />
    </Card>
  );
};

export default DataAnalysisPage;
