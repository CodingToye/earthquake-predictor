import {useMemo} from "react";
import {EarthquakeData} from "./types";
import {MetricConfig, StaticMetricConfig} from "./types";

const alertColorMap = {
  red: "text-red-500",
  orange: "text-orange-500",
  yellow: "text-yellow-500",
  green: "text-green-500",
  default: "text-gray-500",
};

const alertBgMap = {
  red: "bg-red-500",
  orange: "bg-orange-500",
  yellow: "bg-yellow-500",
  green: "bg-green-500",
  default: "bg-gray-500",
};

export function useMetricConfigs(latest: EarthquakeData | null) {
  const effectMetrics = useMemo<MetricConfig[]>(() => {
    if (!latest) return [];
    return [
      {
        label: "Mag",
        key: "magnitude",
        fixedPoint: 1,
        iconClass: "text-red-400",
        iconName: "sensors",
        tooltip: "Magnitude of the earthquake",
      },
      {
        label: "Tsu",
        key: "tsunami",
        iconClass: "text-blue-300",
        iconName: "tsunami",
        format: (val) => (val === 1 || val === "1" ? "Yes" : "No"),
        tooltip: "Tsunami potential (Yes/No)",
      },
      {
        label: "CDI",
        key: "cdi",
        iconClass: "text-yellow-500",
        iconName: "insights",
        tooltip: "Community-reported shaking intensity",
      },
      {
        label: "MMI",
        key: "mmi",
        iconClass: "text-green-500",
        iconName: "insights",
        tooltip: "Instrument-measured shaking intensity",
      },
      {
        label: "Alert",
        key: "alert",
        iconClass:
          alertColorMap[latest?.alert as keyof typeof alertColorMap] ??
          alertColorMap.default,
        iconName: "notifications",
        barClass:
          alertBgMap[latest?.alert as keyof typeof alertBgMap] ??
          alertBgMap.default,
        tooltip: "USGS alert level (green/yellow/orange/red)",
      },
    ];
  }, [latest]);

  const geoMetrics = useMemo<StaticMetricConfig[]>(() => {
    return [
      {
        label: "Lat",
        key: "latitude",
        fixedPoint: 4,
        iconName: "swap_vert",
        tooltip: "Latitude",
      },
      {
        label: "Lon",
        key: "longitude",
        fixedPoint: 4,
        iconName: "swap_horiz",
        tooltip: "Longitude",
      },
      {
        label: "Dep",
        key: "depth",
        fixedPoint: 0,
        valueSuffix: "km",
        iconName: "download",
        tooltip: "Depth",
      },
    ];
  }, []);

  return {
    effectMetrics,
    geoMetrics,
  };
}
