"use client";

import React, { CSSProperties, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { DotLottiePlayer } from '@dotlottie/react-player';

import Purchase from '@/assets/svg/purchase.svg';

import { GatewayProps } from '@/global/interfaces';

import { Container, Banner, BannerProduct } from './styles';

interface PaymentProps {
  gateway: GatewayProps;
};

export default function Payment({ gateway }: PaymentProps) {
  const route = useRouter();

  const [creditToProduct, setCreditToProduct] = useState(!!gateway.id);
  const [step, setStep] = useState(-1);

  const banner_marks_lottie: CSSProperties = {
    position: 'absolute',
    transition: '1s',
    width:
      gateway.product.length <= 3 ? 400 :
      gateway.product.length >= 4 ? 300 : 0,
    height:
      gateway.product.length <= 3 ? 400 :
      gateway.product.length >= 4 ? 300 : 0
  };

  const image_styles: CSSProperties  = {
    position: 'absolute',
    borderRadius: 150,
    objectFit: 'cover',
    transition: '1s',
    width:
      gateway.product.length <= 3 ? 400 :
      gateway.product.length >= 4 ? 200 : 0,
    height:
      gateway.product.length <= 3 ? 400 :
      gateway.product.length >= 4 ? 200 : 0
  };

  const prefix: CSSProperties = {
    width:
      gateway.product.length <= 3 ? 400 :
      gateway.product.length >= 4 ? 250 : 0,
    height:
      gateway.product.length <= 3 ? 400 :
      gateway.product.length >= 4 ? 250 : 0
  };

  useEffect(() => {
    gateway.product.forEach((item, index) => {

      setTimeout(() => {
        setStep(index);
      }, Number(`${index+5}00`));
    });
  } , []);

  return (
    <Container>

      <h1 style={{ fontSize: step >= 0 ? 25 : 0, transition: '1s' }}>Obrigado pela compra</h1>

      <Banner>
        {gateway.product.map((prods, i) => (
          <BannerProduct key={i} style={prefix}>
            <DotLottiePlayer
              style={banner_marks_lottie}
              src="/lottie/banner-marks.lottie"
              loop
              autoplay
            />

            <Image
              width={250}
              height={250}
              style={image_styles}
              alt={prods.files[0].url}
              src={prods.files[0].url}
            />
          </BannerProduct>
        ))}
      </Banner>

      <p style={{ fontSize: step > 0 ? 20 : 0, transition: '1s' }}>Você receberá uma mensagem no Whatsapp informando mais sobre a compra</p>
    </Container>
  )
};
