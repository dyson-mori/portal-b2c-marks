import React from 'react';
import Image from 'next/image';

import { ProductsProps } from "@/global/interfaces";
import { Close, Edit } from '@/assets/svg/icons';

import { Container, Footer, Actions } from './styles';
import { formats } from '@/helpers/format';

type Props = {
  product: ProductsProps;
  href: string;
  isEdit?: boolean;
  onDelete?: (id: string) => void;
};

const Product: React.FC<Props> = ({ product, href, isEdit, onDelete }) => {
  return (
    <Container href={href}>
      <Image src={product.files[0]?.url} width={300} height={300} alt='product' style={{ objectFit: 'cover', borderRadius: 3 }} />

      {isEdit && (
        <Actions onClick={e => {
          e.stopPropagation();
          e.preventDefault();
          onDelete(product.id);
        }}>
          <Close width={30} height={30} />
        </Actions>
      )}

      {!isEdit && (
        <Footer>
          <p id='title'>{product.name}</p>
          <p id='price'>R$ {formats.money(product.price)}</p>
        </Footer>
      )}
    </Container>
  );
}

export { Product };