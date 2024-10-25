"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SearchBar() {
    const [query, setQuery] = useState("");
    const router = useRouter();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(query)
    router.push(`/search/${query}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center w-2/3 justify-center">
      <input
        type="text"
        name="search"
        placeholder="Search Movies..."
        className="p-2 rounded-l-md  text-black dark:bg-gray-700 dark:text-white w-3/5 focus:outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="bg-yellow-500 dark:bg-yellow-400  text-black py-2 px-4 rounded-r-md hover:bg-yellow-600 dark:hover:bg-yellow-500 transition"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
