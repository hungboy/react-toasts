import * as React from 'react';
import { ToastNotificationsContext as ContextType } from './types';

export const ToastNotificationsContext = React.createContext<ContextType | null>(
  null
);

ToastNotificationsContext.displayName = 'ToastNotification';

export const {
  Consumer: ToastNotificationsContextConsumer,
  Provider: ToastNotificationsContextProvider
} = ToastNotificationsContext;

export const useToastNotifications = (): ContextType => {
  const context = React.useContext(ToastNotificationsContext);
  if (context === null) {
    throw Error(
      'Missing required Toast Notifications Provider parent element.'
    );
  } else {
    return context;
  }
};
