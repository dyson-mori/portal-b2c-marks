import React from 'react';

import { getProducts } from './constants';
import ProductsScreen from './screen';

const cards = [
  {
    id: '0',
    name: 'test'
  }
];

export default async function Products() {
  const { data, loading } = await getProducts();

  const dropdown = cards.map(cards => ({
    id: cards.id,
    label: cards.name
  }));

  return <ProductsScreen data={data} cards={dropdown} />
};