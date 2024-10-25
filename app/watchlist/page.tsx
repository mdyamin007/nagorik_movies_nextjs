"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { removeFavorite } from "@/lib/features/favoritesSlice";
import { RootState } from "@/lib/store";
import { Movie } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const Watchlist: FC = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(
    (state: RootState) => state.favorites.movies
  );

  const handleRemove = (movie: Movie) => {
    dispatch(removeFavorite(movie));
  };

  if (!favorites.length) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-6">Your Watchlist is Empty</h1>
        <p className="text-gray-600">
          Add movies to your watchlist to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">My Watchlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((movie) => (
          <div
            key={movie.id}
            className="text-center py-4 bg-gray-100 dark:bg-black rounded-lg shadow-lg flex flex-col items-center justify-center hover:scale-105 transition"
          >
            <Link href={`/movies/${movie.id}`}>
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={300}
                height={300}
                className="rounded-lg mb-4 object-cover"
              />
            </Link>
            <h2 className="text-lg font-semibold">{movie.title}</h2>
            <button
              onClick={() => handleRemove(movie)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Remove from Watchlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
