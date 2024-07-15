import React from 'react';

import { Header } from '@/components';
import { ProductsProps } from "@/global/interfaces";

import Main from './main';

const getProductById = async (): Promise<ProductsProps[]> => {
  const res = await fetch(`http://localhost:3000/api/products`, {
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

export default async function Page(){
  const data = await getProductById();
  return (
    <>
      <Header />
      <Main data={data} />
    </>
  );
};
