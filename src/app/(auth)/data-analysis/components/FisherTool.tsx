import { Card, Space, Typography, Alert, Button, Form, InputNumber } from 'antd';
import DataSelector from './common/DataSelector';
const { Title, Paragraph } = Typography;

const FisherTool = () => {
  const handleDataSelect = (type: string, data: any) => {
    console.log('Selected data:', type, data);
    // 处理选中的数据
  };

  return (
    <div className="analysis-tool">
      <Card title="Fisher精确检验工具" className="method-intro">
        <Title level={4}>方法介绍</Title>
        <Paragraph>
          Fisher精确检验适用于样本量较小（特别是期望频数小于5）的分类数据分析。常用于小样本临床试验中分类指标的比较，
          如罕见病研究中不良反应发生率的比较。
        </Paragraph>

        <Title level={4}>数据要求</Title>
        <Paragraph>
          - 数据输入：可直接输入2×2列联表数据，或上传原始数据
          - 变量类型：二分类变量
          - 适用情况：样本量小，尤其是有格子的期望频数小于5
        </Paragraph>

        <Title level={4}>分析选项</Title>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Form layout="vertical">
            <Form.Item label="直接输入2×2列联表数据">
              <Space>
                <InputNumber placeholder="a" min={0} />
                <InputNumber placeholder="b" min={0} />
                <br />
                <InputNumber placeholder="c" min={0} />
                <InputNumber placeholder="d" min={0} />
              </Space>
            </Form.Item>
          </Form>

          <DataSelector onDataSelect={handleDataSelect} />

          <Button type="primary">开始分析</Button>
        </Space>

        <Alert
          message="结果说明"
          description="分析结果将包含：Fisher精确概率、单侧P值、双侧P值、精确置信区间等。"
          type="info"
          showIcon
          style={{ marginTop: 16 }}
        />
      </Card>
    </div>
  );
};

export default FisherTool;
