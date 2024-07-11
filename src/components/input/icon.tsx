"use client"

import React from 'react';
import Image from 'next/image';

import { Icon as IconStyle } from './styles';

interface IconProps {
  icon: any;
  width?: number;
  height?: number;
};

export const Icon: React.FC<IconProps> = ({ icon, height = 20, width = 20 }) => {
  return (
    <IconStyle>
      <Image src={icon} width={width} height={height} alt='svg' />
    </IconStyle>
  )
};