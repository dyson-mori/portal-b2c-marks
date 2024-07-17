import React from 'react';
import { useRouter } from 'next/navigation';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Input } from '@/components';
import { User } from '@/assets/svg/icons';
import { formats } from '@/helpers/format';

import { schema, schemaProps } from './schema';
import { Container, Form } from './styles';
import { useTheme } from 'styled-components';

interface Props {
  onNextPage(a: {
    method: string | null;
    page: 'method' | 'address' | 'buy';
  }): void;
};

const FormScreen: React.FC<Props> = ({ onNextPage }) => {
  const route = useRouter();
  const theme = useTheme();

  const { control, handleSubmit, setValue, formState: { isLoading } } = useForm<schemaProps>({
    // resolver: yupResolver(schema),
    defaultValues: {
      // first_name: 'Sergio',
      // middle_name: 'Junio',
      // full_name: 'Leal',
      // phone: '31975564133',
      // cpf: '14243099642',
      // cep: '32310370',
      // address: '920',
      // description: 'testing description',
      // credit_card_name: 'sergio',
      // expiration_date: '123',
      // document_number: '0000000000000000'
    }
  });

  const onSubmit = async (form: any) => {
    // const res = await fetch('/api/product/purchase', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     ...form,
    //     product_id: data.id
    //   })
    // });

    // const result = await res.json();

    // return route.push(`/success?id=${result.id}`);
  };

  return (
    <Container>
      <h1>Address</h1>
      <div style={{ height: 20 }} />
      <Form onSubmit={handleSubmit(onSubmit)}>
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
        <div style={{ height: 8.5 }} />
        <Button type='submit' value='submit'>Add your cart</Button>
      </Form>

    </Container>
  )
};

export default FormScreen;