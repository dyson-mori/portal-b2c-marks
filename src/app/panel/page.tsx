import { ProductsProps } from '@/global/interfaces';

import Panel from './panel';
import { Header } from '@/components';

export const getProduct = async (): Promise<ProductsProps[]> => {
  const res = await fetch(`http://localhost:3000/api/products`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Product Panel by Id')
  };

  const data = await res.json();

  return data;
};

export default async function Page() {
  const data = await getProduct();

  return (
    <>
      <Header />
      <Panel products={data} />
    </>
  )
}