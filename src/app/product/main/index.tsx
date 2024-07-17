"use client"

import React, { useState } from 'react';

import { Footer, Header } from '@/components';
import { ProductsProps } from '@/global/interfaces';

import Images from '../common/images';
import Info from '../common/info';

import { Container } from './styles';

type Props = {
  data: ProductsProps;
};

export default function ProductScreen({ data }: Props) {
  const [card, setCard] = useState(false);
  return (
    <>
      <Header />
      <Container>
        <Images data={data} />
        <Info data={data} setCard={setCard} />
      </Container>
      <Footer />
    </>
  );
};
