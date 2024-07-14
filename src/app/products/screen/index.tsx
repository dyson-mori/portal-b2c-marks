"use client"

import React, { SyntheticEvent } from 'react';

import { Input, Product, Card } from '@/components';
import { ProductsProps, CategoryProps } from "@/global/interfaces";

import { Container, Aside, Products as ProductsStyled } from './styles';

import { Search } from '@/assets/svg/icons';

type Props = {
  products: ProductsProps[];
  cards: {
    title: string;
    maxHeight: number;
    options: CategoryProps[]
  }[];
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
        {
          cards.map(({ title, options, maxHeight }, index) =>
            <Card key={index} maxHeight={maxHeight} title={title} icon={Search} data={options} />
          )
        }
      </Aside>

      <ProductsStyled>
        {products.map((item, index) =>
          <Product key={index.toString()} product={item} href={`/product?id=${item.id}`} />
        )}
      </ProductsStyled>
    </Container>
  )
};