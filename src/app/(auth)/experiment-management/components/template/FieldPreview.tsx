"use client";
import React from 'react';
import { Form, Input, InputNumber, DatePicker, TimePicker, Radio, Checkbox, Select, Slider } from 'antd';
import type { TemplateField } from '@/types/experiment';

interface FieldPreviewProps {
  field: TemplateField;
}

const FieldPreview: React.FC<FieldPreviewProps> = ({ field }) => {
  const renderField = () => {
    const commonProps = {
      placeholder: field.placeholder,
      disabled: true,
      style: field.width ? { width: field.width } : undefined,
    };

    switch (field.type) {
      case 'text':
        return <Input {...commonProps} />;
      case 'textarea':
        return <Input.TextArea {...commonProps} rows={4} />;
      case 'number':
        return (
          <InputNumber
            {...commonProps}
            style={{ width: '100%' }}
            min={field.validation?.min}
            max={field.validation?.max}
          />
        );
      case 'date':
        return <DatePicker {...commonProps} style={{ width: '100%' }} />;
      case 'time':
        return <TimePicker {...commonProps} style={{ width: '100%' }} />;
      case 'radio':
        return (
          <Radio.Group {...commonProps}>
            {field.options?.map(opt => (
              <Radio
                key={opt.value}
                value={opt.value}
                style={{
                  display: field.layout === 'vertical' ? 'block' : 'inline-block',
                  marginBottom: field.layout === 'vertical' ? 8 : 0
                }}
              >
                {opt.label}
              </Radio>
            ))}
          </Radio.Group>
        );
      case 'checkbox':
        return (
          <Checkbox.Group {...commonProps}>
            {field.options?.map(opt => (
              <Checkbox
                key={opt.value}
                value={opt.value}
                style={{
                  display: field.layout === 'vertical' ? 'block' : 'inline-block',
                  marginBottom: field.layout === 'vertical' ? 8 : 0
                }}
              >
                {opt.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        );
      case 'select':
        return <Select {...commonProps} options={field.options} />;
      case 'range':
        return (
          <Slider
            range
            {...commonProps}
            min={field.validation?.min}
            max={field.validation?.max}
            defaultValue={field.defaultValue}
          />
        );
      default:
        return <Input {...commonProps} />;
    }
  };

  return (
    <Form.Item
      label={<>
        {field.label}
        {field.required && <span style={{ color: '#ff4d4f', marginLeft: 4 }}>*</span>}
      </>}
      tooltip={field.description}
      help={field.validation?.message}
    >
      {renderField()}
    </Form.Item>
  );
};

export default FieldPreview;
