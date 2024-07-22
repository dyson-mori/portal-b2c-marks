import React, { Fragment } from 'react';
import type { Metadata } from 'next';

import { ProductsProps } from "@/global/interfaces";

import ProductScreen from './main';
import { Header } from '@/components/header';
import { Footer } from '@/components';

type ProductParams = {
  params: object;
  searchParams: {
    id: string;
  }
};

export async function generateMetadata({ searchParams }: ProductParams): Promise<Metadata> {
  const productId = searchParams.id;

  const res = await fetch(`${process.env.NEXT_URL}/api/product?id=${productId}`, {
    method: 'GET',
    cache: 'no-store',
    next: {
      revalidate: 3600
    }
  });

  if (!res.ok) {
    throw new Error('Get Product by Id in Params')
  };

  const product = await res.json();

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description
    }
  };
};

const getProductById = async (id: string): Promise<ProductsProps> => {
  const res = await fetch(`${process.env.NEXT_URL}/api/product?id=${id}`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Get Product by Id')
  };

  const data = await res.json();

  return data;
};

export default async function Product(params: ProductParams) {
  const data = await getProductById(params.searchParams.id);

  return (
    <Fragment>
      <Header />
      <ProductScreen data={data} />
      <Footer />
    </Fragment>
  );
};
