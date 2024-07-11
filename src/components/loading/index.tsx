"use client";

import React from 'react';

import Image from 'next/image';

import { Container, LoadingStyled } from './styles';

type Props = {
  visible: boolean;
}

export const Loading: React.FC<Props> = ({ visible }) => {
  return visible && (
    <LoadingStyled color="#303030">
      <span className="loader" />
    </LoadingStyled>
  )
};