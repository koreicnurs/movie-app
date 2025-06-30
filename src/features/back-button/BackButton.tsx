'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

export const BackButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const router = useRouter();
  return (
    <button
      className={`px-4 py-2 rounded font-semibold transition-colors bg-blue-500 text-white hover:bg-blue-600 shadow ${className}`}
      onClick={() => router.back()}
    >
      ← Назад
    </button>
  );
}; 