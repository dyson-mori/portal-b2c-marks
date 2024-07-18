import React, { useContext } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components';
import { ProductsProps } from '@/global/interfaces';
import usePersistedStorage from '@/hooks/useStorage';

import { Container, Delivery as DeliveryStyled } from './styles';

import { Delivery, Devolution, Success } from '@/assets/svg/icons';
import { NotificationContext } from '@/hooks/notification';
import { formats } from '@/helpers/format';

type Props = {
  data: ProductsProps;
};

const Info: React.FC<Props> = ({ data }) => {
  const [storage] = usePersistedStorage('@marks: cart', []);
  const route = useRouter();

  const { setNotification } = useContext(NotificationContext);

  const handleLocalCart = () => {
    if (!storage || storage.length === 0) {
      localStorage.setItem("@marks: cart", JSON.stringify([data]))
      return setNotification({ icon: Success, message: 'Product added to cart!', type: 'success', active: `${Math.random()}_show` });
    };

    const foundProduct = storage?.find(e => e.id === data.id);

    if (foundProduct) {
      const getCartWithoutProduct = storage.filter(e => e.id !== data.id).map(e => e);
      localStorage.setItem("@marks: cart", JSON.stringify(getCartWithoutProduct));
      return setNotification({ icon: Success, message: 'Product removed from cart!', type: 'success', active: `${Math.random()}_show` });
    };

    const adding = [...storage, data];
    localStorage.setItem("@marks: cart", JSON.stringify(adding));
    return setNotification({ icon: Success, message: 'Product added to cart!', type: 'success', active: `${Math.random()}_show` });
  };

  const handleBuyNow = () => {

    if (!storage || storage.length === 0) {
      localStorage.setItem("@marks: cart", JSON.stringify([data]));
      return route.push('/cart');
    };

    const foundProduct = storage?.find(e => e.id === data.id);

    if (foundProduct) {
      return route.push('/cart');
    };

    const adding = [...storage, data];
    localStorage.setItem("@marks: cart", JSON.stringify(adding));

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
      <Button secondary onClick={handleLocalCart}>Add to Cart</Button>
    </Container>
  )
}

export default Info;