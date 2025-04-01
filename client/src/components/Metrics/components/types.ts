// components/Metrics/components/types.ts

export type MetricProps = {
  label: string;
  realValue?: number | string;
  predictedValue?: number | string;
  showPredicted?: boolean;
  format?: (val: string | number | undefined) => string;
  fixedPoint?: number;
  valueSuffix?: string;
  iconClass?: string;
  iconName?: string;
  barClass?: string;
  tooltip?: string;
};
