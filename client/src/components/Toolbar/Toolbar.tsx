import {useState} from "react";

import {EarthquakeData} from "@/hooks/types";
import {EarthquakeMetricProps} from "@/hooks/types";
import {useEarthquakeData} from "@/hooks/useEarthquakeData";
import ToggleSwitch from "@/shared/ToggleSwitch";

import {EffectMetrics, GeoMetrics} from "../Metrics";
import SearchForm from "../SearchForm";

type ToolbarProps = {
  latest: EarthquakeData | null;
  predictedMetrics: EarthquakeMetricProps | null;
  onSearch: (query: string) => Promise<void>;
};

export default function Toolbar({
  latest,
  predictedMetrics,
  onSearch,
}: ToolbarProps) {
  const {error} = useEarthquakeData();
  const [showPredicted, setShowPredicted] = useState(false);

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
          checked={showPredicted}
          onChange={() => setShowPredicted(!showPredicted)}
        />
      </div>
      <div className="grid auto-cols-auto grid-flow-col gap-4">
        <GeoMetrics latest={latest} />
        <EffectMetrics
          latest={latest}
          predictedMetrics={predictedMetrics}
          showPredicted={showPredicted}
        />
      </div>
    </div>
  );
}
