"use client"

import React, { Fragment, useState } from 'react';

import Image from 'next/image';

import { ProductsProps } from '@/global/interfaces';

import { ContainerDesktop, ContainerMobile, Button, Options } from './styles';
import useWindowDimensions from '@/hooks/useWindowDimensions';

type Props = {
  data: ProductsProps
};

const Images: React.FC<Props> = ({ data }) => {
  const { width } = useWindowDimensions();

  const [select, setSelect] = useState(0);

  // const width = Number(data.files[select].width) / 2;

  return (
    <Fragment>
      <ContainerDesktop>
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
          alt={data.title}
          style={{
            // objectFit: 'contain',
            objectFit: 'cover',
            borderRadius: 3,
            // opacity: .1
          }}
        />
      </ContainerDesktop>
      <ContainerMobile>
        {data.files.map((item, index) => (
          <Image
            key={index}
            width={width - 20}
            height={width - 20}
            src={item.url}
            alt={item.url}
            style={{
              marginRight: 5,
              objectFit: 'cover',
              borderRadius: 3,
              scrollSnapAlign: 'start'
            }}
          />
        ))}
      </ContainerMobile>
    </Fragment>
  )
}

export default Images;