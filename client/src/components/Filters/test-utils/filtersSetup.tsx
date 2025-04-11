// components/Filters/test-utils/setup.tsx

jest.mock("@/hooks/useFilters");

import {render} from "@testing-library/react";

import {baseFilters} from "@/components/__tests__/fixtures/filters.fixtures";

import Filters from "../Filters";

type SetupOptions = {
  filtersOverrides?: Partial<typeof baseFilters>;
  setFilterActive?: jest.Mock;
  setFilterValue?: jest.Mock;
  nearbyCount?: number;
  showImperial?: boolean;
};

export const setupFilters = ({
  filtersOverrides = {},
  setFilterActive = jest.fn(),
  setFilterValue = jest.fn(),
  nearbyCount = 3,
  showImperial = false,
}: SetupOptions = {}) => {
  const filters = {
    ...baseFilters,
    ...filtersOverrides,
  };

  return render(
    <Filters
      filters={filters}
      setFilterActive={setFilterActive}
      setFilterValue={setFilterValue}
      nearbyCount={nearbyCount}
      showImperial={showImperial}
    />
  );
};
