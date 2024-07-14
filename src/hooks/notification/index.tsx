import React, { createContext, ReactNode, useState } from 'react';

import { Notification } from '@/components';

interface NotificationProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  type: 'success' | 'failed' | 'warning' | undefined;
  message: string | undefined;
  active: string | undefined;
};

interface NotificationContextProps {
  setNotification: ({}: NotificationProps) => void;
};

export const NotificationContext = createContext({} as NotificationContextProps);

const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState({} as NotificationProps);

  return (
    <NotificationContext.Provider value={{ setNotification }}>
      {children}
      <Notification notification={notification} icon={notification.icon} />
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;