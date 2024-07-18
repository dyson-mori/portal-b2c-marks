"use client"

import React, { useState, Fragment } from 'react';

import { ProductsProps } from '@/global/interfaces';
import { Product } from '@/components';

import { Add } from '@/assets/svg/icons';

import { Container, Modal, UploadMore } from './styles';

type Props = {
  products: ProductsProps[]
}

const Panel: React.FC<Props> = ({ products }) => {
  const [open, setOpen] = useState(-1);

  const handleDelete = (id: string) => {
    // setOpen(index);
    // document.body.style.overflow = "hidden";

    fetch(`${process.env.NEXT_URL}/api/product?id=${id}`, {
      method: 'DELETE'
    });
  };

  const handleClose = () => {
    setOpen(-1);
    document.body.style.overflowY = "scroll";
  };

  const styles = {
    opacity: open > -1 ? 1 : 0,
    zIndex: open > -1 ? 6 : -1,
  };

  return (
    <Fragment>
      <Container>
        <UploadMore href='/panel/product'>
          <Add width={20} height={20} stroke='#303030' strokeWidth={1.8} />
          <p>Products</p>
        </UploadMore>
        <UploadMore href='/panel/category'>
          <Add width={20} height={20} stroke='#303030' strokeWidth={1.8} />
          <p>Category</p>
        </UploadMore>
        {products.map((product, index) =>
          <Product key={index.toString()} isEdit product={product} href={`/panel/product?id=${product.id}`} onDelete={() => handleDelete(product.id)} />
        )}
      </Container>

      <Modal style={styles}>
        {open > -1 && <Product product={products[open]} href={`/panel/product?id=${products[open].id}`} />}

        <button onClick={handleClose}>close</button>
      </Modal>
    </Fragment>
  )
};

export default Panel;