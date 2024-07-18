import React, { useState, CSSProperties } from 'react';

import { useTheme } from 'styled-components';

import { Button } from '@/components';
import { ArrowLeft, Cards, Pix } from '@/assets/svg';
import { formats } from '@/helpers/format';
import { ProductsProps } from '@/global/interfaces';

import { Container, Methods, CheckOuts, Result, Header } from './styles';
import { DotLottiePlayer } from '@dotlottie/react-player';

const methodsPayments = [
  'Credit Cart',
  'Pix'
];

interface Props {
  data: ProductsProps[];
  onSubmit(a: any): void;
};

const Method: React.FC<Props> = ({ data, onSubmit }) => {
  const theme = useTheme();

  const lottie_styles: CSSProperties  = {
    display: 'flex',
    maxWidth: "150px"
  };

  const [methodPayment, setMethodPayment] = useState('');

  const sumPrices = data?.reduce((total, item) => {
    const formattedPrice = parseFloat(item.price!.replace('.', '').replace(',', '.'));
    return total + formattedPrice;
  }, 0);

  return (
    <Container>
      <Header>
        <button>
          <ArrowLeft width={20} height={20} stroke={theme.colors.primary} strokeWidth={2}/>
        </button>
        <h1>Payment Info</h1>
        <p>1/3</p>
      </Header>
      <div style={{ width: '95%', margin: '20px 0 5px 0' }}>
        <p style={{ fontSize: 12, fontWeight: 500 }}>Choose payment method</p>
      </div>
      {methodsPayments.map((e, i) => (
        <Methods style={{
          boxShadow: methodPayment === e ? theme.settings.box.defaultHoverPrimary : ''
        }} key={i} disabled={data?.length === 0} onClick={() => setMethodPayment(e)}>
          {e === 'Credit Cart' && (
            <Cards
              width={20}
              height={20}
              strokeWidth={1.5}
              stroke={theme.colors[data?.length === 0 ? 'primary_disabled' : 'primary']}
            />
          )}
          {e === 'Pix' && <Pix width={20} height={20} />}
          <p>{e}</p>
          {e === 'Pix' && (<><div style={{ width: '50%' }} /><p id='discount'>5% discount</p></>)}
        </Methods>
      ))}
      <div style={{ height: '100%' }} />

      <CheckOuts>
        {data.length !== 0 ? data.map((e, i) => (
          <div key={i}>
            <p>{e.name}</p>
            <p id='price'>R$ {formats.money(e.price!)}</p>
          </div>
        )): (
          <div id='lottie'>
            <DotLottiePlayer style={lottie_styles} src="/lottie/marks-empty-card.lottie" autoplay />
          </div>
        )}
      </CheckOuts>
      <Result>
        <p>Total</p>
        <p id='price'>R$ {formats.money(String(sumPrices))}</p>
      </Result>

      <Button
        id='address'
        disabled={data?.length === 0}
        // onClick={handleNextPage}
      >Next</Button>
    </Container>
  );
}

export default Method;