"use client"
import React, { ReactNode, useEffect, useState } from 'react';

import { Container } from './styles';

export interface NotificationProps {
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  notification?: {
    active?: string | undefined;
    type?: 'success' | 'failed' | 'warning' | undefined;
    message?: string;
  };
  alert?: 'success' | 'failed' | 'warning' | undefined;
};

export const Notification: React.FC<NotificationProps> = ({ notification, icon }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!notification?.active) return;

    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  }, [notification!.active]);

  return (
    <Container alert={notification?.type} style={{ bottom: isVisible ? 10 : -100 }} >
      <p>{notification?.message}</p>
    </Container>
  )
};
