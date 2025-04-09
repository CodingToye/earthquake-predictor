// components/Earthquakes/Earthquakes.test.tsx

import {screen, waitFor} from "@testing-library/react";

import {setupEarthquake} from "../test-utils/earthquakesSetup";

describe("Earthquakes component", () => {
  it("renders without crashing and shows location title", async () => {
    setupEarthquake();
    await waitFor(() => expect(screen.getByText(/Tokyo/)).toBeInTheDocument());
  });

  it("shows loading message if no data", () => {
    setupEarthquake({earthquakeOverrides: {latest: undefined}});
    expect(
      screen.getByText(/Loading latest earthquake.../)
    ).toBeInTheDocument();
  });

  it("disables magnitude and yearRange filters when radius is deactivated", () => {
    const mockSetFilterActive = jest.fn();

    setupEarthquake({
      filterOverrides: {
        radius: {active: false, value: 50},
        magnitude: {active: true, min: 4.0, max: 9.0},
        yearRange: {active: true, min: 1993, max: 2023},
      },
      setFilterActive: mockSetFilterActive,
    });

    expect(mockSetFilterActive).toHaveBeenCalledWith("magnitude", false);
    expect(mockSetFilterActive).toHaveBeenCalledWith("yearRange", false);
  });
});
