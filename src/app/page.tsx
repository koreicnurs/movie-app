import { MovieList } from '@/widgets/movie-list';

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Популярные фильмы</h1>
      <MovieList />
    </main>
  );
}
