"use client";

import React, { SyntheticEvent, useState } from 'react';

import { Container, Form } from './styles';

import { Card } from '@/components';

import { Search } from '@/assets/svg/icons';

// const data = [
//   {
//     id: 'clyispn3u000iopd3m67p6s3j',
//     name: 'Alina Becker',
//     type: 'type 0'
//   },
//   {
//     id: 'clyilsxpc000797dwforats4w',
//     name: 'wchew',
//     type: 'type 1'
//   },
//   {
//     id: 'clyi4fkmc0017jkddgi6j7m3s',
//     name: 'Songyuxin Himoti',
//     type: 'type 2'
//   },
// ];

const data = [
  {
    id: 'clyispn3u000iopd3m67p6s3j',
    name: 'big',
  },
  {
    id: 'clyilsxpc000797dwforats4w',
    name: 'small',
  },
  {
    id: 'clyi4fkmc0017jkddgi6j7m3s',
    name: 'huge',
  },
  {
    id: 'clyi4flry0019jkddcnw35q8h',
    name: 'thin',
  },
  {
    id: 'clyilsuge000197dw0ye7d91w',
    name: 'big tits',
  },
  {
    id: 'clyilsvfc000397dwnuqvblla',
    name: 'breasts'
  },
  {
    id: 'clyilswlu000597dwvmkjpfsf',
    name: 'busty'
  },
  {
    id: 'clyilsxpc000797dwforats4w',
    name: 'dressed'
  },
  {
    id: 'clyilsyv5000997dwpxqx0b95',
    name: 'squeeze'
  },
  {
    id: 'clyilszrn000b97dwovl5ifjm',
    name: 'squeeze boobs'
  },
  {
    id: 'clyisp8bp0002opd3oj3t3clc',
    name: 'squeeze tits'
  },
  {
    id: 'clyispa5r0004opd3jveyy2fj',
    name: 'shake'
  },
  {
    id: 'clyispbpr0006opd3rgn2gpos',
    name: 'shakes'
  },
  {
    id: 'clyispdgx0008opd30w0pb1mg',
    name: 'cleavage'
  }
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
    name: data.name
  }))

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Card title='Breasts' icon={Search} data={dropdown} />
      </Form>
    </Container>
  )
}
