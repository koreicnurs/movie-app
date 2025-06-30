import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export const PaginationButton = ({ children, className = '', ...props }: Props) => (
  <button
    className={`px-4 py-2 rounded font-semibold transition-colors bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-400 ${className}`}
    {...props}
  >
    {children}
  </button>
); 