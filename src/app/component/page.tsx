"use client";

import React from 'react';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';

import { Input } from '@/components';
import { Mobile } from '@/assets/svg';

import { Container, Form } from './styles';

const schema = yup.object().shape({
  method: yup.string()
});

type SchemaProps = yup.InferType<typeof schema>;

export default function Component() {
  const { control, handleSubmit, setValue } = useForm<SchemaProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      method: ''
    }
  });

  const Submit = (evt: SchemaProps) => {
    console.log(evt);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(Submit)}>
        <Controller
          name="method"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input.Root>
              <Mobile width={15} height={20} stroke="#47C747" strokeWidth={2} />
              <Input.Input
                placeholder='(00) 0 0000 0000'
                onBlur={onBlur}
                onChange={e => {
                  setValue('method', e.target.value);
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
