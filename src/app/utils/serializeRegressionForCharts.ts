import { ChartData, RegressionChartData, RegressionResult, ScatterDataPoint } from "@/interface";
export function serializeRegressionForCharts(
  xAxis: string[], // 自变量表头
  regressionResult: RegressionResult // 回归分析结果
): RegressionChartData {
  // 序列化回归系数
  const coefficientsData: ChartData[] = xAxis.map((label, index) => ({
    xAxis: label,
    yAxis: regressionResult.coefficients[index],
  }));

  // 序列化标准误差
  const standardErrorsData: ChartData[] = xAxis.map((label, index) => ({
    xAxis: label,
    yAxis: regressionResult.standardErrors[index],
  }));

  // 序列化 t 值
  const tValuesData: ChartData[] = xAxis.map((label, index) => ({
    xAxis: label,
    yAxis: regressionResult.tValues[index],
  }));

  // 序列化 p 值
  const pValuesData: ChartData[] = xAxis.map((label, index) => ({
    xAxis: label,
    yAxis: regressionResult.pValues[index],
  }));

  // 序列化残差
  const residualsData: ChartData[] = regressionResult.residuals.map((residual, index) => ({
    xAxis: `Sample ${index + 1}`,
    yAxis: residual,
  }));

  // 序列化方差膨胀因子 (VIF)
  const vifData: ChartData[] = xAxis.map((label, index) => ({
    xAxis: label,
    yAxis: regressionResult.vif[index],
  }));

  // 序列化置信区间
  const confidenceIntervalsData: ChartData[] = xAxis.map((label, index) => ({
    xAxis: label,
    yAxis: regressionResult.coefficients[index],
    error: 1.96 * regressionResult.standardErrors[index], // 95% 置信区间
  }));
  return {
    coefficients: coefficientsData,
    intercept: Number((regressionResult.intercept).toFixed(3)),
    rSquared: Number((regressionResult.rSquared).toFixed(3)),
    adjustedRSquared: Number((regressionResult.adjustedRSquared).toFixed(3)),
    standardErrors: standardErrorsData,
    tValues: tValuesData,
    pValues: pValuesData,
    fStatistic: Number((regressionResult.fStatistic).toFixed(3)),
    residuals: residualsData,
    durbinWatson: Number((regressionResult.durbinWatson).toFixed(3)),
    vif: vifData,
    confidenceIntervals: confidenceIntervalsData,
  };
}

export function generateScatterMatrixData(
  x: number[][], // 自变量，二维数组
  y: number[],   // 因变量，一维数组
  xAxis: string[], // 自变量表头
  yAxis: string // 因变量表头
): ScatterDataPoint[] {
  // 检查输入数据的合法性
  if (x.length !== y.length || x[0].length !== xAxis.length) {
    throw new Error("输入数据格式不匹配");
  }

  // 生成散点图矩阵数据
  const scatterData: ScatterDataPoint[] = x.map((row, index) => {
    const dataPoint: ScatterDataPoint = {};
    xAxis.forEach((feature, i) => {
      dataPoint[feature] = row[i]; // 添加自变量
    });
    dataPoint[yAxis] = y[index]; // 添加因变量
    return dataPoint;
  });

  return scatterData;
}