import {useEffect} from "react";
import {useMap} from "react-leaflet";
import {MapViewProps} from "@/types/common";
export default function RecenterMap({latitude, longitude}: MapViewProps) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([latitude, longitude], map.getZoom(), {
      animate: true,
      duration: 1.2,
    });
  }, [latitude, longitude, map]);

  return null;
}
