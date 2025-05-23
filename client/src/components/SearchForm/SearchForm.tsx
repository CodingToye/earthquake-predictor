// components/SearchForm/SearchForm.tsx

import Input from "@/shared/Input";

import {SearchFormProps} from "./types";

export default function SearchForm({error, searchByLocation}: SearchFormProps) {
  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
      await searchByLocation(e.currentTarget.value.trim());
    }
  };

  return (
    <div className="w-full flex flex-1">
      {error && <p className="text-red-600">{error}</p>}
      <Input inputType="text" placeholder="Tokyo..." onKeyDown={handleSearch} />
    </div>
  );
}
