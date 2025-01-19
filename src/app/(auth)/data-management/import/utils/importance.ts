import { calculateCorrelation } from './correlation';

export interface FeatureImportance {
  variable: string;
  importance: number;
  metrics: {
    r2: number;
    correlation: number;
    fScore: number | null;
  };
  pValue: number | null;
}

export const calculateFeatureImportance = (
  data: any[],
  dependentVar: string,
  independentVar: string
): FeatureImportance => {
  try {
    // 1. 计算相关系数
    const correlation = calculateCorrelation(data, dependentVar, independentVar);

    // 2. 计算决定系数 R²
    const r2 = Math.pow(correlation, 2);

    // 3. 简单线性回归计算 F 统计量
    const { fScore, pValue } = calculateSimpleRegression(data, dependentVar, independentVar);

    // 4. 综合重要性得分 (加权平均)
    const importance = calculateCompositeScore({
      r2Score: r2,
      correlationScore: Math.abs(correlation),
      fScore: fScore
    });

    return {
      variable: independentVar,
      importance,
      metrics: {
        r2,
        correlation,
        fScore
      },
      pValue
    };
  } catch (error) {
    console.error(`Error calculating importance for ${independentVar}:`, error);
    return {
      variable: independentVar,
      importance: 0,
      metrics: {
        r2: 0,
        correlation: 0,
        fScore: null
      },
      pValue: null
    };
  }
};

function calculateSimpleRegression(
  data: any[],
  dependentVar: string,
  independentVar: string
) {
  const validPairs = data
    .map(d => ({
      x: Number(d[independentVar]),
      y: Number(d[dependentVar])
    }))
    .filter(pair => !isNaN(pair.x) && !isNaN(pair.y));

  if (validPairs.length < 3) {
    return { fScore: null, pValue: null };
  }

  // 计算均值
  // const xMean = validPairs.reduce((sum, pair) => sum + pair.x, 0) / validPairs.length;
  const yMean = validPairs.reduce((sum, pair) => sum + pair.y, 0) / validPairs.length;

  // 计算回归平方和和残差平方和
  let rss = 0; // 残差平方和
  let tss = 0; // 总平方和
  let regSS = 0; // 回归平方和

  validPairs.forEach(pair => {
    const yPred = pair.x * (calculateSlope(validPairs)) + calculateIntercept(validPairs);
    rss += Math.pow(pair.y - yPred, 2);
    tss += Math.pow(pair.y - yMean, 2);
  });

  regSS = tss - rss;

  // 计算F统计量
  const df1 = 1; // 回归自由度
  const df2 = validPairs.length - 2; // 残差自由度
  const fScore = (regSS / df1) / (rss / df2);

  // 计算p值（简化版本）
  const pValue = 1 - calculateApproximateFDistribution(fScore);

  return { fScore, pValue };
}

function calculateCompositeScore(scores: {
  r2Score: number;
  correlationScore: number;
  fScore: number | null;
}) {
  const weights = {
    r2: 0.4,
    correlation: 0.4,
    f: 0.2
  };

  let totalScore =
    scores.r2Score * weights.r2 +
    scores.correlationScore * weights.correlation;

  if (scores.fScore !== null) {
    // 将F统计量标准化到[0,1]区间
    const normalizedF = 1 / (1 + Math.exp(-scores.fScore / 100));
    totalScore += normalizedF * weights.f;
  } else {
    // 重新分配权重
    totalScore = (scores.r2Score * 0.5) + (scores.correlationScore * 0.5);
  }

  return Math.max(0, Math.min(1, totalScore));
}

// 辅助函数
function calculateSlope(pairs: Array<{ x: number, y: number }>) {
  const n = pairs.length;
  const sumX = pairs.reduce((sum, pair) => sum + pair.x, 0);
  const sumY = pairs.reduce((sum, pair) => sum + pair.y, 0);
  const sumXY = pairs.reduce((sum, pair) => sum + pair.x * pair.y, 0);
  const sumXX = pairs.reduce((sum, pair) => sum + pair.x * pair.x, 0);

  return (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
}

function calculateIntercept(pairs: Array<{ x: number, y: number }>) {
  const xMean = pairs.reduce((sum, pair) => sum + pair.x, 0) / pairs.length;
  const yMean = pairs.reduce((sum, pair) => sum + pair.y, 0) / pairs.length;

  return yMean - calculateSlope(pairs) * xMean;
}

function calculateApproximateFDistribution(F: number) {
  // 这是一个简化的F分布近似计算
  // 实际项目中建议使用专业的统计库
  return 1 / (1 + Math.exp(-(F - 4)));
}
