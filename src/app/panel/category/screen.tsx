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
import { revalidateSetting } from "./action";

const schema = yup.object().shape({
  id: yup.string().notRequired(),
  title: yup
    .string()
    .required('Required fields'),
});

type SchemaProps = yup.InferType<typeof schema>;

interface Props {
  categories: CategoryProps[]
};

export default function Screen({ categories }: Props) {
  const theme = useTheme();

  const { setNotification } = useContext(NotificationContext);

  const { control, getValues, setValue, handleSubmit } = useForm<SchemaProps>({
    resolver: yupResolver(schema),
  });

  const submit = async (event: SchemaProps) => {
    try {
      const { id } = getValues();

      fetch(`/api/category${!!id ? '?id='+id : ''}`, {
        method: !!id ? 'PUT' : 'POST',
        body: JSON.stringify({
          title: event.title,
        }),
      });

      setValue('title', '');
      revalidateSetting();
      return setNotification({ icon: Success, type: 'success', message: 'Form sent successfully', active: `${Math.random()}_show` });
    } catch (error) {
      return setNotification({ icon: Block, type: 'failed', message: 'Failed to send the form', active: `${Math.random()}_show` });
    }
  };

  const exclude = async (id: string) => {
    try {
      await fetch(`/api/category?id=${id}`, { method: 'DELETE' })
      revalidateSetting();
      return setNotification({ icon: Success, type: 'success', message: 'Delete successfully', active: `${Math.random()}_show` });
    } catch (error) {
      return setNotification({ icon: Block, type: 'failed', message: 'Failed to delete', active: `${Math.random()}_show` });
    }
  };

  return (
    <Container>
      <Forms onSubmit={handleSubmit(submit)}>
        <Controller
          name="title"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input.Root>
              <Tag width={20} height={20} stroke={theme.colors.primary} strokeWidth={2} />
              <Input.Input
                value={value ?? ''}
                placeholder="Category Name"
                onChange={value =>{
                  setValue('title', value.target.value)
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
            <p><strong>{e._count.product}</strong> - {e.title}</p>
            <button onClick={() => {
              setValue('id', e.id)
              setValue('title', e.title)
            }}>
              <Edit width={18} height={18} stroke='yellow' strokeWidth={2} />
            </button>
            <button onClick={() => exclude(e.id)}>
              <Trash width={18} height={18} stroke='red' strokeWidth={2} />
            </button>
          </Option>
        ))}
      </Items>
    </Container>
  );
};
