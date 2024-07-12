"use client"

import { SyntheticEvent, useState } from "react";

import { Container, Forms, AnsOpt, Inputs } from './styles';

import { Button, Input, Notification } from "@/components";

import Text from '@/assets/svg/text.svg';

export default function Category() {
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
      category: { value: string };
    };

    if (!target.category.value) {
      throw new Error('Failed to send the form');
    };

    const res = await fetch('/api/category', {
      method: 'POST',
      body: JSON.stringify({
        name: target.category.value,
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to send the form');
    };

    target.category.value = '';
    setLoadingForm(false);
    setNotification({ type: 'success', message: 'Successful', active: `${Math.random()}_show` });
  };

  return (
    <Container>
      <Forms onSubmit={handleSubmit}>
        <Inputs>
          <Input.Root>
            <Input.Icon icon={Text} />
            <Input.Input placeholder="Category" name="category" disabled={loadingForm} />
          </Input.Root>
        </Inputs>

        <Button type="submit" disabled={loadingForm}>
          {loadingForm ? 'loading...' : 'Done'}
        </Button>
      </Forms>

      <Notification.Root data={notification} message={notification.message}>
        <Notification.Icon icon={Text} />
      </Notification.Root>
    </Container>
  );
};
