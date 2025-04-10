// client/src/components/Earthquakes/Earthquakes.tsx

import {useEffect} from "react";

import {useEarthquakeData} from "@/hooks/useEarthquakeData";
import {useFilters} from "@/hooks/useFilters";
import Panel from "@/shared/Panel";
import {formatDateTime} from "@/utils/date";

import Filters from "../Filters";
import Map from "../Map";
// import {EffectMetrics} from "../Metrics";
// import {GeoMetrics} from "../Metrics";
// import SearchForm from "../SearchForm";
import Toolbar from "../Toolbar";

export default function Earthquakes() {
  const {
    filters,
    setFilterActive,
    setFilterValue,
    effectiveRadius,
    effectiveMagnitude,
    effectiveYear,
  } = useFilters();

  const {
    latest,
    notice,
    searchedLocation,
    // error,
    searchByLocation,
    predictedMetrics,
    nearbyEarthquakes,
  } = useEarthquakeData();

  useEffect(() => {
    if (!filters.radius.active && filters.magnitude.active) {
      setFilterActive("magnitude", false);
    }
    if (!filters.radius.active && filters.yearRange.active) {
      setFilterActive("yearRange", false);
    }
  }, [
    setFilterActive,
    filters.radius.active,
    filters.magnitude.active,
    filters.yearRange.active,
  ]);

  useEffect(() => {
    if (searchedLocation) {
      searchByLocation(
        searchedLocation,
        effectiveRadius,
        effectiveMagnitude,
        effectiveYear
      );
    }
  }, [
    searchedLocation,
    effectiveRadius,
    effectiveMagnitude,
    effectiveYear,
    searchByLocation,
  ]);

  const handleSearch = async (query: string) => {
    await searchByLocation(
      query,
      effectiveRadius,
      effectiveMagnitude,
      effectiveYear
    );
  };

  if (!latest)
    return <p className="text-gray-500">Loading latest earthquake...</p>;

  return (
    <div className="py-4">
      <div className="flex gap-4 px-8 mb-2">
        <header className="flex flex-col text-left">
          <h2 className="">{latest.location || latest.country}</h2>
          <small className="text-xs text-white/50">
            {formatDateTime(latest.date_time).date} at {""}
            {formatDateTime(latest.date_time).time}
          </small>
          {notice && (
            <p className="text-xs text-yellow-400 italic">
              Nearest match result to {searchedLocation}, {latest.distance_km}
              km away
            </p>
          )}
        </header>
      </div>
      <div className="relative mx-8">
        <Toolbar
          latest={latest}
          predictedMetrics={predictedMetrics}
          onSearch={handleSearch}
        />

        <div className="absolute top-48 left-8 z-99 flex gap-4">
          <Panel>
            <Filters
              filters={filters}
              setFilterValue={setFilterValue}
              setFilterActive={setFilterActive}
              nearbyCount={nearbyEarthquakes?.length}
            />
          </Panel>
        </div>
        <Map
          latitude={latest.latitude}
          longitude={latest.longitude}
          magnitude={latest.magnitude}
          nearbyEarthquakes={nearbyEarthquakes ? nearbyEarthquakes : []}
        />
      </div>
    </div>
  );
}
