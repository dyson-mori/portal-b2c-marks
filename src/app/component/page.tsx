"use client";

import React from 'react';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';

import { Input } from '@/components';
import { Mobile } from '@/assets/svg/icons';

import { Container, Form } from './styles';
import { formats } from '@/helpers/format';

const brazilianPhoneRegExp = /^\(?(\d{2})\)?\s?(\d{4,5})[- ]?(\d{4})$/;

const schema = yup.object().shape({
  phone: yup.string()
    .matches(brazilianPhoneRegExp, 'Phone number is not valid')
    // .transform(function (value, originalValue) {
    //   const digits = originalValue.replace(/\D/g, '');
    //   if (digits.length === 10) {
    //     return digits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    //   } else if (digits.length === 11) {
    //     return digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    //   }
    //   return originalValue;
    // }),
});

type SchemaProps = yup.InferType<typeof schema>;

export default function Component() {
  const { control, handleSubmit, setValue } = useForm<SchemaProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      phone: ''
    }
  });

  const Submit = (evt: SchemaProps) => {
    console.log(evt);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(Submit)}>
        <Controller
          name="phone"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input.Root>
              <Mobile width={15} height={20} stroke="#47C747" strokeWidth={2} />
              <Input.Input
                style={{
                  width: 'auto'
                }}
                value='test'
              />
              <Input.Input
                prefix='asaas'
                name='phone'
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
      </Form>
    </Container>
  )
}
