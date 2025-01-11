"use client";
import React from 'react';
import { Form, Select, Input, Button, Space, Card } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import type { TemplateField } from '@/types/experiment';

interface LogicRulesConfigProps {
  fields: TemplateField[];
  currentFieldId: string;
}

const LogicRulesConfig: React.FC<LogicRulesConfigProps> = ({
  fields,
  currentFieldId
}) => {
  const availableFields = fields.filter(field => field.id !== currentFieldId);

  const getConditionOptions = (fieldType: TemplateField['type']) => {
    const commonOptions = [
      { label: '等于', value: 'equals' },
      { label: '不等于', value: 'notEquals' },
    ];

    switch (fieldType) {
      case 'number':
        return [
          ...commonOptions,
          { label: '大于', value: 'greaterThan' },
          { label: '大于等于', value: 'greaterThanOrEqual' },
          { label: '小于', value: 'lessThan' },
          { label: '小于等于', value: 'lessThanOrEqual' },
        ];
      case 'text':
      case 'textarea':
        return [
          ...commonOptions,
          { label: '包含', value: 'contains' },
          { label: '不包含', value: 'notContains' },
          { label: '开始于', value: 'startsWith' },
          { label: '结束于', value: 'endsWith' },
        ];
      default:
        return commonOptions;
    }
  };

  return (
    <div>
      <Form.List name="logicRules">
        {(rules, { add, remove }) => (
          <>
            {rules.map((rule, index) => (
              <Card
                key={rule.key}
                size="small"
                style={{ marginBottom: 16 }}
                title={`规则 ${index + 1}`}
                extra={
                  <Button
                    type="text"
                    danger
                    icon={<MinusCircleOutlined />}
                    onClick={() => remove(rule.name)}
                  >
                    删除
                  </Button>
                }
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Form.Item
                    {...rule}
                    label="依赖字段"
                    name={[rule.name, 'dependentField']}
                    rules={[{ required: true, message: '请选择依赖字段' }]}
                  >
                    <Select
                      options={availableFields.map(f => ({
                        label: f.label,
                        value: f.id
                      }))}
                    />
                  </Form.Item>

                  <Form.Item
                    {...rule}
                    label="条件"
                    name={[rule.name, 'condition']}
                    rules={[{ required: true, message: '请选择条件' }]}
                  >
                    <Select options={getConditionOptions('text')} />
                  </Form.Item>

                  <Form.Item
                    {...rule}
                    label="值"
                    name={[rule.name, 'value']}
                    rules={[{ required: true, message: '请输入值' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    {...rule}
                    label="行为"
                    name={[rule.name, 'action']}
                    rules={[{ required: true, message: '请选择行为' }]}
                  >
                    <Select
                      options={[
                        { label: '显示', value: 'show' },
                        { label: '隐藏', value: 'hide' },
                        { label: '启用', value: 'enable' },
                        { label: '禁用', value: 'disable' },
                      ]}
                    />
                  </Form.Item>
                </Space>
              </Card>
            ))}

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                添加逻辑规则
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};

export default LogicRulesConfig;
