// components/Metrics/types

import {
  AllMetricConfig,
  EarthquakeData,
  PredictedMetricProps,
} from "@/hooks/types";

export type MetricsProps = {
  latest: EarthquakeData | null;
  predictedMetrics?: PredictedMetricProps | null;
  showPredicted?: boolean;
  showImperial?: boolean;
  onMetricClick?: (metric: AllMetricConfig | null) => void;
};
