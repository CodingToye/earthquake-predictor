import {screen} from "@testing-library/react";

import {elementTextIncludesAll} from "@/components/__tests__/utils/textMatchers";

import {setupMetric} from "../test-utils/metricSetup";

describe("Metric", () => {
  it("renders without crashing", () => {
    setupMetric();
    expect(screen.getByText(/CDI/i)).toBeInTheDocument();
  });
  it("displays predictedValue when showPredicted is true", () => {
    setupMetric({
      propOverrides: {
        showPredicted: true,
        predictedValue: 9,
        realValue: 4,
        barClass: "",
      },
    });
    expect(screen.getByText("9")).toBeInTheDocument();
  });
  it("falls back to realValue when showPredictedis false", () => {
    setupMetric({
      propOverrides: {
        showPredicted: false,
        predictedValue: 9,
        realValue: 4,
        barClass: "",
      },
    });
    expect(screen.getByText("4")).toBeInTheDocument();
  });
  it("uses to format function is provided", () => {
    setupMetric({
      propOverrides: {
        format: (val) => `formatted-${val}`,
        realValue: 5,
        barClass: "",
      },
    });
    expect(screen.getByText("formatted-5")).toBeInTheDocument();
  });
  it("falls back to fixedPoint formatting if format is not provided", () => {
    setupMetric({
      propOverrides: {
        format: undefined,
        realValue: 3.14159,
        fixedPoint: 2,
        barClass: "",
      },
    });
    expect(screen.getByText("3.14")).toBeInTheDocument();
  });
  it("falls back to raw value if format and fixedPoint are not provided", () => {
    setupMetric({
      propOverrides: {
        format: undefined,
        fixedPoint: undefined,
        realValue: 7,
        barClass: "",
      },
    });
    expect(screen.getByText("7")).toBeInTheDocument();
  });
  it("displays fallback dash if no value is available", () => {
    setupMetric({
      propOverrides: {
        realValue: undefined,
        format: undefined,
        fixedPoint: undefined,
        barClass: "",
      },
    });
    expect(screen.getByText("-")).toBeInTheDocument();
  });
  it("renders a unit suffix if one is added", () => {
    setupMetric({propOverrides: {barClass: "", valueSuffix: " km"}});
    const unit = screen.getAllByText(elementTextIncludesAll(" km"));
    expect(unit.length).toBeGreaterThan(0);
  });
});
