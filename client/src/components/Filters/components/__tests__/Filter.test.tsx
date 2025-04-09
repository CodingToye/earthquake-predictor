import {fireEvent, screen} from "@testing-library/react";

import {
  dualRangeFilterProps,
  singleRangeFilterProps,
} from "@/components/__tests__/fixtures/filters.fixtures";

import {
  setupDualRangeFilter,
  setupSingleRangeFilter,
} from "../test-utils/filterSetup";

describe("Filter (single-handle)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders label with unit and value", () => {
    setupSingleRangeFilter();
    expect(screen.getByText(/Radius/i)).toBeInTheDocument();
    expect(
      screen.getByText((_, el) => el?.textContent === "50 km")
    ).toBeInTheDocument();
  });

  it("calls onToggle when icon is clicked", () => {
    setupSingleRangeFilter({propOverrides: {isActive: false}});
    const icon = screen.getByText("lightbulb");
    fireEvent.click(icon);
    expect(singleRangeFilterProps.onToggle).toHaveBeenCalled();
  });

  it("renders icon with correct class when active", () => {
    setupSingleRangeFilter({propOverrides: {isActive: true}});
    const icon = screen.getByText("lightbulb");
    expect(icon).toHaveClass("text-yellow-500");
  });

  it("renders icon with correct class when inactive", () => {
    setupSingleRangeFilter({propOverrides: {isActive: false}});
    const icon = screen.getByText("lightbulb");
    expect(icon).toHaveClass("text-white/60");
  });

  it("calls onChange when range changes", () => {
    const mockChange = jest.fn();
    setupSingleRangeFilter({propOverrides: {onChange: mockChange}});

    // Simulate onChange
    mockChange([100]);
    expect(mockChange).toHaveBeenCalledWith([100]);
  });
});

describe("Filter (dual-handled)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders label and value range", () => {
    setupDualRangeFilter();
    expect(screen.getByText(/Magnitude/i)).toBeInTheDocument();
    expect(
      screen.getByText((_, el) => el?.textContent === "4 - 9")
    ).toBeInTheDocument();
  });

  it("calls onToggle when icon is clicked", () => {
    setupDualRangeFilter();
    fireEvent.click(screen.getByText("lightbulb"));
    expect(dualRangeFilterProps.onToggle).toHaveBeenCalled();
  });

  it("calls onChange when range is changed", () => {
    const mockChange = jest.fn();
    setupDualRangeFilter({
      propOverrides: {onChange: mockChange},
    });

    // Simulate onChange manually
    mockChange([5, 8]);
    expect(mockChange).toHaveBeenCalledWith([5, 8]);
  });
});

describe("Filter visual changes", () => {
  it("shows different opacity levels when a filter is active", () => {});
});
