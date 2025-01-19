"use client";
import { Card, Space, Select, DatePicker, Button, Tabs, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useState, useRef } from 'react';
import { useRouteNavigate } from '@/app/hooks/useRouteNavigate';
import medicalData from '@/mock/medical-data.json';
import { PROCESSING_STEPS, ProcessingStep } from './constants';
import { usePreprocessStore } from './store/usePreprocessStore';
import { DataSelector, DataPreprocessor, FeatureAnalyzer, DistributionAnalyzer, ResultPreview } from './components';

const DataImportPage = () => {
  const { navigate } = useRouteNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [activeStep, setActiveStep] = useState<ProcessingStep>(PROCESSING_STEPS.DATA_SELECTION);

  // 使用统一的状态管理
  const {
    setRawData,
    selectedColumns,
    processedData,
    rawData
  } = usePreprocessStore();

  const departments = [
    { value: 'anesthesiology', label: '麻醉科' },
    { value: 'surgery', label: '外科' },
    { value: 'internal', label: '内科' },
  ];

  const handleFetchData = () => {
    if (!selectedDepartment || !dateRange) {
      message.error('请选择科室和时间范围');
      return;
    }

    const [startDate, endDate] = dateRange;
    setLoading(true);
    // 使用mock数据
    setTimeout(() => {
      setRawData(medicalData.data);
      setLoading(false);
      message.success(`成功获取 ${startDate.format('YYYY-MM-DD')} 至 ${endDate.format('YYYY-MM-DD')} 的数据`);
    }, 500);
  };

  const handleNextStep = () => {
    const nextStepMap = {
      [PROCESSING_STEPS.DATA_SELECTION]: PROCESSING_STEPS.PREPROCESSING,
      [PROCESSING_STEPS.PREPROCESSING]: PROCESSING_STEPS.FEATURE_ANALYSIS,
      [PROCESSING_STEPS.FEATURE_ANALYSIS]: PROCESSING_STEPS.DISTRIBUTION,
      [PROCESSING_STEPS.DISTRIBUTION]: PROCESSING_STEPS.PREVIEW,
    };
    setActiveStep(nextStepMap[activeStep] || activeStep);
  };

  const handleTransformRequest = (variable: string, recommendedTransform: string) => {
    // 切换到数据预处理 tab
    setActiveStep(PROCESSING_STEPS.PREPROCESSING);
    // 触发数据预处理组件的转换操作
    if (preprocessorRef.current) {
      preprocessorRef.current.initiateTransform(variable, recommendedTransform);
    }
  };

  const preprocessorRef = useRef(null);

  const items = [
    {
      key: PROCESSING_STEPS.DATA_SELECTION,
      label: '选择数据列',
      children: <DataSelector onNext={handleNextStep} />,
      disabled: !rawData.length
    },
    {
      key: PROCESSING_STEPS.PREPROCESSING,
      label: '数据预处理',
      children: (
        <DataPreprocessor onNext={handleNextStep} />
      ),
      disabled: !selectedColumns.length
    },
    {
      key: PROCESSING_STEPS.FEATURE_ANALYSIS,
      label: '特征分析',
      children: (
        <FeatureAnalyzer onNext={handleNextStep} />
      ),
      disabled: !processedData.length
    },
    {
      key: PROCESSING_STEPS.DISTRIBUTION,
      label: '分布检验',
      children: (
        <DistributionAnalyzer
          onTransformRequest={handleTransformRequest}
        />
      ),
      disabled: !processedData.length
    },
    {
      key: PROCESSING_STEPS.PREVIEW,
      label: '预览结果',
      children: (
        <ResultPreview />
      ),
      disabled: !processedData.length
    }
  ];

  return (
    <Card
      title={
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            type="link"
            onClick={() => navigate('/data-management/')}
          />
          <span>数据接入</span>
        </Space>
      }
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Space size="large">
          <Select
            placeholder="选择科室"
            style={{ width: 200 }}
            options={departments}
            onChange={value => setSelectedDepartment(value)}
          />
          <DatePicker.RangePicker
            style={{ width: 300 }}
            onChange={dates => setDateRange(dates)}
            placeholder={['开始日期', '结束日期']}
          />
          <Button type="primary" onClick={handleFetchData} loading={loading}>
            获取数据
          </Button>
        </Space>

        {rawData.length > 0 && (
          <Tabs
            activeKey={activeStep}
            items={items}
            onChange={(key) => setActiveStep(key as ProcessingStep)}
          />
        )}
      </Space>
    </Card>
  );
};

export default DataImportPage;