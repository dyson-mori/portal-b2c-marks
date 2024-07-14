"use client"

import React, { SyntheticEvent } from 'react';

import { Input, Product, Card } from '@/components';
import { ProductsProps, CategoryProps } from "@/global/interfaces";

import { Container, Aside, Products as ProductsStyled } from './styles';

import { Search } from '@/assets/svg/icons';
import { Replace } from '@/helpers/replace';

type Props = {
  products: ProductsProps[];
  cards: Omit<CategoryProps, 'name'>[];
};

export default function Products({ products, cards }: Props) {
  // const handleSubmit = (event: SyntheticEvent) => {
  //   event.preventDefault();

  //   const target = event.target as typeof event.target & {
  //     search: { value: string };
  //   };

  //   // setState({ search: target.search.value});
  // };

  return (
    <Container>
      <Aside>
        <Input.Root>
          <Input.Icon icon={Search} width={20} height={20} />
          <Input.Input placeholder='Search' />
        </Input.Root>
        <span style={{ height: 10 }} />
        <Card data={cards} title='Test' />
      </Aside>

      <ProductsStyled>
        {products.map((item, index) =>
          <Product key={index.toString()} product={item} href={`/product?id=${item.id}`} />
        )}
      </ProductsStyled>
    </Container>
  )
};