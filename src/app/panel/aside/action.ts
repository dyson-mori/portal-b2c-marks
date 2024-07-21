"use server"

import { revalidateTag } from 'next/cache';
import { AsideProps, CategoryProps } from '@/global/interfaces';

export async function getAside(): Promise<AsideProps[]> {
  const res = await fetch(`${process.env.NEXT_URL}/api/aside`, {
    method: 'GET',
    cache: 'no-store',
    next: {
      tags: ['aside']
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Get Aside Error');
  };

  return await res.json();
};

export async function getCategories(): Promise<CategoryProps[]> {
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

export async function revalidateSetting() {
  await getAside()
  revalidateTag('aside')
};
