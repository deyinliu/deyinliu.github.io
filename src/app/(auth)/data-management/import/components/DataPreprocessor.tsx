import { Card, Select, Space, Button, SelectProps } from 'antd';
import { ProcessingUtils } from '../utils/processing';
import { usePreprocessStore } from '../store/usePreprocessStore';
import { preprocessableColumns } from '../constants';
import { RightCircleOutlined } from '@ant-design/icons';
import type { FieldConfig } from '../types';
import { forwardRef, useImperativeHandle, useEffect } from 'react';

interface ProcessingOption {
  label: string;
  value: string;
}

const basicOptions: ProcessingOption[] = [
  { label: '删除缺失值', value: 'removeMissing' },
  { label: '删除重复值', value: 'removeDuplicates' },
  { label: '处理异常值', value: 'handleOutliers' }
];

const numericOptions: ProcessingOption[] = [
  { label: 'Z-score标准化', value: 'zscore' },
  { label: 'Min-Max归一化', value: 'minmax' },
  { label: '对数转换', value: 'log' }
];

const categoricalOptions: ProcessingOption[] = [
  { label: '独热编码(One-Hot)', value: 'oneHot' },
  { label: '标签编码(Label)', value: 'label' },
  { label: '效应编码(Effect)', value: 'effect' }
];

interface DataPreprocessorProps {
  onNext?: () => void;  // 添加切换到下一步的回调
}

export interface DataPreprocessorRef {
  initiateTransform: (variable: string, transformType: string) => void;
}

export const DataPreprocessor = forwardRef<DataPreprocessorRef, DataPreprocessorProps>(
  ({ onNext }, ref) => {
    const {
      selectedColumns,
      transform,
      fieldConfigs,
      rawData,
      updateFieldConfig,
      setProcessedData } = usePreprocessStore();

    // 替换 setActiveTab，改用 setCurrentStep
    useImperativeHandle(ref, () => ({
      initiateTransform: (variable: string, transformType: string) => {
        if (variable && transformType) {
          handleConfigChange(variable, 'numericProcessing', [transformType]);
        }
      }
    }));

    // 移除不需要的状态
    useEffect(() => {
      if (transform) {
        // 自动选择相应的处理方法
        handleConfigChange(transform.variable, 'numericProcessing', [transform.type]);
      }
    }, [transform]);

    const handleConfigChange = (field: string, configType: keyof FieldConfig, value: any) => {
      updateFieldConfig(field, configType, value);
      // 实时处理数据
      const newConfigs = {
        ...fieldConfigs,
        [field]: { ...fieldConfigs[field], [configType]: value }
      };
      const result = ProcessingUtils.processData(rawData, newConfigs);
      setProcessedData(result.data);
    };

    const selectProps: Partial<SelectProps> = {
      style: { width: '100%' }
    };

    return (
      <Space direction="vertical" style={{ width: '100%' }}>
        {selectedColumns.map(field => {
          const column = preprocessableColumns.find(c => c.dataIndex === field);
          const isNumeric = column?.type === 'numeric';
          const isCategorical = column?.type === 'categorical';

          return (
            <Card
              key={field}
              title={column?.title}
              size="small"
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  {...selectProps}
                  mode="multiple"
                  placeholder="基础处理"
                  options={basicOptions}
                  value={fieldConfigs[field]?.basicProcessing}
                  onChange={(value) => handleConfigChange(field, 'basicProcessing', value)}
                />

                {isNumeric && (
                  <Select
                    {...selectProps}
                    mode="multiple"
                    placeholder="数值处理"
                    options={numericOptions}
                    value={fieldConfigs[field]?.numericProcessing}
                    onChange={(value) => handleConfigChange(field, 'numericProcessing', value)}
                  />
                )}

                {isCategorical && (
                  <Select
                    {...selectProps}
                    placeholder="分类处理"
                    options={categoricalOptions}
                    value={fieldConfigs[field]?.categoricalProcessing}
                    onChange={(value) => handleConfigChange(field, 'categoricalProcessing', value)}
                  />
                )}
              </Space>
            </Card>
          );
        })}
        {selectedColumns.length > 0 && (
          <Button
            type="primary"
            icon={<RightCircleOutlined />}
            onClick={onNext}
            style={{ marginTop: 16 }}
          >
            开始特征分析
          </Button>
        )}
      </Space>
    );
  }
);
DataPreprocessor.displayName = 'DataPreprocessor';