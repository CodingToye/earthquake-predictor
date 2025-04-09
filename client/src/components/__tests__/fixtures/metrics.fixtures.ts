// components/__tests__/fixtures/metrics.fixtures.ts

export const baseMetricProps = {
  label: "CDI",
  realValue: 4,
  predictedValue: 5,
  showPredicted: false,
  barClass: "bg-blue-500",
  iconClass: "text-blue-500",
  iconName: "wave",
  fixedPoint: 0,
  format: (val: string | number | undefined) =>
    val === undefined ? "N/A" : String(val),
  tooltip: "Community reported intensity",
  valueSuffix: " units",
};

export const basePredictedMetrics = {
  mmi: 5,
  cdi: 4,
  tsunami: 1,
  magnitude: 5.6,
  depth: 15,
};
