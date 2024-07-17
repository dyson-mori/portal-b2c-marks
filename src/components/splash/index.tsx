"use client";

import React from 'react';

import Image from 'next/image';

import { Logo } from '@/assets/svg/icons';

import { Container } from './styles';
import { useRouter } from 'next/navigation';

type LoadingProps = {
  loading?: boolean;
  message?: string;
};

export const SplashScreen: React.FC<LoadingProps> = ({ message, loading }) => {
  const router = useRouter();

  React.useEffect(() => {
    setTimeout(() => {
      router.push('/products');
    }, 3800);
  }, [router]);

  return (
    <Container>
      <Logo width={75} height={75} />
    </Container>
  );
};