// components/Metrics/components/test-utils/metricSetup.tsx

import {render} from "@testing-library/react";

import {baseMetricProps} from "@/components/__tests__/fixtures/metrics.fixtures";

import Metric from "../Metric";

type SetupOptions = {
  propOverrides?: Partial<typeof baseMetricProps>;
};

export const setupMetric = ({propOverrides = {}}: SetupOptions = {}) => {
  const props = {
    ...baseMetricProps,
    ...propOverrides,
  };

  return render(<Metric {...props} />);
};
