"use client"

import React, { useState, Fragment, useContext } from 'react';
import Image from 'next/image';

import { ProductsProps } from '@/global/interfaces';
import { Product, Button } from '@/components';

import { Add, Block, Success } from '@/assets/svg/icons';
import { NotificationContext } from '@/hooks/notification';

import { Container, Modal, UploadMore } from './styles';
import { revalidateTag } from 'next/cache';

type Props = {
  products: ProductsProps[]
}

const Panel: React.FC<Props> = ({ products }) => {
  const { setNotification } = useContext(NotificationContext);
  const [product, setProduct] = useState<ProductsProps | null>(null);
  
  const handleDelete = (prod: ProductsProps) => {
    setProduct(prod);
    document.body.style.overflow = "hidden";
  };

  const handleClose = async () => {
    const res = await fetch(`/api/product?id=${product?.id}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      return setNotification({ icon: Block, type: 'failed', message: 'Failed to delete', active: `${Math.random()}_show` });
    };

    setProduct(null);
    revalidateTag('products');
    document.body.style.overflowY = "scroll";

    return setNotification({ icon: Success, type: 'success', message: 'Deleted successful', active: `${Math.random()}_show` });
  };

  const styles = {
    opacity: product? 1 : 0,
    zIndex: product? 6 : -1,
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
          <Product key={index.toString()} isEdit product={product} href={`/panel/product?id=${product.id}`} onDelete={() => handleDelete(product)} />
        )}
      </Container>

      <Modal style={styles}>
        {product?.id && (
          <Image
            src={product?.files[0]?.url}
            width={300}
            height={300}
            style={{
              borderRadius: 3
            }}
            alt='delete'
          />
        )}

        <div>
          <Button onClick={handleClose}>Delete</Button>
        </div>
      </Modal>
    </Fragment>
  )
};

export default Panel;