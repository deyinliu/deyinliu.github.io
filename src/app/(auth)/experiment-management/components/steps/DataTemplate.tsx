"use client";
import { useState } from 'react';
import { Form, Radio, Button, Space, Card, Modal, Checkbox } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { DataTemplate } from '@/types/experiment';
import TemplateDesigner from '../template/TemplateDesigner';
import TemplateList from '../template/TemplateList';

const DataTemplateStep = () => {
  const [mode, setMode] = useState<'select' | 'create'>('select');
  const [showDesigner, setShowDesigner] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<DataTemplate | null>(null);

  const handleModeChange = (e: any) => {
    setMode(e.target.value);
  };

  const handleTemplateSelect = (template: DataTemplate) => {
    setSelectedTemplate(template);
  };

  const handleCreateTemplate = () => {
    setShowDesigner(true);
  };

  const handleDesignerClose = () => {
    setShowDesigner(false);
  };

  const handleTemplateCreated = (template: DataTemplate) => {
    setSelectedTemplate(template);
    setShowDesigner(false);
  };

  return (
    <div>
      <Form.Item label="选择数据模板方式">
        <Radio.Group value={mode} onChange={handleModeChange}>
          <Radio.Button value="select">选择已有模板</Radio.Button>
          <Radio.Button value="create">创建新模板</Radio.Button>
        </Radio.Group>
      </Form.Item>

      {mode === 'select' ? (
        <Card title="选择模板" extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateTemplate}
          >
            创建新模板
          </Button>
        }>
          <TemplateList
            onSelect={handleTemplateSelect}
            selectedTemplate={selectedTemplate}
          />
        </Card>
      ) : (
        <Card title="创建新模板">
          <TemplateDesigner onSave={handleTemplateCreated} />
        </Card>
      )}

      <Modal
        title="创建数据模板"
        open={showDesigner}
        onCancel={handleDesignerClose}
        width={800}
        footer={null}
      >
        <TemplateDesigner onSave={handleTemplateCreated} />
      </Modal>

      <Form.Item
        name="saveAsPublic"
        valuePropName="checked"
        style={{ marginTop: 16 }}
      >
        <Checkbox>保存为公共模板</Checkbox>
      </Form.Item>
    </div>
  );
};

export default DataTemplateStep;
