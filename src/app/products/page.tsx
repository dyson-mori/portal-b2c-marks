import { ProductsProps } from '@/global/interfaces';
import { Header, Footer } from '@/components';

import Products from './screen'

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
    // cache: 'no-cache',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    return [];
    // throw new Error('Product Error')
  };

  const data = await res.json();

  return data;
};

export default async function Page() {
  const products = await getProducts();

  return (
    <>
      <Header />
      <Products products={products} cards={cards} />
      <Footer />
    </>
  );
};