"use client";

import React from 'react';
import Image from 'next/image';

import { Container, Icon, Nav, LinkStyle } from './styles';

import Logo from '../../assets/svg/logo.svg';
import ShoppingCart from '../../assets/svg/shopping-cart.svg';

export const Header: React.FC = () => {

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
      <Icon>
        <Image src={Logo} width={30} height={30} alt='logo' />
      </Icon>
      <Nav>
        {data.map((item, index) => (
          <LinkStyle key={index} href={item.href}>{item.label}</LinkStyle>
        ))}
      </Nav>
      <Icon>
        <Image src={ShoppingCart} width={30} height={30} alt='logo' />
      </Icon>
    </Container>
  )
}
