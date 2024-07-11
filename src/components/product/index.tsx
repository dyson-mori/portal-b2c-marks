import React from 'react';
import Image from 'next/image';

import { ProductsProps } from "@/global/interfaces";

import { Container, Footer } from './styles';

type Props = Pick<ProductsProps, 'id' | 'image' | 'name' | 'price'>;

const Product: React.FC<Props> = ({ id, name, image, price }) => {
  return (
    <Container href={`/product?id=${id}`}>
      <Image src={image} width={300} height={300} alt='product' style={{ objectFit: 'cover', borderRadius: 3 }} />
      <Footer>
        <p id='title'>{name}</p>
        <p id='price'>R$ {price}</p>
      </Footer>
    </Container>
  );
}

export { Product };