export type RegressionResult = {
  coefficients: number[]; // 回归系数
  intercept: number;      // 截距
  rSquared: number;       // R²
  adjustedRSquared: number; // 调整后的 R²
  standardErrors: number[]; // 标准误差
  tValues: number[];      // t 值
  pValues: number[];      // p 值
  fStatistic: number;     // F 统计量
  residuals: number[];    // 残差
  durbinWatson: number;   // Durbin-Watson 统计量
  vif: number[];          // 方差膨胀因子 (VIF)
};

export type ChartData = {
  xAxis: string; // x 轴标签
  yAxis: number; // y 轴值
  error?: number; // 误差（用于置信区间）
};

export type RegressionChartData = {
  coefficients: ChartData[]; // 回归系数
  intercept: number; // 截距
  rSquared: number; // R²
  adjustedRSquared: number; // 调整后的 R²
  standardErrors: ChartData[]; // 标准误差
  tValues: ChartData[]; // t 值
  pValues: ChartData[]; // p 值
  fStatistic: number; // F 统计量
  residuals: ChartData[]; // 残差
  durbinWatson: number; // Durbin-Watson 统计量
  vif: ChartData[]; // 方差膨胀因子 (VIF)
  confidenceIntervals: ChartData[]; // 置信区间
  scatterMatrixData?: ScatterDataPoint[];
};

export type ScatterDataPoint = {
  [key: string]: number; // 动态字段，表示自变量和因变量
};