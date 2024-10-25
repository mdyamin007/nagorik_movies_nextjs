// src/redux/tmdbApiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Movie, PopularMoviesResponse } from '../types'; 

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const tmdbApiSlice = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3',
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query<PopularMoviesResponse, number>({
      query: (page = 1) => `/movie/popular?api_key=${API_KEY}&page=${page}`, 
    }),
    getMovieById: builder.query<Movie, number>({
      query: (id) => `/movie/${id}?api_key=${API_KEY}`, 
    }),
  }),
});

export const { useGetPopularMoviesQuery, useGetMovieByIdQuery } = tmdbApiSlice;
