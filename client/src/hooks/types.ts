// hooks/types.ts

export type MetricConfig = {
  label: string;
  key: keyof EarthquakeData & keyof PredictedMetricProps;
  format?: (val: string | number | undefined) => string;
  fixedPoint?: number;
  iconClass?: string;
  iconName?: string;
  barClass?: string;
  tooltip?: string;
  sig?: number;
  net?: string;
  nst?: number;
  dmin?: number;
  gap?: number;
  mag_type?: string;
  valueSuffix?: string;
  alert?: string;
  onMetricClick?: () => void;
};

export type StaticMetricConfig = Omit<MetricConfig, "key"> & {
  key: keyof EarthquakeData;
  valueSuffix?: string;
};

export type AllMetricConfig = MetricConfig | StaticMetricConfig;

export type EarthquakeMetricProps = {
  magnitude: number;
  tsunami: number;
  mmi: number;
  cdi: number;
  depth: number;
  alert?: string;
  sig?: number;
  net?: string;
  nst?: number;
  dmin?: number;
  gap?: number;
  mag_type?: string;
};

export type EarthquakeData = EarthquakeMetricProps & {
  title: string;
  date_time: string;
  latitude: number;
  longitude: number;
  location: string;
  country: string;
  distance_km: number;
};

export type PredictedMetricProps = {
  magnitude: number;
  tsunami: number;
  mmi: number;
  cdi: number;
  depth: number;
};
