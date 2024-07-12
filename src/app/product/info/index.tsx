import React from 'react';

import Image from 'next/image';

import { Input, Button } from '@/components';
import { ProductsProps } from '@/global/interfaces';

import { Container, Delivery as DeliveryStyled } from './styles';

import { Delivery, Devolution } from '@/assets/svg/icons';

type Props = {
  data: ProductsProps;
  setCard: (s: boolean) => void;
};

const Info: React.FC<Props> = ({ data, setCard }) => {
  return (
    <Container>
      <h1>{data.name}</h1>
      {/* <TextDescription>
        <span>
          <p>{data.description}</p>
        </span>
      </TextDescription> */}

      <div style={{ height: 10 }} />

      <p>{data.description}</p>

      <div style={{ height: 10 }} />

      <h2>R$ {data.price}</h2>

      <DeliveryStyled>
        <Image src={Delivery} width={20} height={20} alt='delivery.svg' /> &nbsp;
        <p>Enviamos para todo o Brasil</p>
      </DeliveryStyled>

      <DeliveryStyled>
        <Image src={Devolution} width={20} height={20} alt='delivery.svg' /> &nbsp;
        <p>7 dias para trocas e devoluções</p>
      </DeliveryStyled>

      <Button onClick={() => setCard(true)}>Buy now</Button>
      <div style={{ height: 10 }} />
      <Button secondary>Add to Cart</Button>
    </Container>
  )
}

export { Info };