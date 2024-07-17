import React, { useState, CSSProperties } from 'react';

import { useTheme } from 'styled-components';

import { Button } from '@/components';
import { ArrowLeft, Cards, Pix } from '@/assets/svg';
import { formats } from '@/helpers/format';
import { ProductsProps } from '@/global/interfaces';

import { Container, Methods, CheckOuts, Result, Header } from './styles';

const methodsPayments = [
  'Credit Cart',
  'Pix'
];

interface Props {
  data: ProductsProps[];
  onNextPage(a: {
    method: string | null;
    page: 'method' | 'address' | 'buy';
  }): void;
};

const Method: React.FC<Props> = ({ data, onNextPage }) => {
  const theme = useTheme();

  const [methodPayment, setMethodPayment] = useState('');

  const sum = data.reduce((accumulator, object) => { 
    return Number(accumulator) + Number(object.price)
  },0);

  const handleNextPage = () => onNextPage({
    method: methodPayment,
    page: 'address'
  });

  return (
    <Container>
      <Header>
        <button>
          <ArrowLeft width={20} height={20} stroke={theme.colors.primary} strokeWidth={2}/>
        </button>
        <h1>Payment Info</h1>
        <p>2/3</p>
      </Header>
      <div style={{ width: '95%', margin: '20px 0 5px 0' }}>
        <p style={{ fontSize: 12, fontWeight: 500 }}>Choose payment method</p>
      </div>
      {methodsPayments.map((e, i) => (
        <Methods style={{
          boxShadow: methodPayment === e ? theme.settings.box.defaultHoverPrimary : ''
        }} key={i} disabled={data.length === 0} onClick={() => setMethodPayment(e)}>
          {e === 'Credit Cart' && (
            <Cards
              width={20}
              height={20}
              strokeWidth={1.5}
              stroke={theme.colors[data.length === 0 ? 'primary_disabled' : 'primary']}
            />
          )}
          {e === 'Pix' && <Pix width={20} height={20} />}
          <p>{e}</p>
          {e === 'Pix' && (<><div style={{ width: '50%' }} /><p id='discount'>5% discount</p></>)}
        </Methods>
      ))}
      <div style={{ height: '100%' }} />

      <CheckOuts>
        {data.map((e, i) => (
          <div key={i}>
            <p>{e.name}</p>
            <p id='price'>R$ {formats.money(e.price)}</p>
          </div>
        ))}
      </CheckOuts>
      <Result>
        <p>Total</p>
        <p id='price'>R$ {formats.money(String(sum))}</p>
      </Result>

      <Button
        id='address'
        disabled={data.length === 0}
        onClick={handleNextPage}
      >Next</Button>
    </Container>
  );
}

export default Method;