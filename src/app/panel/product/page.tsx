// redit: register and edit
import { ProductsProps, CategoryProps } from '@/global/interfaces';

import Redit from './redit';

async function getCategories(): Promise<CategoryProps[]> {
  const res = await fetch(`${process.env.NEXT_URL}/api/category`, {
    method: 'GET',
    cache: 'no-store',
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

async function getProductById(id: string): Promise<ProductsProps | null> {
  if (!id) return null;

  const res = await fetch(`${process.env.NEXT_URL}/api/product?id=${id}`, {
    method: 'GET',
    // cache: 'no-cache',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Product by Id');
  };

  const data = await res.json();

  return data;
};

export default async function Page(params: any) {
  const data = await getCategories();
  const product = await getProductById(params.searchParams.id);

  return <Redit isUpdate={params.searchParams.id} product={product} category={data} />;
};
