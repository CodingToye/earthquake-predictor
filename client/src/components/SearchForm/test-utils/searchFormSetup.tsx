// components/SearchForm/test-utils/searchFormSetup.tsx

import {render} from "@testing-library/react";

import {baseSearchFormProps} from "@/components/__tests__/fixtures/searchForm.fixtures";

import SearchForm from "../SearchForm";
import {SearchFormProps} from "../types";

type SetupOptions = {
  searchFormPropsOverrides?: Partial<SearchFormProps>;
};

export const setupSearchForm = ({
  searchFormPropsOverrides,
}: SetupOptions = {}) => {
  const props = {
    ...baseSearchFormProps,
    ...searchFormPropsOverrides,
  };
  return render(<SearchForm {...props} />);
};
