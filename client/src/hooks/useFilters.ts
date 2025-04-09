// hooks/useFilters.ts

import {useState, useMemo, useCallback} from "react";
import {useDebounce} from "./useDebounce";

export function useFilters() {
  const [filters, setFilters] = useState({
    radius: {active: true, value: 50},
    magnitude: {active: false, min: 4.0, max: 9.0},
    yearRange: {active: false, min: 1995, max: 2023},
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

  const setFilterValue = useCallback(
    <T extends keyof typeof filters>(
      key: T,
      value: Partial<(typeof filters)[T]>
    ) => {
      setFilters((prev) => ({
        ...prev,
        [key]: {...prev[key], ...value},
      }));
    },
    []
  );

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

  return {
    filters,
    setFilterActive,
    setFilterValue,
    effectiveRadius,
    effectiveMagnitude,
    effectiveYear,
  };
}
