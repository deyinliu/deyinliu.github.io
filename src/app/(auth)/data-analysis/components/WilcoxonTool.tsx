import { Card, Button, Select, Space, Typography, Alert } from 'antd';
import DataSelector from './common/DataSelector';
const { Title, Paragraph } = Typography;

const WilcoxonTool = () => {
  const handleDataSelect = (type: string, data: any) => {
    console.log('Selected data:', type, data);
    // 处理选中的数据
  };

  return (
    <div className="analysis-tool">
      <Card title="秩和检验工具" className="method-intro">
        <Title level={4}>方法介绍</Title>
        <Paragraph>
          秩和检验是一种非参数统计方法，适用于不符合正态分布或无法确定分布类型的数据比较。
          包括Mann-Whitney U检验（两独立样本）和Wilcoxon符号秩检验（配对样本）。
        </Paragraph>

        <Title level={4}>数据要求</Title>
        <Paragraph>
          - 数据格式：CSV或Excel文件
          - 适用情况：数据不呈正态分布，或为等级资料
          - 变量：分组变量和测量变量（或配对数据）
        </Paragraph>

        <Title level={4}>分析选项</Title>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Select
            placeholder="选择检验类型"
            style={{ width: 200 }}
            options={[
              { value: 'mannWhitney', label: 'Mann-Whitney U检验' },
              { value: 'wilcoxon', label: 'Wilcoxon符号秩检验' },
              { value: 'kruskal', label: 'Kruskal-Wallis H检验' },
            ]}
          />

          <DataSelector onDataSelect={handleDataSelect} />

          <Button type="primary">开始分析</Button>
        </Space>

        <Alert
          message="结果说明"
          description="分析结果将包含：秩和统计量、Z值、P值、效应量等。对于多组比较会自动进行事后检验。"
          type="info"
          showIcon
          style={{ marginTop: 16 }}
        />
      </Card>
    </div>
  );
};

export default WilcoxonTool;
