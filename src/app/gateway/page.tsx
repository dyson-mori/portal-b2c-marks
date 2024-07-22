import React from 'react';

import { GatewayProps } from "@/global/interfaces";

import Payment from './payment';

type Params = {
  params: object;
  searchParams: {
    id: string;
  }
};

const getGatewayById = async (id: string): Promise<GatewayProps> => {
  const res = await fetch(`${process.env.NEXT_URL}/api/gateway?id=${id}`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Gateway Error')
  };

  return await res.json();
};

export default async function Page(params: Params) {
  const gateway = await getGatewayById(params.searchParams.id);

  return <Payment gateway={gateway} />;
};
