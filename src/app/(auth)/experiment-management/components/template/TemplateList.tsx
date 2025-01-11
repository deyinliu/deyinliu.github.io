"use client";
import { useState } from 'react';
import { List, Card, Tag, Space, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { DataTemplate } from '@/types/experiment';

interface Props {
  onSelect: (template: DataTemplate) => void;
  selectedTemplate: DataTemplate | null;
}

const TemplateList: React.FC<Props> = ({ onSelect, selectedTemplate }) => {
  const [searchText, setSearchText] = useState('');
  const [templates] = useState<DataTemplate[]>([
    {
      id: '1',
      name: '基础生命体征记录',
      description: '用于记录患者基础生命体征的模板',
      isPublic: true,
      createdBy: 'system',
      createdAt: '2024-03-20',
      fields: [
        { id: '1', label: '体温', type: 'number', required: true },
        { id: '2', label: '血压', type: 'text', required: true },
        { id: '3', label: '心率', type: 'number', required: true },
      ],
    },
    // 可以添加更多模板示例
  ]);

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchText.toLowerCase()) ||
      template.description?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <Input
        placeholder="搜索模板"
        prefix={<SearchOutlined />}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={filteredTemplates}
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
    </div>
  );
};

export default TemplateList;
