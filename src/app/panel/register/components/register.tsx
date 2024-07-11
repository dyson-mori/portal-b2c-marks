"use client"

import { SyntheticEvent, useState } from "react";

import { Container, Forms, AnsOpt, Inputs } from './styles';

import { Button, Input, Upload } from "@/components";

import Text from '@/assets/svg/text.svg';

export default function Register() {
  const [uploadFile, setUploadFile] = useState({} as File);
  const [loadingForm, setLoadingForm] = useState(false);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      name: { value: string };
    };

    if (!target.name.value) {
      throw new Error('Failed to send the form');
    };

    const formData = new FormData();

    formData.append("name", target.name.value);
    formData.append("file", uploadFile);

    const res = await fetch('/api/product', {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      throw new Error('Failed to send the form');
    };

    target.name.value = '';
  };

  return (
    <Container>
      <Forms onSubmit={handleSubmit}>
        <Upload uploading={loadingForm} setFile={setUploadFile} />
        <Inputs>
          {/* <Input icon={Text} name="question" placeholder="Question" disabled={loadingForm} /> */}
          <Input.Root>
            <Input.Icon icon={Text} />
            <Input.Input placeholder="Name Product" name="name" />
          </Input.Root>
          <div style={{ height: 5 }} />
          <Input.Root>
            <Input.Icon icon={Text} />
            <Input.Input placeholder="Description" />
          </Input.Root>
        </Inputs>

        <Button type="submit" disabled={loadingForm}>
          {loadingForm ? 'Sending...' : 'Upload'}
        </Button>
      </Forms>

      {/* <Notification.Root type={notification.type} message={notification.message} /> */}
    </Container>
  );
};
