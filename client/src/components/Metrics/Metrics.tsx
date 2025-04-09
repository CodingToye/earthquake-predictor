// components/Metrics/Metrics.tsx

import {useState} from "react";

import {useMetricConfigs} from "@/hooks/useMetricConfigs";
import ToggleSwitch from "@/shared/ToggleSwitch";

import Metric from "./components/Metric";
import {MetricsProps} from "./types";

export function EffectMetrics({latest, predictedMetrics}: MetricsProps) {
  const [showPredicted, setShowPredicted] = useState(false);
  const {effectMetrics} = useMetricConfigs(latest);

  return (
    <>
      <ToggleSwitch
        labelLeft="Actual"
        labelRight="AI"
        checked={showPredicted}
        onChange={() => setShowPredicted(!showPredicted)}
      />

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

export function GeoMetrics({latest}: MetricsProps) {
  const {geoMetrics} = useMetricConfigs(latest);

  return (
    <>
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
    </>
  );
}
