import React from 'react';

import { useTheme } from 'styled-components';

import { CategoryProps } from '@/global/interfaces';
import { Tag } from '@/assets/svg';

import { Input, Card } from '..';

import { Container } from './styles';

interface AsideProps {
  data: {
    name: string;
    maxHeight: number;
    sub: CategoryProps[];
  }[];
};

const Aside: React.FC<AsideProps> = ({ data }) => {
  const theme = useTheme();


  return (
    <Container>
      <Input.Root>
        <Tag width={20} height={20} stroke={theme.colors.primary} strokeWidth={2} />
        <Input.Input placeholder='Search' onChange={e => {
          // setSelects([]);
          // setLabel(e.target.value);
        }}/>
      </Input.Root>
      <span style={{ height: 10 }} />
      {
        data.map(({ name, sub, maxHeight }, index) =>
          <Card key={index} maxHeight={100} title={name} icon={Tag} data={sub} selects={[]} setSelect={() => {}} />
        )
      }
    </Container>
  )
}

export { Aside };