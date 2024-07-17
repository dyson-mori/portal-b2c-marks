"use client"

import React from 'react';
import { DotLottiePlayer } from '@dotlottie/react-player';

import { Input, Product, Card } from '@/components';
import { ProductsProps, CategoryProps } from "@/global/interfaces";

import { Container, Aside, Products as ProductsStyled, ProductEmpty } from './styles';

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
  const lottie_styles  = {
    display: 'flex',
    maxWidth: "300px"
  };

  return (
    <Container>
      <Aside>
        <Input.Root>
          <Search width={20} height={20} />
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
        {products.length === 0 && (
          <ProductEmpty>
            <DotLottiePlayer style={lottie_styles} src="/lottie/marks-empty-card.lottie" autoplay />
            <p>Something went wrong</p>
          </ProductEmpty>
          )}
        {products.map((item, index) =>
          <Product key={index.toString()} product={item} href={`/product?id=${item.id}`} />
        )}
      </ProductsStyled>
    </Container>
  )
};