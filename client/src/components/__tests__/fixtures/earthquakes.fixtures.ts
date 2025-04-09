// components/__tests__/fixtures/earthquakes.fixtures.ts

import {EarthquakeData} from "@/hooks/types";

export const MOCK_LOCATION = "Mockville";

export const createMockEarthquake = (
  overrides: Partial<EarthquakeData> = {}
): EarthquakeData => ({
  title: "Mock Quake",
  date_time: "2023-10-15T14:30:00Z",
  latitude: 35.0,
  longitude: 139.0,
  magnitude: 5.5,
  depth: 10,
  tsunami: 0,
  mmi: 4,
  cdi: 3,
  location: MOCK_LOCATION,
  country: "Mockland",
  distance_km: 20,
  ...overrides,
});

export const mockLatest = {
  latitude: 35,
  longitude: 139,
  depth: 10,
  magnitude: 6,
  distance_km: 50,
};

export const mockPrediction = {
  predicted_magnitude: 5.5,
  predicted_tsunami: 1,
  predicted_mmi: 3,
  predicted_cdi: 2,
  predicted_depth: 15,
};

export const mockGeo = [{lat: "35", lon: "139"}];
