import { ProductsProps } from "@/global/interfaces";

type Props = {
  data: ProductsProps[];
  loading: false;
};

export const getProducts = async (): Promise<Props> => {
  const res = await fetch(`http://localhost:3000/api/products`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Product Error')
  };

  const data = await res.json();

  return {
    data,
    loading: false
  };
};