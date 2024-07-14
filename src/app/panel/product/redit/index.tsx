"use client"

import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, Input, Upload, UploadFileProps, Select } from "@/components";
import { Search, Text, Devolution, Warning } from '@/assets/svg/icons';
import { ProductsProps, CategoryProps } from "@/global/interfaces";
import { NotificationContext } from "@/hooks/notification";

import { Container, Forms, Inputs, Row } from './styles';

type Props = {
  isUpdate: boolean;
  product: ProductsProps | null;
  category: CategoryProps[];
};

const schema = yup.object().shape({
  name: yup.string().required('Required fields'),
  price: yup.string().required('Required fields'),
  description: yup.string().required('Required fields'),
  // category: yup.string().required('Required fields'),
  category: yup.array().of(
    yup.object({
      id: yup.string(),
      name: yup.string()
    })
  ),
  files: yup.array()
  // files: yup.array().of(
  //   yup.object({
  //     name: yup.string()
  //   })
  // )
});

export default function Register({ isUpdate, product, category: dropdownCategory }: Props) {
  const { register, getValues, setValue, handleSubmit } = useForm({
    defaultValues: {
      name: product?.name ?? '',
      description: product?.description ?? '',
      price: product?.price ?? '',
      category: product?.category ?? [],
      files: product?.files ?? []
    },
    resolver: yupResolver(schema),
  });

  const { name, description, price, category, files } = getValues();

  const { setNotification } = useContext(NotificationContext);

  const [uploadFile, setUploadFile] = useState([] as UploadFileProps[]);
  const [loadingForm, setLoadingForm] = useState(false);

  const Submit = async (event: any) => {
    setLoadingForm(true);

    const { name, description, price, category } = event;

    const res = await fetch(isUpdate ? `/api/product?id=${product!.id}` : '/api/product', {
      method: isUpdate ? 'PUT' : 'POST',
      body: JSON.stringify({ name, description, price, category }),
    });

    if (!res.ok) {
      setLoadingForm(false);
      return setNotification({ icon: Warning, type: 'failed', message: `Failed to ${isUpdate ? 'update' : 'upload'} the form`, active: `${Math.random()}_show` });
    };

    if (product?.files?.length === uploadFile.length) {
      setLoadingForm(false);
      return setNotification({ icon: Warning, type: 'success', message: `Success`, active: `${Math.random()}_show` });
    };

    const formData = new FormData();
    const response = await res.json();

    formData.append("product_id", response.id);
    formData.append("code", `${name}_${Math.random()}`);

    uploadFile.forEach((image, i) => {
      formData.append(`file${i+1}`, image.file);
    });

    const file = await fetch('/api/files', {
      method: 'POST',
      body: formData
    });

    if (!file.ok) {
      setLoadingForm(false);
      return setNotification({ icon: Warning, type: 'failed', message: 'Failed to send the files', active: `${Math.random()}_show` });
    };

    setLoadingForm(false);
    // reset({ name: '', description: '', price: '', category: '' });
    return setNotification({ icon: Warning, type: 'success', message: 'Successful', active: `${Math.random()}_show` });
  };

  return (
    <Container>
      <Forms onSubmit={handleSubmit(Submit)}>

        <Upload
          files={files}
          isUpdate={isUpdate}
          uploading={loadingForm}
          setFile={setUploadFile}
        />

        <Inputs>
          <Row>

            <Input.Root>
              <Input.Icon icon={Devolution} width={20} height={20} stroke="#47C747" strokeWidth={1.6} />
              <Input.Input
                placeholder="Name Product"
                value={name}
                {...register("name")}
                // onChange={ evt => {
                //   setValue('name', evt.target.value);
                //   setValues({ ...values, name: evt.target.value })
                // }}
              />
            </Input.Root>

          <div style={{ width: 10 }} />

            <Input.Root>
              <Input.Icon icon={Text} width={20} height={20} stroke="#47C747" strokeWidth={2} />
              <Input.Input
                placeholder="Description"
                {...register("description")}
                value={description}
                // onChange={ evt => {
                //   setValue('description', evt.target.value);
                //   setValues({ ...values, description: evt.target.value })
                // }}
              />
            </Input.Root>
          </Row>

        <div style={{ height: 5 }} />

          <Row>
            <Input.Root>
              <Input.Icon icon={Text} width={20} height={20} stroke="#47C747" strokeWidth={2} />
              <Input.Input
                placeholder="Price"
                {...register("price")}
                value={price}
                // onChange={ evt => {
                //   setValue('price', evt.target.value);
                //   setValues({ ...values, price: evt.target.value })
                // }}
              />
            </Input.Root>
            <div style={{ width: 10 }} />
            <Select
              data={dropdownCategory}
              LeftIcon={Search}
              defaultValue={category?.map(e => e.name).toString()}
              onChangeValue={value => setValue('category', value)}
            />
          </Row>
        </Inputs>

        <Button type="submit" primary disabled={loadingForm}>
          {loadingForm ? 'Sending...' : product?.name ? 'Update' : 'Upload'}
        </Button>
      </Forms>
    </Container>
  );
};
