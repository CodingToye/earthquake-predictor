// components/Filters/test-utils/setup.tsx

import {render} from "@testing-library/react";

import {
  dualRangeFilterProps,
  singleRangeFilterProps,
} from "@/components/__tests__/fixtures/filters.fixtures";

import Filter from "../Filter";

type SingleRangeSetupOptions = {
  propOverrides?: Partial<typeof singleRangeFilterProps>;
};

type DualRangeSetupOptions = {
  propOverrides?: Partial<typeof dualRangeFilterProps>;
};

export const setupSingleRangeFilter = ({
  propOverrides = {},
}: SingleRangeSetupOptions = {}) => {
  const filterProps = {
    ...singleRangeFilterProps,
    ...propOverrides,
  };

  return render(<Filter {...filterProps} />);
};

export const setupDualRangeFilter = ({
  propOverrides = {},
}: DualRangeSetupOptions = {}) => {
  const filterProps = {
    ...dualRangeFilterProps,
    ...propOverrides,
  };

  return render(<Filter {...filterProps} />);
};
