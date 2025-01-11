"use client";
import { Card, Form, Input, DatePicker, Radio, Checkbox, InputNumber } from 'antd';
import type { DataTemplate } from '@/types/experiment';

interface TemplatePreviewProps {
  template: DataTemplate;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ template }) => {
  const renderField = (field: any) => {
    switch (field.type) {
      case 'text':
        return <Input disabled placeholder={`请输入${field.label}`} />;
      case 'number':
        return <InputNumber disabled style={{ width: '100%' }} placeholder={`请输入${field.label}`} />;
      case 'date':
        return <DatePicker disabled style={{ width: '100%' }} />;
      case 'radio':
        return (
          <Radio.Group disabled>
            {field.options?.map((opt: any) => (
              <Radio key={opt.value} value={opt.value}>
                {opt.label}
              </Radio>
            ))}
          </Radio.Group>
        );
      case 'checkbox':
        return (
          <Checkbox.Group disabled>
            {field.options?.map((opt: any) => (
              <Checkbox key={opt.value} value={opt.value}>
                {opt.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        );
      default:
        return <Input disabled />;
    }
  };

  return (
    <div>
      <Card>
        <Form layout="vertical">
          {template?.fields?.map((field) => (
            <Form.Item
              key={field.id}
              label={
                <span>
                  {field.label}
                  {field.required && <span style={{ color: '#ff4d4f' }}> *</span>}
                </span>
              }
              extra={field.description}
            >
              {renderField(field)}
            </Form.Item>
          ))}
        </Form>
      </Card>
    </div>
  );
};

export default TemplatePreview;
