import { useQuery } from '@tanstack/react-query';
import { fetchPopularMovies, fetchMovieCredits } from './api';

export function usePopularMovies(page: number, search?: string) {
  return useQuery({
    queryKey: ['movies', page, search],
    queryFn: () => fetchPopularMovies(page, search),
  });
}

export function useMovieDetails(id: string) {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: async () => {
      const { fetchPopularMovies, tmdbApi } = await import('./api');
      const { data } = await tmdbApi.get(`/movie/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useMovieCredits(id: string) {
  return useQuery({
    queryKey: ['movie-cast', id],
    queryFn: () => fetchMovieCredits(id),
    enabled: !!id,
  });
}
