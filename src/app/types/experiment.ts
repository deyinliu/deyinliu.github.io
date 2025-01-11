export type QuestionType = 'text' | 'number' | 'radio' | 'checkbox' | 'rate' | 'date';

export interface QuestionOption {
  value: string;
  label: string;
}

export interface DataField {
  key: string;
  title: string;
  type: QuestionType;
  required: boolean;
  unit?: string;
  options?: QuestionOption[];
  description?: string;
  min?: number;     // 用于数值和评分题
  max?: number;     // 用于数值和评分题
  step?: number;    // 用于数值题
  defaultValue?: any;
}

export interface ExperimentTemplate {
  id: string;
  name: string;
  description?: string;
  fields: DataField[];
}

export interface Experiment {
  id: string;
  name: string;
  type: string;
  owner: string;
  period: string;
  sampleSize: number;
  progress: string;
  status: string;
  objective: string;
  process: string;
  expectedResults: string;
  keyPoints: string[];
  dataTemplate: ExperimentTemplate;
  createTime: string;
  updateTime: string;
}
