'use client';
import { useThemeStore } from '@/shared/theme-store';
import React from 'react';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, setTheme, toggleTheme } = useThemeStore();

  // Синхронизируем тему с системной только на клиенте
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <button
      className={`fixed top-4 right-4 z-50 px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow ${className}`}
      onClick={toggleTheme}
      aria-label="Переключить тему"
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
