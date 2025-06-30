import { tmdbApi } from '@/shared/api/tmdb';
import type { MoviesResponse } from './types';

export const fetchPopularMovies = async (page = 1, query?: string): Promise<MoviesResponse> => {
  const params: Record<string, string | number> = { page };
  if (query) params.query = query;
  const url = query ? '/search/movie' : '/movie/popular';
  const { data } = await tmdbApi.get<MoviesResponse>(url, { params });
  return data;
};

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface CreditsResponse {
  cast: CastMember[];
}

export const fetchMovieCredits = async (movieId: string): Promise<CastMember[]> => {
  const { data } = await tmdbApi.get<CreditsResponse>(`/movie/${movieId}/credits`);
  return data.cast;
}; 