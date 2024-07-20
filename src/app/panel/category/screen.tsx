"use client"

import { useContext } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useTheme } from "styled-components";

import { Block, Success, Tag, Edit, Trash } from '@/assets/svg/icons';
import { NotificationContext } from "@/hooks/notification";

import { CategoryProps } from "@/global/interfaces";
import { Input} from "@/components";

import { Container, Items, Forms, Option } from './styles';

const schema = yup.object().shape({
  category: yup
    .string()
    .required('Required fields'),
  // options: yup
  //   .array()
  //   .when('category', {
  //     is: 'girls',
  //     then: yup.array(),
  //     otherwise: yup.array()
  //   })
  //   .notRequired()
});

type SchemaProps = yup.InferType<typeof schema>;

interface Props {
  categories: CategoryProps[]
};

export default function Screen({ categories }: Props) {
  const theme = useTheme();

  const { setNotification } = useContext(NotificationContext);

  const { control, setValue, handleSubmit } = useForm<SchemaProps>({
    resolver: yupResolver(schema),
    // defaultValues: {
    //   options: categories
    // }
  });


  const submit = async (event: { category: string }) => {
    const res = await fetch(`/api/category`, {
      method: 'POST',
      body: JSON.stringify({
        category: event.category,
      }),
    });

    if (!res.ok)
      return setNotification({ icon: Block, type: 'failed', message: 'Failed to send the form', active: `${Math.random()}_show` });

    setValue('category', '');
    return setNotification({ icon: Success, type: 'success', message: 'Form sent successfully', active: `${Math.random()}_show` });
  };

  return (
    <Container>
      <Forms onSubmit={handleSubmit(submit)}>
        <Controller
          name="category"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input.Root>
              <Tag width={20} height={20} stroke={theme.colors.primary} strokeWidth={2} />
              <Input.Input
                value={value ?? ''}
                placeholder="Category Name"
                onChange={value =>{
                  setValue('category', value.target.value)
                  onChange(value)
                }}
              />
            </Input.Root>
          )}
        />
      </Forms>
      <Items>
        {categories.map((e, i) => (
          <Option key={i}>
            <p><strong>{e._count.product}</strong> - {e.name}</p>
            <button>
              <Edit width={18} height={18} stroke='yellow' strokeWidth={2} />
            </button>
            <button>
              <Trash width={18} height={18} stroke='red' strokeWidth={2} />
            </button>
          </Option>
        ))}
      </Items>
    </Container>
  );
};
