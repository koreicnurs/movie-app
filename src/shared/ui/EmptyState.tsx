import React from 'react';
export const EmptyState = ({ text = 'Ничего не найдено' }: { text?: string }) => (
  <div className="col-span-full text-center text-gray-500 py-8 text-lg">{text}</div>
); 