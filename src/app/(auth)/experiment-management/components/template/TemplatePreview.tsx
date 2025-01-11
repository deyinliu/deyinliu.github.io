"use client";
import React from 'react';
import { Form, Card } from 'antd';
import type { DataTemplate } from '@/types/experiment';
import FieldPreview from './FieldPreview';

interface TemplatePreviewProps {
  template: Partial<DataTemplate>;
  showCard?: boolean;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ template, showCard = true }) => {
  const content = (
    <Form layout="vertical">
      {template.fields?.map((field) => (
        <FieldPreview key={field.id} field={field} />
      ))}
    </Form>
  );

  if (!showCard) return content;

  return (
    <Card
      title={template.name}
      extra={template.fields?.length ? `${template.fields.length}个字段` : undefined}
    >
      {content}
    </Card>
  );
};

export default TemplatePreview;
