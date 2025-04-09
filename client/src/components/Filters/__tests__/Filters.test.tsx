// components/Filters/__tests__/Filters.test.tsx

jest.mock("../components/Filter", () => {
  const MockFilter = ({label, onToggle, onChange}: any) => {
    const isDualRange = label.toLowerCase().includes("range");

    return (
      <div
        data-testid={`mock-filter-${label.toLowerCase().replace(/\s+/g, "-")}`}
      >
        <span>{label}</span>
        <button onClick={onToggle}>lightbulb</button>
        <button
          onClick={
            () =>
              isDualRange
                ? onChange([5.0, 8.0]) // Simulate dual-range change
                : onChange([100]) // Simulate single-value change
          }
        >
          change
        </button>
      </div>
    );
  };

  MockFilter.displayName = "MockFilter";
  return MockFilter;
});
import {fireEvent, screen} from "@testing-library/react";

import {baseFilters} from "@/components/__tests__/fixtures/filters.fixtures";

import {setupFilters} from "../test-utils/filtersSetup";

describe("Filters", () => {
  const mockSetFilterActive = jest.fn();
  const mockSetFilterValue = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the filter header and count", () => {
    setupFilters();
    expect(screen.getByText(/filters/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Showing 3 nearby earthquake/i)
    ).toBeInTheDocument();
  });

  it("shows fallback message when no nearby earthquakes", () => {
    setupFilters({nearbyCount: 0});

    expect(screen.getByText("0 earthquakes nearby")).toBeInTheDocument();
  });

  it("shows all filter labels", () => {
    setupFilters();
    expect(screen.getByText(/radius/i)).toBeInTheDocument();
    expect(screen.getByText(/magnitude range/i)).toBeInTheDocument();
    expect(screen.getByText(/year range/i)).toBeInTheDocument();
  });

  it("toggles filter visibility when header is clicked", () => {
    setupFilters();
    const header = screen.getByText(/filters/i);
    fireEvent.click(header);
  });

  it("calls setFilterActive and setFilterValue for all filters", () => {
    setupFilters({
      setFilterActive: mockSetFilterActive,
      setFilterValue: mockSetFilterValue,
      filtersOverrides: {
        radius: {...baseFilters.radius, active: true},
        magnitude: {...baseFilters.magnitude, active: true},
        yearRange: {...baseFilters.yearRange, active: true},
      },
    });

    // Toggle each filter
    const toggleIcons = screen.getAllByText("lightbulb");
    toggleIcons.forEach((icon) => fireEvent.click(icon));

    expect(mockSetFilterActive).toHaveBeenCalledWith("radius", false);
    expect(mockSetFilterActive).toHaveBeenCalledWith("magnitude", false);
    expect(mockSetFilterActive).toHaveBeenCalledWith("yearRange", false);

    // Simulate user clicking each mocked "change" button
    const changeButtons = screen.getAllByText("change");
    changeButtons.forEach((btn) => fireEvent.click(btn));

    // Assert that setFilterValue was called with the right values
    expect(mockSetFilterValue).toHaveBeenCalledWith("radius", {value: 100});
    expect(mockSetFilterValue).toHaveBeenCalledWith("magnitude", {
      min: 5.0,
      max: 8.0,
    });
    expect(mockSetFilterValue).toHaveBeenCalledWith("yearRange", {
      min: 5.0,
      max: 8.0,
    });
  });
});
