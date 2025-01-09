import { RegressionResult } from "@/interface";

export function multipleRegression(x: number[][], y: number[]): RegressionResult {
  const n = x.length; // 样本数量
  const k = x[0].length; // 自变量数量

  // 添加截距列
  const X = x.map(row => [1, ...row]);
  const Y = y;

  // 计算 (X'X)^-1 X'Y
  const XT = transpose(X); // X 的转置
  const XTX = multiplyMatrices(XT, X); // X'X
  const XTY = multiplyMatrixVector(XT, Y); // X'Y
  const XTXInv = inverse(XTX); // (X'X)^-1
  const coefficients = multiplyMatrixVector(XTXInv, XTY); // 回归系数

  // 计算预测值
  const predictedY = X.map(row => dotProduct(row, coefficients));

  // 计算残差
  const residuals = Y.map((yi, i) => yi - predictedY[i]);

  // 计算 R²
  const ssTotal = Y.reduce((sum, yi) => sum + (yi - mean(Y)) ** 2, 0);
  const ssResidual = residuals.reduce((sum, ri) => sum + ri ** 2, 0);
  const rSquared = 1 - ssResidual / ssTotal;

  // 调整后的 R²
  const adjustedRSquared = 1 - (1 - rSquared) * ((n - 1) / (n - k - 1));

  // 计算标准误差
  const sigmaSquared = ssResidual / (n - k - 1);
  const standardErrors = XTXInv.map((row, i) => Math.sqrt(row[i] * sigmaSquared));

  // 计算 t 值
  const tValues = coefficients.map((coef, i) => coef / standardErrors[i]);

  // 计算 p 值
  const pValues = tValues.map(t => 2 * (1 - tDistributionCDF(Math.abs(t), n - k - 1)));

  // 计算 F 统计量
  const fStatistic = (rSquared / k) / ((1 - rSquared) / (n - k - 1));

  // 计算 Durbin-Watson 统计量
  const durbinWatson = residuals.reduce((sum, ri, i) => {
    if (i === 0) return sum;
    return sum + (ri - residuals[i - 1]) ** 2;
  }, 0) / ssResidual;

  // 计算方差膨胀因子 (VIF)
  const vif = x[0].map((_, i) => {
    const xi = x.map(row => row[i]);
    const rSquaredXi = multipleRegression(x.map(row => row.filter((_, j) => j !== i)), xi).rSquared;
    return 1 / (1 - rSquaredXi);
  });

  return {
    coefficients: coefficients.slice(1), // 去掉截距
    intercept: coefficients[0],
    rSquared,
    adjustedRSquared,
    standardErrors,
    tValues,
    pValues,
    fStatistic,
    residuals,
    durbinWatson,
    vif,
  };
}

// 辅助函数
function transpose(matrix: number[][]): number[][] {
  return matrix[0].map((_, i) => matrix.map(row => row[i]));
}

function multiplyMatrices(a: number[][], b: number[][]): number[][] {
  return a.map(row => b[0].map((_, j) => dotProduct(row, b.map(col => col[j]))));
}

function multiplyMatrixVector(matrix: number[][], vector: number[]): number[] {
  return matrix.map(row => dotProduct(row, vector));
}

function dotProduct(a: number[], b: number[]): number {
  return a.reduce((sum, ai, i) => sum + ai * b[i], 0);
}

function inverse(matrix: number[][]): number[][] {
  const n = matrix.length;
  const augmented = matrix.map((row, i) => [...row, ...(new Array(n).fill(0).map((_, j) => (i === j ? 1 : 0)))]);
  for (let i = 0; i < n; i++) {
    const pivot = augmented[i][i];
    for (let j = 0; j < 2 * n; j++) augmented[i][j] /= pivot;
    for (let k = 0; k < n; k++) {
      if (k !== i) {
        const factor = augmented[k][i];
        for (let j = 0; j < 2 * n; j++) augmented[k][j] -= factor * augmented[i][j];
      }
    }
  }
  return augmented.map(row => row.slice(n));
}

function mean(arr: number[]): number {
  return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}

function tDistributionCDF(t: number, df: number): number {
  // 近似计算 t 分布的 CDF
  const x = (t + Math.sqrt(t * t + df)) / (2 * Math.sqrt(t * t + df));
  return 0.5 * (1 + erf(x - 0.5));
}

function erf(x: number): number {
  // 近似计算误差函数
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const t = 1 / (1 + p * Math.abs(x));
  const y = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return Math.sign(x) * y;
}