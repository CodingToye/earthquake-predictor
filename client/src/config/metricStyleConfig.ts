export function getMetricStyles(metricKey: string) {
  const root = getComputedStyle(document.documentElement);
  const css = (v: string) => root.getPropertyValue(v).trim();

  const map: Record<string, {stroke: string; fill: string}> = {
    magnitude: {
      stroke: css("--color-white"),
      fill: css("--color-red-400"),
    },
    depth: {
      stroke: "#059669",
      fill: "#065f46",
    },
    cdi: {
      stroke: "#f59e0b",
      fill: "#b45309",
    },
  };

  return map[metricKey] ?? {stroke: "#aaa", fill: "#666"};
}
