"use client"

import { SyntheticEvent, useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useTheme } from "styled-components";

import { Button, Input } from "@/components";

import { Text, Warning, Block, Success } from '@/assets/svg/icons';
import { NotificationContext } from "@/hooks/notification";

import { Container, Forms, Inputs } from './styles';
import { Category as CategoryPrisma } from "@prisma/client";

const schema = yup.object().shape({
  category: yup.string().required('Required fields'),
});

type SchemaProps = yup.InferType<typeof schema>;

export default function Category() {
  const themes = useTheme();

  const { setNotification } = useContext(NotificationContext);

  const { getValues, setValue, handleSubmit, control, formState: { isLoading, isSubmitting, errors } } = useForm<SchemaProps>({
    // resolver: yupResolver(schema),
  });

  console.log({
    isLoading, isSubmitting, errors
  });
  

  const submit = async (event: { category: string }) => {
    const res = await fetch('/api/category', {
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
          <Controller
            name="category"
            control={control}
            render={({ field: { onChange, onBlur, value }  }) => (
              <Input.Root>
                <Text width={20} height={20} stroke={themes.colors.primary} strokeWidth={2} />
                <Input.Input
                  placeholder="Category"
                  disabled={isLoading}
                  value={value}
                  defaultValue={value}
                  onChange={evt => {
                    setValue('category', evt.target.value)
                    onChange(evt);
                  }}
                />
              </Input.Root>
            )}
          />

        </Inputs>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'loading...' : 'Done'}
        </Button>
      </Forms>
    </Container>
  );
};
