export interface RegressionResult {
  coefficients: number[];
  intercept: number;
  rSquared: number;
  adjustedRSquared: number;
  standardErrors: number[];
  tValues: number[];
  pValues: number[];
  fStatistic: number;
  fStatisticPValue: number;
  residuals: number[];
  durbinWatson: number;
  vif: number[];
  confidenceIntervals: Array<[number, number]>;
}

class MultipleRegression {
  private static calculateMean(arr: number[]): number {
    return arr.reduce((a, b) => a + b) / arr.length;
  }

  private static calculateVariance(arr: number[]): number {
    const mean = this.calculateMean(arr);
    return arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (arr.length - 1);
  }

  private static matrixMultiply(a: number[][], b: number[][]): number[][] {
    const result: number[][] = [];
    for (let i = 0; i < a.length; i++) {
      result[i] = [];
      for (let j = 0; j < b[0].length; j++) {
        let sum = 0;
        for (let k = 0; k < b.length; k++) {
          sum += a[i][k] * b[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result;
  }

  private static matrixInverse(matrix: number[][]): number[][] {
    const n = matrix.length;
    const identityMatrix = Array(n).fill(0).map((_, i) =>
      Array(n).fill(0).map((_, j) => i === j ? 1 : 0)
    );

    const augmentedMatrix = matrix.map((row, i) => [...row, ...identityMatrix[i]]);

    // Gaussian elimination
    for (let i = 0; i < n; i++) {
      let maxElement = Math.abs(augmentedMatrix[i][i]);
      let maxRow = i;

      for (let k = i + 1; k < n; k++) {
        if (Math.abs(augmentedMatrix[k][i]) > maxElement) {
          maxElement = Math.abs(augmentedMatrix[k][i]);
          maxRow = k;
        }
      }

      if (maxElement === 0) {
        throw new Error("Matrix is singular");
      }

      if (maxRow !== i) {
        [augmentedMatrix[i], augmentedMatrix[maxRow]] =
          [augmentedMatrix[maxRow], augmentedMatrix[i]];
      }

      for (let k = i + 1; k < n; k++) {
        const c = -augmentedMatrix[k][i] / augmentedMatrix[i][i];
        for (let j = i; j < 2 * n; j++) {
          if (i === j) {
            augmentedMatrix[k][j] = 0;
          } else {
            augmentedMatrix[k][j] += c * augmentedMatrix[i][j];
          }
        }
      }
    }

    // Back substitution
    for (let i = n - 1; i >= 0; i--) {
      for (let k = i - 1; k >= 0; k--) {
        const c = -augmentedMatrix[k][i] / augmentedMatrix[i][i];
        for (let j = 0; j < 2 * n; j++) {
          augmentedMatrix[k][j] += c * augmentedMatrix[i][j];
        }
      }
    }

    // Normalize rows
    for (let i = 0; i < n; i++) {
      const c = 1 / augmentedMatrix[i][i];
      for (let j = 0; j < 2 * n; j++) {
        augmentedMatrix[i][j] *= c;
      }
    }

    return augmentedMatrix.map(row => row.slice(n));
  }

  private static tDistribution(df: number, probability: number): number {
    // Approximation of t-distribution inverse (for p-value calculation)
    const x = df / (df + Math.pow(probability, 2));
    return Math.sqrt(df * (1 - x) / x);
  }

  static analyze(
    x: number[][],
    y: number[],
    xAxis: string[],
  ): RegressionResult {
    const n = x.length; // number of observations
    const p = x[0].length; // number of predictors

    // Add column of 1s for intercept
    const X = x.map(row => [1, ...row]);
    const y_matrix = y.map(val => [val]);

    // Calculate coefficients using (X'X)^(-1)X'y
    const Xt = X[0].map((_, i) => X.map(row => row[i]));
    const XtX = this.matrixMultiply(Xt, X);
    const XtX_inv = this.matrixInverse(XtX);
    const Xty = this.matrixMultiply(Xt, y_matrix);
    const coefficients_matrix = this.matrixMultiply(XtX_inv, Xty);

    // Extract coefficients
    const coefficients = coefficients_matrix.map(row => row[0]);
    const intercept = coefficients[0];
    const betas = coefficients.slice(1);

    // Calculate predicted values and residuals
    const predicted = X.map(row =>
      row.reduce((sum, val, i) => sum + val * coefficients[i], 0)
    );
    const residuals = y.map((val, i) => val - predicted[i]);

    // Calculate R-squared
    const yMean = this.calculateMean(y);
    const totalSS = y.reduce((sum, val) => sum + Math.pow(val - yMean, 2), 0);
    const residualSS = residuals.reduce((sum, val) => sum + Math.pow(val, 2), 0);
    const rSquared = 1 - (residualSS / totalSS);

    // Calculate adjusted R-squared
    const adjustedRSquared = 1 - ((1 - rSquared) * (n - 1) / (n - p - 1));

    // Calculate standard errors
    const mse = residualSS / (n - p - 1);
    const standardErrors = coefficients.map((_, i) =>
      Math.sqrt(mse * XtX_inv[i][i])
    );

    // Calculate t-values and p-values
    const tValues = coefficients.map((coef, i) => coef / standardErrors[i]);
    const pValues = tValues.map(t =>
      2 * (1 - this.tDistribution(n - p - 1, Math.abs(t)))
    );

    // Calculate F-statistic
    const regressionSS = totalSS - residualSS;
    const fStatistic = (regressionSS / p) / (residualSS / (n - p - 1));
    const fStatisticPValue = 1 - this.tDistribution(p, Math.sqrt(fStatistic));

    // Calculate Durbin-Watson statistic
    let dw = 0;
    for (let i = 1; i < residuals.length; i++) {
      dw += Math.pow(residuals[i] - residuals[i - 1], 2);
    }
    const durbinWatson = dw / residuals.reduce((sum, r) => sum + r * r, 0);

    // Calculate VIF (Variance Inflation Factor)
    const vif = x[0].map((_, colIndex) => {
      const others = x.map(row =>
        row.filter((_, i) => i !== colIndex)
      );
      const target = x.map(row => row[colIndex]);

      const r2 = this.analyze(others, target,
        xAxis.filter((_, i) => i !== colIndex),
      ).rSquared;

      return 1 / (1 - r2);
    });

    // Calculate confidence intervals (95%)
    const tValue95 = this.tDistribution(n - p - 1, 0.975);
    const confidenceIntervals = coefficients.map((coef, i) => [
      coef - tValue95 * standardErrors[i],
      coef + tValue95 * standardErrors[i]
    ]);

    return {
      coefficients: betas,
      intercept,
      rSquared,
      adjustedRSquared,
      standardErrors: standardErrors.slice(1),
      tValues: tValues.slice(1),
      pValues: pValues.slice(1),
      fStatistic,
      fStatisticPValue,
      residuals,
      durbinWatson,
      vif,
      confidenceIntervals: confidenceIntervals.slice(1).map(interval =>
        [interval[0], interval[1]] as [number, number]
      )
    };
  }
}

export default MultipleRegression;