// components/Metrics/Metrics.tsx

import {useDistanceUnit} from "@/hooks/useDistanceUnit";
import {useMetricConfigs} from "@/hooks/useMetricConfigs";

import Metric from "./components/Metric";
import {MetricsProps} from "./types";

export function EffectMetrics({
  latest,
  predictedMetrics,
  showPredicted,
}: MetricsProps) {
  const {effectMetrics} = useMetricConfigs(latest);

  return (
    <>
      {effectMetrics.map((card, i) => {
        return (
          <Metric
            key={i}
            label={card.label}
            realValue={latest?.[card.key]}
            fixedPoint={card.fixedPoint}
            predictedValue={predictedMetrics?.[card.key]}
            showPredicted={showPredicted && predictedMetrics !== null}
            barClass={card.barClass}
            iconClass={card.iconClass}
            iconName={card.iconName}
            format={card.format}
            tooltip={card.tooltip}
          />
        );
      })}
    </>
  );
}

export function GeoMetrics({latest, showImperial}: MetricsProps) {
  const {geoMetrics} = useMetricConfigs(latest);
  const {convertDistance, suffix} = useDistanceUnit(showImperial);

  return (
    <>
      {geoMetrics.map((card, i) => {
        const rawValue = latest?.[card.key];
        return (
          <Metric
            key={i}
            label={card.label}
            realValue={
              card.valueSuffix === "km"
                ? convertDistance(rawValue as number)
                : rawValue
            }
            fixedPoint={card.fixedPoint}
            barClass={card.barClass}
            iconClass={card.iconClass}
            iconName={card.iconName}
            format={card.format}
            tooltip={card.tooltip}
            valueSuffix={card.valueSuffix === "km" ? suffix : card.valueSuffix}
          />
        );
      })}
    </>
  );
}
