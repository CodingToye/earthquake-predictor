// components/Map/test-utils/mapSetup.tsx
import {render} from "@testing-library/react";

import {baseMapProps} from "@/components/__tests__/fixtures/map.fixtures";

import Map from "../Map";
import {MapProps} from "../types";

type SetupMapOptions = {
  mapPropsOverrides?: Partial<MapProps>;
};

export const setupMap = ({mapPropsOverrides}: SetupMapOptions = {}) => {
  const props = {
    ...baseMapProps,
    ...mapPropsOverrides,
  };

  return render(<Map {...props} />);
};
