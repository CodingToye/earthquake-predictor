// components/Metrics/types

import {EarthquakeData, PredictedMetricProps} from "@/hooks/types";

export type MetricsProps = {
  showPredicted: boolean;
  latest: EarthquakeData | null;
  predictedMetrics?: PredictedMetricProps | null;
};
