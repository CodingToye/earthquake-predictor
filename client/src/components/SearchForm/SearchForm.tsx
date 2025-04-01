import Input from "../../shared/Input";
import {SearchFormType} from "./types";

export default function SearchForm({error, searchByLocation}: SearchFormType) {
  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
      await searchByLocation(e.currentTarget.value.trim());
    }
  };

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <>
      {error && <p className="text-red-600">{error}</p>}
      <Input
        inputType="text"
        placeholder="e.g. Tokyo..."
        onKeyDown={handleSearch}
      />
    </>
  );
}
