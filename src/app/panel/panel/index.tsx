"use client"

import React, { useState, Fragment, useContext } from 'react';
import { revalidateTag } from 'next/cache';
import Image from 'next/image';

import { DotLottiePlayer } from '@dotlottie/react-player';
import { useTheme } from 'styled-components';

import { ProductsProps } from '@/global/interfaces';
import { Product, Button } from '@/components';

import { Box, Block, Success, Tag, TextAlignLeft } from '@/assets/svg/icons';
import { NotificationContext } from '@/hooks/notification';

import { Container, Modal, UploadMore, Navigation, ProductEmpty } from './styles';

type Props = {
  products: ProductsProps[]
}

const Panel: React.FC<Props> = ({ products }) => {
  const theme = useTheme();

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

  const lottie_styles  = {
    display: 'flex',
    maxWidth: "300px"
  };

  return (
    <Fragment>
      <Container>
        {products.map((product, index) =>
          <Product key={index.toString()} product={product} href={`/panel/product?id=${product.id}`} onDelete={() => handleDelete(product)} />
        )}
        {products.length === 0 && (
          <ProductEmpty>
            <DotLottiePlayer style={lottie_styles} src="/lottie/marks-empty-card.lottie" autoplay />
            <p>Create a product by clicking more</p>
          </ProductEmpty>
        )}
      </Container>

      <Navigation>
        <UploadMore href='/panel/product'>
          <Box width={20} height={20} stroke={theme.colors.primary} strokeWidth={1.8} />
        </UploadMore>
        <UploadMore href='/panel/category'>
          <Tag width={20} height={20} stroke={theme.colors.primary} strokeWidth={2} />
        </UploadMore>
        <UploadMore href='/panel/aside'>
          <TextAlignLeft width={20} height={20} stroke={theme.colors.primary} strokeWidth={1.8} />
        </UploadMore>
      </Navigation>

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