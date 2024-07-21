import React from 'react';

import Screen from './screen';
import { getCategories } from './action';

export default async function Page() {
  const categories = await getCategories();
  return <Screen categories={categories} />;
};
