"use client";
import { Tabs, Card } from 'antd';
import { BarChartOutlined, LineChartOutlined, DotChartOutlined } from '@ant-design/icons';
import RegressionTool from "../../component/regressionTool";

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
      key: 'correlation',
      label: (
        <span>
          <DotChartOutlined />
          相关性分析
        </span>
      ),
      children: <div>相关性分析模块开发中...</div>
    },
    {
      key: 'descriptive',
      label: (
        <span>
          <BarChartOutlined />
          描述性统计
        </span>
      ),
      children: <div>描述性统计模块开发中...</div>
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
      bordered={false}
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
