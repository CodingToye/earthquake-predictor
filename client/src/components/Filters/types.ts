// components/Filters/types.ts

export type FiltersProps = {
  filters: {
    radius: {active: boolean; value: number};
    magnitude: {
      active: boolean;
      max: number;
      min: number;
    };
    yearRange: {
      active: boolean;
      max: number;
      min: number;
    };
  };

  setFilterActive: (
    key: keyof FiltersProps["filters"],
    active: boolean
  ) => void;

  setFilterValue: <K extends keyof FiltersProps["filters"]>(
    key: K,
    value: Partial<FiltersProps["filters"][K]>
  ) => void;
  nearbyCount?: number;
  showImperial: boolean;
};
