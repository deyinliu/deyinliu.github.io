import { create } from 'zustand';
import type { FieldConfig } from '../types';

interface TransformState {
  variable: string;
  type: string;
  isModalVisible: boolean;
}

interface PreprocessStore {
  rawData: any[];
  selectedColumns: string[];
  fieldConfigs: Record<string, FieldConfig>;
  processedData: any[];
  dependentVariable: string | null;
  independentVariables: string[];
  featureImportance: Record<string, number>;
  correlationMatrix: Record<string, Record<string, number>>;
  transform: TransformState | null;
  currentStep: string;
  featureAnalysis: {
    dependentVariable: string | null;
    independentVariables: string[];
  };
  distribution: {
    dependentVariable: string | null;
    independentVariables: string[];
  };
  setRawData: (data: any[]) => void;
  setSelectedColumns: (columns: string[]) => void;
  updateFieldConfig: (field: string, configType: keyof FieldConfig, value: any) => void;
  setProcessedData: (data: any[]) => void;
  setDependentVariable: (variable: string | null) => void;
  setIndependentVariables: (variables: string[]) => void;
  setFeatureImportance: (importance: Record<string, number>) => void;
  setCorrelationMatrix: (matrix: Record<string, Record<string, number>>) => void;
  resetStore: () => void;
  initiateTransform: (variable: string, transformType: string) => void;
  cancelTransform: () => void;
  applyTransform: () => void;
  setCurrentStep: (step: string) => void;
  setFeatureAnalysisVariables: (dependent: string | null, independent: string[]) => void;
  setDistributionVariables: (dependent: string | null, independent: string[]) => void;
}

export const usePreprocessStore = create<PreprocessStore>((set, get) => ({
  rawData: [],
  selectedColumns: [],
  fieldConfigs: {},
  processedData: [],
  dependentVariable: null,
  independentVariables: [],
  featureImportance: {},
  correlationMatrix: {},
  transform: null,
  currentStep: 'DATA_SELECTION',
  featureAnalysis: {
    dependentVariable: null,
    independentVariables: []
  },
  distribution: {
    dependentVariable: null,
    independentVariables: []
  },

  setRawData: (data) => set({
    rawData: data,
    selectedColumns: [], // 重置选中的列
    fieldConfigs: {},   // 重置字段配置
    processedData: []   // 重置处理后的数据
  }),

  setSelectedColumns: (columns) => set({ selectedColumns: columns }),

  updateFieldConfig: (field, configType, value) =>
    set((state) => ({
      fieldConfigs: {
        ...state.fieldConfigs,
        [field]: {
          ...state.fieldConfigs[field],
          field,
          [configType]: value || undefined
        }
      }
    })),

  setProcessedData: (data) => set({ processedData: data }),
  setDependentVariable: (variable) => set({ dependentVariable: variable }),
  setIndependentVariables: (variables) => set({ independentVariables: variables }),
  setFeatureImportance: (importance) => set({ featureImportance: importance }),
  setCorrelationMatrix: (matrix) => set({ correlationMatrix: matrix }),

  resetStore: () => set({
    selectedColumns: [],
    fieldConfigs: {},
    processedData: [],
    dependentVariable: null,
    independentVariables: []
  }),

  initiateTransform: (variable: string, transformType: string) => {
    set({
      transform: {
        variable,
        type: transformType,
        isModalVisible: false
      },
      currentStep: 'PREPROCESSING' // 自动切换到预处理步骤
    });
  },

  cancelTransform: () => {
    set({ transform: null });
  },

  applyTransform: () => {
    const { transform, processedData, setProcessedData } = get();
    if (!transform || !processedData || !processedData.length) return;

    try {
      const newData = processedData.map(row => {
        if (!row || typeof row !== 'object') return row;
        const value = row[transform.variable];
        if (value === undefined || value === null) return row;

        return {
          ...row,
          [transform.variable]: transformValue(Number(value), transform.type)
        };
      });

      setProcessedData(newData);
      set({ transform: null });
    } catch (error) {
      console.error('Error applying transformation:', error);
    }
  },

  setCurrentStep: (step: string) => set({ currentStep: step }),

  setFeatureAnalysisVariables: (dependent, independent) =>
    set(state => ({
      featureAnalysis: {
        dependentVariable: dependent,
        independentVariables: independent
      },
      // 如果分布检验没有选择变量，使用特征分析的变量
      distribution: state.distribution.dependentVariable ?
        state.distribution :
        { dependentVariable: dependent, independentVariables: independent }
    })),

  setDistributionVariables: (dependent, independent) =>
    set(state => ({
      distribution: {
        dependentVariable: dependent,
        independentVariables: independent
      },
      // 如果特征分析没有选择变量，使用分布检验的变量
      featureAnalysis: state.featureAnalysis.dependentVariable ?
        state.featureAnalysis :
        { dependentVariable: dependent, independentVariables: independent }
    })),
}));

function transformValue(value: number, type: string): number {
  if (isNaN(value)) return value;

  try {
    switch (type) {
      case 'log':
        return Math.log(Math.max(value, 0.0001));
      case 'exp':
        return Math.exp(value);
      case 'square':
        return value * value;
      case 'sqrt':
        return Math.sqrt(Math.abs(value));
      case 'standardize':
        return value;
      case 'box-cox':
        // Box-Cox 转换
        const lambda = 0.5; // 固定 lambda 值，也可以通过优化算法找到最佳值
        if (value <= 0) {
          return Math.log(0.0001);
        }
        return (Math.pow(value, lambda) - 1) / lambda;
      default:
        return value;
    }
  } catch (error) {
    console.error('转换出错:', error, { value, type });
    return value;
  }
}
