import {useState} from "react";

import {EarthquakeData} from "@/hooks/types";
import {EarthquakeMetricProps} from "@/hooks/types";
import {AllMetricConfig} from "@/hooks/types";
import {useEarthquakeData} from "@/hooks/useEarthquakeData";
import {useFilters} from "@/hooks/useFilters";
import MetricPanel from "@/shared/MetricPanel";
import ToggleSwitch from "@/shared/ToggleSwitch";

import LineChartByMetric from "../Graphs/LineChartByMetric";
import {
  DetectionMetrics,
  EffectMetrics,
  GeoMetrics,
  SignificanceMetrics,
} from "../Metrics";
import SearchForm from "../SearchForm";

type ToolbarProps = {
  latest: EarthquakeData | null;
  predictedMetrics: EarthquakeMetricProps | null;
  showImperial: boolean;
  setShowImperial: (value: boolean) => void;
  onSearch: (query: string) => Promise<void>;
  nearbyEarthquakes: EarthquakeData[] | null;
  filters: ReturnType<typeof useFilters>["filters"];
};

export default function Toolbar({
  latest,
  predictedMetrics,
  showImperial,
  setShowImperial,
  onSearch,
  nearbyEarthquakes,
  filters,
}: ToolbarProps) {
  const {error} = useEarthquakeData();
  const [showPredicted, setShowPredicted] = useState(false);
  const [activeMetric, setActiveMetric] = useState<AllMetricConfig | null>(
    null
  );

  return (
    <div className="absolute top-0 left-0 z-99  w-full bg-linear-to-b from-black/30 to-black/40 text-white/80 border-b-1 border-black/60 shadow-md backdrop-blur-x">
      <div className="md:hidden">
        <SearchForm error={error} searchByLocation={onSearch} />
      </div>
      <div className="hidden col-span-2 p-2 px-2 pr-4 md:flex flex-col md:flex-row gap-8 border-b-1 border-black/30 bg-black/20">
        <SearchForm error={error} searchByLocation={onSearch} />

        <ToggleSwitch
          labelLeft="Actual"
          labelRight="Predicted"
          checked={showPredicted}
          onChange={() => setShowPredicted(!showPredicted)}
        />
        <ToggleSwitch
          labelLeft="km"
          labelRight="mi"
          checked={showImperial}
          onChange={() => setShowImperial(!showImperial)}
        />
      </div>
      <div className="hidden md:flex flex-row gap-0 w-full divide-x divide-black/60 overflow-auto">
        <GeoMetrics
          latest={latest}
          showImperial={showImperial}
          showPredicted={showPredicted}
          onMetricClick={setActiveMetric}
        />
        <EffectMetrics
          latest={latest}
          predictedMetrics={predictedMetrics}
          showPredicted={showPredicted}
          onMetricClick={setActiveMetric}
        />

        <DetectionMetrics
          latest={latest}
          showImperial={showImperial}
          predictedMetrics={predictedMetrics}
          showPredicted={showPredicted}
          onMetricClick={setActiveMetric}
        />

        <SignificanceMetrics
          latest={latest}
          predictedMetrics={predictedMetrics}
          showPredicted={showPredicted}
          onMetricClick={setActiveMetric}
        />
      </div>
      {activeMetric && (
        <MetricPanel
          isOpen={!!activeMetric}
          onClose={() => setActiveMetric(null)}
          activeMetric={activeMetric}
        >
          {filters.radius.active ? (
            <LineChartByMetric
              earthquakes={nearbyEarthquakes ?? []}
              metricKey={activeMetric.key}
              label={activeMetric.label}
            />
          ) : (
            <p className="text-sm text-white/50">
              No data available for this metric.
            </p>
          )}
        </MetricPanel>
      )}{" "}
    </div>
  );
}
