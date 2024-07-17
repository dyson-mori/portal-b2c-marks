"use client"

import React, { useState } from 'react';

import { ProductsProps } from '@/global/interfaces';

import Payments from '../common/method';
import Products from '../common/products';
import Address from '../common/address';
import Purchase from '../common/purchase';

import { Container } from './styles';

type Props = {
  data: ProductsProps[];
};

const Main: React.FC<Props> = ({ data }) => {
  const [method, setMethod] = useState({
    method: '' as string | null,
    page: 'method' as 'method' | 'address' | 'buy'
  });

  return (
    <Container>
      <Products data={data} />

      {method.page === 'method' && <Payments data={data} onNextPage={setMethod} />}
      {method.page === 'address' && <Address onNextPage={setMethod} />}
      {method.page === 'buy' && <Purchase onNextPage={setMethod} />}

    </Container>
  )
}

export default Main;

/*

<Product key={index}>
  <Image
    width={150}
    height={150}
    src={item.files[0].url}
    alt={item.files[0].url}
    style={{
      objectFit: 'cover',
      borderRadius: 3,
    }}
  />
  <Info>
    <span>
      <h2 id="title">{item.name}</h2>
    </span>
    <span>
      <h3 id="price">{formats.money(item.price)}</h3>
    </span>
    <button>
      <Trash width={25} height={25} stroke={themes.colors.primary} strokeWidth={1.5} />
    </button>
  </Info>
</Product>
*/