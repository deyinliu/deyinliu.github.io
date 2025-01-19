export const correlationTypes = {
  PEARSON: 'pearson',
  SPEARMAN: 'spearman',
  KENDALL: 'kendall'
} as const;

export type CorrelationType = keyof typeof correlationTypes;

export const calculateCorrelation = (
  data: any[],
  var1: string,
  var2: string,
  type: CorrelationType = 'PEARSON'
): number => {
  const values1 = data.map(d => parseFloat(d[var1])).filter(v => !isNaN(v));
  const values2 = data.map(d => parseFloat(d[var2])).filter(v => !isNaN(v));

  if (values1.length < 2 || values2.length < 2) {
    return 0;
  }

  try {
    switch (type) {
      case 'PEARSON':
        return calculatePearsonCorrelation(values1, values2);
      case 'SPEARMAN':
        return calculateSpearmanCorrelation(values1, values2);
      case 'KENDALL':
        return calculateKendallCorrelation(values1, values2);
      default:
        return calculatePearsonCorrelation(values1, values2);
    }
  } catch (error) {
    console.error(`Error calculating ${type} correlation:`, error);
    return 0;
  }
};

function calculatePearsonCorrelation(values1: number[], values2: number[]): number {
  const mean1 = values1.reduce((a, b) => a + b) / values1.length;
  const mean2 = values2.reduce((a, b) => a + b) / values2.length;

  const numerator = values1.reduce((sum, v1, i) =>
    sum + (v1 - mean1) * (values2[i] - mean2), 0);

  const denom1 = Math.sqrt(values1.reduce((sum, v) =>
    sum + Math.pow(v - mean1, 2), 0));
  const denom2 = Math.sqrt(values2.reduce((sum, v) =>
    sum + Math.pow(v - mean2, 2), 0));

  return numerator / (denom1 * denom2);
}

// 斯皮尔曼等级相关系数
function calculateSpearmanCorrelation(values1: number[], values2: number[]): number {
  const n = values1.length;
  const ranks1 = getRanks(values1);
  const ranks2 = getRanks(values2);

  const differences = ranks1.map((r1, i) => r1 - ranks2[i]);
  const squaredDifferences = differences.map(d => d * d);
  const sumSquaredDiff = squaredDifferences.reduce((a, b) => a + b, 0);

  return 1 - (6 * sumSquaredDiff) / (n * (n * n - 1));
}

function calculateKendallCorrelation(values1: number[], values2: number[]): number {
  const n = values1.length;
  let concordant = 0;
  let discordant = 0;

  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      const sign1 = Math.sign(values1[j] - values1[i]);
      const sign2 = Math.sign(values2[j] - values2[i]);

      if (sign1 === 0 || sign2 === 0) continue;

      if (sign1 === sign2) {
        concordant++;
      } else {
        discordant++;
      }
    }
  }

  const totalPairs = (n * (n - 1)) / 2;
  if (totalPairs === 0) return 0;

  return (concordant - discordant) / totalPairs;
}

function getRanks(values: number[]): number[] {
  return values
    .map((v, i) => ({ value: v, index: i }))
    .sort((a, b) => a.value - b.value)
    .map((obj, i) => ({ ...obj, rank: i + 1 }))
    .sort((a, b) => a.index - b.index)
    .map(obj => obj.rank);
}

// 其他相关性计算方法可以根据需要添加...
