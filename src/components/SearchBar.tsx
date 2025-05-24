import React, { useEffect, useState } from "react"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

type SearchBarProps = {
  initialQuery?: string;
  onSearch: (query: string) => void;
};

export function SearchBar({ initialQuery = "", onSearch }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);

  // Update local state when initialQuery changes
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <Input
        id="search"
        type="search"
        placeholder="Search ideas..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-[512px] max-w-full"
      />
      <Button type="submit" variant="primary">
        Search
      </Button>
      {query && (
        <Button type="button" variant="secondary" onClick={handleClear}>
          Clear
        </Button>
      )}
    </form>
  );
}
