// components/SearchForm/SearchForm.test.tsx

import {fireEvent, screen, waitFor} from "@testing-library/react";

import {setupSearchForm} from "../test-utils/searchFormSetup";

describe("SearchForm", () => {
  it("calls searchByLocation with input value on Enter key", async () => {
    const mockSearch = jest.fn();
    setupSearchForm({searchFormPropsOverrides: {searchByLocation: mockSearch}});

    const input = screen.getByPlaceholderText(/e.g. Tokyo/i);
    fireEvent.change(input, {target: {value: "Berlin"}});
    fireEvent.keyDown(input, {key: "Enter", code: "Enter"});

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith("Berlin");
    });
  });

  it("does not call searchByLocation on non-enter key", () => {
    const mockSearch = jest.fn();
    setupSearchForm({searchFormPropsOverrides: {searchByLocation: mockSearch}});

    const input = screen.getByPlaceholderText(/e.g. Tokyo/i);
    fireEvent.change(input, {target: {value: "Paris"}});
    fireEvent.keyDown(input, {key: "a", code: "KeyA"});

    expect(mockSearch).not.toHaveBeenCalled();
  });

  it("does not search on empty input", () => {
    const mockSearch = jest.fn();
    setupSearchForm({searchFormPropsOverrides: {searchByLocation: mockSearch}});

    const input = screen.getByPlaceholderText(/e.g. Tokyo/);
    fireEvent.keyDown(input, {key: "Enter", code: "Enter"});

    expect(mockSearch).not.toHaveBeenCalled();
  });

  it("renders error message when error is provided", () => {
    setupSearchForm({searchFormPropsOverrides: {error: "Location not found"}});

    expect(screen.getByText(/location not found/i)).toBeInTheDocument();
  });
});
