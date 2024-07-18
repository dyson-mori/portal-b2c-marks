"use client"

import React from 'react';
import { DotLottiePlayer } from '@dotlottie/react-player';

import { Input, Product, Card } from '@/components';
import { ProductsProps, CategoryProps } from "@/global/interfaces";

import { Container, Aside, Products as ProductsStyled, ProductEmpty } from './styles';

import { Search, Tag } from '@/assets/svg/icons';
import { useTheme } from 'styled-components';

type Props = {
  products: ProductsProps[];
  cards: {
    title: string;
    maxHeight: number;
    options: CategoryProps[]
  }[];
};

export default function Products({ products, cards }: Props) {
  const theme = useTheme();

  const lottie_styles  = {
    display: 'flex',
    maxWidth: "300px"
  };

  return (
    <Container>
      <Aside>
        <Input.Root>
          <Tag width={20} height={20} stroke={theme.colors.primary} strokeWidth={2} />
          <Input.Input placeholder='Search' />
        </Input.Root>
        <span style={{ height: 10 }} />
        {
          cards.map(({ title, options, maxHeight }, index) =>
            <Card key={index} maxHeight={maxHeight} title={title} icon={Search} data={options} />
          )
        }
      </Aside>

      {products.length === 0 && (
        <ProductEmpty>
          <DotLottiePlayer style={lottie_styles} src="/lottie/marks-empty-card.lottie" autoplay />
          <p>In Progress</p>
          {/* <p>Something went wrong</p> */}
        </ProductEmpty>
      )}
      {products.length !== 0 && (
        <ProductsStyled>
          {products.map((item, index) =>
            <Product key={index.toString()} product={item} href={`/product?id=${item.id}`} />
          )}
        </ProductsStyled>
      )}
    </Container>
  )
};