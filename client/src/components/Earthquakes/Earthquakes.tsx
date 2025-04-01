import {useState, useEffect, useMemo, useCallback} from "react";

import Map from "../Map";
import {EffectMetrics} from "../Metrics";
import {GeoMetrics} from "../Metrics";
import SearchForm from "../SearchForm";
import Filters from "../Filters";
import ToggleSwitch from "@/shared/ToggleSwitch";
import {useDebounce} from "@/hooks/useDebounce";
import {useEarthquakeData} from "@/hooks/useEarthquakeData";
import Icon from "@mui/material/Icon";

export default function Earthquakes() {
  const [showPredicted, setShowPredicted] = useState(false);
  const [filters, setFilters] = useState({
    radius: {active: true, value: 50},
    magnitude: {active: false, min: 4.0, max: 9.0},
    yearRange: {
      active: false,
      min: 1995,
      max: 2023,
    },
  });

  const setFilterActive = useCallback(
    (key: keyof typeof filters, active: boolean) => {
      setFilters((prev) => ({
        ...prev,
        [key]: {...prev[key], active},
      }));
    },
    []
  );

  function setFilterValue<T extends keyof typeof filters>(
    key: T,
    value: Partial<(typeof filters)[T]>
  ) {
    setFilters((prev) => ({
      ...prev,
      [key]: {...prev[key], ...value},
    }));
  }
  const debouncedRadius = useDebounce(filters.radius.value, 500);
  const debouncedMagMin = useDebounce(filters.magnitude.min, 500);
  const debouncedMagMax = useDebounce(filters.magnitude.max, 500);
  const debouncedYearMin = useDebounce(filters.yearRange.min, 500);
  const debouncedYearMax = useDebounce(filters.yearRange.max, 500);

  const effectiveRadius = filters.radius.active ? debouncedRadius : null;

  const effectiveMagnitude = useMemo(() => {
    return filters.magnitude.active
      ? {min: debouncedMagMin, max: debouncedMagMax}
      : null;
  }, [filters.magnitude.active, debouncedMagMin, debouncedMagMax]);

  const effectiveYear = useMemo(() => {
    return filters.yearRange.active
      ? {
          min: debouncedYearMin,
          max: debouncedYearMax,
        }
      : null;
  }, [filters.yearRange.active, debouncedYearMin, debouncedYearMax]);

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

  const formattedDate = new Date(latest.date_time);

  return (
    <div className="p-6 bg-neutral-200 rounded-2xl shadow space-y-6">
      <div className="sticky top-0 pt-2  bg-neutral-200 flex flex-col gap-4 z-9999">
        <header>
          <h1 className="text-2xl text-white">
            Recorded Earthquakes (1995-2023)
          </h1>
        </header>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
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

            <Icon className="text-white">filter_list</Icon>
          </div>
          <div className="border-b-1 border-white/20">
            <Filters
              filters={filters}
              setFilterValue={setFilterValue}
              setFilterActive={setFilterActive}
              nearbyCount={nearbyEarthquakes?.length}
            />
          </div>
          <div>
            <ToggleSwitch
              labelLeft="Actual"
              labelRight="AI"
              checked={showPredicted}
              onChange={() => setShowPredicted(!showPredicted)}
            />
            <EffectMetrics
              showPredicted={showPredicted}
              latest={latest}
              predictedMetrics={predictedMetrics}
            />
          </div>
        </div>
        <div className="">
          <div className="text-left">
            <header className="mb-4">
              <h2 className="">
                {latest.location || latest.country}
                <span className="text-xs pl-2 text-white/50">
                  {formattedDate.toDateString()},{" "}
                  {formattedDate.toLocaleTimeString("en-US")}
                </span>
              </h2>
              {notice && (
                <p className="text-xs text-yellow-400 italic mb-2">
                  Nearest match result to {searchedLocation},{" "}
                  {latest.distance_km}
                  km away
                </p>
              )}
            </header>
          </div>
          <GeoMetrics showPredicted={showPredicted} latest={latest} />
          <Map
            latitude={latest.latitude}
            longitude={latest.longitude}
            magnitude={latest.magnitude}
            nearbyEarthquakes={nearbyEarthquakes ? nearbyEarthquakes : []}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4"></div>
    </div>
  );
}
