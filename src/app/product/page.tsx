import React from 'react';

import { getProductById } from './constants';

import ProductScreen from './components/main';

type ProductParams = {
  params: object;
  searchParams: {
    id: string;
  }
};

export default async function Product(params: ProductParams) {
  const { data, loading } = await getProductById(params.searchParams.id);

  return <ProductScreen data={data} />;
};
