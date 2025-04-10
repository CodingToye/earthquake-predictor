// components/Metrics/MetricWrapper.tsx

import {EarthquakeData} from "@/hooks/types";
import {AllMetricConfig, MetricConfig, StaticMetricConfig} from "@/hooks/types";
import {useDistanceUnit} from "@/hooks/useDistanceUnit";

import Metric from "./components/Metric";

interface MetricWrapperProps {
  title: string;
  metrics: MetricConfig[] | StaticMetricConfig[];
  latest: EarthquakeData | null;
  showImperial?: boolean;
  predictedMetrics?: Record<string, number> | null;
  showPredicted?: boolean;
  className?: string;
  onMetricClick: (metric: AllMetricConfig) => void;
}

export default function MetricWrapper({
  title,
  metrics,
  latest,
  showImperial = false,
  predictedMetrics,
  showPredicted = false,
  className = "",
  onMetricClick,
}: MetricWrapperProps) {
  const {convertDistance, suffix} = useDistanceUnit(showImperial);

  function handleMetricClick(index: number) {
    onMetricClick(metrics[index]);
  }

  return (
    <>
      <div className={`flex flex-col pt-4 px-4 ${className}`}>
        <small className="uppercase text-xs mb-1 text-white/60">{title}</small>
        <div
          className={`grid gap-x-2`}
          style={{
            gridTemplateColumns: `repeat(${metrics.length}, minmax(0, 1fr))`,
          }}
        >
          {metrics.map((card, i) => {
            const rawValue = latest?.[card.key];
            const convertedValue =
              card.valueSuffix === "km" && typeof rawValue === "number"
                ? convertDistance(rawValue, card.fixedPoint ?? 0)
                : rawValue;
            const key = card.key as keyof typeof predictedMetrics;
            const hasPrediction = !!predictedMetrics && key in predictedMetrics;
            const predictedValue = hasPrediction
              ? predictedMetrics[key]
              : undefined;

            return (
              <Metric
                key={i}
                label={card.label}
                realValue={convertedValue}
                predictedValue={predictedValue}
                showPredicted={showPredicted}
                fixedPoint={card.fixedPoint}
                barClass={card.barClass}
                iconClass={card.iconClass}
                iconName={card.iconName}
                format={card.format}
                tooltip={card.tooltip}
                valueSuffix={
                  card.valueSuffix === "km" ? suffix : card.valueSuffix
                }
                onClick={() => handleMetricClick(i)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
