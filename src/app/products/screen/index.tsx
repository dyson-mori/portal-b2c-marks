"use client"

import React, { useState } from 'react';
import { DotLottiePlayer } from '@dotlottie/react-player';
import { useTheme } from 'styled-components';

import { Input, Product, Card } from '@/components';
import { CategoryProps, ProductsProps } from "@/global/interfaces";

import { Container, Aside, Products as ProductsStyled, ProductEmpty } from './styles';

import { Tag } from '@/assets/svg/icons';

type Props = {
  products: ProductsProps[];
  cards: {
    title: string;
    categories: CategoryProps[];
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

  const handleInput = (e: any) => {
    setSelects([]);
    setLabel(e.target.value);
  };

  return (
    <Container>
      <Aside>
        <Input.Root>
          <Tag width={20} height={20} stroke={theme.colors.primary} strokeWidth={2} />
          <Input.Input placeholder='Search' onChange={handleInput} />
        </Input.Root>
        <span style={{ height: 10 }} />
        {
          cards.map(({ title, categories }, index) =>
            <Card key={index} title={title} icon={Tag} data={categories} selects={[]} setSelect={setSelects} />
          )
        }
      </Aside>

      {products.filter(e => e.title.toLowerCase().includes(label.toLowerCase())).length === 0 && (
        <ProductEmpty>
          <DotLottiePlayer style={lottie_styles} src="/lottie/marks-empty-card.lottie" autoplay />
          <p>Product Not Found</p>
        </ProductEmpty>
      )}

      {
        products.filter(e => e.title.toLowerCase().includes(label.toLowerCase())).length !== 0 && (
        <ProductsStyled>
          {
            products.filter(pro =>
              label.length > 0 ? pro.title.toLowerCase().includes(label.toLowerCase()) :
              selects.every(eve => pro.categories.some(cat => cat.id === eve.id))
            )
              .map((item, index) =>

            <Product key={index.toString()} product={item} href={`/product?id=${item.id}`} />
          )}
        </ProductsStyled>
      )}
    </Container>
  )
};