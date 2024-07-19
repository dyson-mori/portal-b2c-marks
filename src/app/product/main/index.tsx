"use client"

import React from 'react';
import { ProductsProps } from '@/global/interfaces';

import Images from '../common/images';
import Info from '../common/info';

import { Container } from './styles';

type Props = {
  data: ProductsProps;
};

export default function ProductScreen({ data }: Props) {
  return (
    <Container>
      <Images data={data} />
      <Info data={data} />
    </Container>
  );
};
