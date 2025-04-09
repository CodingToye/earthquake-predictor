// components/Earthquakes/test-utils/earthquakesSetup.tsx

// Mock hooks
jest.mock("@/hooks/useEarthquakeData");
jest.mock("@/hooks/useFilters");

import {render} from "@testing-library/react";

import {baseFilters} from "@/components/__tests__/fixtures/filters.fixtures";
import {useEarthquakeData} from "@/hooks/useEarthquakeData";
import {useFilters} from "@/hooks/useFilters";

import Earthquakes from "../Earthquakes";

type SetupOptions = {
  filterOverrides?: Partial<typeof baseFilters>;
  earthquakeOverrides?: Partial<typeof baseEarthquakeData>;
  setFilterActive?: jest.Mock;
  setFilterValue?: jest.Mock;
};

const baseEarthquakeData = {
  latest: {
    location: "Tokyo",
    country: "Japan",
    date_time: "2022-06-10T12:00:00Z",
    latitude: 35.6762,
    longitude: 139.6503,
    magnitude: 6.5,
    depth: 30,
  },
  predictedMetrics: null,
  error: null,
  notice: null,
  searchedLocation: "Tokyo",
  searchByLocation: jest.fn(),
  nearbyEarthquakes: [],
};

export const setupEarthquake = ({
  filterOverrides = {},
  earthquakeOverrides = {},
  setFilterActive = jest.fn(),
  setFilterValue = jest.fn(),
}: SetupOptions = {}) => {
  (useFilters as jest.Mock).mockReturnValue({
    filters: {...baseFilters, ...filterOverrides},
    setFilterActive,
    setFilterValue,
    effectiveRadius: filterOverrides?.radius?.active === false ? null : 50,
    effectiveMagnitude:
      filterOverrides?.magnitude?.active === true ? {min: 4.0, max: 9.0} : null,
    effectiveYear:
      filterOverrides?.yearRange?.active === true
        ? {min: 1995, max: 2023}
        : null,
  });

  (useEarthquakeData as jest.Mock).mockReturnValue({
    ...baseEarthquakeData,
    ...earthquakeOverrides,
  });

  return render(<Earthquakes />);
};
