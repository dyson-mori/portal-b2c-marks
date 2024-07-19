"use client"

import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useTheme } from "styled-components";

import { Button, Input, Select } from "@/components";

import { Text, Warning, Block, Success } from '@/assets/svg/icons';
import { NotificationContext } from "@/hooks/notification";

import { Container, Forms, Inputs } from './styles';

const schema = yup.object().shape({
  category: yup.string().required('Required fields'),
});

type SchemaProps = yup.InferType<typeof schema>;

export default function Category() {
  const themes = useTheme();

  const { setNotification } = useContext(NotificationContext);

  const { register, getValues, setValue, handleSubmit, formState: { isLoading, isSubmitting, errors } } = useForm<SchemaProps>({
    resolver: yupResolver(schema),
  });

  const { category } = getValues();

  console.log({
    isLoading, isSubmitting, errors, url: process.env.NEXT_URL
  });

  const submit = async (event: { category: string }) => {
    const res = await fetch(`/api/category`, {
      method: 'POST',
      body: JSON.stringify({
        name: event.category,
      }),
    });

    if (!res.ok) {
      return setNotification({ icon: Block, type: 'failed', message: 'Failed to send the form', active: `${Math.random()}_show` });
    };

    setValue('category', '');
    return setNotification({ icon: Success, type: 'success', message: 'Form sent successfully', active: `${Math.random()}_show` });
  };

  return (
    <Container>
      <Forms onSubmit={handleSubmit(submit)}>
        <Inputs>
          <Input.Root>
            <Text width={20} height={20} stroke={themes.colors.primary} strokeWidth={2} />
            <Input.Input
              {...register('category')}
              placeholder="Category"
              disabled={isLoading}
              defaultValue={category}
              onChange={evt => {
                setValue('category', evt.target.value)
              }}
            />
          </Input.Root>

        </Inputs>
        {/* <Select
          data={[]}
          onChangeValue={evt => setValue('category', '')}
        /> */}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'loading...' : 'Done'}
        </Button>
      </Forms>
    </Container>
  );
};
