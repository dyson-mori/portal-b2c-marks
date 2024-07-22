import type { Metadata } from 'next';

import { Footer } from '@/components';
import { Header } from "@/components/header";

import { getCategories, getProducts } from './actions';
import Products from './screen';

export const metadata: Metadata = {
  title: 'products | Marks Jóias',
  description: 'Best prices',
  icons: [
    {
      url: 'https://cdn.worldvectorlogo.com/logos/next-js.svg',
    }
  ]
  // assets: []
};

export default async function Page() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <>
      <Header />
      <Products products={products} cards={categories} />
      <Footer primary />
    </>
  );
};