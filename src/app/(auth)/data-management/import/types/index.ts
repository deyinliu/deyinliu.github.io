export interface FieldConfig {
  field: string;
  basicProcessing?: string[];
  numericProcessing?: string[];
  categoricalProcessing?: string;
}

export interface ProcessedResult {
  data: Record<string, any>[];
  stats: Record<string, any>;
}

export interface PreprocessableColumn {
  title: string;
  dataIndex: string;
  type: 'numeric' | 'categorical';
  description: string;
}

export interface ProcessingStats {
  mean: number;
  std: number;
  min: number;
  max: number;
  count: number;
  skewness: number;
  kurtosis: number;
  isNormal: boolean;
  categories?: string[];
  mapping?: Record<string, number>;
}

export interface CorrelationResult {
  field1: string;
  field2: string;
  correlation: number;
}

export interface ChartData {
  [key: string]: number | string;
}
