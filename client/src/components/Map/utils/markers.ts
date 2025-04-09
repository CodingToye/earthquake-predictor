// components/Map/utils/markers.tsx

import * as L from "leaflet";

export function getMarkerIcon(magnitude: number): L.DivIcon {
  let className = "marker-pulse-wrapper";

  if (magnitude >= 8) {
    className += " marker-large"; // strong
  } else if (magnitude >= 7) {
    className += " marker-medium"; // moderate
  } else {
    className += " marker-small"; // small
  }

  return createIcon(className);
}

export function getStaticMarkerIcon(): L.DivIcon {
  let className = "marker-pulse-wrapper";
  className += " marker-static";

  return createIcon(className);
}

function createIcon(className: string): L.DivIcon {
  return L.divIcon({
    className: "", // still needed if you're targeting via divIcon CSS rules
    iconSize: [20, 20],
    html: `
      <div class="${className}">
        <div class="dot"></div>
        <div class="pulse-ring"></div>
        <div class="pulse-ring secondary"></div>
      </div>`,
  });
}
