import React from 'react';

import Register from './components/register';

export interface CategoryProps {
  id: string;
  name: string;
};

export const getCategories = async (): Promise<CategoryProps[]> => {
  const res = await fetch(`http://localhost:3000/api/category`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Product by Id')
  };

  const data = await res.json();

  return data;
};

export default async function Page() {
  const data = await getCategories();

  const categories = data.map(item => ({
    id: item.id,
    label: item.name
  }))

  return (
    <Register category={categories} />
  );
};
