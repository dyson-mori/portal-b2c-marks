"use client"

import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTheme } from 'styled-components';

import { yupResolver } from '@hookform/resolvers/yup';
import { DotLottiePlayer } from '@dotlottie/react-player';

import { Button, Input } from '@/components';

import { formats } from '@/helpers/format';
import { Cards, Pix } from '@/assets/svg';
import { CartContext } from '@/contexts/cart';
import { NotificationContext } from '@/hooks/notification';
import { ArrowLeft, Block, Delivery, Mobile, Routing, TextAlignLeft, User } from '@/assets/svg/icons';

import { ContainerForm, HeaderForm, CheckOuts, Methods, Result, AsideContent } from './styles';
import { schemaProps, schema, methodsPayments, steps } from './schema';

export default function Aside() {
  const route = useRouter();
  const theme = useTheme();

  const { storage } = useContext(CartContext);
  const { setNotification } = useContext(NotificationContext);

  const sumPrices: number = storage?.reduce((total: any, item: any) => {
    const formattedPrice = item?.price ? parseFloat(item.price.replace('.', '').replace(',', '.')) : 0;
    return total + formattedPrice;
  }, 0);

  const { control, handleSubmit, getValues, setValue, reset, trigger, formState } = useForm<schemaProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      products: storage,
      price: String(sumPrices / 100),

      //   method: '',
      //   full_name: 'Sergio Junio Leal',
      //   phone: '31975564133',
      //   cpf: '14243099642',

      //   cep: '',
      //   neighborhood: '',
      //   city: '',
      //   street: '',
      //   state: '',

      //   address: '',
      //   description: 'Casa 1',

      //   credit_card_name: 'Sergio Junio Leal',
      //   expiration_date: '125',
      //   document_number: '5050363695857546'
    }
  });

  const [currentStep, setCurrentStep] = useState(0);

  const lottie_styles  = {
    display: 'flex',
    maxWidth: "150px"
  };

  const processForm: SubmitHandler<schemaProps> = async data => {
    const productsIds = data.products.map(({ id }) => ({ id }));

    const res = await fetch('/api/gateway', {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        products: productsIds
      }),
    });

    if (!res.ok) {
      return setNotification({ icon: Block, message: 'Faield', type: 'failed', active: `${Math.random() * 100}` });
    };

    const gateway = await res.json();

    route.push(`/gateway?id=${gateway.id}`);
    localStorage.setItem('@marks: cart', JSON.stringify([]));
    reset();
  };

  type FieldName = keyof schemaProps;

  const next = async () => {
    const fields = steps[currentStep].fields
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep === 2) return handleSubmit(processForm)();

    return setCurrentStep(step => step <= 2 ? step + 1 : 2);
  };

  return (
    <ContainerForm>
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
              <Controller key={i} name='method' control={control}
                render={({ field: { name, value } }) => (
                  <Methods key={i} disabled={storage?.length === 0}
                    style={{ boxShadow: value === meth ? theme.settings.box.defaultHoverPrimary : '' }}
                    onClick={(evt) => {
                      evt.preventDefault();
                      setValue('method', meth);
                    }}
                  >
                    {meth === 'Credit Cart' && (
                      <Cards width={20} height={20} strokeWidth={1.5} stroke={theme.colors[storage?.length === 0 ? 'primary_disabled' : 'primary']} />
                    )}
                    {meth === 'Pix' && <Pix width={20} height={20} />}
                    <p>{meth}</p>
                    {meth === 'Pix' && (<><div style={{ width: '50%' }} /><p id='discount'>5% discount</p></>)}
                  </Methods>
                )}
              />
            ))}

            <div style={{ height: '100%' }} />

            <CheckOuts>
              {storage.length !== 0 ? storage.map((e: any, i: number) => (
                <div key={i}>
                  <p>{e.title}</p>
                  <p id='price'>{formats.money(e.price)}</p>
                </div>
              )): (
                <div id='lottie'>
                  <DotLottiePlayer style={lottie_styles} src="/lottie/marks-empty-card.lottie" autoplay />
                </div>
              )}
            </CheckOuts>
            <Result>
              <p>Total</p>
              <p id='price'>{formats.money(sumPrices)}</p>
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
                      if (e.target.value.replace(/-/g, '').length >= 15) return;
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
                      if (e.target.value.replace(/-/g, '').length >= 12) return;
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
                      if (e.target.value.replace(/-/g, '').length >= 9) return;

                      if (e.target.value.replace(/-/g, '').length === 8) {
                        return fetch(`https://api.postmon.com.br/v1/cep/${e.target.value}`)
                        .then(jsn => jsn.json())
                        .then((address) => {
                          setValue('state', address.estado);
                          setValue('city', address.cidade);
                          setValue('neighborhood', address.bairro);
                          setValue('street', address.logradouro);
                          setValue('cep', address.cep);

                          // setValue('address', `${address.estado} - ${address.cidade} - ${address.bairro} - ${address.logradouro} - `);
                        })
                      };
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
                    defaultValue={value ?? ''}
                    value={value}
                    placeholder='Address'
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
        disabled={
          storage?.length === 0
        }
        onClick={evt => {
          evt.preventDefault();
          next()
        }}
      >{currentStep === 2 ? 'Complete' : 'Next'}</Button>
    </ContainerForm>
  )
}

