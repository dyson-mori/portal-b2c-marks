import React from 'react';

import ProductScreen from './main';
import { ProductsProps } from "@/global/interfaces";

type ProductParams = {
  params: object;
  searchParams: {
    id: string;
  }
};

const getProductById = async (id: string): Promise<ProductsProps> => {
  const res = await fetch(`http://localhost:3000/api/product?id=${id}`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Product by Id')
  };

  const data = await res.json();

  return data;
};

export default async function Product(params: ProductParams) {
  const data = await getProductById(params.searchParams.id);

  return <ProductScreen data={data} />;
};
