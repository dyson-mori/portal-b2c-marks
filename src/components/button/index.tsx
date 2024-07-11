import React, { ButtonHTMLAttributes, ReactNode } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  primary?: boolean | string;
  secondary?: boolean | string;
};

const Button: React.FC<ButtonProps> = ({ children, primary = true, secondary, ...rest }) => {
  return (
    <Container primary={String(primary && !secondary)} secondary={secondary} {...rest}>
      {children}
    </Container>
  )
};

export {
  Button,
  type ButtonProps
}