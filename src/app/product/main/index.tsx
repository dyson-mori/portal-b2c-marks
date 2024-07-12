"use client"

import React, { useState } from 'react';

import { Footer, Header } from '@/components';
import { ProductsProps } from '@/global/interfaces';

import { Images } from '../images';
import { Info } from '../info';
import { FormScreen } from '../form';

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
        {card ? <FormScreen data={data} setCard={setCard} /> : <Info data={data} setCard={setCard} />}
      </Container>
      <Footer />
    </>
  );
};
