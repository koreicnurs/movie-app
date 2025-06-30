# Movie App

## Стек технологий
- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios
- Zustand
- React Query
- Feature Sliced Design (FSD)

## Структура проекта (FSD)

- `src/shared` — переиспользуемые утилиты, хуки, UI-компоненты (Loader, SearchInput, PaginationButton, ThemeToggle и др.)
- `src/entities` — бизнес-сущности (movie: типы, api, хуки, карточка)
- `src/features` — фичи (например, BackButton, ThemeSwitch)
- `src/widgets` — виджеты (MovieList)
- `src/pages` — (если используются)
- `src/app` — страницы и layout Next.js

## Как запустить

```bash
npm install
npm run dev
# или
yarn install
yarn dev
```

## Как расширять
- Все общие компоненты и хуки выносите в `shared/ui` и `shared/lib`.
- Для новых бизнес-сущностей создавайте папки в `entities`.
- Для сложных фич — используйте `features`.
- Для крупных блоков/виджетов — используйте `widgets`.
- Следите за типизацией и чистотой кода.

## Описание

Приложение для просмотра популярных фильмов с использованием TMDB API. Реализовано с применением Feature Sliced Design, React Query, Zustand и других современных инструментов. Поддержка светлой/тёмной темы, поиск, пагинация, подробная страница фильма с актёрами.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
