"use client"

import React, { useState } from 'react';

import Image from 'next/image';

import { ProductsProps } from '@/global/interfaces';

import { Container, Button, Options } from './styles';

type Props = {
  data: ProductsProps
};

const Images: React.FC<Props> = ({ data }) => {
  const [select, setSelect] = useState(0);

  const width = Number(data.files[select].width) / 2;

  return (
    <Container>
      <Options>
        {data.files.map((item, index) => (
          <Button key={index.toString()} onClick={() => setSelect(index)}>
            <Image
              width={80}
              height={80}
              src={item.url}
              alt={item.url}
              style={{
                objectFit: 'cover',
                borderRadius: 3,
              }}
            />
          </Button>
        ))}
      </Options>
      <Image
        // width={width}
        // height={width * (Number(data.files[select].height) / Number(data.files[select].width))}
        width={500}
        height={500}
        src={data.files[select].url}
        alt={data.name}
        style={{
          // objectFit: 'contain',
          objectFit: 'cover',
          borderRadius: 3,
          margin: '10px 0'
          // opacity: .1
        }}
      />
    </Container>
  )
}

export default Images;