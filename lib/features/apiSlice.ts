// src/redux/tmdbApiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { MoviesResponse } from "../types";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const tmdbApiSlice = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query<MoviesResponse, number>({
      query: (page = 1) => `/movie/popular?api_key=${API_KEY}&page=${page}`,
    }),
    getSearchMovies: builder.query<
      MoviesResponse,
      { query: string; page: number }
    >({
      query: ({ query, page }: { query: string; page: number }) =>
        `/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,
    }),
  }),
});

export const { useGetPopularMoviesQuery, useGetSearchMoviesQuery } =
  tmdbApiSlice;
