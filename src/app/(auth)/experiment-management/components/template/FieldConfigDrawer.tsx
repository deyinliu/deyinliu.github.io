"use client";
import React, { useEffect, useState } from 'react';
import { Drawer, Form, Input, Select, Switch, Space, Button, InputNumber, Radio, Tabs, Alert } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import type { TemplateField } from '@/types/experiment';
import FieldPreview from './FieldPreview';

interface FieldConfigDrawerProps {
  open: boolean;
  field: TemplateField | null;
  onClose: () => void;
  onSave: (field: TemplateField) => void;
}

const FieldConfigDrawer: React.FC<FieldConfigDrawerProps> = ({
  open,
  field,
  onClose,
  onSave,
}) => {
  const [form] = Form.useForm();
  const [previewField, setPreviewField] = useState<TemplateField | null>(null);

  // 监听表单变化，实时更新预览
  const handleFormChange = () => {
    const values = form.getFieldsValue();
    setPreviewField({ ...field, ...values });
  };

  useEffect(() => {
    if (field) {
      form.setFieldsValue(field);
      setPreviewField(field);
    }
  }, [field, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSave({ ...field, ...values });
      onClose();
    } catch (error) {
      console.error('Validate Failed:', error);
    }
  };

  const renderOptionsConfig = () => {
    const fieldType = form.getFieldValue('type');
    if (!['select', 'radio', 'checkbox'].includes(fieldType)) {
      return null;
    }

    return (
      <>
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              <Form.Item label="选项配置">
                {fields.map((field) => (
                  <Space key={field.key} align="baseline" style={{ display: 'flex', marginBottom: 8 }}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'label']}
                      rules={[{ required: true, message: '请输入选项文本' }]}
                    >
                      <Input placeholder="选项文本" style={{ width: 200 }} />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'value']}
                      rules={[{ required: true, message: '请输入选项值' }]}
                    >
                      <Input placeholder="选项值" style={{ width: 200 }} />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'defaultChecked']}
                      valuePropName="checked"
                    >
                      <Switch size="small" checkedChildren="默认" unCheckedChildren="默认" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Button type="dashed" onClick={() => add({ label: '', value: '' })} block icon={<PlusOutlined />}>
                  添加选项
                </Button>
              </Form.Item>
              <Form.Item name="layout" label="选项布局">
                <Radio.Group>
                  <Radio.Button value="horizontal">水平排列</Radio.Button>
                  <Radio.Button value="vertical">垂直排列</Radio.Button>
                </Radio.Group>
              </Form.Item>
              {fieldType === 'checkbox' && (
                <Form.Item name={['validation', 'maxChecked']} label="最多可选">
                  <InputNumber min={1} />
                </Form.Item>
              )}
            </>
          )}
        </Form.List>
      </>
    );
  };

  const renderValidationConfig = () => {
    const fieldType = form.getFieldValue('type');
    const commonValidations = (
      <>
        {['text', 'textarea'].includes(fieldType) && (
          <>
            <Form.Item name={['validation', 'minLength']} label="最小长度">
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item name={['validation', 'maxLength']} label="最大长度">
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item name={['validation', 'pattern']} label="正则表达式">
              <Input placeholder="输入正则表达式" />
            </Form.Item>
          </>
        )}
        {fieldType === 'number' && (
          <>
            <Form.Item name={['validation', 'min']} label="最小值">
              <InputNumber />
            </Form.Item>
            <Form.Item name={['validation', 'max']} label="最大值">
              <InputNumber />
            </Form.Item>
            <Form.Item name={['validation', 'precision']} label="小数位数">
              <InputNumber min={0} max={10} />
            </Form.Item>
          </>
        )}
      </>
    );

    return commonValidations;
  };

  return (
    <Drawer
      title="字段配置"
      width={800}
      open={open}
      onClose={onClose}
      extra={
        <Space>
          <Button onClick={onClose}>取消</Button>
          <Button type="primary" onClick={handleSubmit}>
            确定
          </Button>
        </Space>
      }
    >
      <Tabs
        items={[
          {
            key: 'basic',
            label: '基本设置',
            children: (
              <Form
                form={form}
                layout="vertical"
                initialValues={field || {}}
                onValuesChange={handleFormChange}
              >
                <Form.Item
                  name="label"
                  label="字段名称"
                  rules={[{ required: true, message: '请输入字段名称' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item name="type" label="字段类型" rules={[{ required: true }]}>
                  <Select
                    options={[
                      { label: '单行文本', value: 'text' },
                      { label: '多行文本', value: 'textarea' },
                      { label: '数字', value: 'number' },
                      { label: '单选', value: 'radio' },
                      { label: '多选', value: 'checkbox' },
                      { label: '下拉选择', value: 'select' },
                      { label: '日期', value: 'date' },
                      { label: '时间', value: 'time' },
                    ]}
                  />
                </Form.Item>

                <Form.Item name="description" label="字段说明">
                  <Input.TextArea rows={2} />
                </Form.Item>

                <Form.Item name="placeholder" label="占位提示">
                  <Input />
                </Form.Item>

                <Form.Item name="required" valuePropName="checked">
                  <Switch checkedChildren="必填" unCheckedChildren="选填" />
                </Form.Item>

                {renderOptionsConfig()}
                {renderValidationConfig()}
              </Form>
            )
          },
          {
            key: 'preview',
            label: '实时预览',
            children: previewField && (
              <div style={{ padding: '24px 0' }}>
                <Alert
                  message="预览效果"
                  description="以下是字段在表单中的实际显示效果"
                  type="info"
                  showIcon
                  style={{ marginBottom: 16 }}
                />
                <FieldPreview field={previewField} />
              </div>
            )
          }
        ]}
      />
    </Drawer>
  );
};

export default FieldConfigDrawer;
