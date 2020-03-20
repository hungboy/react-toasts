import * as React from 'react';
import { createPortal } from 'react-dom';
import { ToastNotificationsContextProvider } from '../../context';
import { ToastNotificationsContainer } from '../ToastNotificationsContainer';
import { Toast } from '../Toast';

import reducer, {
  INITIAL_STATE,
  addToastAction,
  updateToastsAction,
  removeToastsAction
} from '../../reducer';

import {
  PlacementType,
  ToastId,
  ToastState,
  ToastVariant,
  UpdateToastStateFunction,
  RemoveToastFunction,
  RemoveAllToastsFunction,
  AddToastFunction,
  GenerateContentsFunction
} from '../../types';

import {
  DEFAULT_GENERATE_CONTENTS_FUNCTION,
  DEFAULT_TOAST_VARIANT
} from '../../constants';

import { generateUEID } from '../../utils';

const { useReducer, useEffect } = React;

export type ToastNotificationsProviderProps = {
  parentNode?: HTMLElement;
  placement?: PlacementType;
  children: React.ReactNode;
};

export const ToastNotificationsProvider: React.FunctionComponent<ToastNotificationsProviderProps> = ({
  parentNode = window.document.body,
  placement = 'top-left',
  children
}) => {
  const [{ toastNotifications }, dispatch] = useReducer(reducer, INITIAL_STATE);

  const updateToastNotificationState: UpdateToastStateFunction = (
    id: ToastId,
    state: ToastState
  ) => {
    if (toastNotifications[id]) {
      dispatch(updateToastsAction([{ id, state }]));
    }
  };

  const addToastNotification: AddToastFunction = ({
    contents,
    variant = 'info'
  }: {
    contents?: GenerateContentsFunction;
    variant?: ToastVariant;
  }) => {
    const id = generateUEID();
    const notification = {
      contents: contents ?? DEFAULT_GENERATE_CONTENTS_FUNCTION,
      variant: variant ?? DEFAULT_TOAST_VARIANT,
      state: ToastState.ENTERING
    };

    dispatch(addToastAction({ id, notification }));

    return `${id}`;
  };

  const removeToastNotification: RemoveToastFunction = (id: ToastId) => {
    if (toastNotifications[id]?.state) {
      dispatch(updateToastsAction([{ id, state: ToastState.CLOSING }]));
    } else {
      console.log("Toast doesn't exist.");
    }
  };

  const removeAllNotifications: RemoveAllToastsFunction = () => {
    const updatedToasts = Object.entries(toastNotifications).map(([id]) => ({
      id,
      state: ToastState.CLOSING
    }));

    dispatch(updateToastsAction(updatedToasts));
  };

  //Filter Closed notifications
  useEffect(() => {
    const closedNotifications = Object.entries(toastNotifications)
      .filter(([, notification]) => notification.state === ToastState.CLOSED)
      .map(([id]) => id);

    if (closedNotifications.length > 0) {
      removeToastsAction({ ids: closedNotifications });
    }
  }, [toastNotifications]);

  return (
    <ToastNotificationsContextProvider
      value={{
        addToast: addToastNotification,
        removeAllToasts: removeAllNotifications,
        removeToast: removeToastNotification,
        toastNotificationState: toastNotifications,
        updateToastNotificationState
      }}
    >
      {children}
      {createPortal(
        <ToastNotificationsContainer placement={placement}>
          {Object.entries(toastNotifications).map(([toastId, notification]) => {
            return <Toast key={toastId} toastId={toastId} {...notification} />;
          })}
        </ToastNotificationsContainer>,
        parentNode
      )}
    </ToastNotificationsContextProvider>
  );
};
