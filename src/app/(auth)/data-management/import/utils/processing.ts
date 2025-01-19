import { preprocessableColumns } from '../constants';
import type { ProcessingStats, FieldConfig, ProcessedResult } from '../types';

interface ProcessingResult {
  transform: (value: number) => number;
  stats: Record<string, number>;
  description: string;
}

export class ProcessingUtils {
  static zscore(values: number[]): ProcessingResult {
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const std = Math.sqrt(values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length) || 1;
    return {
      transform: (value: number) => Number(((value - mean) / std).toFixed(3)),
      stats: { mean, std },
      description: `Z-score标准化 (μ=${mean.toFixed(2)}, σ=${std.toFixed(2)})`
    };
  }

  static minmax(values: number[]): ProcessingResult {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    return {
      transform: (value: number) => Number(((value - min) / range).toFixed(3)),
      stats: { min, max, range },
      description: `Min-Max归一化 (min=${min}, max=${max})`
    };
  }

  static log(): ProcessingResult {
    return {
      transform: (value: number) => Number(Math.log(Math.max(value, 0) + 1).toFixed(3)),
      stats: {},
      description: '对数转换 (log(x + 1))'
    };
  }

  static processData(data: any[], configs: Record<string, FieldConfig>): ProcessedResult {
    // 深拷贝原始数据
    let processed = JSON.parse(JSON.stringify(data));
    const processingStats: Record<string, any> = {};

    Object.entries(configs).forEach(([field, config]) => {
      if (!config) return;

      const fieldType = preprocessableColumns.find(c => c.dataIndex === field)?.type;
      const originalValues = processed.map(row => row[field]);

      // 基础处理
      if (config.basicProcessing?.length > 0) {
        if (config.basicProcessing.includes('removeMissing')) {
          processed = processed.filter(row => row[field] != null && row[field] !== '');
        }
        if (config.basicProcessing.includes('removeDuplicates')) {
          const seen = new Set();
          processed = processed.filter(row => {
            const key = `${field}-${row[field]}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
        }
        if (config.basicProcessing.includes('handleOutliers')) {
          if (fieldType === 'numeric') {
            const values = processed.map(row => Number(row[field]));
            const q1 = this.quantile(values, 0.25);
            const q3 = this.quantile(values, 0.75);
            const iqr = q3 - q1;
            const lower = q1 - 1.5 * iqr;
            const upper = q3 + 1.5 * iqr;
            processed = processed.filter(row => {
              const value = Number(row[field]);
              return value >= lower && value <= upper;
            });
          }
        }
      }

      // 数值处理
      if (fieldType === 'numeric' && config.numericProcessing?.length > 0) {
        const values = processed.map(row => Number(row[field]));
        processingStats[field] = {};

        config.numericProcessing.forEach(method => {
          const processor = this[method](values);
          const suffix = method === 'zscore' ? '标准化' :
            method === 'minmax' ? '归一化' :
              method === 'log' ? '对数' : '';

          processed.forEach(row => {
            const newKey = `${field}_${suffix}`;
            row[newKey] = processor.transform(Number(row[field]));
          });

          processingStats[field][method] = {
            ...processor.stats,
            description: processor.description
          };
        });
      }

      // 分类处理
      if (fieldType === 'categorical' && config.categoricalProcessing) {
        const uniqueValues = [...new Set(originalValues)];
        processingStats[field] = {
          categories: uniqueValues,
          count: uniqueValues.length
        };

        switch (config.categoricalProcessing) {
          case 'oneHot':
            uniqueValues.forEach(value => {
              processed.forEach(row => {
                row[`${field}_${value}`] = row[field] === value ? 1 : 0;
              });
            });
            processed.forEach(row => delete row[field]);
            break;

          case 'label':
            const labelMap = uniqueValues.reduce((acc, val, idx) => {
              acc[val as string] = idx;
              return acc;
            }, {});
            processed.forEach(row => {
              row[`${field}_encoded`] = labelMap[row[field]];
            });
            processingStats[field].mapping = labelMap;
            break;

          case 'effect':
            const n = uniqueValues.length;
            processed.forEach(row => {
              uniqueValues.slice(0, n - 1).forEach(value => {
                row[`${field}_${value}`] = row[field] === value ? 1 :
                  row[field] === uniqueValues[n - 1] ? -1 : 0;
              });
            });
            processed.forEach(row => delete row[field]);
            break;
        }
      }
    });

    return {
      data: processed,
      stats: processingStats
    };
  }

  static calculateStats(data: any[], field: string): ProcessingStats {
    const values = data.map(row => Number(row[field])).filter(v => !isNaN(v));

    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const std = Math.sqrt(values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length);

    // 计算偏度和峰度
    const skewness = values.reduce((a, b) => a + Math.pow((b - mean) / std, 3), 0) / values.length;
    const kurtosis = values.reduce((a, b) => a + Math.pow((b - mean) / std, 4), 0) / values.length - 3;

    return {
      mean,
      std,
      min: Math.min(...values),
      max: Math.max(...values),
      count: values.length,
      skewness,
      kurtosis,
      isNormal: Math.abs(skewness) < 1 && Math.abs(kurtosis) < 2
    };
  }

  private static quantile(values: number[], q: number): number {
    const sorted = [...values].sort((a, b) => a - b);
    const pos = (sorted.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    if (sorted[base + 1] !== undefined) {
      return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
    } else {
      return sorted[base];
    }
  }
}
