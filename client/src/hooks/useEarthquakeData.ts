// hooks/useEarthquakeData.ts

import {useCallback, useEffect, useRef, useState} from "react";

import {EarthquakeData, PredictedMetricProps} from "./types";

export function useEarthquakeData() {
  const [latest, setLatest] = useState<EarthquakeData | null>(null);
  const [predictedMetrics, setPredictedMetrics] =
    useState<PredictedMetricProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [searchedLocation, setSearchedLocation] = useState<string | null>(null);
  const [nearbyEarthquakes, setNearbyEarthquakes] = useState<
    EarthquakeData[] | null
  >(null);

  const locationChangeCallback = useRef<((val: string) => void) | null>(null);

  const predictMetrics = async (lat: number, lon: number, dep: number) => {
    try {
      setPredictedMetrics(null);
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude: lat,
          longitude: lon,
          depth: dep,
        }),
      });
      const data = await response.json();
      setPredictedMetrics({
        magnitude: data.predicted_magnitude,
        tsunami: data.predicted_tsunami,
        mmi: data.predicted_mmi,
        cdi: data.predicted_cdi,
        depth: data.predicted_depth,
      });
    } catch (err) {
      setError("Prediction failed.");
      console.error(err);
    }
  };

  const fetchLatest = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:8000/latest");
      const data = await res.json();
      setLatest(data);
      predictMetrics(data.latitude, data.longitude, data.depth);
    } catch (err) {
      console.error(err);
      setError("Failed to load latest earthquake data");
    }
  }, []);

  const fetchNearbyEarthquakes = async (
    lat: number,
    lon: number,
    radius: number | null,
    magnitude?: {min: number; max: number} | null,
    yearRange?: {min: number; max: number} | null
  ) => {
    try {
      const params = new URLSearchParams({
        lat: lat.toString(),
        lon: lon.toString(),
      });

      if (radius !== null) {
        params.append("radius_km", radius.toString());
      }

      if (magnitude?.min !== undefined && magnitude?.max !== undefined) {
        params.append("mag_min", magnitude.min.toString());
        params.append("mag_max", magnitude.max.toString());
      }

      if (yearRange?.min !== undefined && yearRange?.max !== undefined) {
        params.append("year_min", yearRange.min.toString());
        params.append("year_max", yearRange.max.toString());
      }

      const url = `http://localhost:8000/nearby?${params.toString()}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch nearby earthquakes");
      const data = await res.json();
      setNearbyEarthquakes(data);
    } catch (err) {
      console.error(err);
      setError("Could not load nearby earthquakes");
    }
  };

  const searchByLocation = useCallback(
    async (
      query: string,
      radius: number | null,
      magnitude?: {min: number; max: number} | null,
      yearRange?: {min: number; max: number} | null
    ) => {
      try {
        const geoRes = await fetch(
          `http://localhost:8000/geocode?query=${encodeURIComponent(query)}`
        );
        const geoData = await geoRes.json();
        if (!geoData.length) throw new Error("Location not found");

        const lat = parseFloat(geoData[0].lat);
        const lon = parseFloat(geoData[0].lon);

        setSearchedLocation(query);
        locationChangeCallback.current?.(query);

        const latestRes = await fetch(
          `http://localhost:8000/latest-by-location?query=${encodeURIComponent(
            query
          )}`
        );

        if (latestRes.status === 404) {
          setNotice(
            `No exact match found for ${query}, showing closest result.`
          );
        } else if (!latestRes.ok) {
          throw new Error("Unexpected error when fetching location.");
        } else {
          const data = await latestRes.json();
          setLatest(data);
          setNotice(null);
          await predictMetrics(data.latitude, data.longitude, data.depth);
          await fetchNearbyEarthquakes(lat, lon, radius, magnitude, yearRange);
          return;
        }

        const fallbackRes = await fetch(
          `http://localhost:8000/nearest?lat=${lat}&lon=${lon}`
        );
        const fallbackData = await fallbackRes.json();
        setLatest(fallbackData);
        setNotice(
          `No exact match found. Showing nearest earthquake (${fallbackData.distance_km} km away).`
        );
        await predictMetrics(
          fallbackData.latitude,
          fallbackData.longitude,
          fallbackData.depth
        );

        await fetchNearbyEarthquakes(lat, lon, radius, magnitude, yearRange);
      } catch (err) {
        console.error(err);
        setError("Search failed.");
      }
    },
    []
  );

  useEffect(() => {
    fetchLatest();
  }, [fetchLatest]);

  return {
    latest,
    predictedMetrics,
    error,
    notice,
    searchedLocation,
    searchByLocation,
    setOnLocationChange: (cb: (value: string) => void) => {
      locationChangeCallback.current = cb;
    },
    nearbyEarthquakes,
  };
}
