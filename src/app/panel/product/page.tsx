// redit: register and edit
import { ProductsProps, CategoryProps } from '@/global/interfaces';

import Redit from './redit';

const getCategories = async (): Promise<CategoryProps[]> => {
  const res = await fetch(`http://localhost:3000/api/category`, {
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

const getProductById = async (id: string): Promise<ProductsProps | null> => {
  if (!id) return null;

  const res = await fetch(`http://localhost:3000/api/product?id=${id}`, {
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

export default async function Page(params: any) {
  const data = await getCategories();
  const product = await getProductById(params.searchParams.id);

  const categories = data.map(item => ({
    id: item.id,
    label: item.name
  }))

  return <Redit isUpdate={params.searchParams.id} product={product} category={categories} />;
};
