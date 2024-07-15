import React from 'react';

import { ProductsProps, PurchaseProps } from "@/global/interfaces";

import Success from './success';

type Params = {
  params: object;
  searchParams: {
    id: string;
  }
};

export const getPurchaseById = async (id: string): Promise<PurchaseProps> => {
  const res = await fetch(`http://localhost:3000/api/product/purchase?id=${id}`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Purchase by Id')
  };

  const data = await res.json();

  return data;
};

// export const sendOrderForDelivery = async (id: string): Promise<PurchaseProps> => {
//   const res = await fetch(`http://localhost:3000/api/product/purchase?id=${id}`, {
//     method: 'GET',
//     cache: 'no-cache',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });

//   if (!res.ok) {
//     throw new Error('Product by Id')
//   };

//   const data = await res.json();

//   return data;
// };

export default async function Page(params: Params) {
  const data = await getPurchaseById(params.searchParams.id);

  // sendOrderForDelivery()

  return <Success purchase={data} />;
};


// http://localhost:3000/success?session_id=cs_test_a1m1OS7uxeuVUhd6wblsIHdBJKpIwokBKnUiwx5nIX7mhfPhf4riBImStq
// https://freefrontend.com/css-hexagons/

	//"session_id":"cs_test_a18baRxXaUOaVJzy0in2JlDGBlIQEBdP4zZ5kgTOSIR6zGuNjGvETzVuVL"
	//"session_id":"cs_test_a1JiacgzensGvisT6jZeHg7dEk4rw1WwGEJq0uZiQ3sdLll0PRvkOqWzEo"


// Marks
// http://localhost:3000/success?session_id=cs_test_a1T3mgbl2JmtwHbY9zklkkD8W0HMUYba5sBFXLRNFLNaiWwKGxYlEa8cKJ