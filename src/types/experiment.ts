export interface TemplateFieldOption {
  label: string;
  value: string | number;
}

export interface TemplateFieldValidation {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: string;
  message?: string;
}

export interface TemplateField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'radio' | 'checkbox' | 'date' | 'time' | 'textarea' | 'range';
  required: boolean;
  options?: TemplateFieldOption[];
  description?: string;
  validation?: TemplateFieldValidation;
  defaultValue?: any;
  placeholder?: string;
  width?: number | string;
  layout?: 'horizontal' | 'vertical'; // 用于单选、多选项的布局
}

export interface DataTemplate {
  id: string;
  name: string;
  sourceFrom?: 'select' | 'create';
  description?: string;
  isPublic: boolean;
  createdBy: string;
  createdAt: string;
  fields: TemplateField[];
}

export interface ExperimentData {
  experimentTitle: string;
  experimentObjective: string;
  experimentContent: string;
  experimentPeriod: [string, string];
  keyOutput: string;
  keyMilestones: string;
  dataTemplate: DataTemplate;
}
