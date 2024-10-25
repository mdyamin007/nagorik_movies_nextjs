export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
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
