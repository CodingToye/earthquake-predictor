// components/__tests__/fixtures/filters.ts

export const baseFilters = {
  radius: {active: true, value: 50},
  magnitude: {active: false, min: 4.0, max: 9.0},
  yearRange: {active: false, min: 1993, max: 2023},
};

const baseRangeFilterProps = {
  isActive: true,
  onToggle: jest.fn(),
  onChange: jest.fn(),
  extraClass: "",
};

export const singleRangeFilterProps = {
  label: "Radius",
  unit: "km",
  min: 10,
  max: 4000,
  step: 10,
  values: [50],
  ...baseRangeFilterProps,
};

export const dualRangeFilterProps = {
  label: "Magnitude Range",
  min: 0,
  max: 10,
  step: 0.1,
  values: [4.0, 9.0],
  ...baseRangeFilterProps,
};
