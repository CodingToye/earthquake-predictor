// client/src/components/Earthquakes/Earthquakes.tsx

import {useEffect, useState} from "react";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

import {useDistanceUnit} from "@/hooks/useDistanceUnit";
import {useEarthquakeData} from "@/hooks/useEarthquakeData";
import {useFilters} from "@/hooks/useFilters";
import Panel from "@/shared/Panel";
import {formatDateTime} from "@/utils/date";

import Filters from "../Filters";
import Map from "../Map";
import Toolbar from "../Toolbar";

export default function Earthquakes() {
  const [showImperial, setShowImperial] = useState(false);
  const {convertDistance, suffix} = useDistanceUnit(showImperial);
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

  countries.registerLocale(enLocale);

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

  const countryCode = countries.getAlpha2Code(`${latest?.country}`, "en");

  if (!latest)
    return <p className="text-gray-500">Loading latest earthquake...</p>;

  return (
    <div className="py-4">
      <div className="flex gap-4 px-8 mb-2">
        <header className="flex flex-col text-left w-full">
          <div className="flex flex-row gap-2">
            <h2 className="">{latest.location || latest.country}</h2>
            <span className={`fi fi-${countryCode?.toLowerCase()}`}></span>
          </div>
          <small className="text-xs text-white/50">
            {formatDateTime(latest.date_time).date} at {""}
            {formatDateTime(latest.date_time).time}
          </small>

          {notice && (
            <p className="text-xs text-yellow-400 italic">
              Nearest match result to {searchedLocation},{" "}
              {showImperial
                ? convertDistance(latest.distance_km, 0)
                : latest.distance_km}{" "}
              {suffix} away
            </p>
          )}
        </header>
      </div>
      <div className="relative mx-8">
        <Toolbar
          latest={latest}
          predictedMetrics={predictedMetrics}
          onSearch={handleSearch}
          showImperial={showImperial}
          setShowImperial={setShowImperial}
          nearbyEarthquakes={nearbyEarthquakes}
          filters={filters}
        />

        <div className="hidden md:flex absolute top-48 left-8 z-99 gap-4">
          <Panel>
            <Filters
              filters={filters}
              setFilterValue={setFilterValue}
              setFilterActive={setFilterActive}
              nearbyCount={nearbyEarthquakes?.length}
              showImperial={showImperial}
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
