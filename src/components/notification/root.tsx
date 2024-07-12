"use client"
import React, { useEffect, useState } from 'react';

import { Container } from './styles';

export interface NotificationProps {
  data?: {
    active?: string | undefined;
    type?: 'success' | 'failed' | 'warning' | undefined;
  };
  message?: string;
  children: React.ReactNode;
};

export const NotificationRoot: React.FC<NotificationProps> = ({ data, message, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!data!.active) return;

    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  }, [data!.active]);


  return (
    <Container style={{ bottom: isVisible ? 10 : -100 }} >
      {children}
      <p>{message}</p>
    </Container>
  )
};
