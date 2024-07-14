import { ProductsProps } from '@/global/interfaces';
import { Header, Footer } from '@/components';

import Products from './screen'

const cards = [
  {
    title: 'Breast',
    maxHeight: 50 + 40 * 4,
    options: [
      {
        id: 'clyispn3u000iopd3m67p6s3j',
        name: 'big',
      },
      {
        id: 'clyilsxpc000797dwforats4w',
        name: 'small',
      },
      {
        id: 'clyi4fkmc0017jkddgi6j7m3s',
        name: 'huge',
      },
      {
        id: 'clyi4flry0019jkddcnw35q8h',
        name: 'thin',
      },
      {
        id: 'clyilsuge000197dw0ye7d91w',
        name: 'big tits',
      },
      {
        id: 'clyilsvfc000397dwnuqvblla',
        name: 'breasts'
      },
      {
        id: 'clyilswlu000597dwvmkjpfsf',
        name: 'busty'
      },
      {
        id: 'clyilsxpc000797dwforats4w',
        name: 'dressed'
      },
      {
        id: 'clyilsyv5000997dwpxqx0b95',
        name: 'squeeze'
      },
      {
        id: 'clyilszrn000b97dwovl5ifjm',
        name: 'squeeze boobs'
      },
      {
        id: 'clyisp8bp0002opd3oj3t3clc',
        name: 'squeeze tits'
      },
      {
        id: 'clyispa5r0004opd3jveyy2fj',
        name: 'shake'
      },
      {
        id: 'clyispbpr0006opd3rgn2gpos',
        name: 'shakes'
      },
      {
        id: 'clyispdgx0008opd30w0pb1mg',
        name: 'cleavage'
      }
    ]
  },
  {
    title: 'Ass',
    maxHeight: 50 + 40 * 2,
    options: [
      {
        id: 'clyispn3u000iopd3m67p6s3j',
        name: 'big',
      },
      {
        id: 'clyilsxpc000797dwforats4w',
        name: 'small',
      },
      {
        id: 'clyi4fkmc0017jkddgi6j7m3s',
        name: 'huge',
      },
      {
        id: 'clyi4flry0019jkddcnw35q8h',
        name: 'thin',
      },
      {
        id: 'clyilsuge000197dw0ye7d91w',
        name: 'big tits',
      },
      {
        id: 'clyilsvfc000397dwnuqvblla',
        name: 'breasts'
      },
      {
        id: 'clyilswlu000597dwvmkjpfsf',
        name: 'busty'
      },
      {
        id: 'clyilsxpc000797dwforats4w',
        name: 'dressed'
      },
    ]
  },
  {
    title: 'Breast',
    maxHeight: 50 + 40 * 4,
    options: [
      {
        id: 'clyispn3u000iopd3m67p6s3j',
        name: 'big',
      },
      {
        id: 'clyilsxpc000797dwforats4w',
        name: 'small',
      },
      {
        id: 'clyi4fkmc0017jkddgi6j7m3s',
        name: 'huge',
      },
      {
        id: 'clyi4flry0019jkddcnw35q8h',
        name: 'thin',
      },
      {
        id: 'clyilsuge000197dw0ye7d91w',
        name: 'big tits',
      },
      {
        id: 'clyilsvfc000397dwnuqvblla',
        name: 'breasts'
      },
      {
        id: 'clyilswlu000597dwvmkjpfsf',
        name: 'busty'
      },
      {
        id: 'clyilsxpc000797dwforats4w',
        name: 'dressed'
      },
      {
        id: 'clyilsyv5000997dwpxqx0b95',
        name: 'squeeze'
      },
      {
        id: 'clyilszrn000b97dwovl5ifjm',
        name: 'squeeze boobs'
      },
      {
        id: 'clyisp8bp0002opd3oj3t3clc',
        name: 'squeeze tits'
      },
      {
        id: 'clyispa5r0004opd3jveyy2fj',
        name: 'shake'
      },
      {
        id: 'clyispbpr0006opd3rgn2gpos',
        name: 'shakes'
      },
      {
        id: 'clyispdgx0008opd30w0pb1mg',
        name: 'cleavage'
      }
    ]
  },
  {
    title: 'Ass',
    maxHeight: 50 + 40 * 2,
    options: [
      {
        id: 'clyispn3u000iopd3m67p6s3j',
        name: 'big',
      },
      {
        id: 'clyilsxpc000797dwforats4w',
        name: 'small',
      },
      {
        id: 'clyi4fkmc0017jkddgi6j7m3s',
        name: 'huge',
      },
      {
        id: 'clyi4flry0019jkddcnw35q8h',
        name: 'thin',
      },
      {
        id: 'clyilsuge000197dw0ye7d91w',
        name: 'big tits',
      },
      {
        id: 'clyilsvfc000397dwnuqvblla',
        name: 'breasts'
      },
      {
        id: 'clyilswlu000597dwvmkjpfsf',
        name: 'busty'
      },
      {
        id: 'clyilsxpc000797dwforats4w',
        name: 'dressed'
      },
    ]
  },
];

export const getProducts = async (): Promise<ProductsProps[]> => {
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

  return data;
};

export default async function Page() {
  const products = await getProducts();

  return (
    <>
      <Header />
      <Products products={products} cards={cards} />
      <Footer />
    </>
  );
};