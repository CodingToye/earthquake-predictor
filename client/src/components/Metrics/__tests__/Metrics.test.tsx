// components/Metrics/Metrics.test.tsx

import {fireEvent, screen} from "@testing-library/react";

import {setupEffectMetrics, setupGeoMetrics} from "../test-utils/metricsSetup";

describe("Effect Metrics", () => {
  it("renders metric cards and toggles between real and predicted", () => {
    setupEffectMetrics();
    expect(screen.getByText(/mmi/i)).toBeInTheDocument();

    const toggle = screen.getByRole("checkbox");
    fireEvent.click(toggle);

    expect(toggle).toBeChecked();
  });
  it("render no metrics if latest is null", () => {
    setupEffectMetrics({useNullLatest: true});
    expect(screen.queryByText(/mag/i)).not.toBeInTheDocument();
  });
});

describe("Geo Metrics", () => {
  it("renders without crashing", () => {
    setupGeoMetrics();
    expect(screen.getByText(/latitude/i)).toBeInTheDocument();
  });
});
