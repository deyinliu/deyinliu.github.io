
export interface RegressionDisplayData {
  modelSummary: ModelSummary;
  anovaTable: AnovaTable;
  coefficients: CoefficientRow[];
  residualStats: ResidualStatistics;
  yAxisName: string;  // Add this line
}
export interface ModelSummary {
  r: string;
  rSquared: string;
  adjustedRSquared: string;
  stdError: string;
}

export interface CoefficientRow {
  variable: string;
  unstandardizedB: string;
  stdError: string;
  standardizedBeta: string;
  tValue: string;
  sigValue: string;
  confidenceIntervalLower: string;  // Changed from array to separate fields
  confidenceIntervalUpper: string;
}

export interface ScatterPlotData {
  variableName: string;
  xValue: number;
  yValue: number;
  index: number;
}

export interface VariableScatterData {
  variable: string;
  data: ScatterPlotData[];
}

export interface ResidualStatistics {
  predictedValues: number[];
  predictedValuesFormatted: string[];
  residuals: number[];
  residualsFormatted: string[];
  standardizedResiduals: number[];
  standardizedResidualsFormatted: string[];
  actual: number[];
  variableScatterData: VariableScatterData[];
}
interface AnovaRow {
  key: string;
  source: string;
  ss: string;
  df: number;
  ms: string;
  f?: string;
  sig?: string;
}

export interface AnovaTable {
  rows: AnovaRow[];
}