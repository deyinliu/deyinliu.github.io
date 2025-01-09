import { RegressionResult } from './multiRegression';
import { RegressionDisplayData } from '../../types/regressionTypes';

export const formatNumber = (num: number): string => {
  return Number(num.toFixed(4)).toString();
};

export const formatCI = (ci: [number, number]): [string, string] => {
  return [formatNumber(ci[0]), formatNumber(ci[1])];
};

export function transformRegressionResults(
  result: RegressionResult,
  xAxis: string[],
  yAxis: string,
  x: number[][],
  y: number[]
): RegressionDisplayData {
  const r = Math.sqrt(result.rSquared);
  const n = y.length;
  const p = xAxis.length;

  const yMean = y.reduce((a, b) => a + b) / n;
  const totalSS = y.reduce((sum, val) => sum + Math.pow(val - yMean, 2), 0);
  const residualSS = result.residuals.reduce((sum, val) => sum + Math.pow(val, 2), 0);
  const regressionSS = totalSS - residualSS;
  const variableScatterData = xAxis.map((variable, varIndex) => {
    const data = x.map((row, index) => ({
      variableName: variable,
      xValue: Number(row[varIndex].toFixed(4)),
      yValue: Number(y[index].toFixed(4)),
      index
    }));
    console.log(`Transformed data for ${variable}:`, data); // Debug log
    return { variable, data };
  });
  const anovaTable = {
    rows: [
      {
        key: 'regression',
        source: '回归 Regression',
        ss: formatNumber(regressionSS),
        df: p,
        ms: formatNumber(regressionSS / p),
        f: formatNumber(result.fStatistic),
        sig: formatNumber(result.fStatisticPValue)
      },
      {
        key: 'residual',
        source: '残差 Residual',
        ss: formatNumber(residualSS),
        df: n - p - 1,
        ms: formatNumber(residualSS / (n - p - 1))
      },
      {
        key: 'total',
        source: '总计 Total',
        ss: formatNumber(totalSS),
        df: n - 1,
        ms: '-'
      }
    ]
  };
  const coefficients = xAxis.map((variable, i) => ({
    variable,
    unstandardizedB: formatNumber(result.coefficients[i]),
    stdError: formatNumber(result.standardErrors[i]),
    standardizedBeta: formatNumber(result.coefficients[i] * Math.sqrt(result.vif[i])),
    tValue: formatNumber(result.tValues[i]),
    sigValue: formatNumber(result.pValues[i]),
    confidenceIntervalLower: formatNumber(result.confidenceIntervals[i][0]),
    confidenceIntervalUpper: formatNumber(result.confidenceIntervals[i][1])
  }));
  return {
    modelSummary: {
      r: formatNumber(r),
      rSquared: formatNumber(result.rSquared),
      adjustedRSquared: formatNumber(result.adjustedRSquared),
      stdError: formatNumber(Math.sqrt(residualSS / (n - p - 1)))
    },
    anovaTable,
    coefficients,
    residualStats: {
      predictedValues: y.map((actual, i) => actual - result.residuals[i]),
      predictedValuesFormatted: y.map((actual, i) =>
        formatNumber(actual - result.residuals[i])),
      residuals: result.residuals,
      residualsFormatted: result.residuals.map(r => formatNumber(r)),
      standardizedResiduals: result.residuals.map(r =>
        r / Math.sqrt(residualSS / (n - p - 1))),
      standardizedResidualsFormatted: result.residuals.map(r =>
        formatNumber(r / Math.sqrt(residualSS / (n - p - 1)))),
      actual: y,
      variableScatterData
    },
    yAxisName: yAxis
  };
}