"use client"

import React from 'react';

import { Footer, Header } from '@/components';
import { ProductsProps } from '@/global/interfaces';

import { Images } from '../images';
import { Info } from '../info';

import { Container } from './styles';

type Props = {
  data: ProductsProps;
};

export default function ProductScreen({ data }: Props) {
  return (
    <>
      <Header />
      <Container>
        <Images data={data} />
        <Info data={data} />
      </Container>
      <Footer />
    </>
  );
};
