"use client"

import { useContext, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTheme } from "styled-components";
import { yupResolver } from '@hookform/resolvers/yup';

import { NotificationContext } from "@/hooks/notification";
import { Button, Input, Upload } from "@/components";
import { Text, Devolution, TextAlignLeft, Block, Tag, Success } from '@/assets/svg/icons';
import { formats } from "@/helpers/format";
import { CategoryProps } from "@/global/interfaces";

import { Container, Forms, Options, Selects, ButtonCategoriesRemove } from './styles';
import { RegisterEditProps, SchemaProps, schema } from "./constants";
import { revalidatePanelProduct } from "../../actions";

export default function Register({ isUpdate, product, categories }: RegisterEditProps) {
  const themes = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { setNotification } = useContext(NotificationContext);

  const [open, setOpen] = useState<boolean>(false);

  const { getValues, setValue, handleSubmit, control, reset, formState: { errors } } = useForm<SchemaProps>({
    defaultValues: {
      id: product?.id ?? '',
      title: product?.title ?? '',
      description: product?.description ?? '',
      price: Number(product?.price) ?? 0,
      category: product?.categories ?? [],
      files: product?.files ?? []
    },
    resolver: yupResolver(schema),
  });

  const { id: productId, isLoading, haveNewFile } = getValues();

  const styles = {
    opacity: open ? 1 : 0,
    zIndex: open ? 6 : -1,
  };
  
  const Submit = async (event: SchemaProps) => {
    setValue('isLoading', true);

    const { title, description, price, category, files } = event;

    const prefix = {
      url: `/api/product${isUpdate ? `?id=${product!.id}` : ''}`,
      method: isUpdate ? 'PUT' : 'POST'
    };

    const res = await fetch(prefix.url, {
      method: prefix.method,
      body: JSON.stringify({
        title,
        description,
        price: Number(price),
        category
      }),
    });

    if (!res.ok) {
      return setNotification({ icon: Block, type: 'failed', message: `Failed to ${isUpdate ? 'update' : 'upload'} the form`, active: `${Math.random()}_show` });
    };

    const result = await res.json();
    revalidatePanelProduct();

    const isValid = product?.files.length! > files.length || !files.find(fin => fin?.id);
    console.log(result);

    setValue('id', result?.id);

    if (isValid) {
      return setValue('haveNewFile', true);
    };

    setValue('isLoading', false);
    return setNotification({ icon: Success, type: 'success', message: 'Form sent successfully', active: `${Math.random()}_show` });
  };

  const onAdd = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen(true);
  };

  const onRemove = (categoryId: string, categories: CategoryProps[]) =>
    setValue('category', categories.filter(category => category.id !== categoryId));

  const onSelect = (obj: CategoryProps, categories: CategoryProps[]) =>
    setValue('category', categories.find(t => t.id === obj.id) ? categories.filter(d => d.id !== obj.id) : [...categories, obj]);

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isUpdate && !isLoading) {
      // setValue('id', undefined);
      // setValue('title', '');
      // setValue('price', 0);
      // setValue('description', '');
      // setValue('category', []);
      // setValue('files', []);
      reset();
    };
  }, [isLoading]);

  return (
    <Container onSubmit={handleSubmit(Submit)}>
      <Controller
        name="files"
        control={control}
        render={({ field: { onChange, value }  }) => {
          return (
            <Upload
              files={value}
              setFiles={onChange}
              productId={productId}
              isLoading={!!isLoading && !!haveNewFile}
              setLoading={() => setValue('isLoading', false)}
              isUpdate={isUpdate}
            />
          )
        }}
      />

      <Forms>
        <Controller
          name="title"
          control={control}
          render={({ field: { onChange, onBlur, value }  }) => (
            <Input.Root>
              <Devolution width={20} height={20} stroke={themes.colors.primary} strokeWidth={1.6} />
              <Input.Input
                value={value}
                placeholder="Name Product"
                defaultValue={value}
                onChange={onChange}
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
                value={value}
                placeholder="Description"
                defaultValue={value}
                onChange={onChange}
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
                value={formats.money(value)}
                onChange={evt => {
                  evt.target.value = formats.formatDecimal(evt.target.value);
                  console.log(evt.target.value);

                  onChange(evt);
                }}
              />
            </Input.Root>
          )}
        />
        <Controller
          name="category"
          control={control}
          render={({ field: { value = [] } }) => (
            <>
              <Selects onClick={e => onAdd(e)}>
                {value.length === 0 && <Tag width={20} height={20} stroke={themes.colors.primary} strokeWidth={1.8} />}
                {value.length !== 0 &&
                  value.map(cat => (
                    <ButtonCategoriesRemove key={cat.id}
                      onClick={e => {
                        e.stopPropagation();
                        e.preventDefault();
                        onRemove(cat.id, value);
                      }}
                    >{cat.title}</ButtonCategoriesRemove>
                  ))
                }
              </Selects>
              <Options style={styles} ref={dropdownRef}>
                {categories.map((options, index) => {
                  const style = {
                    backgroundColor: themes.colors[value.find(e => e.title === options.title) ? 'primary' : 'white'],
                    color: themes.colors[value.find(e => e.title === options.title) ? 'white' : 'text'],
                  };

                  return (
                    <ButtonCategoriesRemove
                      key={index}
                      style={style}
                      onClick={e => {
                        e.stopPropagation();
                        e.preventDefault();
                        onSelect(options, value);
                      }}
                    >
                      {options.title} &nbsp;
                      <Tag width={12} height={12} stroke={themes.colors[value.find(e => e.title === options.title) ? 'white' : 'text']} strokeWidth={1.8} />
                    </ButtonCategoriesRemove>
                  )
                })}
              </Options>
            </>
          )}
        />

        <Button type="submit" primary disabled={!!isLoading}>
          {isLoading ? 'Sending...' : isUpdate ? 'Update' : 'Upload'}
        </Button>
      </Forms>

    </Container>
  );
};
