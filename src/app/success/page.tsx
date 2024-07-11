import React from 'react';

import { getProductById } from './constants';

import Success from './components/success';

type ProductParams = {
  params: object;
  searchParams: {
    id: string;
  }
};

export default async function Page(params: ProductParams) {
  const { data, loading } = await getProductById(params.searchParams.id);

  return <Success product={data} />;
};


// http://localhost:3000/success?session_id=cs_test_a1m1OS7uxeuVUhd6wblsIHdBJKpIwokBKnUiwx5nIX7mhfPhf4riBImStq
// https://freefrontend.com/css-hexagons/

	//"session_id":"cs_test_a18baRxXaUOaVJzy0in2JlDGBlIQEBdP4zZ5kgTOSIR6zGuNjGvETzVuVL"
	//"session_id":"cs_test_a1JiacgzensGvisT6jZeHg7dEk4rw1WwGEJq0uZiQ3sdLll0PRvkOqWzEo"


// Marks
// http://localhost:3000/success?session_id=cs_test_a1T3mgbl2JmtwHbY9zklkkD8W0HMUYba5sBFXLRNFLNaiWwKGxYlEa8cKJ