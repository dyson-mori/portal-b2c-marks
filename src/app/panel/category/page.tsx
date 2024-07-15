"use client"

import { SyntheticEvent, useContext, useState } from "react";

import { Container, Forms, Inputs } from './styles';

import { Button, Input } from "@/components";

import { Text, Warning } from '@/assets/svg/icons';
import { NotificationContext } from "@/hooks/notification";

export default function Category() {
  const { setNotification } = useContext(NotificationContext);

  const [loadingForm, setLoadingForm] = useState(false);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    setLoadingForm(true);

    const target = event.target as typeof event.target & {
      category: { value: string };
    };

    if (!target.category.value) {
      return setNotification({ icon: Warning, type: 'warning', message: 'Required fields', active: `${Math.random()}_show` });
    };

    const res = await fetch('/api/category', {
      method: 'POST',
      body: JSON.stringify({
        name: target.category.value,
      }),
    });

    if (!res.ok) {
      return setNotification({ icon: Warning, type: 'warning', message: 'Failed to send the form', active: `${Math.random()}_show` });
    };

    target.category.value = '';
    setLoadingForm(false);
    setNotification({ icon: Warning, type: 'success', message: 'Successful', active: `${Math.random()}_show` });
  };

  return (
    <Container>
      <Forms onSubmit={handleSubmit}>
        <Inputs>
          <Input.Root>
            <Text width={20} height={20} />
            <Input.Input placeholder="Category" name="category" disabled={loadingForm} />
          </Input.Root>
        </Inputs>

        <Button type="submit" disabled={loadingForm}>
          {loadingForm ? 'loading...' : 'Done'}
        </Button>
      </Forms>
    </Container>
  );
};
