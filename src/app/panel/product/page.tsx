import Redit from './redit';

import { getCategories, getProductById } from '../actions';

export default async function Page(params: any) {
  const categories = await getCategories();
  const product = await getProductById(params.searchParams.id);

  return <Redit isUpdate={params.searchParams.id} product={product} categories={categories} />;
};
