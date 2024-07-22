import { Fragment } from 'react';

import { Header } from '@/components/header';

import { getProducts } from './actions';
import Panel from './panel';

export default async function Page() {
  const data = await getProducts();

  return (
    <Fragment>
      <Header />
      <Panel products={data} />
    </Fragment>
  );
}