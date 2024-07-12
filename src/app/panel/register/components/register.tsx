"use client"

import { SyntheticEvent, useState } from "react";

import { Button, Input, Upload, UploadFileProps, Notification, Select } from "@/components";

import { Container, Forms, Inputs } from './styles';

import { Search, Text } from '@/assets/svg/icons';

export default function Register({ category }: { category: any }) {
  const [uploadFile, setUploadFile] = useState([] as UploadFileProps[]);
  const [loadingForm, setLoadingForm] = useState(false);
  const [notification, setNotification] = useState({
    type: undefined as 'success' | 'failed' | 'warning' | undefined,
    message: undefined as string | undefined,
    active: undefined as string | undefined,
  });

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    setLoadingForm(true);

    const target = event.target as typeof event.target & {
      name: { value: string };
      description: { value: string };
      price: { value: string };
      category_id: { value: string };
    };

    if (!target.name.value || !target.description.value || !target.price.value || !target.category_id.value) {
      setLoadingForm(false);
      setNotification({ type: 'warning', message: 'Required fields', active: `${Math.random()}_show` });
      throw new Error('Failed to send the form');
    };

    const product = await fetch('/api/product', {
      method: 'POST',
      body: JSON.stringify({
        name: target.name.value,
        description: target.description.value,
        price: target.price.value,
        category_id: 'clyisalxw0000opd31bt3zhb7'
      }),
    });

    if (!product.ok) {
      setNotification({ type: 'failed', message: 'Failed to send the form', active: `${Math.random()}_show` });
      setLoadingForm(false);
      throw new Error('Failed to send the form');
    };

    const formData = new FormData();
    const prod = await product.json();

    formData.append("product_id", prod.id);
    formData.append("code", `${target.name.value}_${Math.random()}`);

    uploadFile.forEach((image, i) => {
      formData.append(`file${i+1}`, image.file);
    });

    const file = await fetch('/api/files', {
      method: 'POST',
      body: formData
    });

    if (!file.ok) {
      setNotification({ type: 'failed', message: 'Failed to send the files', active: `${Math.random()}_show` });
      setLoadingForm(false);
      throw new Error('Failed to send the files');
    };

    target.name.value = '';
    target.description.value = '';
    target.price.value = '';
    target.category_id.value = '';
    setLoadingForm(false);
    setNotification({ type: 'success', message: 'Successful', active: `${Math.random()}_show` });
  };

  return (
    <Container>
      <Forms onSubmit={handleSubmit}>
        <Upload uploading={loadingForm} setFile={setUploadFile} />

        <Inputs>
          <div style={{ display: 'flex' }}>
            <Input.Root>
              <Input.Icon icon={Text} />
              <Input.Input placeholder="Name Product" name="name" />
            </Input.Root>
          <div style={{ width: 10 }} />
            <Input.Root>
              <Input.Icon icon={Text} />
              <Input.Input placeholder="Description" name="description" />
            </Input.Root>
          </div>
          <div style={{ height: 5 }} />
          <div style={{ display: 'flex' }}>
            <Input.Root>
              <Input.Icon icon={Text} />
              <Input.Input placeholder="Price" name="price" />
            </Input.Root>
          <div style={{ width: 10 }} />
            <Select data={category} leftIcon={Search} name="category_id" />
          </div>
        </Inputs>

        <Button type="submit" primary disabled={loadingForm}>
          {loadingForm ? 'Sending...' : 'Upload'}
        </Button>
      </Forms>

      <Notification.Root data={notification} message={notification.message}>
        <Notification.Icon icon={Text} />
      </Notification.Root>
    </Container>
  );
};
