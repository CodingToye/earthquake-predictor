import {render} from "@testing-library/react";

import {baseMapProps} from "@/components/__tests__/fixtures/map.fixtures";

import {MapProps} from "../../types";
import RecenterMap from "../RecenterMap";

// Mock react-leaflet's useMap
const flyTo = jest.fn();
const getZoom = jest.fn(() => 5); // mock zoom level

jest.mock("react-leaflet", () => ({
  useMap: () => ({
    flyTo,
    getZoom,
  }),
}));

describe("RecenterMap", () => {
  const props: MapProps = baseMapProps;

  it("calls map.flyTo with correct coords and zoom", () => {
    render(<RecenterMap {...props} />);
    expect(flyTo).toHaveBeenCalledWith([35.6762, 139.6503], 5, {
      animate: true,
      duration: 1.2,
    });
  });
});
