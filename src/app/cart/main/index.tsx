"use client"

import React, { useContext } from 'react';

import { CartContext } from '@/contexts/cart';

import Products from '../common/products';
import Payments from '../common/aside';

import { Container } from './styles';

export default function Main() {
  const { storage } = useContext(CartContext);

  return (
    <Container>
      <Products data={storage} />
      <Payments />
    </Container>
  )
}
