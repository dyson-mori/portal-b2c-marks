"use server"

import { revalidateTag } from 'next/cache';
import { CategoryProps } from '@/global/interfaces';

export async function getCategories(): Promise<CategoryProps[]> {
  const res = await fetch(`${process.env.NEXT_URL}/api/category`, {
    method: 'GET',
    cache: 'no-store',
    next: {
      tags: ['category']
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Category Error')
  };

  return await res.json();
};

export async function revalidateSetting() {
  await getCategories();
  revalidateTag('category')
};
