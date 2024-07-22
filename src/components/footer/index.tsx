"use client";

import React from 'react';
import Image from 'next/image';

import { Container, Payments } from './styles';

import Logo from '../../assets/svg/full_logo.svg';
import { PaymentCheck } from '@/assets/svg/icons';

export interface FooterProps {
  primary?: boolean | string;
  secondary?: boolean | string;
}

export const Footer: React.FC<FooterProps> = ({ primary = true, secondary = false }) => {
  return (
    <Container primary={primary.toString()} secondary={secondary.toString()}>
      {!secondary && primary && (
        <>
          <Image src={Logo} width={200} height={50} alt='logo' />
          <p>Illustrative images, I do not aim to sell third-party products, <br /> while this project is under development, <br /> I will use their images: <a href='https://swarovski.com.br'>swarovski</a> & <a href='https://www.vivara.com.br/'>vivara</a></p>
          <p>I repeat, <br /> <strong>illustrative images with no intention of resale</strong></p>
          {/* <PaymentCheck width={100} height={40} /> */}
        </>
      )}

      {secondary && (
        <>
          <strong>Obrigado pela preferência</strong>

          <p><strong>Marks Joias:</strong> lojamarksjoias.com</p>

          <strong>Whatsapp: (31) 97556-4133</strong>
          <strong>E-mail: atendimentomarksjoias@gmail.com</strong>
          <PaymentCheck width={100} height={40} />
        </>
      )}

      <p>Made by <strong>Sérgio Leal</strong> contact: <strong>(31) 9 7556 4133</strong></p>
      {/* <p>Made with ❤ by <strong>Sérgio Leal</strong></p> */}
    </Container>
  );
}
