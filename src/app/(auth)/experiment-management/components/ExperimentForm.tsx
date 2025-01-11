"use client";
import { useState } from 'react';
import { Card, Steps, Button, message } from 'antd';
import { ExperimentOutlined } from '@ant-design/icons';
import BasicInfo from './steps/BasicInfo';
import DataTemplate from './steps/DataTemplate';
import Preview from './steps/Preview';
import { useExperimentFormStore } from '@/stores/experimentFormStore';

const steps = [
  { title: '基本信息', icon: <ExperimentOutlined /> },
  { title: '数据模板', icon: <ExperimentOutlined /> },
  { title: '预览确认', icon: <ExperimentOutlined /> },
];

const ExperimentForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { basicInfo, dataTemplate } = useExperimentFormStore();

  const next = () => {
    if (currentStep === 0 && !basicInfo.experimentTitle) {
      message.error('请完成基本信息填写');
      return;
    }
    if (currentStep === 1 && !dataTemplate) {
      message.error('请选择或创建数据模板');
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const onFinish = async () => {
    try {
      const finalData = {
        ...basicInfo,
        dataTemplate,
      };
      console.log('Success:', finalData);
      message.success('创建成功');
    } catch {
      message.error('提交失败');
    }
  };

  const steps_content = [
    <BasicInfo key="basic" />,
    <DataTemplate key="template" />,
    <Preview key="preview" />,
  ];

  return (
    <Card title="创建实验">
      <Steps current={currentStep} items={steps} style={{ marginBottom: 24 }} />
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ minHeight: 400 }}>
          {steps_content[currentStep]}
        </div>
        <div style={{ marginTop: 24 }}>
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
        </div>
      </div>
    </Card>
  );
};

export default ExperimentForm;
