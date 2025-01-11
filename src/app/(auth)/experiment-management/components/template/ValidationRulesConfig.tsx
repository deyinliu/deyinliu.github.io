"use client";
import React from 'react';
import { Form, Input, InputNumber } from 'antd';
import type { TemplateField } from '@/types/experiment';

interface ValidationRulesConfigProps {
  fieldType: TemplateField['type'];
}

const ValidationRulesConfig: React.FC<ValidationRulesConfigProps> = ({ fieldType }) => {
  const renderTypeSpecificRules = () => {
    switch (fieldType) {
      case 'number':
      case 'range':
        return (
          <>
            <Form.Item label="最小值" name={['validation', 'min']}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="最大值" name={['validation', 'max']}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="小数位数" name={['validation', 'precision']}>
              <InputNumber min={0} max={10} style={{ width: '100%' }} />
            </Form.Item>
          </>
        );
      case 'text':
      case 'textarea':
        return (
          <>
            <Form.Item label="最小长度" name={['validation', 'minLength']}>
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="最大长度" name={['validation', 'maxLength']}>
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label="正则表达式"
              name={['validation', 'pattern']}
              tooltip="用于验证输入内容的格式，例如：^[0-9]*$ 表示只允许输入数字"
            >
              <Input placeholder="请输入正则表达式" />
            </Form.Item>
          </>
        );
    }
  };

  return (
    <div>
      <Form.Item
        label="验证提示"
        name={['validation', 'message']}
        tooltip="当验证失败时显示的错误信息"
      >
        <Input placeholder="请输入验证失败时的提示信息" />
      </Form.Item>

      {renderTypeSpecificRules()}
    </div>
  );
};

export default ValidationRulesConfig;
