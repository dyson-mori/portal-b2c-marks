"use client";

import React, { CSSProperties, useEffect, useState } from 'react';
import Image from 'next/image';

import { DotLottiePlayer } from '@dotlottie/react-player';

import { PurchaseProps } from '@/global/interfaces';
import Purchase from '@/assets/svg/purchase.svg';

import { Container, Banner } from './styles';
import { Footer } from '@/components';

interface Props {
  purchase: PurchaseProps;
};

export default function Success({ purchase }: Props){
  const [asa, setAsa] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAsa(true)
    }, 4500);
  }, []);

  const banner_styles: CSSProperties  = {
    transition: '1s',
    width: asa ? 300 : 0
  };

  const lottie_styles: CSSProperties  = {
    display: asa ? 'none' : 'flex',
    maxWidth: "300px"
  };

  const product_styles: CSSProperties  = {
    position: 'absolute',
    borderRadius: 150,
    objectFit: 'cover',
    transition: '1s',
    width: asa ? 250 : 0,
    height: asa ? 250 : 0,
  };

  return (
    <>
      <Container>

        <Banner>
          <Image style={banner_styles} src={Purchase} width={300} height={300} alt='banner' />

          <DotLottiePlayer style={lottie_styles} src="/lottie/card.lottie" loop autoplay />

          <Image style={product_styles} width={250} height={250} alt={purchase.product.files[0].url} src={purchase.product.files[0].url} />
        </Banner>

        {/* <p>Você receberá o código do rastreamento pelo whatsapp</p> */}

        {/* <span style={{ height: 10 }} />

        <Title color='success' fontWeight='semi_bold'>Recebemos o seu “Pagamento”!</Title>

        <span style={{ height: 10 }} />

        <Text fontSize='xlarge' fontWeight='normal'>Valor do Pagamento: <Strong color='success' fontWeight='bold' fontSize='xxlarge'>R$ 147.25</Strong></Text>

        <span style={{ height: 10 }} />

        <Description>
          <Text fontWeight='normal'>O <Strong fontWeight='bold'>{product.name}</Strong> já está sendo encaminhado para a nossa equipe de logistica, acompanhe o progresso no seu perfil clicando aqui.</Text>
        </Description>

        <span style={{ height: 10 }} />

        <Button
          width={30}
          text='Voltar para Tela Principal'
          buttonStyles={{ backgroundColor: 'white', borderColor: 'text' }}
          textStyles={{ textColor: 'text', fontStyle: 'italic', fontWeight: 'light' }}
        />

        <span style={{ height: 50 }} />
  */}
        {/* <Footer>
          <Text color='white'>Formas de Pagamentos</Text>
          <Cards>
            <MasterCard />
            <Hiper />
            <HiperCard />
            <Elo />
            <Amex />
          </Cards>
          <Text color='white' fontWeight='normal' fontSize='xsmall'>Made with ❤ by <Strong>Sérgio Leal</Strong></Text>
        </Footer> */}

      </Container>
      <Footer secondary />
    </>
  )
};

// ${process.env.NEXT_URL}/success?session_id=cs_test_a1m1OS7uxeuVUhd6wblsIHdBJKpIwokBKnUiwx5nIX7mhfPhf4riBImStq
// https://freefrontend.com/css-hexagons/

	//"session_id":"cs_test_a18baRxXaUOaVJzy0in2JlDGBlIQEBdP4zZ5kgTOSIR6zGuNjGvETzVuVL"
	//"session_id":"cs_test_a1JiacgzensGvisT6jZeHg7dEk4rw1WwGEJq0uZiQ3sdLll0PRvkOqWzEo"


// Marks
// ${process.env.NEXT_URL}/success?session_id=cs_test_a1T3mgbl2JmtwHbY9zklkkD8W0HMUYba5sBFXLRNFLNaiWwKGxYlEa8cKJ