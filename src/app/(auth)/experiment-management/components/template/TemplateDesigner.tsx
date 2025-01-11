"use client";
import React, { useState } from 'react';
import { Form, Input, Button, Space, Card, Divider, Tooltip, Tag, Modal, Checkbox } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, EyeOutlined, InfoCircleOutlined } from '@ant-design/icons';
import type { TemplateField } from '@/types/experiment';
import FieldConfigDrawer from './FieldConfigDrawer';
import FieldPreview from './FieldPreview';
import { useExperimentFormStore } from '@/stores/experimentFormStore'; // 添加这行，修复 setDataTemplate undefined 错误


const TemplateDesigner: React.FC = () => {
  const [form] = Form.useForm();
  const [editingField, setEditingField] = useState<TemplateField | null>(null);
  const [previewField, setPreviewField] = useState<TemplateField | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const { dataTemplate = {}, setDataTemplate } = useExperimentFormStore();
  const { fields = [], name, description } = dataTemplate;

  const handleAddField = () => {
    const newField: TemplateField = {
      id: `field_${fields?.length ?? 0}`,
      label: '',
      type: 'text',
      required: false,
    };
    setDataTemplate({ ...dataTemplate, fields: [...fields, newField] });
    form.setFieldValue(`field_${fields.length}_label`, '未命名字段');
    form.setFieldValue(`field_${fields.length}_type`, 'text');
    form.setFieldValue(`field_${fields.length}_required`, false);
  };

  const handleRemoveField = (id: string) => {
    const newField = (fields.filter((field) => field.id !== id));
    setDataTemplate({ ...dataTemplate, fields: [...newField] });
  };

  const handleEditField = (field: TemplateField) => {
    setEditingField(field);
  };

  const handlePreviewField = (field: TemplateField) => {
    setPreviewField(field);
  };

  const handleValuesChange = (changedValues: any) => {
    setDataTemplate({ ...dataTemplate, ...changedValues });
  }
  const handleFieldSave = (updatedField: TemplateField) => {
    const newField = (fields.map(field =>
      field.id === updatedField.id ? updatedField : field
    ));
    setDataTemplate({ ...dataTemplate, fields: [...newField] });
    setEditingField(null);
  };

  return (<>
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        name: name,
        description: description,
      }}
      onValuesChange={handleValuesChange}
    >

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

      <div>
        {fields?.map((field) => (
          <Card
            key={field.id}
            style={{ marginBottom: 16 }}
          >
            <Space align="baseline" style={{ width: '100%', justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <h4>{field.label || '未命名字段'}</h4>
                <Space size={8}>
                  <Tag color="blue">{field.type}</Tag>
                  {field.required && <Tag color="red">必填</Tag>}
                  {field.description && (
                    <Tooltip title={field.description}>
                      <InfoCircleOutlined />
                    </Tooltip>
                  )}
                </Space>
              </div>
              <Space>
                <Button
                  type="text"
                  icon={<EyeOutlined />}
                  onClick={() => handlePreviewField(field)}
                />
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => handleEditField(field)}
                />
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveField(field.id)}
                />
              </Space>
            </Space>
          </Card>
        ))}
      </div>

      <Button type="dashed" onClick={handleAddField} block icon={<PlusOutlined />}>
        添加字段
      </Button>

      <Form.Item style={{ marginTop: 24 }}>
        <Checkbox
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        >
          保存为公共模板
        </Checkbox>
        <div style={{ color: '#666', fontSize: 12, marginTop: 4 }}>
          选中后将在创建实验时自动保存至公共模板库
        </div>
      </Form.Item>


    </Form>
    <FieldConfigDrawer
      open={!!editingField}
      field={editingField}
      onClose={() => setEditingField(null)}
      onSave={handleFieldSave}
    />

    <Modal
      title="字段预览"
      open={!!previewField}
      onCancel={() => setPreviewField(null)}
      footer={null}
    >
      <FieldPreview field={previewField!} />
    </Modal>
  </>

  );
};

export default TemplateDesigner;
