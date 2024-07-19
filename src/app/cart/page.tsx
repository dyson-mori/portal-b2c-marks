import React, { Fragment } from 'react';
import type { Metadata } from 'next';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

import Main from './main';

export const metadata: Metadata = {
  title: 'payment | Marks Jóias',
  description: 'Best prices',
  icons: [
    {
      url: 'https://cdn.worldvectorlogo.com/logos/next-js.svg',
    }
  ]
};

export default async function Page(){
  return (
    <Fragment>
      <Header />
      <Main />
      <Footer secondary />
    </Fragment>
  );
};
