"use client"

import { ButtonHTMLAttributes, useContext, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTheme } from "styled-components";
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';

import { Category } from "@prisma/client";

import { NotificationContext } from "@/hooks/notification";
import { Button, Input, Upload, Select, Card } from "@/components";
import { ProductsProps, CategoryProps } from "@/global/interfaces";
import { Search, Text, Devolution, TextAlignLeft, Block, Tag, Close } from '@/assets/svg/icons';
import { formats } from "@/helpers/format";

import { Container, Forms, Options, Selects, ButtonCategoriesRemove } from './styles';

type Props = {
  isUpdate: boolean;
  product: ProductsProps | null;
  categories: CategoryProps[];
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

export default function Register({ isUpdate, product, categories }: Props) {
  const themes = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { setNotification } = useContext(NotificationContext);

  const [open, setOpen] = useState<boolean>(false);
  const [selects, setSelects] = useState<Category[]>([]);

  const { getValues, setValue, handleSubmit, control, formState: { isLoading, isSubmitting, isSubmitted, errors } } = useForm<SchemaProps>({
    defaultValues: {
      id: product?.id ?? '',
      name: product?.name ?? '',
      description: product?.description ?? '',
      price: product?.price ?? '',
      category: product?.categories ?? [],
      files: product?.files ?? []
    },
    resolver: yupResolver(schema),
  });

  const { id: productId, category, files } = getValues();

  const styles = {
    opacity: open ? 1 : 0,
    zIndex: open ? 6 : -1,
  };
  
  const Submit = async (event: SchemaProps) => {
    try {
      const { name, description, price, category } = event;

      const prefix = {
        url: `/api/product${isUpdate ? `?id=${product!.id}` : ''}`,
        method: isUpdate ? 'PUT' : 'POST'
      };

      const res = await fetch(prefix.url, {
        method: prefix.method,
        body: JSON.stringify({
          name,
          description,
          price: `${Number(Number(price.replace(/[,.R$ ]/g, '')) / 100).toFixed(2)}`,
          category: selects
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

  const onAdd = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen(true);
  };

  const onRemove = (e: any, r: Category) => {
    e.stopPropagation();
    e.preventDefault();
    setSelects(prev => prev.find(t => t.id === r.id) ? prev.filter(d => d.id !== r.id) : [...prev, r])
  };

  const onSelect = (e: any, r: Category) => {
    e.stopPropagation();
    e.preventDefault();
    setSelects(prev => prev.find(t => t.id === r.id) ? prev.filter(d => d.id !== r.id) : [...prev, r])
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false)
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Container onSubmit={handleSubmit(Submit)}>
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

      <Forms>
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

        <Controller
          name="description"
          control={control}
          render={({ field: { onChange, onBlur, value }  }) => (
            <Input.Root>
              <TextAlignLeft width={20} height={20} stroke={themes.colors.primary} strokeWidth={2} />
              <Input.TextArea
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

        <Options style={styles} ref={dropdownRef}>
          {categories.map((options, index) => (
            <ButtonCategoriesRemove key={index} onClick={e => onSelect(e, options)}>
              {options.name} &nbsp;
              <Tag width={12} height={12} stroke={themes.colors.primary} strokeWidth={1.8} />
            </ButtonCategoriesRemove>
          ))}
        </Options>

        <Selects onClick={e => onAdd(e)}>
          {selects.length === 0 &&
            <Tag width={20} height={20} stroke={themes.colors.primary} strokeWidth={1.8} />
          }

          {selects.length !== 0 &&
            selects.map(r => <ButtonCategoriesRemove key={r.id} onClick={e => onRemove(e, r)}>{r.name}</ButtonCategoriesRemove>)
          }
        </Selects>

        <Button type="submit" primary disabled={isLoading}>
          {isLoading ? 'Sending...' : isUpdate ? 'Update' : 'Upload'}
        </Button>
      </Forms>

    </Container>
  );
};
