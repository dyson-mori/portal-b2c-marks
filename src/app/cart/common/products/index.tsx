import React, { CSSProperties, useContext } from 'react';

import { DotLottiePlayer } from '@dotlottie/react-player';

import { ProductsProps } from '@/global/interfaces';
import { Product } from '@/components';
import { CartContext } from '@/contexts/cart';

import { Container, CartEmpty } from './styles';

interface Props {
  data: ProductsProps[];
};

const Products: React.FC<Props> = ({ data }) => {
  const { setStorage } = useContext(CartContext);

  const lottie_styles: CSSProperties  = {
    display: 'flex',
    maxWidth: "300px"
  };

  return (
    <Container>
      {data.length === 0 && (
        <CartEmpty>
          <DotLottiePlayer style={lottie_styles} src="/lottie/marks-empty-card.lottie" autoplay />
          <p>Your cart is empty</p>
        </CartEmpty>
      )}
      {data.map((item, index) => (
        <Product key={index.toString()} product={item} href={`/product?id=${item.id}`} onDelete={e => setStorage(e)} />
      ))}
    </Container>
  )
}

export default Products;