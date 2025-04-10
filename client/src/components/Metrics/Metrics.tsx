// components/Metrics/Metrics.tsx

import {AllMetricConfig} from "@/hooks/types";
import {useMetricConfigs} from "@/hooks/useMetricConfigs";

import MetricWrapper from "./MetricWrapper";
import {MetricsProps} from "./types";

export function GeoMetrics({
  latest,
  showImperial,
  showPredicted,
  onMetricClick,
}: MetricsProps & {onMetricClick: (metric: AllMetricConfig) => void}) {
  const {geoMetrics} = useMetricConfigs(latest);
  return (
    <MetricWrapper
      title="Geographic"
      metrics={geoMetrics}
      latest={latest}
      showImperial={showImperial}
      showPredicted={showPredicted}
      onMetricClick={onMetricClick}
    />
  );
}

export function EffectMetrics({
  latest,
  showImperial,
  showPredicted,
  onMetricClick,
  predictedMetrics,
}: MetricsProps & {onMetricClick: (metric: AllMetricConfig) => void}) {
  const {effectMetrics} = useMetricConfigs(latest);
  return (
    <MetricWrapper
      title="Effects"
      metrics={effectMetrics}
      latest={latest}
      predictedMetrics={predictedMetrics}
      showImperial={showImperial}
      showPredicted={showPredicted}
      onMetricClick={onMetricClick}
    />
  );
}

export function DetectionMetrics({
  latest,
  showImperial,
  showPredicted,
  onMetricClick,
}: MetricsProps & {onMetricClick: (metric: AllMetricConfig) => void}) {
  const {detectionMetrics} = useMetricConfigs(latest);
  return (
    <MetricWrapper
      title="Detection"
      metrics={detectionMetrics}
      latest={latest}
      showImperial={showImperial}
      showPredicted={showPredicted}
      onMetricClick={onMetricClick}
    />
  );
}

export function SignificanceMetrics({
  latest,
  showImperial,
  showPredicted,
  onMetricClick,
}: MetricsProps & {onMetricClick: (metric: AllMetricConfig) => void}) {
  const {significanceMetrics} = useMetricConfigs(latest);
  return (
    <MetricWrapper
      title="Significance"
      metrics={significanceMetrics}
      latest={latest}
      showImperial={showImperial}
      showPredicted={showPredicted}
      onMetricClick={onMetricClick}
    />
  );
}
