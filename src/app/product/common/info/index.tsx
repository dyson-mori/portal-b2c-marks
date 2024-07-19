import React, { useContext } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components';
import { ProductsProps } from '@/global/interfaces';

import { Container, Delivery as DeliveryStyled } from './styles';

import { Delivery, Devolution } from '@/assets/svg/icons';
import { formats } from '@/helpers/format';
import { CartContext } from '@/contexts/cart';

type Props = {
  data: ProductsProps;
};

const Info: React.FC<Props> = ({ data }) => {
  const { storage, setStorage } = useContext(CartContext);

  const route = useRouter();

  const handleBuyNow = () => {
    const foundProduct = storage?.find((e: any) => e.id === data.id);

    if (!foundProduct) setStorage(data);

    return route.push('/cart');
  };

  return (
    <Container>
      <h1>{data.name}</h1>

      <div style={{ height: 10 }} />

      <p>{data.description}</p>

      <div style={{ height: 10 }} />

      <h2>R$ {formats.money(data.price)}</h2>

      <DeliveryStyled>
        <Delivery width={20} height={20} fill="#47C747" /> &nbsp;&nbsp;
        <p>Enviamos para todo o Brasil</p>
      </DeliveryStyled>

      <DeliveryStyled>
        <Devolution width={20} height={20} stroke="#47C747" strokeWidth={1.8} /> &nbsp;&nbsp;
        <p>7 dias para trocas e devoluções</p>
      </DeliveryStyled>

      <Button onClick={handleBuyNow}>Buy now</Button>
      <div style={{ height: 10 }} />
      <Button secondary onClick={() => setStorage(data)}>{storage.find(e => e.id === data.id) ? 'Remove to Cart' : 'Add to Cart'}</Button>
    </Container>
  )
}

export default Info;