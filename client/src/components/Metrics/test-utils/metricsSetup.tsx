// components/Metrics/test-utils/metricsSetup.tsx

// import { baseLatestMetrics } from '@/components/__tests__/fixtures/metrics.fixtures'
import {render} from "@testing-library/react";

import {createMockEarthquake} from "@/components/__tests__/fixtures/earthquakes.fixtures";
import {basePredictedMetrics} from "@/components/__tests__/fixtures/metrics.fixtures";
import {EarthquakeData} from "@/hooks/types";

import {EffectMetrics, GeoMetrics} from "../Metrics";

type SetupOptions = {
  latestOverrides?: Partial<EarthquakeData>;
  predictedOverrides?: Partial<Record<string, number>>;
  useNullLatest?: boolean;
};

export const setupEffectMetrics = ({
  latestOverrides = {},
  predictedOverrides = {},
  useNullLatest = false,
}: SetupOptions = {}) => {
  const latest = useNullLatest ? null : createMockEarthquake(latestOverrides);
  const predicted = {
    ...basePredictedMetrics,
    ...predictedOverrides,
  };

  return render(<EffectMetrics latest={latest} predictedMetrics={predicted} />);
};

export const setupGeoMetrics = ({latestOverrides = {}}: SetupOptions = {}) => {
  const latest = createMockEarthquake(latestOverrides);

  return render(<GeoMetrics latest={latest} />);
};
