// import {useEffect} from "react";
import Metric from "./components/Metric";
import {useMetricConfigs} from "@/hooks/useMetricConfigs";
import {MetricsProps} from "./types";

export function EffectMetrics({
  showPredicted,
  latest,
  predictedMetrics,
}: MetricsProps) {
  const {effectMetrics} = useMetricConfigs(latest);

  return (
    <>
      <div className="grid grid-cols-5 gap-4 mb-4">
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
      </div>
    </>
  );
}

export function GeoMetrics({latest}: MetricsProps) {
  const {geoMetrics} = useMetricConfigs(latest);

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {geoMetrics.map((card, i) => {
          return (
            <Metric
              key={i}
              label={card.label}
              realValue={latest?.[card.key]}
              fixedPoint={card.fixedPoint}
              barClass={card.barClass}
              iconClass={card.iconClass}
              iconName={card.iconName}
              format={card.format}
              tooltip={card.tooltip}
            />
          );
        })}
      </div>
    </>
  );
}
