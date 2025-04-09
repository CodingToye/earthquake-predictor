// hooks/test-utils/MockFetch.ts

type FetchRouteHandler = {
  path: string;
  response: any;
  onCall?: (url: string) => void;
  status?: number;
  ok?: boolean;
};

export function mockFetchWithRoutes(routes: FetchRouteHandler[]) {
  globalThis.fetch = jest.fn((input: RequestInfo) => {
    const url = typeof input === "string" ? input : input.toString();
    const matchedRoute = routes.find((route) => url.includes(route.path));

    if (!matchedRoute) {
      return Promise.reject(new Error(`Unhandled fetch URL: ${url}`));
    }

    matchedRoute.onCall?.(url);

    return Promise.resolve({
      ok: matchedRoute.ok ?? true,
      status: matchedRoute.status ?? 200,
      json: () => Promise.resolve(matchedRoute.response),
    }) as Promise<Response>;
  }) as jest.Mock;
}
