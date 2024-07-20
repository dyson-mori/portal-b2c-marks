import React from 'react';

import Screen from './screen';
import { Aside, Category } from '@prisma/client';

async function getAside(): Promise<Aside[]> {
  const res = await fetch(`${process.env.NEXT_URL}/api/aside`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Aside Error')
  };

  return await res.json();
};

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
  const aside = await getAside();
  const categories = await getCategories();

  return <Screen aside={aside} categories={categories} />;
};
