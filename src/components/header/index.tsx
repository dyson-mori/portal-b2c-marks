"use client";

import React from 'react';
import { useTheme } from 'styled-components';

import usePersistedStorage from '@/hooks/useStorage';

import { ShoppingCart,Logo } from '@/assets/svg/icons';
import { ProductsProps } from '@/global/interfaces';

import { Container, Icon, Nav, LinkStyle } from './styles';

export const Header: React.FC = () => {
  const [data] = usePersistedStorage('@marks: cart', []);

  const theme = useTheme();

  const header = [
    {
      href: '/products',
      label: 'Products'
    },
    // {
    //   href: '/',
    //   label: 'Rastreamento'
    // },
    {
      href: '/panel',
      label: 'Panel'
    }
  ];

  return (
    <Container>
      <Icon href='/products'>
        <Logo width={30} height={30} />
      </Icon>
      <Nav>
        {header.map((item, index) => (
          <LinkStyle key={index} href={item.href}>{item.label}</LinkStyle>
        ))}
      </Nav>
      <Icon href='/cart'>
        <ShoppingCart width={30} height={30} stroke={theme.colors.primary} strokeWidth={2} />
        <p id='count-cart'>{data?.length || '0'}</p>
      </Icon>
    </Container>
  )
}
