"use client";
import { List, Card, Tag, Empty, Space } from 'antd';
import type { DataTemplate } from '@/types/experiment';
import { useTemplateStore } from '@/stores/templateStore';

interface TemplateListProps {
  onSelect: (template: DataTemplate) => void;
  selectedTemplate: Partial<DataTemplate>;
}

const TemplateList: React.FC<TemplateListProps> = ({ onSelect, selectedTemplate }) => {
  const templates = useTemplateStore((state) => state.templates);

  if (templates.length === 0) {
    return <Empty description="暂无可用模板" />;
  }

  return (
    <List
      grid={{ gutter: 16, column: 2 }}
      dataSource={templates}
      renderItem={(template) => (
        <List.Item>
          <Card
            hoverable
            onClick={() => onSelect(template)}
            style={{
              border: selectedTemplate?.id === template.id ? '2px solid #1890ff' : undefined,
            }}
          >
            <Card.Meta
              title={
                <Space>
                  {template.name}
                  {template.isPublic && <Tag color="blue">公共</Tag>}
                </Space>
              }
              description={
                <>
                  <div>{template.description}</div>
                  <div style={{ marginTop: 8 }}>
                    <Tag color="default">{template.fields.length} 个字段</Tag>
                    <Tag color="default">创建于 {template.createdAt}</Tag>
                  </div>
                </>
              }
            />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default TemplateList;
