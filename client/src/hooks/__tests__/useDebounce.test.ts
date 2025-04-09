// hooks/__tests__/useDebounce.test.ts

import {act, renderHook} from "@testing-library/react";

import {useDebounce} from "../useDebounce";

jest.useFakeTimers();

describe("useDebounce", () => {
  it("returns initial value immediately", () => {
    const {result} = renderHook(() => useDebounce("initial", 500));
    expect(result.current).toBe("initial");
  });

  it("updates value after delay", () => {
    let value = "initial";
    const {result, rerender} = renderHook(() => useDebounce(value, 500));

    value = "updated";
    rerender();

    // Still shows old value immediately
    expect(result.current).toBe("initial");

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe("updated");
  });

  it("resets timer if value changes quickly", () => {
    let value = "one";
    const {result, rerender} = renderHook(() => useDebounce(value, 500));

    value = "two";
    rerender();

    act(() => {
      jest.advanceTimersByTime(300); // Not enough time
    });

    expect(result.current).toBe("one");

    value = "three";
    rerender();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe("three");
  });
});
