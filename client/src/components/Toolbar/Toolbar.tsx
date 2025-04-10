import {useState} from "react";

import {EarthquakeData} from "@/hooks/types";
import {EarthquakeMetricProps} from "@/hooks/types";
import {AllMetricConfig} from "@/hooks/types";
import {useEarthquakeData} from "@/hooks/useEarthquakeData";
import MetricPanel from "@/shared/MetricPanel";
import ToggleSwitch from "@/shared/ToggleSwitch";

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
};

export default function Toolbar({
  latest,
  predictedMetrics,
  showImperial,
  setShowImperial,
  onSearch,
}: ToolbarProps) {
  const {error} = useEarthquakeData();
  const [showPredicted, setShowPredicted] = useState(false);
  const [activeMetric, setActiveMetric] = useState<AllMetricConfig | null>(
    null
  );

  return (
    <div className="absolute top-0 left-0 z-99  w-full bg-linear-to-b from-black/30 to-black/40 text-white/80 border-b-1 border-black/60 shadow-md backdrop-blur-xs">
      <div className="col-span-2 p-2 px-2 pr-4 flex gap-8 border-b-1 border-black/30 bg-black/20">
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
      <div className="flex flex-row gap-0 w-full divide-x divide-black/60">
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
        ></MetricPanel>
      )}{" "}
    </div>
  );
}
