import { Card, Form, InputNumber, Select, Space, Typography, Alert, Button, Divider } from 'antd';
import DataSelector from './common/DataSelector';
const { Title, Paragraph } = Typography;

const PowerTool = () => {
  const handleDataSelect = (type: string, data: any) => {
    console.log('Selected data:', type, data);
  };

  return (
    <div className="analysis-tool">
      <Card title="样本量估算工具" className="method-intro">
        <Title level={4}>方法介绍</Title>
        <Paragraph>
          样本量估算是研究设计阶段的重要环节，合理的样本量可以确保研究具有足够的统计效能，
          同时避免过度招募受试者。
        </Paragraph>

        <Title level={4}>计算参数</Title>
        <Paragraph>
          - α值（I类错误）：通常设为0.05
          - β值（II类错误）：通常设为0.10或0.20
          - 效应量：根据研究类型设定
        </Paragraph>

        <Title level={4}>估算选项</Title>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Form layout="vertical">
            <Form.Item label="研究类型">
              <Select
                style={{ width: 200 }}
                options={[
                  { value: 'mean', label: '均数比较' },
                  { value: 'rate', label: '率的比较' },
                  { value: 'correlation', label: '相关分析' },
                  { value: 'regression', label: '回归分析' },
                  { value: 'survival', label: '生存分析' }
                ]}
              />
            </Form.Item>

            <Form.Item label="基本参数">
              <Space>
                <InputNumber
                  placeholder="显著性水平"
                  min={0.01}
                  max={0.1}
                  step={0.01}
                  defaultValue={0.05}
                />
                <InputNumber
                  placeholder="把握度"
                  min={0.7}
                  max={0.95}
                  step={0.05}
                  defaultValue={0.8}
                />
              </Space>
            </Form.Item>
          </Form>

          <Divider>参考历史数据</Divider>

          <DataSelector onDataSelect={handleDataSelect} />

          <Button type="primary">计算样本量</Button>
        </Space>

        <Alert
          message="结果说明"
          description="计算结果将给出：所需最小样本量、实际检验效能、样本量的敏感性分析等。"
          type="info"
          showIcon
          style={{ marginTop: 16 }}
        />
      </Card>
    </div>
  );
};

export default PowerTool;
