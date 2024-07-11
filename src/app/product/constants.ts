import { ProductsProps } from "@/global/interfaces";

type Props = {
  data: ProductsProps;
  loading: false;
};

export const getProductById = async (id: string): Promise<Props> => {
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

  return {
    data,
    loading: false
  };
};