import type { Metadata } from 'next';

import Redit from './redit';

import { getCategories, getProductById } from '../actions';

export const metadata: Metadata = {
  title: 'product | Marks Jóias',
  description: 'Best prices',
  icons: [
    {
      url: 'https://cdn.worldvectorlogo.com/logos/next-js.svg',
    }
  ]
  // assets: []
};

export default async function Page(params: any) {
  const categories = await getCategories();
  const product = await getProductById(params.searchParams.id);

  return <Redit isUpdate={params.searchParams.id} product={product} categories={categories} />;
};
