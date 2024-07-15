import React from 'react';
import { useRouter } from 'next/navigation';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ProductsProps } from '@/global/interfaces';
import { Button, Input } from '@/components';
import { Delivery, Ellipse, Routing, User, TextAlignLeft, Mobile } from '@/assets/svg/icons';
import { formats } from '@/helpers/format';

import { schema, schemaProps } from './schema';
import { Container, Row } from './styles';

const FormScreen: React.FC = () => {
  const route = useRouter();

  const { control, handleSubmit, setValue, formState: { isLoading } } = useForm<schemaProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: 'Sergio',
      middle_name: 'Junio',
      last_name: 'Leal',
      phone: '31975564133',
      cpf: '14243099642',
      cep: '32310370',
      address: '920',
      description: 'testing description',
      credit_card_name: 'sergio',
      expiration_date: '123',
      document_number: '0000000000000000'
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
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Controller
          name="first_name"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input.Root>
              <User width={20} height={20} stroke="#47C747" strokeWidth={2} />
              <Input.Input
                value={value}
                placeholder='First Name'
                onBlur={onBlur}
                onChange={e => {
                  setValue('first_name', e.target.value);
                  onChange(e);
                }}
              />
            </Input.Root>
          )}
        />
        &nbsp;
        <Controller
          name="middle_name"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input.Root>
              <User width={20} height={20} stroke="#47C747" strokeWidth={2} />
              <Input.Input
                value={value}
                placeholder='Middle Name'
                onBlur={onBlur}
                onChange={e => {
                  setValue('middle_name', e.target.value);
                  onChange(e);
                }}
              />
            </Input.Root>
          )}
        />
        &nbsp;
        <Controller
          name="last_name"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input.Root>
              <User width={20} height={20} stroke="#47C747" strokeWidth={2} />
              <Input.Input
                value={value}
                placeholder='Last Name'
                onBlur={onBlur}
                onChange={e => {
                  setValue('last_name', e.target.value);
                  onChange(e);
                }}
              />
            </Input.Root>
          )}
        />
      </Row>

      <div style={{ height: 8.5 }} />
      <Row>
        <Controller
          name="phone"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input.Root>
              <Mobile width={15} height={20} stroke="#47C747" strokeWidth={2} />
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
        &nbsp;
        <Controller
          name="cpf"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input.Root>
              <User width={20} height={20} stroke="#47C747" strokeWidth={2} />
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
      </Row>

      <div style={{ height: 8.5 }} />
      <Controller
        name="cep"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input.Root>
            <Delivery width={20} height={20} fill="#47C747" />
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
            <Routing width={20} height={20} stroke="#47C747" strokeWidth={2} />
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
            <TextAlignLeft width={20} height={20} stroke="#47C747" strokeWidth={2} />
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

      <div style={{ textAlign: 'center', marginTop: 5 }}>
        <Ellipse width={40} height={10} />
      </div>

      <Row>
        <Controller
          name="credit_card_name"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input.Root>
              <User width={20} height={20} stroke="#47C747" />
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
        &nbsp;
        <Controller
          name="expiration_date"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input.Root>
              <User width={20} height={20} stroke="#47C747" />
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
      </Row>

      <div style={{ height: 8.5 }} />
      <Controller
        name="document_number"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input.Root>
            <User width={20} height={20} stroke="#47C747" />
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
      <Button type='submit' value='submit'>{isLoading ? 'loading...' : 'Buy now'}</Button>
    </Container>
  )
};

export { FormScreen };