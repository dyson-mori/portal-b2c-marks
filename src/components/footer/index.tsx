"use client";

import React from 'react';
import Image from 'next/image';

import { Container, Payments } from './styles';

import Logo from '../../assets/svg/full_logo.svg';
import PaymentCheck from '../../assets/svg/payment-check.svg';

export interface FooterProps {
  primary?: boolean;
  secondary?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ primary = true, secondary }) => {
  return (
    <Container primary={primary} secondary={secondary}>
      {!secondary && primary && (
        <Image src={Logo} width={200} height={50} alt='logo' />
      )}

      {secondary && (
        <>
          <strong>Obrigado pela preferência</strong>

          <p><strong>Marks Joias:</strong> lojamarksjoias.com</p>

          <strong>Whatsapp: (31) 97556-4133 / E-mail: atendimentomarksjoias@gmail.com</strong>

          <Image src={PaymentCheck} width={100} height={40} alt='payment-check.svg' /> 
        </>
      )}

      <p>Made by <strong>Sérgio Leal</strong></p>
      {/* <p>Made with ❤ by <strong>Sérgio Leal</strong></p> */}
    </Container>
  );
}
