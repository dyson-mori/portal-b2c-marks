"use client"
import React, { ReactNode, useEffect, useState } from 'react';

import { Container, Icon } from './styles';

export interface NotificationProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  notification?: {
    active?: string | undefined;
    type?: 'success' | 'failed' | 'warning' | undefined;
    message?: string;
  };
  alert?: 'success' | 'failed' | 'warning' | any;
};

export const Notification: React.FC<NotificationProps> = ({ notification, icon: Icons }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!notification?.active) return;

    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  }, [notification!.active]);

  return (
    <Container alert={notification?.type} style={{ bottom: isVisible ? 10 : -100 }}>
      <Icon>
        {!!Icons && (
          <Icons
            width={20}
            height={20}
            stroke={
              notification?.type === 'success' ? '#47C747' :
              notification?.type === 'warning' ? '#F9BE14' : '#FF0000'
            }
          />
        )}
      </Icon>
      <p>{notification?.message}</p>
    </Container>
  )
};
