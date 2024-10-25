"use client";
import MovieList from "@/components/MovieList";
import { useGetSearchMoviesQuery } from "@/lib/features/apiSlice";
import { Movie } from "@/lib/types";
import { useEffect, useState } from "react";

function MovieSearch({ params }: { params: { query: string } }) {
  const [page, setPage] = useState(1);
  const { query } = params;
  const [movies, setMovies] = useState<Movie[]>([]);

  const { data, error, isLoading } = useGetSearchMoviesQuery({ query, page });

  useEffect(() => {
    if (data && data.results) {
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
    }
  }, [data]);

  const loadMoreMovies = () => {
    if (data?.total_pages && page < data.total_pages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (isLoading && page === 1) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          Search results for: {decodeURIComponent(query)}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (error)
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">Failed to load data</p>
      </div>
    );

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          Search results for: {decodeURIComponent(query)}
        </h1>
        <MovieList
          isLoading={isLoading}
          movies={movies}
          loadMoreMovies={loadMoreMovies}
          page={page}
          total_pages={data?.total_pages ?? 0}
        />
      </div>
    </div>
  );
}

export default MovieSearch;
