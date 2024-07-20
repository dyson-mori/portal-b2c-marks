"use client"

import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTheme } from "styled-components";

import { AsideProps, CategoryProps } from "@/global/interfaces";

import { Block, Success, Trash, Edit, Tag } from '@/assets/svg/icons';
import { NotificationContext } from "@/hooks/notification";

import { Input } from "@/components";

import { Container, Forms, Items, Header, Content, ButtonToAdd, Options } from './styles';

const schema = yup.object().shape({
  title: yup.string().required('Required fields'),
});

type SchemaProps = yup.InferType<typeof schema>;

interface Props {
  aside: AsideProps[];
  categories: CategoryProps[];
}

export default function Screen({ aside, categories }: Props) {
  const theme = useTheme();

  const { setNotification } = useContext(NotificationContext);

  const { control, setValue, handleSubmit, formState: { isLoading } } = useForm<SchemaProps>({
    resolver: yupResolver(schema),
  });

  const relation = async (aside: AsideProps, category: CategoryProps) => {
    const res = await fetch(`/api/aside`, {
      method: 'PUT',
      body: JSON.stringify({
        aside,
        category,
      }),
    });

    if (!res.ok) {
      return setNotification({ icon: Block, type: 'failed', message: 'Failed to send the form', active: `${Math.random()}_show` });
    };

    return setNotification({ icon: Success, type: 'success', message: 'Form sent successfully', active: `${Math.random()}_show` });
  };

  const submit = async (event: { title: string }) => {
    const res = await fetch(`/api/aside`, {
      method: 'POST',
      body: JSON.stringify({
        title: event.title,
      }),
    });

    if (!res.ok) {
      return setNotification({ icon: Block, type: 'failed', message: 'Failed to send the form', active: `${Math.random()}_show` });
    };

    setValue('title', '');
    return setNotification({ icon: Success, type: 'success', message: 'Form sent successfully', active: `${Math.random()}_show` });
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
                placeholder="Title"
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
        {aside.map((g, i) => (
          <Content key={i}>
            <Header>
              <p>{g.title}</p>
              <button>
                <Edit width={18} height={18} stroke='yellow' strokeWidth={2} />
              </button>
              <button>
                <Trash width={18} height={18} stroke='red' strokeWidth={2} />
              </button>
            </Header>
            <Options>
              {categories.map((f, i) =>
                <ButtonToAdd
                  key={i}
                  style={{
                    backgroundColor: theme.colors[g.categories.find(e => e.id === f.id) ? 'primary' : 'white'],
                    color: theme.colors[g.categories.find(e => e.id === f.id) ? 'white' : 'text'],
                  }}
                  onClick={() => relation(g, f)}
                >{f.name}</ButtonToAdd>)
              }
            </Options>
          </Content>
        ))}
      </Items>
    </Container>
  );
};
