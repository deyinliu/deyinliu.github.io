import React, { useState } from 'react';
import { Form, Input, Button, Space, Select, Switch, Card, Divider } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import type { DataTemplate, TemplateField } from '@/types/experiment';

interface TemplateDesignerProps {
  onSave: (template: DataTemplate) => void;
  initialData?: DataTemplate;
}

const TemplateDesigner: React.FC<TemplateDesignerProps> = ({ onSave, initialData }) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState<TemplateField[]>(initialData?.fields || []);

  const handleAddField = () => {
    const newField: TemplateField = {
      id: `field_${fields.length}`,
      label: '',
      type: 'text',
      required: false,
    };
    setFields([...fields, newField]);
  };

  const handleRemoveField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleFieldTypeChange = (id: string, value: TemplateField['type']) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, type: value } : field
      )
    );
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reorderedFields = Array.from(fields);
    const [removed] = reorderedFields.splice(result.source.index, 1);
    reorderedFields.splice(result.destination.index, 0, removed);
    setFields(reorderedFields);
  };

  const handleSubmit = async (values: any) => {
    try {
      const fieldsData = fields.map((field) => ({
        ...field,
        label: values[`field_${field.id}_label`],
        required: values[`field_${field.id}_required`] || false,
        type: values[`field_${field.id}_type`] || 'text',
      }));

      const template: DataTemplate = {
        id: initialData?.id || `template_${Date.now()}`,
        name: values.name,
        description: values.description,
        isPublic: false,
        createdBy: 'current_user', // 这里应该从用户上下文中获取
        createdAt: new Date().toISOString(),
        fields: fieldsData,
      };

      onSave(template);
    } catch (error) {
      console.error('Template creation error:', error);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        name="name"
        label="模板名称"
        rules={[{ required: true, message: '请输入模板名称' }]}
      >
        <Input placeholder="请输入模板名称" />
      </Form.Item>

      <Form.Item name="description" label="模板描述">
        <Input.TextArea placeholder="请输入模板描述" />
      </Form.Item>

      <Divider>字段配置</Divider>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="fields">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {fields.map((field, index) => (
                <Draggable key={field.id} draggableId={field.id} index={index}>
                  {(provided) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={{
                        marginBottom: 16,
                        ...provided.draggableProps.style,
                      }}
                    >
                      <div {...provided.dragHandleProps}>
                        <Space align="baseline" style={{ width: '100%' }}>
                          <Form.Item
                            name={`field_${field.id}_label`}
                            rules={[{ required: true, message: '请输入字段名称' }]}
                          >
                            <Input placeholder="字段名称" />
                          </Form.Item>

                          <Form.Item name={`field_${field.id}_type`}>
                            <Select
                              style={{ width: 120 }}
                              onChange={(value) => handleFieldTypeChange(field.id, value)}
                              options={[
                                { label: '文本', value: 'text' },
                                { label: '数字', value: 'number' },
                                { label: '单选', value: 'radio' },
                                { label: '多选', value: 'checkbox' },
                                { label: '日期', value: 'date' },
                              ]}
                            />
                          </Form.Item>

                          <Form.Item name={`field_${field.id}_required`} valuePropName="checked">
                            <Switch checkedChildren="必填" unCheckedChildren="选填" />
                          </Form.Item>

                          <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleRemoveField(field.id)}
                          />
                        </Space>
                      </div>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Button type="dashed" onClick={handleAddField} block icon={<PlusOutlined />}>
        添加字段
      </Button>

      <Form.Item style={{ marginTop: 24 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            保存模板
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default TemplateDesigner;
