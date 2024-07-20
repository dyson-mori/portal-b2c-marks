"use client";

import React, { CSSProperties, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { DotLottiePlayer } from '@dotlottie/react-player';

import { Container } from './styles';
import { ProductsProps } from '@/global/interfaces';

interface PaymentProps {
  product: ProductsProps;
  gateway: {
    success: string;
  }
};

export default function Payment({ product, gateway }: PaymentProps) {
  const route = useRouter();

  const lottie_styles: CSSProperties  = {
    opacity: product?.id ? 0 : 1,
    transition: '1s',
    display: 'flex',
    maxWidth: "300px",
  };

  useEffect(() => {
    setTimeout(() => {
      route.push('/gateway?success=10bb1c63-8250-446d-bf55-e9c512f23a09')
    }, 5000);
  } , []);

  return (
    <Container>
      <DotLottiePlayer style={lottie_styles} src="/lottie/marks-loading.lottie" loop autoplay />
      <h1>Payment in Progress</h1>
    </Container>
  )
};
