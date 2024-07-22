import React from 'react';
import Image from 'next/image';

import { ProductsProps } from "@/global/interfaces";
import { Trash } from '@/assets/svg/icons';

import { Container, Footer, Delete } from './styles';
import { formats } from '@/helpers/format';

type Props = {
  product: ProductsProps;
  href: string;
  onDelete?: (product: ProductsProps) => void;
};

const Product: React.FC<Props> = ({ product, href, onDelete }) => {
  return (
    <Container href={href}>
      <Image
        src={product.files[0]?.url}
        width={300}
        height={300}
        alt={product.title}
        style={{
          objectFit: 'cover',
          borderRadius: 3
        }}
      />

      {!!onDelete && (
        <Delete onClick={e => {
          e.stopPropagation();
          e.preventDefault();
          onDelete(product)
        }}>
          <Trash width={20} height={20} stroke='red' strokeWidth={2} />
        </Delete>
      )}

      <Footer>
        <span id='title'>{product.title}</span>
        <span id='price'>{formats.money(product.price)}</span>
      </Footer>
    </Container>
  );
}

export { Product };