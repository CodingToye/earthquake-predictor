// components/SearchForm/types

export type SearchFormProps = {
  error: string | null;
  searchByLocation: (query: string) => Promise<void>;
};
