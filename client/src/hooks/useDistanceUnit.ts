// hooks/useDiscountUnit.ts

export function useDistanceUnit(showImperial: boolean = false) {
  const convertDistance = (km: number, precision: number = 0) =>
    showImperial ? parseFloat((km * 0.621371).toFixed(precision)) : km;

  const suffix = showImperial ? "mi" : "km";

  return {convertDistance, suffix};
}
