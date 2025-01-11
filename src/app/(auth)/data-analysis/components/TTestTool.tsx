import { Card, Select, Space, Typography, Alert, Button } from 'antd';
import DataSelector from './common/DataSelector';
const { Title, Paragraph } = Typography;

const TTestTool = () => {
  const handleDataSelect = (type: string, data: any) => {
    console.log('Selected data:', type, data);
  };

  return (
    <div className="analysis-tool">
      <Card title="T检验分析工具" className="method-intro">
        <Title level={4}>方法介绍</Title>
        <Paragraph>
          T检验用于比较两组数据的均值是否存在显著差异。常用于临床研究中比较两组患者的指标差异。
        </Paragraph>

        <Title level={4}>数据要求</Title>
        <Paragraph>
          - 数据格式：CSV或Excel文件
          - 要求：两组数据都应呈正态分布
          - 变量：一个分组变量（两组）和一个测量变量
        </Paragraph>

        <Title level={4}>分析选项</Title>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Select
            placeholder="选择T检验类型"
            style={{ width: 200 }}
            options={[
              { value: 'independent', label: '独立样本T检验' },
              { value: 'paired', label: '配对样本T检验' },
            ]}
          />

          <DataSelector onDataSelect={handleDataSelect} />

          <Button type="primary">开始分析</Button>
        </Space>

        <Alert
          message="结果说明"
          description="分析结果将包含：描述性统计量、T统计量、P值、95%置信区间等。"
          type="info"
          showIcon
          style={{ marginTop: 16 }}
        />
      </Card>
    </div>
  );
};

export default TTestTool;
