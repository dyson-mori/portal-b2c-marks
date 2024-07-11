"use client";

import React, { SyntheticEvent, useState } from 'react';

import { Container } from './styles';

import { Button } from '@/components/button';

const data = [
  {
    id: '0',
    name: 'name 0',
    type: 'type 0'
  },
  {
    id: '1',
    name: 'name 1',
    type: 'type 1'
  },
  {
    id: '2',
    name: 'name 2',
    type: 'type 2'
  },
  {
    id: '3',
    name: 'name 3',
    type: 'type 3'
  },
  {
    id: '0',
    name: 'name 0',
    type: 'type 0'
  },
  {
    id: '1',
    name: 'name 1',
    type: 'type 1'
  },
  {
    id: '2',
    name: 'name 2',
    type: 'type 2'
  },
  {
    id: '3',
    name: 'name 3',
    type: 'type 3'
  }
];

export default function Component() {
  const [state, setState] = useState<any>();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      search: { value: string };
    };

    setState({ search: target.search.value});
  };

  const dropdown = data.map(data => ({
    id: data.id,
    label: data.name
  }))

  return (
    <Container>
      <Button primary>
        click me
      </Button>
    </Container>
  )
}
