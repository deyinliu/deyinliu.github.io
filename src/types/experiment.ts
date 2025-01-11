export interface TemplateField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'radio' | 'checkbox' | 'date';
  required: boolean;
  options?: { label: string; value: string | number }[];
  description?: string;
}

export interface DataTemplate {
  id: string;
  name: string;
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
