// components/Map/utils/__tests__/markers.test.ts

import {getMarkerIcon, getStaticMarkerIcon} from "../markers";

describe("getMarkerIcon", () => {
  it("returns a small icon for magnitude < 7", () => {
    const icon = getMarkerIcon(6.5);
    expect(icon.options.html).toContain("marker-small");
  });

  it("returns medium icon for magnitude > 7", () => {
    const icon = getMarkerIcon(7.2);
    expect(icon.options.html).toContain("marker-medium");
  });

  it("returns large icon for magnitude > 8", () => {
    const icon = getMarkerIcon(8.1);
    expect(icon.options.html).toContain("marker-large");
  });
});

describe("getStaticMarkerIcon", () => {
  it("returns icon with static class", () => {
    const icon = getStaticMarkerIcon();
    expect(icon.options.html).toContain("marker-static");
  });
});
