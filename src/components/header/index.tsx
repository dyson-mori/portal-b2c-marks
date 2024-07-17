"use client";

import React from 'react';
import { useTheme } from 'styled-components';

import { Container, Icon, Nav, LinkStyle } from './styles';

import { ShoppingCart,Logo } from '@/assets/svg/icons';

export const Header: React.FC = () => {
  const theme = useTheme();

  const data = [
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
        {data.map((item, index) => (
          <LinkStyle key={index} href={item.href}>{item.label}</LinkStyle>
        ))}
      </Nav>
      <Icon href='/cart'>
        <ShoppingCart width={30} height={30} stroke={theme.colors.primary} strokeWidth={2} />
      </Icon>
    </Container>
  )
}
