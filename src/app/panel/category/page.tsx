import React from 'react';

import Screen from './screen';
import { Category } from '@prisma/client';

async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${process.env.NEXT_URL}/api/category`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Category Error')
  };

  return await res.json();
};

export default async function Page() {
  const categories = await getCategories();

  return <Screen categories={categories} />;
};
