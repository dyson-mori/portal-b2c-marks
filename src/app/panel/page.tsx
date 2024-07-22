import { Fragment } from 'react';

import { ProductsProps } from '@/global/interfaces';
import { Header } from '@/components/header';

import Panel from './panel';

async function getProducts(): Promise<ProductsProps[]> {
  const res = await fetch(`${process.env.NEXT_URL}/api/product`, {
    method: 'GET',
    cache: 'no-store',
    // next: {
    //   tags: ['products']
    // },
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
    <Fragment>
      <Header />
      <Panel products={data} />
    </Fragment>
  );
}