export interface DistributionStats {
  mean: number;
  median: number;
  std: number;
  skewness: number;
  kurtosis: number;
  isNormal: boolean;
  transformSuggestion: string | null;
}

export const calculateDistributionStats = (values: number[]): DistributionStats => {
  const n = values.length;
  if (n < 3) {
    return {
      mean: NaN,
      median: NaN,
      std: NaN,
      skewness: NaN,
      kurtosis: NaN,
      isNormal: false,
      transformSuggestion: null
    };
  }

  // 计算基本统计量
  const mean = values.reduce((a, b) => a + b) / n;
  const sortedValues = [...values].sort((a, b) => a - b);
  const median = n % 2 === 0
    ? (sortedValues[n / 2 - 1] + sortedValues[n / 2]) / 2
    : sortedValues[Math.floor(n / 2)];

  // 计算标准差
  const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (n - 1);
  const std = Math.sqrt(variance);

  // 计算偏度
  const skewness = values.reduce((acc, val) =>
    acc + Math.pow((val - mean) / std, 3), 0) / n;

  // 计算峰度
  const kurtosis = values.reduce((acc, val) =>
    acc + Math.pow((val - mean) / std, 4), 0) / n - 3;

  // 判断是否近似正态分布
  const isNormal = Math.abs(skewness) < 0.5 && Math.abs(kurtosis) < 0.5;

  // 给出转换建议
  let transformSuggestion = null;
  if (!isNormal) {
    if (skewness > 1) {
      transformSuggestion = "数据右偏，建议考虑对数转换 (log transformation)";
    } else if (skewness < -1) {
      transformSuggestion = "数据左偏，建议考虑指数转换 (exponential transformation)";
    } else if (kurtosis > 1) {
      transformSuggestion = "数据分布较尖峰，建议考虑 Box-Cox 转换";
    } else if (kurtosis < -1) {
      transformSuggestion = "数据分布较平坦，建议考虑平方转换";
    }
  }

  return {
    mean,
    median,
    std,
    skewness,
    kurtosis,
    isNormal,
    transformSuggestion
  };
};

// 执行Shapiro-Wilk检验的简化版本
export const shapiroWilkTest = (values: number[]): boolean => {
  // 这里是简化版本，实际应用中建议使用专业的统计库
  const stats = calculateDistributionStats(values);
  return stats.isNormal;
};
