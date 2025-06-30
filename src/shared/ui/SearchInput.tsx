import React from 'react';
type Props = React.InputHTMLAttributes<HTMLInputElement>;
export const SearchInput = (props: Props) => (
  <input
    {...props}
    className={`w-full max-w-md px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-900 placeholder-gray-400 dark:placeholder-gray-500 ${props.className || ''}`}
  />
);
