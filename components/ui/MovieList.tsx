"use client";
import { IMovieList } from "@/lib/types"
import Image from "next/image"
import { useRouter } from "next/navigation";

function MovieList({title, movies, isLoading, page, total_pages, loadMoreMovies}: IMovieList) {

    const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <li
            key={movie.id}
            className="dark:bg-black bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => router.push(`/movies/${movie.id}`)} 
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              width={200}
              height={300}
              loading="lazy"
              className="w-full h-auto"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              {/* Display Movie Rating */}
              <div className="flex items-center">
                <span className="text-yellow-500">
                  {'★'.repeat(Math.round(movie.vote_average / 2))}
                  {'☆'.repeat(5 - Math.round(movie.vote_average / 2))}
                </span>
                <span className="ml-2 text-gray-600">{movie.vote_average}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Load More Button */}
      {!isLoading && page < total_pages && (
        <div className="flex justify-center my-4">
          <button
            onClick={loadMoreMovies}
            className="bg-yellow-500 text-black py-2 px-4 rounded-md hover:bg-yellow-600 transition"
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  )
}

export default MovieList