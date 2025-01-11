import { Card, Select, Space, Typography, Alert, Button } from 'antd';
import DataSelector from './common/DataSelector';
const { Title, Paragraph } = Typography;

const ChiSquareTool = () => {
  const handleDataSelect = (type: string, data: any) => {
    console.log('Selected data:', type, data);
    // 处理选中的数据
  };

  return (
    <div className="analysis-tool">
      <Card title="卡方检验工具" className="method-intro">
        <Title level={4}>方法介绍</Title>
        <Paragraph>
          卡方检验用于分析分类变量之间是否存在关联。常用于比较不同组别间某一分类变量的分布是否有显著差异，
          如比较两种治疗方案的有效率、不良反应发生率等。
        </Paragraph>

        <Title level={4}>数据要求</Title>
        <Paragraph>
          - 数据格式：CSV或Excel文件，或直接输入列联表数据
          - 变量类型：分类变量（如是/否、A/B/C等）
          - 样本量要求：期望频数≥5
        </Paragraph>

        <Title level={4}>分析选项</Title>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Select
            placeholder="选择分析类型"
            style={{ width: 200 }}
            options={[
              { value: 'independence', label: '独立性检验' },
              { value: 'goodness', label: '拟合优度检验' },
              { value: 'trend', label: '趋势性检验' },
            ]}
          />

          <DataSelector onDataSelect={handleDataSelect} />

          <Button type="primary">开始分析</Button>
        </Space>

        <Alert
          message="结果说明"
          description="分析结果将包含：卡方值、自由度、P值、期望频数表、列联表等。当样本量较小时会自动提供Fisher精确检验结果。"
          type="info"
          showIcon
          style={{ marginTop: 16 }}
        />
      </Card>
    </div>
  );
};

export default ChiSquareTool;
