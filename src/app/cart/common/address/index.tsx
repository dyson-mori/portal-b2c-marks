import React from 'react';
import { useRouter } from 'next/navigation';

import { useTheme } from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Input } from '@/components';
import { Delivery, Routing, User, TextAlignLeft, Mobile, ArrowLeft } from '@/assets/svg/icons';
import { formats } from '@/helpers/format';

import { schema, schemaProps } from './schema';
import { Container, Form, Header} from './styles';

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

  const handlePrevPage = () => onNextPage({
    method: '',
    page: 'method'
  })

  return (
    <Container>
      <Header>
        <button onClick={handlePrevPage}>
          <ArrowLeft width={20} height={20} stroke={theme.colors.primary} strokeWidth={2}/>
        </button>
        <h1>Address</h1>
        <p>2/3</p>
      </Header>
      <div style={{ height: 20 }} />
      <Form onSubmit={handleSubmit(onSubmit)}>
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
        <div style={{ height: 8.5 }} />
        <Button type='submit' value='submit'>Next</Button>
      </Form>
    </Container>
  )
};

export default FormScreen;