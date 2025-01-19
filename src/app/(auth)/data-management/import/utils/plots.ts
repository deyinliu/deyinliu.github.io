export const getHistogramConfig = (data: any[], stats: any) => ({
  data,
  xField: 'bin',
  yField: 'count',
  columnStyle: { fill: '#91caff' },
  annotations: [
    {
      type: 'line',
      start: ['median', 0],
      end: ['median', 'max'],
      style: {
        stroke: '#f5222d',
        lineDash: [4, 4],
      },
    },
    {
      type: 'text',
      position: ['median', 'max'],
      content: `中位数: ${stats.median.toFixed(2)}`,
      style: { textAlign: 'center' },
    },
  ],
});

export const getBoxPlotConfig = (values: number[]) => ({
  data: [{ values }],
  xField: 'x',
  yField: 'values',
  boxStyle: {
    fill: '#91caff',
    fillOpacity: 0.3,
  },
  animation: false,
});

export const generateHistogramData = (values: number[]) => {
  // 使用 Sturges 公式确定箱数
  const binCount = Math.ceil(1 + Math.log2(values.length));
  const min = Math.min(...values);
  const max = Math.max(...values);
  const binWidth = (max - min) / binCount;

  const bins = Array(binCount).fill(0);
  values.forEach(v => {
    const binIndex = Math.min(
      Math.floor((v - min) / binWidth),
      binCount - 1
    );
    bins[binIndex]++;
  });

  return bins.map((count, i) => ({
    bin: min + (i + 0.5) * binWidth,
    count,
  }));
};
