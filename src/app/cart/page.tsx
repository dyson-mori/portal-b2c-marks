import React from 'react';

import { Footer, Header } from '@/components';

import Main from './main';

export default async function Page(){
  return (
    <>
      <Header />
      <Main />
      <Footer secondary />
    </>
  );
};
