"use server";

import { ProductsProps } from "@/global/interfaces";

export async function getProducts(): Promise<ProductsProps[]> {
  const res = await fetch(`${process.env.NEXT_URL}/api/product`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Product Error')
  };

  return await res.json();
};

export async function getCategories(): Promise<any[]> {
  const res = await fetch(`${process.env.NEXT_URL}/api/aside`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Categories Error')
  };

  return await res.json();
};