import { useGetMovieRecommendationsQuery } from "@/lib/features/apiSlice";
import MovieList from "./MovieList";
import { useEffect, useState } from "react";
import { Movie } from "@/lib/types";

const RecommendationList = ({ movieId }: { movieId: string }) => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const { data, error, isLoading } = useGetMovieRecommendationsQuery({
    movieId,
    page,
  });

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

  if (isLoading && page === 1) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center">Failed to load data</p>;

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold my-4">Recommendations</h2>
      <MovieList
        movies={movies}
        page={page}
        total_pages={data?.total_pages ?? 0}
        loadMoreMovies={loadMoreMovies}
        isLoading={false}
      />
    </div>
  );
};

export default RecommendationList;
