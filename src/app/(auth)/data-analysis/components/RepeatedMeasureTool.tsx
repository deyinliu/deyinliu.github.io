import { Card, Upload, Button, Select, Space, Typography, Alert, InputNumber, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import DataSelector from './common/DataSelector';
const { Title, Paragraph } = Typography;

const RepeatedMeasureTool = () => {
  const handleDataSelect = (type: string, data: any) => {
    console.log('Selected data:', type, data);
  };

  return (
    <div className="analysis-tool">
      <Card title="重复测量分析工具" className="method-intro">
        <Title level={4}>方法介绍</Title>
        <Paragraph>
          重复测量分析用于分析同一研究对象在多个时间点或条件下的测量数据。常用于临床随访研究，
          如治疗前、治疗后1月、3月、6月的指标变化分析。
        </Paragraph>

        <Title level={4}>数据要求</Title>
        <Paragraph>
          - 数据格式：长格式或宽格式数据
          - 测量次数：≥3次
          - 数据特点：同一受试者的多次测量，时间点/条件明确
        </Paragraph>

        <Title level={4}>分析选项</Title>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Form layout="vertical">
            <Form.Item label="设置分析参数">
              <Space>
                <InputNumber placeholder="测量时间点数" min={3} />
                <Select
                  placeholder="数据格式"
                  style={{ width: 150 }}
                  options={[
                    { value: 'long', label: '长格式' },
                    { value: 'wide', label: '宽格式' }
                  ]}
                />
              </Space>
            </Form.Item>

            <Form.Item>
              <Select
                placeholder="选择分析方法"
                style={{ width: 200 }}
                options={[
                  { value: 'anova', label: '重复测量方差分析' },
                  { value: 'mixed', label: '混合效应模型' },
                  { value: 'profile', label: '剖面分析' }
                ]}
              />
            </Form.Item>
          </Form>

          <DataSelector onDataSelect={handleDataSelect} />

          <Upload>
            <Button icon={<UploadOutlined />}>上传数据文件</Button>
          </Upload>

          <Button type="primary">开始分析</Button>
        </Space>

        <Alert
          message="结果说明"
          description="分析结果将包含：描述性统计、球形检验、时间效应分析、多重比较、趋势分析等。"
          type="info"
          showIcon
          style={{ marginTop: 16 }}
        />
      </Card>
    </div>
  );
};

export default RepeatedMeasureTool;
