// components/Metrics/Metrics.test.tsx

import {screen} from "@testing-library/react";

import {setupEffectMetrics, setupGeoMetrics} from "../test-utils/metricsSetup";

describe("Effect Metrics", () => {
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
