import React from 'react';

import { Navigation } from './nav';

async function getHeader(){
  const res = await fetch(`${process.env.NEXT_URL}/api/header`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Product Error')
  };

  return await res.json();
};

export const Header: React.FC = async () => {
  const head = await getHeader();

  return <Navigation header={head} />
};
