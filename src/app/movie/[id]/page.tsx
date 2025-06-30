'use client';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';
import { tmdbApi } from '@/shared/api/tmdb';
import { fetchMovieCredits, CastMember } from '@/entities/movie/api';
import Image from 'next/image';
import React from 'react';
import { Loader } from '@/shared/ui/Loader';
import { EmptyState } from '@/shared/ui/EmptyState';
import { BackButton } from '@/features/back-button/BackButton';

interface Genre {
  id: number;
  name: string;
}

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  genres: Genre[];
  vote_average: number;
  runtime: number;
  tagline: string;
}

export default function MovieDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['movie', id],
    queryFn: async () => {
      const { data } = await tmdbApi.get<MovieDetails>(`/movie/${id}`);
      return data;
    },
    enabled: !!id,
  });

  const { data: cast, isLoading: isCastLoading } = useQuery({
    queryKey: ['movie-cast', id],
    queryFn: () => fetchMovieCredits(id),
    enabled: !!id,
  });

  if (isLoading) return <Loader />;
  if (isError) return <div className="text-center py-10 text-red-500 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950">Ошибка загрузки. <button onClick={() => refetch()}>Повторить</button></div>;
  if (!data) return <EmptyState text="Фильм не найден" />;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950 transition-colors duration-500">
      <div className="container mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row gap-12 md:gap-16 items-center md:items-start animate-fade-in">
        <div className="relative shadow-2xl rounded-xl overflow-hidden group">
          {data.poster_path && (
            <Image
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              alt={data.title}
              width={400}
              height={600}
              className="rounded-xl group-hover:scale-105 transition-transform duration-500 shadow-lg"
              priority
            />
          )}
          <BackButton className="absolute top-4 left-4" />
        </div>
        <div className="flex-1 max-w-2xl bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-xl p-8 md:p-10 backdrop-blur-md animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-700 dark:text-blue-400 drop-shadow-lg">{data.title} <span className="text-gray-500 text-2xl">({data.release_date.slice(0, 4)})</span></h1>
          {data.tagline && <p className="italic text-blue-500 dark:text-blue-300 mb-4 text-lg">{data.tagline}</p>}
          <div className="mb-4 flex flex-wrap gap-4">
            <span className="inline-block bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-semibold">Рейтинг: {data.vote_average}</span>
            <span className="inline-block bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-100 px-3 py-1 rounded-full text-sm font-semibold">Длительность: {data.runtime} мин</span>
            <span className="inline-block bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-100 px-3 py-1 rounded-full text-sm font-semibold">Жанры: {data.genres.map(g => g.name).join(', ')}</span>
          </div>
          <p className="mt-2 text-lg text-gray-800 dark:text-gray-200 leading-relaxed mb-8">{data.overview}</p>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">Актёры</h2>
            {isCastLoading ? (
              <Loader />
            ) : cast && cast.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {cast.slice(0, 10).map((actor: CastMember) => (
                  <div key={actor.id} className="flex flex-col items-center bg-white/70 dark:bg-gray-800/70 rounded-lg p-2 shadow-md">
                    {actor.profile_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                        alt={actor.name}
                        width={92}
                        height={138}
                        className="rounded mb-2 shadow"
                      />
                    ) : (
                      <div className="w-[92px] h-[138px] bg-gray-200 flex items-center justify-center text-xs text-gray-500 mb-2 rounded">Нет фото</div>
                    )}
                    <div className="text-center">
                      <div className="font-semibold text-sm text-blue-700 dark:text-blue-300">{actor.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{actor.character}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState text="Нет информации об актёрах." />
            )}
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both;
        }
      `}</style>
    </main>
  );
}
