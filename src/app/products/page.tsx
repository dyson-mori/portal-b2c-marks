import type { Metadata } from 'next';

import { ProductsProps } from '@/global/interfaces';
import { Footer } from '@/components';
import { Header } from "@/components/header";

import Products from './screen';

export const metadata: Metadata = {
  title: 'products | Marks Jóias',
  description: 'Best prices',
  icons: [
    {
      url: 'https://cdn.worldvectorlogo.com/logos/next-js.svg',
    }
  ]
  // assets: []
};

const cards = [
  {
    title: 'Conjunto',
    maxHeight: 50 + 40 * 4,
    options: []
  },
  {
    title: 'Aneis',
    maxHeight: 50 + 40 * 2,
    options: []
  },
  {
    title: 'Pulseiras',
    maxHeight: 50 + 40 * 4,
    options: []
  },
  {
    title: 'Solitários',
    maxHeight: 50 + 40 * 2,
    options: []
  },
];

async function getProducts(): Promise<ProductsProps[]> {
  const res = await fetch(`${process.env.NEXT_URL}/api/products`, {
    method: 'GET',
    cache: 'no-store',
    // next: {
    //   revalidate: 3600,
    //   tags: ['products']
    // },
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Product Error')
  };

  const data = await res.json();

  return data;
};

async function getCategories(): Promise<any[]> {
  const res = await fetch(`${process.env.NEXT_URL}/api/aside`, {
    method: 'GET',
    cache: 'no-store',
    // next: {
    //   revalidate: 3600,
    //   tags: ['products']
    // },
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Categories Error')
  };

  return await res.json();
};

export default async function Page() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <>
      <Header />
      <Products products={products} cards={categories} />
      <Footer />
    </>
  );
};