'use client';
import React, { useState, useCallback } from 'react';
import { usePopularMovies } from '@/entities/movie/hooks';
import { MovieCard } from '@/entities/movie/card';
import { useRouter } from 'next/navigation';
import { useDebounce } from '@/shared/lib/useDebounce';
import { Loader } from '@/shared/ui/Loader';
import { SearchInput } from '@/shared/ui/SearchInput';
import { PaginationButton } from '@/shared/ui/PaginationButton';
import { EmptyState } from '@/shared/ui/EmptyState';

export const MovieList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 2000);
  const { data, isLoading, isError, refetch, isFetching } = usePopularMovies(page, debouncedSearch || undefined);
  const router = useRouter();

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  }, []);

  if (isLoading) return <Loader />;
  if (isError) return <div className="text-center py-10 text-red-500">Ошибка загрузки. <button onClick={() => refetch()}>Повторить</button></div>;

  return (
    <div>
      <div className="mb-6 flex justify-center">
        <SearchInput
          value={search}
          onChange={handleSearch}
          placeholder="Поиск фильмов..."
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.results.length ? data.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={() => router.push(`/movie/${movie.id}`)} />
        )) : <EmptyState />}
      </div>
      <div className="flex justify-center gap-4 mt-8">
        <PaginationButton
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1 || isFetching}
        >
          ← Назад
        </PaginationButton>
        <span className="self-center text-lg font-bold text-blue-600 dark:text-blue-400">
          Страница {page} из {data?.total_pages}
        </span>
        <PaginationButton
          onClick={() => setPage((p) => (data && p < data.total_pages ? p + 1 : p))}
          disabled={data && page >= data.total_pages || isFetching}
        >
          Вперёд →
        </PaginationButton>
      </div>
    </div>
  );
}; 