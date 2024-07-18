"use client"

import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTheme } from "styled-components";
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';

import { NotificationContext } from "@/hooks/notification";
import { Button, Input, Upload, Select } from "@/components";
import { ProductsProps, CategoryProps } from "@/global/interfaces";
import { Search, Text, Devolution, TextAlignLeft, Block } from '@/assets/svg/icons';

import { Container, Forms, Inputs, Row } from './styles';
import { formats } from "@/helpers/format";

type Props = {
  isUpdate: boolean;
  product: ProductsProps | null;
  category: CategoryProps[];
};

const schema = yup.object().shape({
  id: yup.string(),
  name: yup.string().required('Required fields'),
  price: yup.string().required('Required fields'),
  description: yup.string().required('Required fields'),
  category: yup.array().of(
    yup.object({
      id: yup.string(),
      name: yup.string()
    })
  ).required('Required fields'),
  files: yup.array().of(
    yup.object({
      file: yup.mixed(),
      // file: yup.mixed({
      //   lastModified: yup.number().required(),
      //   lastModifiedDate : yup.date().required(),
      //   name: yup.string().required(),
      //   size: yup.number().required(),
      //   type: yup.string().required(),
      //   webkitRelativePath: yup.string().required(),
      // }).required(),
      url: yup.string().required()
    })
  ).required('Required fields')
});

type SchemaProps = yup.InferType<typeof schema>;

export default function Register({ isUpdate, product, category: dropdownCategory }: Props) {
  const themes = useTheme();

  const { setNotification } = useContext(NotificationContext);

  const { getValues, setValue, handleSubmit, control, formState: { isLoading, isSubmitting, isSubmitted, errors } } = useForm<SchemaProps>({
    defaultValues: {
      id: product?.id ?? '',
      name: product?.name ?? '',
      description: product?.description ?? '',
      price: product?.price ?? '',
      category: product?.category ?? [],
      files: product?.files ?? []
    },
    resolver: yupResolver(schema),
  });

  const { id: productId, category, files } = getValues();
  
  const Submit = async (event: SchemaProps) => {
    try {
      const { name, description, price, category } = event;

      const prefix = {
        url: `${process.env.NEXT_URL}/api/product${isUpdate ? `?id=${product!.id}` : ''}`,
        method: isUpdate ? 'PUT' : 'POST'
      };

      const res = await fetch(prefix.url, {
        method: prefix.method,
        body: JSON.stringify({
          name,
          description,
          price: `${Number(Number(price.replace(/[,.R$ ]/g, '')) / 100).toFixed(2)}`,
          category
        }),
      });

      if (!res.ok) {
        return setNotification({ icon: Block, type: 'failed', message: `Failed to ${isUpdate ? 'update' : 'upload'} the form`, active: `${Math.random()}_show` });
      };

      const result = await res.json();

      setValue('id', result?.id);

    } catch (error) {
      throw new Error(`${error}`)
    }
  };

  return (
    <Container>
      <Forms onSubmit={handleSubmit(Submit)}>

        <Controller
          name="files"
          control={control}
          render={({ field: { onChange, onBlur, value, disabled }  }) => {
            return (
              <Upload
                productId={productId}
                files={value}
                isSubmitted={isSubmitted}
                isUpdate={isUpdate}
                setFiles={evt => {
                  setValue('files', evt);
                  if (evt.length === 0) {
                    setValue('name', '');
                    setValue('price', '');
                    setValue('description', '');
                    setValue('category', []);
                    setValue('id', undefined);
                  };
                  onChange(evt)
                }}
              />
            )
          }}
        />

        <Inputs>
          <Row>

            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, onBlur, value }  }) => (
                <Input.Root>
                  <Devolution width={20} height={20} stroke={themes.colors.primary} strokeWidth={1.6} />
                  <Input.Input
                    value={value}
                    placeholder="Name Product"
                    defaultValue={value}
                    onChange={evt => {
                      setValue('name', evt.target.value)
                      onChange(evt);
                    }}
                  />
                </Input.Root>
              )}
            />

          <div style={{ width: 10 }} />

            <Controller
              name="description"
              control={control}
              render={({ field: { onChange, onBlur, value }  }) => (
                <Input.Root>
                  <TextAlignLeft width={20} height={20} stroke={themes.colors.primary} strokeWidth={2} />
                  <Input.Input
                    value={`${value}`}
                    placeholder="Description"
                    defaultValue={`${value}`}
                    onChange={evt => {
                      setValue('description', evt.target.value);
                      onChange(evt);
                    }}
                  />
                </Input.Root>
              )}
            />
          </Row>
        <div style={{ height: 5 }} />
          <Row>

            <Controller
              name="price"
              control={control}
              render={({ field: { onChange, onBlur, value }  }) => (
                <Input.Root>
                  <Text width={20} height={20} stroke={themes.colors.primary} strokeWidth={2} />
                  <Input.Input
                    placeholder="Price"
                    onBlur={onBlur}
                    value={`R$ ${formats.money(value)}`}
                    defaultValue={value}
                    onChange={evt => {
                      setValue('price', evt.target.value)
                      onChange(evt);
                    }}
                  />
                </Input.Root>
              )}
            />
            <div style={{ width: 10 }} />

            <Select
              data={dropdownCategory}
              placeholder="Category"
              LeftIcon={Search}
              defaultValue={category}
              onChangeValue={value => setValue('category', value)}
            />

          </Row>
        </Inputs>

        <Button type="submit" primary disabled={isLoading}>
          {isLoading ? 'Sending...' : isUpdate ? 'Update' : 'Upload'}
        </Button>
      </Forms>
    </Container>
  );
};
