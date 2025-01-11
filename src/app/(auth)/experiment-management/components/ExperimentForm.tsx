"use client";
import { useState } from 'react';
import { Card, Steps, Form, Button, message } from 'antd';
import { ExperimentOutlined } from '@ant-design/icons';
import BasicInfo from './steps/BasicInfo';
import DataTemplate from './steps/DataTemplate';
import Preview from './steps/Preview';
import { ExperimentData } from '@/types/experiment';

const steps = [
  { title: '基本信息', icon: <ExperimentOutlined /> },
  { title: '数据模板', icon: <ExperimentOutlined /> },
  { title: '预览确认', icon: <ExperimentOutlined /> },
];

const ExperimentForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [experimentData, setExperimentData] = useState<ExperimentData>();

  const next = async () => {
    try {
      const values = await form.validateFields();
      setExperimentData((prev) => ({ ...prev, ...values }));
      setCurrentStep(currentStep + 1);
    } catch (error) {
      message.error('请填写完整信息');
    }
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      const finalData = { ...experimentData, ...values };
      console.log('Success:', finalData);
      message.success('创建成功');
    } catch (error) {
      message.error('提交失败');
    }
  };

  const steps_content = [
    <BasicInfo key="basic" />,
    <DataTemplate key="template" />,
    <Preview key="preview" data={experimentData} />,
  ];

  return (
    <Card title="创建实验">
      <Steps current={currentStep} items={steps} style={{ marginBottom: 24 }} />
      <Form
        form={form}
        layout="vertical"
        style={{ maxWidth: 800, margin: '0 auto' }}
      >
        {steps_content[currentStep]}
        <Form.Item style={{ marginTop: 24 }}>
          {currentStep > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={prev}>
              上一步
            </Button>
          )}
          {currentStep < steps.length - 1 && (
            <Button type="primary" onClick={next}>
              下一步
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button type="primary" onClick={onFinish}>
              提交
            </Button>
          )}
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ExperimentForm;
