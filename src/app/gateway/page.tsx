import React from 'react';

import { ProductsProps, PurchaseProps } from "@/global/interfaces";

import Success from './success';
import Payment from './payment';

type Params = {
  params: object;
  searchParams: {
    success: string;
  }
};

// async function getPurchaseById(id: string): Promise<PurchaseProps> {
//   const res = await fetch(`${process.env.NEXT_URL}/api/product/purchase?id=${id}`, {
//     method: 'GET',
//     cache: 'no-store',
//     // cache: 'no-cache',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });

//   if (!res.ok) {
//     throw new Error('Purchase by Id')
//   };

//   const data = await res.json();

//   return data;
// };

const getProductById = async (id: string): Promise<ProductsProps> => {
  const res = await fetch(`${process.env.NEXT_URL}/api/product?id=${id}`, {
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

export default async function Page(params: Params) {
  const data = await getProductById(params.searchParams.success);

  return <Payment product={data} gateway={params.searchParams} />;
  // return <Success purchase={data} />;
};
