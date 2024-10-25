"use client";
import RecommendationList from "@/components/RecommendationList";
import Skeleton from "@/components/ui/SkeletonDetails";
import {
  useGetMovieDetailsQuery,
  useGetMovieCreditsQuery,
} from "@/lib/features/apiSlice";
import { addFavorite, removeFavorite } from "@/lib/features/favoritesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { Movie } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

interface MovieDetailsProps {
  params: { id: string };
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ params }) => {
  const movieId = params.id;
  const { data: movieDetails } = useGetMovieDetailsQuery(movieId);
  const { data: credits } = useGetMovieCreditsQuery(movieId);

  const dispatch = useAppDispatch();

  const favorites =
    useAppSelector((state: RootState) => state.favorites.movies) || [];
  const isFavorite = favorites.some(
    (movie: Movie) => movie.id.toString() === movieId
  );

  const toggleFavorite = () => {
    if (movieDetails) {
      dispatch(
        isFavorite ? removeFavorite(movieDetails) : addFavorite(movieDetails)
      );
    }
  };

  if (!movieDetails || !credits) return <Skeleton />;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{movieDetails.title}</h1>
      {movieDetails.poster_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
          width={500}
          height={750}
          className="w-full max-w-sm mx-auto mb-6"
        />
      ) : (
        <div className="w-1/4 h-96 bg-gray-300 flex items-center justify-center mx-auto">
          <p className="text-gray-600">No poster available</p>
        </div>
      )}

      {movieDetails.overview && (
        <p className="mt-4 text-gray-600">{movieDetails.overview}</p>
      )}

      {movieDetails.tagline && (
        <p className="mt-2 text-gray-500">
          <strong>Tagline:</strong> {movieDetails.tagline}
        </p>
      )}

      {movieDetails.release_date && (
        <p className="mt-2 text-gray-500">
          <strong>Release Date:</strong>{" "}
          {new Date(movieDetails.release_date).toLocaleDateString()}
        </p>
      )}

      {movieDetails.runtime && movieDetails.runtime > 0 && (
        <p className="mt-2 text-gray-500">
          <strong>Runtime:</strong> {movieDetails.runtime} minutes
        </p>
      )}

      {movieDetails.spoken_languages &&
        movieDetails.spoken_languages.length > 0 && (
          <p className="mt-2 text-gray-500">
            <strong>Languages:</strong>{" "}
            {movieDetails.spoken_languages
              .map((language) => language.english_name)
              .join(", ")}
          </p>
        )}
      {movieDetails.budget !== 0 && (
        <p className="mt-2 text-gray-500">
          <strong>Budget:</strong> ${movieDetails.budget.toLocaleString()}
        </p>
      )}
      {movieDetails.revenue !== 0 && (
        <p className="mt-2 text-gray-500">
          <strong>Revenue:</strong> ${movieDetails.revenue.toLocaleString()}
        </p>
      )}
      {movieDetails.homepage && (
        <p className="mt-2 text-gray-500">
          <strong>IMDB ID:</strong> {movieDetails.imdb_id}
        </p>
      )}

      {movieDetails.vote_average > 0 && (
        <p className="mt-2 text-gray-500">
          <strong>Vote Average:</strong> {movieDetails.vote_average.toFixed(1)}
          <span className="text-yellow-500 mx-1">
            {"★".repeat(Math.round(movieDetails.vote_average / 2))}
            {"☆".repeat(5 - Math.round(movieDetails.vote_average / 2))}
          </span>
          ({movieDetails.vote_count} votes)
        </p>
      )}

      {movieDetails.popularity && (
        <p className="mt-2 text-gray-500">
          <strong>Popularity:</strong> {movieDetails.popularity}
        </p>
      )}

      {movieDetails.status && (
        <p className="mt-2 text-gray-500">
          <strong>Status:</strong> {movieDetails.status}
        </p>
      )}

      {movieDetails.production_countries &&
        movieDetails.production_countries.length > 0 && (
          <p className="mt-2 text-gray-500">
            <strong>Production Countries:</strong>{" "}
            {movieDetails.production_countries
              .map((country) => country.name)
              .join(", ")}
          </p>
        )}
      {movieDetails.production_companies &&
        movieDetails.production_companies.length > 0 && (
          <p className="mt-2 text-gray-500">
            <strong>Production Companies:</strong>{" "}
            {movieDetails.production_companies
              .map((company) => company.name)
              .join(", ")}
          </p>
        )}
      {movieDetails?.homepage && (
        <p className="mt-2 text-gray-500">
          <strong>Homepage:</strong>{" "}
          <Link
            href={movieDetails.homepage ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {movieDetails.homepage}
          </Link>
        </p>
      )}

      {isFavorite ? (
        <button
          onClick={toggleFavorite}
          className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded my-4"
        >
          Remove from watchlist
        </button>
      ) : (
        <button
          onClick={toggleFavorite}
          className="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded my-4"
        >
          Add to watchlist
        </button>
      )}

      {movieDetails?.backdrop_path && (
        <Image
          src={`https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`}
          alt={`${movieDetails.title} backdrop`}
          width={1280}
          height={720}
          className="w-full mb-6"
          loading="lazy"
          unoptimized
        />
      )}

      {/* Genres Section */}
      {movieDetails.genres && movieDetails.genres.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-2">Genres</h2>
          <ul className="flex flex-wrap">
            {movieDetails.genres.map((genre) => (
              <li
                key={genre.id}
                className="bg-yellow-500 text-black rounded-full px-3 py-1 mr-2 mb-2"
              >
                {genre.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cast Section */}
      {credits && credits.cast && credits.cast.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-2">Cast</h2>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {credits.cast.map((actor) => (
              <li key={actor.id} className="text-center">
                {actor.profile_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                    alt={actor.name}
                    width={150}
                    height={225}
                    className="rounded-lg mx-auto mb-2"
                    loading="lazy"
                    unoptimized
                  />
                ) : (
                  <div className="bg-gray-300 rounded-lg h-[225px] w-[150px] mx-auto mb-2" />
                )}
                <p className="font-semibold">{actor.name}</p>
                <p className="text-gray-500">{actor.character}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations Section */}
      <RecommendationList movieId={movieId} />
    </div>
  );
};

export default MovieDetails;
