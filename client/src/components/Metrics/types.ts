// components/Metrics/types

import {EarthquakeData, PredictedMetricProps} from "@/hooks/types";

export type MetricsProps = {
  latest: EarthquakeData | null;
  predictedMetrics?: PredictedMetricProps | null;
  showPredicted?: boolean;
  showImperial?: boolean;
};
