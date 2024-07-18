"use client"

import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useTheme } from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';

import { Button, Typography } from '@/components';
import usePersistedStorage from '@/hooks/useStorage';

import Payments from '../common/method';
import Products from '../common/products';
import Address from '../common/address';
import Purchase from '../common/purchase';

import { Container, Aside, HeaderForm, CheckOuts, Methods, Product, Result } from './styles';
import { ArrowLeft } from '@/assets/svg/icons';
import { DotLottiePlayer } from '@dotlottie/react-player';
import { formats } from '@/helpers/format';
import { Cards, Pix } from '@/assets/svg';

const methodsPayments = [
  'Credit Cart',
  'Pix'
];

const schema = yup.object().shape({
  // name: yup.string().required('Required fields'),
  // step: yup.number().notRequired()
  method: yup.string().required('')
});

type schemaProps = yup.InferType<typeof schema>;

const Main: React.FC = () => {
  const theme = useTheme();

  const [data] = usePersistedStorage('@marks: cart', []);

  const lottie_styles  = {
    display: 'flex',
    maxWidth: "150px"
  };

  const sumPrices = data?.reduce((total, item) => {
    const formattedPrice = parseFloat(item.price.replace('.', '').replace(',', '.'));
    return total + formattedPrice;
  }, 0);

  const { control, handleSubmit, getValues, setValue, formState: { isLoading } } = useForm<schemaProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      method: ''
    }
  });
  const { method } = getValues();

  return (
    <Container>
      <Products data={data} />

      <Aside>
        <HeaderForm>
          <button>
            <ArrowLeft width={20} height={20} stroke={theme.colors.primary} strokeWidth={2}/>
          </button>
          <h4>Payment Info</h4>
          <p>1/3</p>
        </HeaderForm>

        <div style={{ width: '95%', margin: '20px 0 5px 0' }}>
          <p style={{ fontSize: 12, fontWeight: 500 }}>Choose payment method</p>
        </div>

        {methodsPayments.map((meth, i) => (
          <Methods
            key={i}
            style={{ boxShadow: method === meth ? theme.settings.box.defaultHoverPrimary : '' }}
            disabled={data?.length === 0}
            onClick={(evt) => {
              evt.preventDefault();
              setValue('method', meth);
            }}
          >
            {meth === 'Credit Cart' && (
              <Cards
                width={20}
                height={20}
                strokeWidth={1.5}
                stroke={theme.colors[data?.length === 0 ? 'primary_disabled' : 'primary']}
              />
            )}
            {meth === 'Pix' && <Pix width={20} height={20} />}
            <p>{meth}</p>
            {meth === 'Pix' && (<><div style={{ width: '50%' }} /><p id='discount'>5% discount</p></>)}
          </Methods>
        ))}

        <div style={{ height: '100%' }} />

        <CheckOuts>
          {data.length !== 0 ? data.map((e, i) => (
            <div key={i}>
              <p>{e.name}</p>
              <p id='price'>R$ {formats.money(e.price)}</p>
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

        <Button id='address' disabled={data?.length === 0}>Next</Button>
      </Aside>

    </Container>
  )
}

export default Main;
