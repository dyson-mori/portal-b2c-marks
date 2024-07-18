import { ProductsProps } from '@/global/interfaces';
import { Footer, Header } from '@/components';

import Panel from './panel';

export const getProducts = async (): Promise<ProductsProps[]> => {
  const res = await fetch('http://localhost:3000/api/products', {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Product Panel')
  };

  const data = await res.json();

  console.log(data);

  return data;
};

export default async function Page() {
  const data = await getProducts();

  return (
    <>
      <Header />
      <Panel products={data} />
      <Footer />
    </>
  )
}