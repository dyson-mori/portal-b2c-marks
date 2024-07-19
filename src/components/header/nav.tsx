"use client";

import React, { useContext } from 'react';
import { useTheme } from 'styled-components';

import { ShoppingCart,Logo } from '@/assets/svg/icons';
import { CartContext } from '@/contexts/cart';

import { Container, Icon, Nav, LinkStyle } from './styles';

interface HeaderProps {
  header: {
    href: string;
    label: string;
    public: boolean;
  }[];
};

export const Navigation: React.FC<HeaderProps> = ({ header }) => {
  const { storage } = useContext(CartContext);

  const theme = useTheme();

  return (
    <Container>
      <Icon href='/products'>
        <Logo width={30} height={30} />
      </Icon>
      <Nav>
        {header.map((item, index) => item.public && (
          <LinkStyle key={index} href={item.href}>{item.label}</LinkStyle>
        ))}
      </Nav>
      <Icon href='/cart'>
        <ShoppingCart width={30} height={30} stroke={theme.colors.primary} strokeWidth={2} />
        <p id='count-cart'>{storage?.length}</p>
      </Icon>
    </Container>
  )
}
