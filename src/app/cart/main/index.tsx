"use client"

import React, { useContext, useState } from 'react';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTheme } from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';

import { Button, Input } from '@/components';

import Products from '../common/products';

import { Container, Aside, HeaderForm, CheckOuts, Methods, Product, Result, AsideContent } from './styles';
import { ArrowLeft, Delivery, Mobile, Routing, TextAlignLeft, User } from '@/assets/svg/icons';
import { DotLottiePlayer } from '@dotlottie/react-player';
import { formats } from '@/helpers/format';
import { Cards, Pix } from '@/assets/svg';
import { CartContext } from '@/contexts/cart';
import { useRouter } from 'next/navigation';

const methodsPayments = [
  'Credit Cart',
  'Pix'
];

const steps = [
  {
    id: 'Step 1',
    name: 'Payment Method',
    fields: [
      'method',
      'price'
    ]
  },
  {
    id: 'Step 2',
    name: 'Address',
    fields: [
      'full_name',
      'phone',
      'cpf',
      'cep',
      'address',
      'description'
    ]
  },
  { id: 'Step 3', name: 'Credit Cart',
    fields: [
      'credit_card_name',
      'expiration_date',
      'document_number',
    ]
  }
]

const brazilianPhoneRegExp = /^\(?(\d{2})\)?\s?(\d{4,5})[- ]?(\d{4})$/;

const schema = yup.object().shape({
  method: yup.string().required(),
  full_name: yup.string().required('Field Required').min(6, 'Too short'),
  phone: yup.string().required(),
  cpf: yup.string().required('Field Required'),
  cep: yup
    .string()
    .required('Field Required')
    // .transform((value) => {
    //   console.log({ value });
    // })
    .test('address', 'address not found', async (value) => {
      // const res = await fetch(`https://api.postmon.com.br/v1/cep/${value}`, { method: 'GET' });
      // const success = await res.json();
      return true
    }),
  address: yup.string().required('Field Required'),
  description: yup.string().required('Field Required'),
  credit_card_name: yup.string().required('Field Required'),
  expiration_date: yup.string().required('Field Required'),
  document_number: yup.string().required('Field Required').max(16, 'Must be exactly 16 characters').test('len', 'Must be exactly 16 characters', val => val.length === 16),
});

type schemaProps = yup.InferType<typeof schema>;

const Main: React.FC = () => {
  const route = useRouter();
  const theme = useTheme();

  const { storage } = useContext(CartContext);

  const [currentStep, setCurrentStep] = useState(0);

  const lottie_styles  = {
    display: 'flex',
    maxWidth: "150px"
  };

  const sumPrices = storage?.reduce((total: any, item: any) => {
    const formattedPrice = item?.price ? parseFloat(item.price.replace('.', '').replace(',', '.')) : 0;
    return total + formattedPrice;
  }, 0);

  const { control, handleSubmit, getValues, setValue, reset, trigger, formState } = useForm<schemaProps>({
    resolver: yupResolver(schema),
  });

  console.log(formState.errors);

  const { method } = getValues();

  const processForm: SubmitHandler<schemaProps> = data => {
    route.push('/gateway');
    reset()
  };

  type FieldName = keyof schemaProps;

  const next = async () => {
    const fields = steps[currentStep].fields
    const output = await trigger(fields as FieldName[], { shouldFocus: true })

    if (!output) return;

    if (currentStep === 2) return handleSubmit(processForm)();

    return setCurrentStep(step => step <= 2 ? step + 1 : 2);
  };

  return (
    <Container>
      <Products data={storage} />

      <Aside>
        <HeaderForm>
          <button
            disabled={currentStep === 0}
            style={{ opacity: currentStep === 0 ? 0 : 1 }}
            onClick={evt => {
              evt.preventDefault();
              setCurrentStep(step => step === 2 ? step - 1 : 0)
            }}
          >
            <ArrowLeft width={20} height={20} stroke={theme.colors.primary} strokeWidth={2}/>
          </button>
          <h4>{steps[currentStep].name}</h4>
          <p>{currentStep + 1}/3</p>
        </HeaderForm>

        <AsideContent>
          {currentStep === 0 && (
            <>
              <p style={{ fontSize: 12, fontWeight: 500 }}>Choose payment method</p>
              {methodsPayments.map((meth, i) => (
                <Methods
                  key={i}
                  style={{ boxShadow: method === meth ? theme.settings.box.defaultHoverPrimary : '' }}
                  disabled={storage?.length === 0}
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
                      stroke={theme.colors[storage?.length === 0 ? 'primary_disabled' : 'primary']}
                    />
                  )}
                  {meth === 'Pix' && <Pix width={20} height={20} />}
                  <p>{meth}</p>
                  {meth === 'Pix' && (<><div style={{ width: '50%' }} /><p id='discount'>5% discount</p></>)}
                </Methods>
              ))}

              <div style={{ height: '100%' }} />

              <CheckOuts>
                {storage.length !== 0 ? storage.map((e: any, i: number) => (
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
            </>
          )}
          {currentStep === 1 && (
            <>
              <Controller
                name="full_name"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input.Root>
                    <User width={20} height={20} stroke={theme.colors.primary} strokeWidth={2} />
                    <Input.Input
                      value={value}
                      placeholder='Full Name'
                      onBlur={onBlur}
                      onChange={e => {
                        setValue('full_name', e.target.value);
                        onChange(e);
                      }}
                    />
                  </Input.Root>
                )}
              />
              <div style={{ height: 8.5 }} />
              <Controller
                name="phone"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input.Root>
                    <Mobile width={15} height={20} stroke={theme.colors.primary} strokeWidth={2} />
                    <Input.Input
                      value={formats.phoneNumber(value!)}
                      placeholder='(00) 0 0000 0000'
                      onBlur={onBlur}
                      onChange={e => {
                        setValue('phone', e.target.value);
                        onChange(e);
                      }}
                    />
                  </Input.Root>
                )}
              />
              <div style={{ height: 8.5 }} />
              <Controller
                name="cpf"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input.Root>
                    <User width={20} height={20} stroke={theme.colors.primary} strokeWidth={2} />
                    <Input.Input
                      name='cpf'
                      value={formats.cpf(value!)}
                      placeholder='000.000.000-00'
                      onBlur={onBlur}
                      onChange={e => {
                        setValue('cpf', e.target.value);
                        onChange(e);
                      }}
                    />
                  </Input.Root>
                )}
              />
              <div style={{ height: 8.5 }} />
              <Controller
                name="cep"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input.Root>
                    <Delivery width={20} height={20} fill={theme.colors.primary} />
                    <Input.Input
                      name='cep'
                      value={formats.cep(value)}
                      placeholder='00000-000'
                      onBlur={onBlur}
                      onChange={e => {
                        setValue('cep', e.target.value);
                        onChange(e);
                      }}
                    />
                  </Input.Root>
                )}
              />
              <div style={{ height: 8.5 }} />
              <Controller
                name="address"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input.Root>
                    <Routing width={20} height={20} stroke={theme.colors.primary} strokeWidth={2} />
                    <Input.Input
                      defaultValue='MG - Belo Horizonte - Nova Lima - Rua das Acácias - '
                      value={value}
                      placeholder='MG - Belo Horizonte - Nova Lima - Rua das Acácias - '
                      onBlur={onBlur}
                      onChange={e => {
                        setValue('address', e.target.value);
                        onChange(e);
                      }}
                    />
                  </Input.Root>
                )}
              />
              <div style={{ height: 8.5 }} />
              <Controller
                name="description"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input.Root>
                    <TextAlignLeft width={20} height={20} stroke={theme.colors.primary} strokeWidth={2} />
                    <Input.Input
                      value={value}
                      placeholder='Description'
                      onBlur={onBlur}
                      onChange={e => {
                        setValue('description', e.target.value);
                        onChange(e);
                      }}
                    />
                  </Input.Root>
                )}
              />
            </>
          )}
          {currentStep === 2 && (
            <>
              <Controller
                name="credit_card_name"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input.Root>
                    <User width={20} height={20} stroke={theme.colors.primary} />
                    <Input.Input
                      value={value}
                      placeholder='Name on the card'
                      onBlur={onBlur}
                      onChange={e => {
                        setValue('credit_card_name', e.target.value);
                        onChange(e);
                      }}
                    />
                  </Input.Root>
                )}
              />
              <div style={{ height: 8.5 }} />
              <Controller
                name="expiration_date"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input.Root>
                    <User width={20} height={20} stroke={theme.colors.primary} />
                    <Input.Input
                      value={value}
                      placeholder='000'
                      onBlur={onBlur}
                      onChange={e => {
                        setValue('expiration_date', e.target.value);
                        onChange(e);
                      }}
                    />
                  </Input.Root>
                )}
              />
              <div style={{ height: 8.5 }} />
              <Controller
                name="document_number"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input.Root>
                    <User width={20} height={20} stroke={theme.colors.primary} />
                    <Input.Input
                      value={formats.document_number(value)}
                      placeholder='0000-0000-0000-0000'
                      onBlur={onBlur}
                      onChange={e => {
                        if (e.target.value.replace(/-/g, '').length >= 17) return;
                        setValue('document_number', e.target.value);
                        onChange(e);
                      }}
                    />
                  </Input.Root>
                )}
              />
            </>
          )}
        </AsideContent>

        <Button
          id='address'
          disabled={storage?.length === 0}
          onClick={evt => {
            evt.preventDefault();
            next()
          }}
        >{currentStep === 2 ? 'Complete' : 'Next'}</Button>
      </Aside>

    </Container>
  )
}

export default Main;
