"use client"

import React from 'react';
import Image from 'next/image';

import { useTheme } from 'styled-components';

import { ProductsProps } from '@/global/interfaces';
import { formats } from '@/helpers/format';
import { Product } from '@/components';

import { FormScreen } from '../form';

import { Container, Content } from './styles';
import { Trash } from '@/assets/svg';

type Props = {
  data: ProductsProps[];
};

const Main: React.FC<Props> = ({ data }) => {
  const themes = useTheme();

  return (
    <Container>
      <Content>
        {data.map((item, index) => (
          <Product key={index.toString()} product={item} href={`/product?id=${item.id}`} />
        ))}
      </Content>
      <FormScreen />
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