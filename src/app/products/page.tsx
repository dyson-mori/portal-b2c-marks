import { ProductsProps } from '@/global/interfaces';
import { Header, Footer } from '@/components';

import Products from './screen'

const cards = [
  {
    id: '0',
    name: 'test'
  }
];

export const getProducts = async (): Promise<ProductsProps[]> => {
  const res = await fetch(`http://localhost:3000/api/products`, {
    method: 'GET',
    cache: 'no-cache',
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

export default async function Page() {
  const products = await getProducts();

  const dropdown = cards.map(cards => ({
    id: cards.id,
    label: cards.name
  }));

  return (
    <>
      <Header />
      <Products products={products} cards={dropdown} />
      <Footer />
    </>
  );
};