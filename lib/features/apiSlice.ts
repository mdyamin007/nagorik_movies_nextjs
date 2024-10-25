// src/redux/tmdbApiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  MovieCredits,
  Movie,
  MoviesResponse,
  Recommendations,
} from "../types";

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
      query: ({ query, page = 1 }: { query: string; page: number }) =>
        `/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,
    }),
    getMovieDetails: builder.query<Movie, string>({
      query: (movieId) => `/movie/${movieId}?api_key=${API_KEY}`,
    }),
    getMovieCredits: builder.query<MovieCredits, string>({
      query: (movieId) => `/movie/${movieId}/credits?api_key=${API_KEY}`,
    }),
    getMovieRecommendations: builder.query<
      Recommendations,
      { movieId: string; page: number }
    >({
      query: ({ movieId, page = 1 }) =>
        `/movie/${movieId}/recommendations?api_key=${API_KEY}&page=${page}`,
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useGetSearchMoviesQuery,
  useGetMovieDetailsQuery,
  useGetMovieCreditsQuery,
  useGetMovieRecommendationsQuery,
} = tmdbApiSlice;
