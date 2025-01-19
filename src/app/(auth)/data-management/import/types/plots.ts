export interface ChartAnnotation {
  type: string;
  start: [string | number, number];
  end: [string | number, number];
  style: {
    stroke: string;
    lineDash?: number[];
  };
}

export interface ChartConfig {
  data: any[];
  xField: string;
  yField: string;
  color?: string | string[];
  annotations?: ChartAnnotation[];
  [key: string]: any;
}

export interface ChartDataPoint {
  [key: string]: string | number;
}
