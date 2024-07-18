import { ProductsProps } from '@/global/interfaces';
import { Footer, Header } from '@/components';

import Panel from './panel';

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
    throw new Error('Product Panel')
  };

  const data = await res.json();

  return data;
};

export default async function Page() {
  const data = await getProducts();

  return (
    <>
      <Header />
      <Panel products={data} />
      <Footer />
    </>
  )
}