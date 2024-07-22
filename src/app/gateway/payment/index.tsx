"use client";

import React, { CSSProperties, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { DotLottiePlayer } from '@dotlottie/react-player';

import Purchase from '@/assets/svg/purchase.svg';

import { GatewayProps } from '@/global/interfaces';

import { Container, Banner, Loading, BannerProduct } from './styles';

interface PaymentProps {
  gateway: GatewayProps;
};

export default function Payment({ gateway }: PaymentProps) {
  const route = useRouter();

  const [creditToProduct, setCreditToProduct] = useState(!!gateway.id);

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

  const banner_styles: CSSProperties  = {
    transition: '1s',
    width: creditToProduct ? 300 : 0
  };

  const image_styles: CSSProperties  = {
    position: 'absolute',
    borderRadius: 150,
    objectFit: 'cover',
    transition: '1s',
    width: creditToProduct ? 250 : 0,
    height: creditToProduct ? 250 : 0,
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     route.push('/gateway?success=8a71594d-a773-4e4c-95a0-d6e6fd5b5eaf')
  //   }, 5000);

  //   setTimeout(() => {
  //     setCreditToProduct(true);
  //   }, 9000);
  // } , []);

  return (
    <Container>

      <Banner>
        <Loading>
          <DotLottiePlayer style={cart_lottie_styles} src="/lottie/card.lottie" loop autoplay />
          <DotLottiePlayer style={loading_lottie_styles} src="/lottie/marks-loading.lottie" loop autoplay />
          <h1 style={{ display: (gateway.id && creditToProduct) ? 'none' : 'flex' }}>
            {
              gateway.id ? 'Payment received' : 'Payment in Progress'
            }
          </h1>
          <p style={{ display: (gateway.id && creditToProduct) ? 'none' : 'flex' }}>
            {
              gateway.id ? 'Success, we will send the code to your WhatsApp' : 'We are waiting for payment confirmation'
            }
          </p>
        </Loading>

        {gateway.product.map((prods, i) => (
          <BannerProduct key={i}>
            <Image style={banner_styles} src={Purchase} width={300} height={300} alt='banner' />
            <Image
              width={300}
              height={300}
              style={image_styles}
              alt={prods.files[0].url}
              src={prods.files[0].url}
            />
          </BannerProduct>
        ))}

      </Banner>
      {/* <p>a</p> */}
    </Container>
  )
};
