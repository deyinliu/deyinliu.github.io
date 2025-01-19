export const preprocessableColumns = [
  {
    title: '患者ID',
    dataIndex: 'patientId',
    type: 'categorical',
    description: '患者唯一标识'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    type: 'numeric',
    description: '连续数值变量(25-40岁)'
  },
  {
    title: '泵流量',
    dataIndex: 'pumpFlow',
    type: 'numeric',
    description: '连续数值变量(2.7-3.3ml/h)'
  },
  {
    title: '舒芬太尼剂量',
    dataIndex: 'sufentanil',
    type: 'numeric',
    description: '连续数值变量(65-75μg)'
  },
  {
    title: '氯比洛芬酯剂量',
    dataIndex: 'flurbiprofen',
    type: 'numeric',
    description: '固定剂量(250mg)'
  },
  {
    title: '喷他佐辛剂量',
    dataIndex: 'pentazocine',
    type: 'numeric',
    description: '固定剂量(90mg)'
  },
  {
    title: '昂丹司琼剂量',
    dataIndex: 'ondansetron',
    type: 'numeric',
    description: '固定剂量(24mg)'
  },
  {
    title: '右美托咪定剂量',
    dataIndex: 'dexmedetomidine',
    type: 'numeric',
    description: '连续数值变量(95-105μg)'
  },
  {
    title: 'VAS疼痛评分',
    dataIndex: 'vasScore',
    type: 'numeric',
    description: '有序分类变量(1-3分)'
  },
  {
    title: 'PONV分级',
    dataIndex: 'ponvGrade',
    type: 'numeric',
    description: '有序分类变量(0-1级)'
  },
  {
    title: 'Ramsay镇静评分',
    dataIndex: 'ramsayScore',
    type: 'numeric',
    description: '有序分类变量(2-3分)'
  },
  {
    title: '肌力评分',
    dataIndex: 'muscleStrength',
    type: 'numeric',
    description: '有序分类变量(0-1分)'
  }
];

export const PROCESSING_STEPS = {
  DATA_SELECTION: 'selection',
  PREPROCESSING: 'preprocessing',
  FEATURE_ANALYSIS: 'feature',
  DISTRIBUTION: 'distribution',
  PREVIEW: 'preview'
} as const;

export type ProcessingStep = typeof PROCESSING_STEPS[keyof typeof PROCESSING_STEPS];
