// components/Map/types.ts

import {EarthquakeData} from "@/hooks/types";

export interface MapProps {
  latitude: number;
  longitude: number;
  magnitude?: number;
  showMultiple?: boolean;
  nearbyEarthquakes?: EarthquakeData[] | null;
}
