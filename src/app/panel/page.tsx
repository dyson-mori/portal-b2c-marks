import { Fragment } from 'react';
import type { Metadata } from 'next';

import { Header } from '@/components/header';

import { getProducts } from './actions';
import Panel from './panel';

export const metadata: Metadata = {
  title: 'panel | Marks Jóias',
  description: 'Best prices',
  icons: [
    {
      url: 'https://cdn.worldvectorlogo.com/logos/next-js.svg',
    }
  ]
  // assets: []
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