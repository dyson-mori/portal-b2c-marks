"use client"

import React from 'react';

import { ProductsProps } from '@/global/interfaces';
import { Product } from '@/components';

import { Add, Close } from '@/assets/svg/icons';

import { Container, UploadMore } from './styles';

type Props = {
  products: ProductsProps[]
}

const Panel: React.FC<Props> = ({ products }) => {
  const handleDelete = (id: string) => {
    fetch(`/api/product?id=${id}`, {
      method: 'DELETE'
    });
  };

  return (
    <Container>
      <UploadMore href='/panel/product'>
        <Add width={20} height={20} stroke='#303030' strokeWidth={1.8} />
      </UploadMore>
      {products.map((product, index) =>
        <Product key={index.toString()} isEdit product={product} href={`/panel/product?id=${product.id}`} onDelete={handleDelete} />
      )}
    </Container>
  )
};

export default Panel;