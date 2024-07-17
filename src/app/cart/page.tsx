import React from 'react';

import { Footer, Header } from '@/components';
import { ProductsProps } from "@/global/interfaces";

import Main from './main';

const getCart = async (): Promise<ProductsProps[]> => {
  const res = await fetch(`http://localhost:3000/api/cart`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Cart by Id')
  };

  const data = await res.json();

  return data;
};

export default async function Page(){
  const data = await getCart();

  return (
    <>
      <Header />
      <Main data={data} />
      <Footer secondary />
    </>
  );
};
