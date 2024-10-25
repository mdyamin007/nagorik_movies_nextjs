export interface Recommendations {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface IMovieList {
  movies: Movie[];
  isLoading: boolean;
  page: number;
  total_pages: number;
  loadMoreMovies: () => void;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Actor {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string | null;
  title: string;
  vote_average: number;
  vote_count: number;
}

export interface MovieCredits {
  id: number;
  cast: Actor[];
  crew: Actor[];
}
