"use client";

import React, { SyntheticEvent, useState } from 'react';

import { Container, Form } from './styles';

import { Select } from '@/components';

import { Search, Close } from '@/assets/svg/icons';

const data = [
  {
    id: 'clyispn3u000iopd3m67p6s3j',
    name: 'Alina Becker',
    type: 'type 0'
  },
  {
    id: 'clyilsxpc000797dwforats4w',
    name: 'wchew',
    type: 'type 1'
  },
  {
    id: 'clyi4fkmc0017jkddgi6j7m3s',
    name: 'Songyuxin Himoti',
    type: 'type 2'
  },
];

export default function Component() {
  const [state, setState] = useState<any>();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      select: { value: string };
    };

    setState({ select: target.select.value});
  };

  const dropdown = data.map(data => ({
    id: data.id,
    label: data.name
  }))

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Select data={dropdown} LeftIcon={Search} name='select' />
      </Form>
    </Container>
  )
}
