"use client";

import React, { CSSProperties, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { DotLottiePlayer } from '@dotlottie/react-player';

import Purchase from '@/assets/svg/purchase.svg';

import { GatewayProps } from '@/global/interfaces';

import { Container, Banner, BannerProduct } from './styles';
import useWindowDimensions from '@/hooks/useWindowDimensions';

interface PaymentProps {
  gateway: GatewayProps;
};

export default function Payment({ gateway }: PaymentProps) {
  const route = useRouter();
  const { width } = useWindowDimensions();

  const [creditToProduct, setCreditToProduct] = useState(!!gateway.id);
  const [step, setStep] = useState(-1);

  const loading_lottie_styles: CSSProperties  = {
    opacity: gateway?.id ? 0 : 1,
    width: gateway?.id ? 0 : 300,
    height: gateway?.id ? 0 : 300,
    transition: '.3s'
  };

  const cart_lottie_styles: CSSProperties  = {
    transition: '.3s',
    opacity: gateway?.id && !creditToProduct ? 1 : 0,
    width: gateway?.id && !creditToProduct ? 300 : 0,
    height: gateway?.id && !creditToProduct ? 300 : 0,
  };

  const banner_styles: CSSProperties = {
    transition: '1s',
  };

  const banner_marks_lottie: CSSProperties = {
    position: 'absolute',
    transition: '1s',
  };

  const image_styles: CSSProperties  = {
    position: 'absolute',
    borderRadius: 150,
    objectFit: 'cover',
    transition: '1s',
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     route.push('/gateway?success=8a71594d-a773-4e4c-95a0-d6e6fd5b5eaf')
  //   }, 5000);

  //   setTimeout(() => {
  //     setCreditToProduct(true);
  //   }, 9000);
  // } , []);

  useEffect(() => {
    gateway.product.forEach((item, index) => {

      setTimeout(() => {
        setStep(index);
      }, Number(`${index+5}00`));
    });
  } , []);

  return (
    <Container>

      <h1 style={{ fontSize: step === 2 ? 25 : 0, transition: '1s' }}>Obrigado pela compra</h1>

      <Banner>
        {gateway.product.map((prods, i) => (
          <BannerProduct key={i}>
            <DotLottiePlayer style={{ ...banner_marks_lottie, width: step >= i ? 400 : 0 }} src="/lottie/banner-marks.lottie" loop autoplay />
            <Image
              width={250}
              height={250}
              style={{ ...image_styles, width: step >= i ? 250 : 0, height: step >= i ? 250 : 0 }}
              alt={prods.files[0].url}
              src={prods.files[0].url}
            />
          </BannerProduct>
        ))}
      </Banner>

      <p style={{ fontSize: step === 2 ? 20 : 0, transition: '1s' }}>Você receberá uma mensagem no Whatsapp informando mais sobre a compra</p>
    </Container>
  )
};
