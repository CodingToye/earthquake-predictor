import {act, renderHook, waitFor} from "@testing-library/react";

import {
  mockGeo,
  mockLatest as fallbackQuake,
  mockLatest,
  mockPrediction,
} from "@/components/__tests__/fixtures/earthquakes.fixtures";

import {mockFetchWithRoutes} from "../test-utils/mockFetch";
import {useEarthquakeData} from "../useEarthquakeData";

describe("useEarthquakeData", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    globalThis.fetch = jest.fn((url: RequestInfo) => {
      if (typeof url === "string" && url.includes("/latest")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockLatest),
        } as Response);
      }
      if (typeof url === "string" && url.includes("/predict")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPrediction),
        } as Response);
      }

      return Promise.reject(new Error("Unknown endpoint"));
    }) as jest.Mock;
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
    jest.resetAllMocks();
  });

  it("fetches latest earthquake and predicted metrics on on mount", async () => {
    const {result} = renderHook(() => useEarthquakeData());

    await waitFor(() => {
      expect(result.current.latest).toEqual(mockLatest);
      expect(result.current.predictedMetrics).toEqual({
        magnitude: 5.5,
        tsunami: 1,
        mmi: 3,
        cdi: 2,
        depth: 15,
      });
    });
  });

  it("sets error if fetchLatest fails", async () => {
    globalThis.fetch = jest.fn(() =>
      Promise.reject("Latest fetch failed")
    ) as jest.Mock;

    const {result} = renderHook(() => useEarthquakeData());

    await waitFor(() => {
      expect(result.current.error).toMatch(/Failed to load latest/i);
    });
  });
  it("sets error if predictMetrics fails", async () => {
    // Override fetch to succeed for /latest and fail for /predict
    globalThis.fetch = jest.fn((url: RequestInfo) => {
      if (typeof url === "string" && url.includes("/latest")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockLatest),
        } as Response);
      }
      if (typeof url === "string" && url.includes("/predict")) {
        return Promise.reject("Prediction endpoint down");
      }

      return Promise.reject("Unknown endpoint");
    }) as jest.Mock;

    const {result} = renderHook(() => useEarthquakeData());

    await waitFor(() => {
      expect(result.current.error).toMatch(/prediction failed/i);
    });
  });

  it("handles successful location search and updates state", async () => {
    globalThis.fetch = jest.fn((url: RequestInfo) => {
      if (typeof url !== "string") return Promise.reject("bad url");

      if (url.includes("/geocode")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockGeo),
        } as Response);
      }

      if (url.includes("/latest-by-location")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockLatest),
        } as Response);
      }

      if (url.includes("/predict")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPrediction),
        } as Response);
      }

      if (url.includes("/nearby")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([{id: 1}]),
        } as Response);
      }

      return Promise.reject("unknown url");
    }) as jest.Mock;

    const {result} = renderHook(() => useEarthquakeData());

    await act(async () => {
      await result.current.searchByLocation("Tokyo", 100);
    });

    expect(result.current.latest).toEqual(mockLatest);
    expect(result.current.predictedMetrics).toEqual(expect.any(Object));
    expect(result.current.searchedLocation).toBe("Tokyo");
    expect(result.current.notice).toBeNull();
  });

  it("handles fallback when latest-by-location returns 404", async () => {
    globalThis.fetch = jest.fn((url: RequestInfo) => {
      if (typeof url !== "string") return Promise.reject("bad url");

      if (url.includes("/geocode")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockGeo),
        } as Response);
      }

      if (url.includes("/latest-by-location")) {
        return Promise.resolve({status: 404} as Response);
      }

      if (url.includes("/nearest")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(fallbackQuake),
        } as Response);
      }

      if (url.includes("/predict")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPrediction),
        } as Response);
      }

      if (url.includes("/nearby")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([]),
        } as Response);
      }

      return Promise.reject("unknown url");
    }) as jest.Mock;

    const {result} = renderHook(() => useEarthquakeData());

    await act(async () => {
      await result.current.searchByLocation("Nowhereville", 100);
    });

    expect(result.current.latest).toEqual(fallbackQuake);
    expect(result.current.notice).toMatch(/no exact match/i);
  });

  it("sets error if location not found", async () => {
    globalThis.fetch = jest.fn((url: RequestInfo) => {
      if (typeof url === "string" && url.includes("/geocode")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([]),
        } as Response);
      }
      return Promise.reject("no fallback");
    }) as jest.Mock;

    const {result} = renderHook(() => useEarthquakeData());

    await act(async () => {
      await result.current.searchByLocation("Unknown", 100);
    });

    expect(result.current.error).toMatch(/search failed/i);
  });

  it("calls location change callback when set", async () => {
    const mockFn = jest.fn();

    globalThis.fetch = jest.fn((url: RequestInfo) => {
      if (typeof url === "string" && url.includes("/geocode")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([{lat: "35", lon: "139"}]),
        } as Response);
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      } as Response);
    }) as jest.Mock;

    const {result} = renderHook(() => useEarthquakeData());
    result.current.setOnLocationChange(mockFn);

    await act(async () => {
      await result.current.searchByLocation("Tokyo", 100);
    });

    expect(mockFn).toHaveBeenCalledWith("Tokyo");
  });

  // Test magnitude params append 78-79
  it("appends mag_min and mag_max to fetchNearbyEarthquakes query", async () => {
    let calledNearbyUrl: string | null = null;

    mockFetchWithRoutes([
      {
        path: "/geocode",
        response: mockGeo,
      },
      {
        path: "/latest-by-location",
        response: mockLatest,
      },
      {
        path: "/predict",
        response: mockPrediction,
      },
      {
        path: "/nearby",
        response: {
          ...mockLatest,
          latitude: 36,
          longitude: 140,
          depth: 12,
          distance_km: 10,
        },
      },
    ]);

    // Capture URL of /nearby call
    const originalFetch = globalThis.fetch as jest.Mock;
    (globalThis.fetch as jest.Mock) = jest.fn((...args) => {
      const url = args[0] as string;
      if (url.includes("/nearby")) {
        calledNearbyUrl = url;
      }
      return originalFetch(...args);
    });

    const {result} = renderHook(() => useEarthquakeData());

    await act(async () => {
      await result.current.searchByLocation("Tokyo", 100, {min: 4, max: 7});
    });

    expect(calledNearbyUrl).not.toBeNull();
    expect(calledNearbyUrl).toContain("mag_min=4");
    expect(calledNearbyUrl).toContain("mag_max=7");
  });

  it("appends year_min and year_max to fetchNearbyEarthquakes query", async () => {
    let calledNearbyUrl: string | null = null;

    mockFetchWithRoutes([
      {
        path: "/geocode",
        response: mockGeo,
      },
      {
        path: "/latest-by-location",
        response: mockLatest,
      },
      {
        path: "/predict",
        response: mockPrediction,
      },
      {
        path: "/nearby",
        response: {
          ...mockLatest,
          latitude: 36,
          longitude: 140,
          depth: 12,
          distance_km: 10,
        },
      },
    ]);

    // Capture URL of /nearby call
    const originalFetch = globalThis.fetch as jest.Mock;
    (globalThis.fetch as jest.Mock) = jest.fn((...args) => {
      const url = args[0] as string;
      if (url.includes("/nearby")) {
        calledNearbyUrl = url;
      }
      return originalFetch(...args);
    });

    const {result} = renderHook(() => useEarthquakeData());

    await act(async () => {
      await result.current.searchByLocation(
        "Tokyo",
        100,
        {min: 4, max: 7},
        {
          min: 2003,
          max: 2023,
        }
      );
    });

    expect(calledNearbyUrl).not.toBeNull();
    expect(calledNearbyUrl).toContain("year_min=2003");
    expect(calledNearbyUrl).toContain("year_max=2023");
  });

  it("returns a fallback notice when no exact match is found", async () => {
    mockFetchWithRoutes([
      {
        path: "/geocode",
        response: mockGeo, // needed for lat/lon to work
      },
      {
        path: "/latest-by-location",
        status: 404,
        response: {},
      },
      {
        path: "/nearest",
        response: {
          ...mockLatest,
          distance_km: 20,
        },
      },
      {
        path: "/predict",
        response: mockPrediction,
      },
      {
        path: "/nearby",
        response: [],
        ok: false,
      },
    ]);

    const {result} = renderHook(() => useEarthquakeData());

    await act(async () => {
      await result.current.searchByLocation("Tokyo", 100);
    });

    await waitFor(() => {
      expect(result.current.notice).toMatch(
        "No exact match found. Showing nearest earthquake (20 km away)."
      );
    });
  });

  it("throws error if latest-by-location returns unexpected error", async () => {
    mockFetchWithRoutes([
      {
        path: "/geocode",
        response: mockGeo, // needed for lat/lon to work
      },
      {
        path: "/latest-by-location",
        ok: false,
        status: 500,
        response: {},
      },
    ]);

    const {result} = renderHook(() => useEarthquakeData());

    await act(async () => {
      await result.current.searchByLocation("Tokyo", 100);
    });

    await waitFor(() => {
      expect(result.current.error).toMatch("Search failed.");
    });
  });
});

// Test latestRes not ok and throwing error 130
