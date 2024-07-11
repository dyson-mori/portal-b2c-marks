import React from 'react';

import Image from 'next/image';

import { Input, Button } from '@/components';
import { ProductsProps } from '@/global/interfaces';

import { Container, Delivery as DeliveryStyled } from './styles';

import Delivery from '../../../../assets/svg/delivery.svg';
import Devolution from '../../../../assets/svg/devolution.svg';

type Props = {
  data: ProductsProps;
};

const Info: React.FC<Props> = ({ data }) => {
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

      <div style={{ height: 10 }} />

      <Input.Root>
        <Input.Icon icon={Delivery} />
        <Input.Input placeholder='000000-000' />
      </Input.Root>

      <DeliveryStyled>
        <Image src={Delivery} width={20} height={20} alt='delivery.svg' /> &nbsp;
        <p>Enviamos para todo o Brasil</p>
      </DeliveryStyled>

      <DeliveryStyled>
        <Image src={Devolution} width={20} height={20} alt='delivery.svg' /> &nbsp;
        <p>7 dias para trocas e devoluções</p>
      </DeliveryStyled>

      <Button primary>Buy now</Button>

      <div style={{ height: 10 }} />
      <Button secondary>Add to Cart</Button>
    </Container>
  )
}

export { Info };