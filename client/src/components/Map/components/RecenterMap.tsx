// components/Map/components/RecenterMap.tsx

import {useEffect} from "react";
import {useMap} from "react-leaflet";

import {MapProps} from "../types";
export default function RecenterMap({latitude, longitude}: MapProps) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([latitude, longitude], map.getZoom(), {
      animate: true,
      duration: 1.2,
    });
  }, [latitude, longitude, map]);

  return null;
}
