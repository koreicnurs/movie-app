import React from 'react';
import type { Movie } from './types';
import Image from 'next/image';

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div
      className="bg-white dark:bg-gray-900 rounded shadow hover:shadow-lg transition cursor-pointer flex flex-col"
      onClick={onClick}
      data-testid={`movie-card-${movie.id}`}
    >
      {movie.poster_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={500}
          height={288}
          className="rounded-t w-full h-72 object-cover"
        />
      ) : (
        <div className="h-72 flex items-center justify-center bg-gray-200 text-gray-500">
          Нет постера
        </div>
      )}
      <div className="p-4 flex-1 flex flex-col">
        <h2 className="font-bold text-lg mb-2 line-clamp-1 text-blue-600 dark:text-blue-400">{movie.title}</h2>
        <p className="text-sm text-gray-500 mb-2">{movie.release_date}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{movie.overview}</p>
      </div>
    </div>
  );
}; 