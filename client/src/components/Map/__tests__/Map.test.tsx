// components/Map/__tests__/Map.test.tsx

import {fireEvent, screen} from "@testing-library/react";

import {createMockEarthquake} from "@/components/__tests__/fixtures/earthquakes.fixtures";
import {MOCK_LOCATION} from "@/components/__tests__/fixtures/earthquakes.fixtures";
import {elementTextIncludesAll} from "@/components/__tests__/utils/textMatchers";

import {setupMap} from "../test-utils/mapSetup";

describe("Map", () => {
  it("renders map with a marker popup", async () => {
    setupMap();

    // Simulate click on the primary marker to trigger the popup
    const marker = document.querySelector(".leaflet-marker-icon");
    fireEvent.click(marker!);

    const results = screen.getAllByText(elementTextIncludesAll("Lat.", "Lon."));
    expect(results.length).toBeGreaterThan(0);
  });

  it("renders nearby earthquake markers", async () => {
    const nearby = [
      createMockEarthquake({latitude: 35.1, longitude: 139.1, magnitude: 5.2}),
    ];
    setupMap({mapPropsOverrides: {nearbyEarthquakes: nearby}});

    // Get all markers, second one is nearby quake
    const markers = document.querySelectorAll(".leaflet-marker-icon");
    expect(markers.length).toBeGreaterThan(1);

    // Simulate clicking the second marker (nearby one)
    fireEvent.click(markers[1]);

    expect(
      await screen.findByText(new RegExp(MOCK_LOCATION))
    ).toBeInTheDocument();
  });

  it("does not render duplicate nearby marker for current location", () => {
    const nearby = [
      createMockEarthquake({latitude: 35.6762, longitude: 139.6503}), // same as center
    ];

    setupMap({mapPropsOverrides: {nearbyEarthquakes: nearby}});

    const markers = document.querySelectorAll(".leaflet-marker-icon");
    // Only the primary marker should render
    expect(markers.length).toBe(1);
  });

  it("handles null nearbyEarthquakes gracefully", () => {
    setupMap({mapPropsOverrides: {nearbyEarthquakes: null as any}});
    const markers = document.querySelectorAll(".leaflet-marker-icon");
    expect(markers.length).toBe(1);
  });

  it("uses fallback magnitude when none is provided", () => {
    setupMap({mapPropsOverrides: {magnitude: undefined}});

    const markers = document.querySelectorAll(".leaflet-marker-icon");
    expect(markers.length).toBe(1); // Still renders
  });

  it("renders with no nearbyEarthquakes prop (uses default [])", () => {
    setupMap({mapPropsOverrides: {nearbyEarthquakes: undefined}});

    const markers = document.querySelectorAll(".leaflet-marker-icon");
    expect(markers.length).toBe(1); // Only primary marker
  });
});
