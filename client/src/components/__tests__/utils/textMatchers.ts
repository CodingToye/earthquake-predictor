// components/__tests__/utils/textMatchers.ts

/**
 * Creates a matcher function for getByText / queryByText etc...
 * checks if the elements text content includes all specified
 * substrings
 */

export function elementTextIncludesAll(...substrings: string[]) {
  return (_: unknown, el: Element | null): boolean => {
    const text = el?.textContent ?? "";
    return substrings.every((substr) => text.includes(substr));
  };
}
