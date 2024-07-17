"use client"

import React, { InputHTMLAttributes } from 'react';

import { Input as InputStyled } from './styles';

export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({ ...rest }) => {
  return (
    <InputStyled {...rest} />
  );
};
