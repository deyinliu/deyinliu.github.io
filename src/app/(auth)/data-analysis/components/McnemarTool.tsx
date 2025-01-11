import { Card, Space, Typography, Alert, Button, Form, InputNumber, Divider } from 'antd';
import DataSelector from './common/DataSelector';
const { Title, Paragraph } = Typography;

const McnemarTool = () => {
  const handleDataSelect = (type: string, data: any) => {
    console.log('Selected data:', type, data);
  };

  return (
    <div className="analysis-tool">
      <Card title="配对卡方检验(McNemar检验)工具" className="method-intro">
        <Title level={4}>方法介绍</Title>
        <Paragraph>
          McNemar检验用于配对设计中二分类数据的比较，常用于前后自身对照研究，如治疗前后症状改善情况的比较，
          或两种诊断方法对同一组病例的诊断结果比较。
        </Paragraph>

        <Title level={4}>数据要求</Title>
        <Paragraph>
          - 数据输入：配对的二分类数据（2×2表）
          - 研究设计：配对或自身对照设计
          - 变量类型：二分类变量（如是/否、阳性/阴性）
        </Paragraph>

        <Title level={4}>分析选项</Title>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Form layout="vertical">
            <Form.Item label="输入配对数据">
              <Space direction="vertical">
                <span>第二次测量（或方法B）</span>
                <Space>
                  <span>第一次测量（或方法A）</span>
                  <InputNumber placeholder="阳-阳" min={0} />
                  <InputNumber placeholder="阳-阴" min={0} />
                  <br />
                  <InputNumber placeholder="阴-阳" min={0} />
                  <InputNumber placeholder="阴-阴" min={0} />
                </Space>
              </Space>
            </Form.Item>
          </Form>

          <Divider>或</Divider>

          <DataSelector onDataSelect={handleDataSelect} />

          <Button type="primary">开始分析</Button>
        </Space>

        <Alert
          message="结果说明"
          description="分析结果将包含：McNemar卡方值、P值、优势比及其置信区间等。若不一致对数小于25，将自动使用精确概率法。"
          type="info"
          showIcon
          style={{ marginTop: 16 }}
        />
      </Card>
    </div>
  );
};

export default McnemarTool;
