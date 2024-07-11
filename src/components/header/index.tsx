"use client";

import React from 'react';
import Image from 'next/image';

import { Container, Icon, Nav, LinkStyle } from './styles';

import Logo from '../../assets/svg/logo.svg';
import ShoppingCart from '../../assets/svg/shopping-cart.svg';

export const Header: React.FC = () => {
  return (
    <Container>
      <Icon>
        <Image src={Logo} width={30} height={30} alt='logo' />
      </Icon>
      <Nav>
        <LinkStyle href='/products'>Inicio</LinkStyle>
        <LinkStyle href='#'>Rastreamento</LinkStyle>
      </Nav>
      <Icon>
        <Image src={ShoppingCart} width={30} height={30} alt='logo' />
      </Icon>
    </Container>
  )
}
