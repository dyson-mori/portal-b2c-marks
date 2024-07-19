import React from 'react';
import Image from 'next/image';

import { ProductsProps } from "@/global/interfaces";
import { Trash } from '@/assets/svg/icons';

import { Container, Footer, Actions } from './styles';
import { formats } from '@/helpers/format';

type Props = {
  product: ProductsProps;
  href: string;
  isEdit?: boolean;
  onDelete?: (product: ProductsProps) => void;
};

const Product: React.FC<Props> = ({ product, href, isEdit, onDelete }) => {
  return (
    <Container href={href}>
      <Image src={product.files[0]?.url} width={300} height={300} alt='product' style={{ objectFit: 'cover', borderRadius: 3 }} />

      {isEdit && (
        <Actions onClick={e => {
          e.stopPropagation();
          e.preventDefault();
          // @ts-ignore
          onDelete(product);
        }}>
          <Trash width={20} height={20} stroke='red' strokeWidth={2} />
        </Actions>
      )}

      <Footer>
        <span id='title'>{product.name}</span>
        <span id='price'>R$ {formats.money(product.price)}</span>
      </Footer>
    </Container>
  );
}

export { Product };