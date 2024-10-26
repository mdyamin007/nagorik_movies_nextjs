"use client";

import { useState, useEffect } from "react";
import { useGetPopularMoviesQuery } from "@/lib/features/apiSlice";
import { Movie } from "@/lib/types";
import MovieList from "./MovieList";

const PopularMovies = () => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const { data, isLoading } = useGetPopularMoviesQuery(page);

  useEffect(() => {
    if (data && data.results) {
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
    }
  }, [data]);

  // Load More function
  const loadMoreMovies = () => {
    if (data?.total_pages && page < data.total_pages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // if (isLoading && page === 1) return <p className="text-center">Loading...</p>;
  // if (error) return <p className="text-center">Failed to load data</p>;

  return (
    <MovieList
      isLoading={isLoading}
      movies={movies}
      loadMoreMovies={loadMoreMovies}
      page={page}
      total_pages={data?.total_pages ?? 0}
    />
  );
};

export default PopularMovies;
