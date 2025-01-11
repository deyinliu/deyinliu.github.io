import { Card, Select, Space, Typography, Alert, Button } from 'antd';
import DataSelector from './common/DataSelector';
const { Title, Paragraph } = Typography;

const AnovaTool = () => {
  const handleDataSelect = (type: string, data: any) => {
    console.log('Selected data:', type, data);
  };

  return (
    <div className="analysis-tool">
      <Card title="方差分析工具" className="method-intro">
        <Title level={4}>方法介绍</Title>
        <Paragraph>
          方差分析(ANOVA)用于比较三个或更多组之间的差异。适用于临床研究中多组数据的比较。
        </Paragraph>

        <Title level={4}>数据要求</Title>
        <Paragraph>
          - 数据格式：CSV或Excel文件
          - 要求：各组数据应呈正态分布，且方差相等
          - 变量：一个分组变量（≥3组）和一个测量变量
        </Paragraph>

        <Title level={4}>分析选项</Title>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Select
            placeholder="选择方差分析类型"
            style={{ width: 200 }}
            options={[
              { value: 'oneway', label: '单因素方差分析' },
              { value: 'twoway', label: '双因素方差分析' },
              { value: 'repeated', label: '重复测量方差分析' },
            ]}
          />

          <DataSelector onDataSelect={handleDataSelect} />

          <Button type="primary">开始分析</Button>
        </Space>

        <Alert
          message="结果说明"
          description="分析结果将包含：描述性统计量、F统计量、P值、组间多重比较等。"
          type="info"
          showIcon
          style={{ marginTop: 16 }}
        />
      </Card>
    </div>
  );
};

export default AnovaTool;
