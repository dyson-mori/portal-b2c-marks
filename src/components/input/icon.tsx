"use client"

import React from 'react';

import { Icon as IconStyle } from './styles';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

export const Icon: React.FC<IconProps> = ({ icon: Icon, ...rest }) => {
  return (
    <IconStyle>
      <Icon {...rest} />
    </IconStyle>
  )
};