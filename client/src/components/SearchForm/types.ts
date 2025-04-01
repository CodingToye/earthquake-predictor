// components/SearchForm/types

export type SearchFormType = {
  error: string | null;
  searchByLocation: (query: string) => Promise<void>;
};
