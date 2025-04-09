// client/src/components/Earthquakes/Earthquakes.tsx

import {useEffect} from "react";

import {useEarthquakeData} from "@/hooks/useEarthquakeData";
import {useFilters} from "@/hooks/useFilters";
import Panel from "@/shared/Panel";
import {formatDateTime} from "@/utils/date";

import Filters from "../Filters";
import Map from "../Map";
import {EffectMetrics} from "../Metrics";
import {GeoMetrics} from "../Metrics";
import SearchForm from "../SearchForm";

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
    error,
    searchByLocation,
    predictedMetrics,
    nearbyEarthquakes,
  } = useEarthquakeData();

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

  if (!latest)
    return <p className="text-gray-500">Loading latest earthquake...</p>;

  return (
    <div className="py-4">
      {/* <div className="px-8 py-4">
        <header>
          <h1 className="text-2xl text-white">
            Recorded Earthquakes (1995-2023)
          </h1>
        </header>
      </div> */}

      {/* <div className="px-8 py-4 mb-8"></div> */}
      {/* <div className="px-8 flex"><GeoMetrics latest={latest} /></div> */}
      <div className="flex gap-4 px-8 mb-2">
        <header className="flex flex-col text-left">
          <h2 className="">{latest.location || latest.country}</h2>
          <small className="text-xs text-white/50">
            {formatDateTime(latest.date_time).date} {""}
            {formatDateTime(latest.date_time).time}
          </small>
          {notice && (
            <p className="text-xs text-yellow-400 italic">
              Nearest match result to {searchedLocation}, {latest.distance_km}
              km away
            </p>
          )}
        </header>
        <SearchForm
          error={error}
          searchByLocation={async (query) => {
            await searchByLocation(
              query,
              effectiveRadius,
              effectiveMagnitude,
              effectiveYear
            );
          }}
        />
      </div>
      <div className="relative mx-8">
        <div className="absolute top-0 left-0 z-99 grid auto-cols-auto grid-flow-col gap-4  w-full bg-linear-to-b from-black/30 to-black/40 text-white/80 border-b-1 border-black/60 shadow-md backdrop-blur-xs">
          <GeoMetrics latest={latest} />
          <EffectMetrics latest={latest} predictedMetrics={predictedMetrics} />
        </div>
        <div className="absolute top-32 left-8 z-99 flex gap-4">
          <Panel>
            <Filters
              filters={filters}
              setFilterValue={setFilterValue}
              setFilterActive={setFilterActive}
              nearbyCount={nearbyEarthquakes?.length}
            />
          </Panel>
        </div>

        <div className="grid grid-cols-2 gap-8 p-8 absolute bottom-0 right-8 left-8 z-50  max-w-dvw box-border">
          <div className="flex flex-col gap-4"></div>
          <div className="">
            <div className="text-left"></div>
          </div>
        </div>
        <Map
          latitude={latest.latitude}
          longitude={latest.longitude}
          magnitude={latest.magnitude}
          nearbyEarthquakes={nearbyEarthquakes ? nearbyEarthquakes : []}
        />
      </div>

      <div className="grid grid-cols-2 gap-4"></div>
    </div>
  );
}
