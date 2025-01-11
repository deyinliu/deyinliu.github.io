"use client";
import React from 'react';
import { Button, Upload, message, Space } from 'antd';
import { ImportOutlined, ExportOutlined } from '@ant-design/icons';
import type { DataTemplate } from '@/types/experiment';

interface TemplateImportExportProps {
  onImport: (template: DataTemplate) => void;
  template?: DataTemplate;
}

const TemplateImportExport: React.FC<TemplateImportExportProps> = ({
  onImport,
  template
}) => {
  const validateTemplate = (data: any): data is DataTemplate => {
    return (
      data &&
      typeof data === 'object' &&
      typeof data.name === 'string' &&
      Array.isArray(data.fields) &&
      data.fields.every((field: any) =>
        field.id &&
        field.label &&
        field.type &&
        typeof field.required === 'boolean'
      )
    );
  };

  const handleExport = () => {
    if (!template) {
      message.error('没有可导出的模板');
      return;
    }

    try {
      const dataStr = JSON.stringify(template, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `template_${template.name}_${new Date().getTime()}.json`;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      message.success('导出成功');
    } catch (error) {
      console.error('Export error:', error);
      message.error('导出失败');
    }
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);

        if (!validateTemplate(data)) {
          throw new Error('模板格式不正确');
        }

        onImport(data);
        message.success('导入成功');
      } catch (error) {
        console.error('Import error:', error);
        message.error('导入失败，请检查文件格式');
      }
    };
    reader.readAsText(file);
    return false; // 阻止自动上传
  };

  return (
    <Space>
      <Upload
        accept=".json"
        showUploadList={false}
        beforeUpload={handleImport}
      >
        <Button icon={<ImportOutlined />}>导入模板</Button>
      </Upload>
      <Button
        icon={<ExportOutlined />}
        onClick={handleExport}
        disabled={!template}
      >
        导出模板
      </Button>
    </Space>
  );
};

export default TemplateImportExport;
