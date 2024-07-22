import React from 'react';

import Screen from './screen';

import { getAside, getCategories } from '../actions';

export default async function Page() {
  const aside = await getAside();
  const categories = await getCategories();

  return <Screen aside={aside} categories={categories} />;
};
