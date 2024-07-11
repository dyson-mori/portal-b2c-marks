"use client"

import React, { SyntheticEvent } from 'react';

import { Header, Footer, Input, Product, Card } from '@/components';
import { ProductsProps } from "@/global/interfaces";

import { Container, Content, Aside, Products as ProductsStyled } from './styles';

import Search from '@/assets/svg/search-normal.svg';

type Props = {
  data: ProductsProps[];
  cards: {
    id: string;
    label: string;
  }[];
};


export default function ProductsScreen({ data, cards }: Props) {

  // const handleSubmit = (event: SyntheticEvent) => {
  //   event.preventDefault();

  //   const target = event.target as typeof event.target & {
  //     search: { value: string };
  //   };

  //   // setState({ search: target.search.value});
  // };

  return (
    <Container>
      <Header />

      <Content>
        <Aside>
          <Input.Root>
            <Input.Icon icon={Search} width={20} height={20} />
            <Input.Input placeholder='Search' />
          </Input.Root>
          <span style={{ height: 10 }} />
          <Card data={cards} title='Test' />
        </Aside>

        <ProductsStyled>
          {data.map(item =>
            <Product key={item.id} id={item.id} image={item.image} name={item.name} price={item.price} />
          )}
        </ProductsStyled>
      </Content>

      <Footer />
    </Container>
  )
};