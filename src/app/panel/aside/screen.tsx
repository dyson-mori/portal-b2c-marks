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
import { revalidatePanelAside } from "../actions";

const schema = yup.object().shape({
  id: yup.string().notRequired(),
  title: yup.string().required('Required fields'),
  categoriesSelecteded: yup.array().of(
    yup.object({
      id: yup.string().required()
    })
  ).notRequired(),
});

type SchemaProps = yup.InferType<typeof schema>;

interface Props {
  aside: AsideProps[];
  categories: CategoryProps[];
}

export default function Screen({ aside, categories }: Props) {
  const theme = useTheme();

  const { setNotification } = useContext(NotificationContext);

  const { control, getValues, setValue, setFocus, handleSubmit, formState: { isLoading } } = useForm<SchemaProps>({
    resolver: yupResolver(schema),
  });

  const relation = async (aside: AsideProps, categoryId: string) => {
    try {
      fetch(`/api/aside?id=${aside.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: aside.title,
          categories: [{id:categoryId}]
        }),
      });
      
      revalidatePanelAside();
      return setNotification({ icon: Success, type: 'success', message: 'Form sent successfully', active: `${Math.random()}_show` });
    } catch (error) {
      return setNotification({ icon: Block, type: 'failed', message: 'Failed to send the form', active: `${Math.random()}_show` });
    };
  };
  
  
  const submit = async (event: SchemaProps) => {
    try {
      const { id, categoriesSelecteded } = getValues();

      fetch(`/api/aside${!!id ? '?id='+id : ''}`, {
        method: !!id ? 'PUT' : 'POST',
        body: JSON.stringify({
          title: event.title,
          categories: []
        }),
      });

      revalidatePanelAside();
      setValue('title', '');
      setValue('id', undefined);
      return setNotification({ icon: Success, type: 'success', message: 'Form sent successfully', active: `${Math.random()}_show` });

    } catch (error) {
      return setNotification({ icon: Block, type: 'failed', message: 'Failed to send the form', active: `${Math.random()}_show` });
    };
  };

  const exclude = async (id: string) => {
    try {
      fetch(`/api/aside?id=${id}`, { method: 'DELETE' });
      revalidatePanelAside();
      return setNotification({ icon: Success, type: 'success', message: 'Form sent successfully', active: `${Math.random()}_show` });
    } catch (error) {
      return setNotification({ icon: Block, type: 'failed', message: 'Failed to send the form', active: `${Math.random()}_show` });
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
                placeholder="Title"
                onChange={value => {
                  setValue('title', value.target.value)
                  onChange(value)
                }}
              />
            </Input.Root>
          )}
        />
      </Forms>

      <Items>
        {aside.map((asi, i) => (
          <Content key={i}>
            <Header>
              <p>{asi.title}</p>
              <button
                onClick={() => {
                  submit(asi);
                  setValue('id', asi.id)
                }}
              >
                <Success width={18} height={18} stroke='#395FF5' strokeWidth={2} />
              </button>
              <button onClick={e => {
                setFocus('title')
                setValue('id', asi.id)
                setValue('title', asi.title)
              }}>
                <Edit width={18} height={18} stroke='yellow' strokeWidth={2} />
              </button>
              <button onClick={() => exclude(asi.id)}>
                <Trash width={18} height={18} stroke='red' strokeWidth={2} />
              </button>
            </Header>
            <Options>
              {categories.map((f, i) =>
                <ButtonToAdd
                  key={i}
                  style={{
                    backgroundColor: theme.colors[asi.categories.find(e => e.id === f.id) ? 'primary' : 'white'],
                    color: theme.colors[asi.categories.find(e => e.id === f.id) ? 'white' : 'text'],
                    fontWeight: theme.font.weight[asi.categories.find(e => e.id === f.id) ? 600 : 400],
                  }}
                  onClick={() => relation(asi, f.id)}
                >{f.title}</ButtonToAdd>)
              }
            </Options>
          </Content>
        ))}
      </Items>
    </Container>
  );
};
