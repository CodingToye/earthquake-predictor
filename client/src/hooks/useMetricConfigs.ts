// hooks/useMetricConfigs.ts

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
  const effectMetrics = useMemo<StaticMetricConfig[]>(() => {
    if (!latest) return [];
    return [
      {
        label: "Mag",
        key: "magnitude",
        fixedPoint: 1,
        iconClass: "text-red-400",
        iconName: "sensors",
        tooltip: "Magnitude of the earthquake",
        predictionAvailable: true,
      },
      {
        label: "Type",
        key: "mag_type",
        iconClass: "text-red-400",
        iconName: "waves",
        tooltip: "Magnitude calculation method",
        predictionAvailable: false,
      },
      {
        label: "Tsu",
        key: "tsunami",
        iconClass: "text-blue-100",
        iconName: "tsunami",
        format: (val) => (val === 1 || val === "1" ? "Yes" : "No"),
        tooltip: "Tsunami potential (Yes/No)",
        predictionAvailable: true,
      },
      {
        label: "CDI",
        key: "cdi",
        iconClass: "text-yellow-500",
        iconName: "groups",
        tooltip: "Community-reported shaking intensity",
        predictionAvailable: true,
      },
      {
        label: "MMI",
        key: "mmi",
        iconClass: "text-green-500",
        iconName: "network_check",
        tooltip: "Instrument-measured shaking intensity",
        predictionAvailable: true,
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
        predictionAvailable: false,
      },
      {
        label: "Lon",
        key: "longitude",
        fixedPoint: 4,
        iconName: "swap_horiz",
        tooltip: "Longitude",
        predictionAvailable: false,
      },
      {
        label: "Dep",
        key: "depth",
        fixedPoint: 0,
        valueSuffix: "km",
        iconName: "download",
        tooltip: "Depth",
        predictionAvailable: false,
      },
    ];
  }, []);

  const detectionMetrics = useMemo<StaticMetricConfig[]>(() => {
    return [
      {
        label: "Net",
        key: "net",
        iconClass: "text-white",
        iconName: "dns",
        tooltip: "Reporting network code",
        predictionAvailable: false,
      },
      {
        label: "Nst",
        key: "nst",
        iconClass: "text-white",
        iconName: "monitor_heart",
        tooltip: "Stations used for location",
        predictionAvailable: false,
      },
      {
        label: "Dmin",
        key: "dmin",
        valueSuffix: "km",
        fixedPoint: 2,
        iconClass: "text-white",
        iconName: "square_foot",
        tooltip: "Closest station distance",
        predictionAvailable: false,
      },
      {
        label: "Gap",
        key: "gap",
        iconClass: "text-white",
        iconName: "linear_scale",
        tooltip: "Azimuthal station gap",
        predictionAvailable: false,
      },
    ];
  }, []);

  const significanceMetrics = useMemo<StaticMetricConfig[]>(() => {
    return [
      {
        label: "Sig",
        key: "sig",
        iconClass: "text-white",
        iconName: "verified",
        tooltip: "Impact significance score",
        predictionAvailable: false,
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
        predictionAvailable: false,
      },
    ];
  }, [latest?.alert]);

  return {
    effectMetrics,
    geoMetrics,
    detectionMetrics,
    significanceMetrics,
  };
}
