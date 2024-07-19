"use client"

import React, { useState } from 'react';
import { DotLottiePlayer } from '@dotlottie/react-player';

import { Input, Product, Card } from '@/components';
import { ProductsProps, CategoryProps } from "@/global/interfaces";

import { Container, Aside, Products as ProductsStyled, ProductEmpty } from './styles';

import { Tag } from '@/assets/svg/icons';
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
  const [label, setLabel] = useState('');
  const [selects, setSelects] = useState([] as CategoryProps[]);

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
          <Input.Input placeholder='Search' onChange={e => {
            setSelects([]);
            setLabel(e.target.value);
          }} />
        </Input.Root>
        <span style={{ height: 10 }} />
        {
          cards.map(({ title, options, maxHeight }, index) =>
            <Card key={index} maxHeight={maxHeight} title={title} icon={Tag} data={options} selects={selects} setSelect={setSelects} />
          )
        }
      </Aside>

      {products.filter(e => e.name.toLowerCase().includes(label.toLowerCase())).length === 0 && (
        <ProductEmpty>
          <DotLottiePlayer style={lottie_styles} src="/lottie/marks-empty-card.lottie" autoplay />
          <p>Product Not Found</p>
        </ProductEmpty>
      )}

      {
        products.filter(e => e.name.toLowerCase().includes(label.toLowerCase())).length !== 0 && (
        <ProductsStyled>
          {
            products.filter(e =>
              label.length > 0 ?
              e.name.toLowerCase().includes(label.toLowerCase()) :
              e.category.find(o => selects.length !== 0 ? selects.map(t => t.id).includes(o.id) : o)
            )
              .map((item, index) =>

            <Product key={index.toString()} product={item} href={`/product?id=${item.id}`} />
          )}
        </ProductsStyled>
      )}
    </Container>
  )
};