import {
  AddToastFunction,
  RemoveToastFunction,
  RemoveAllToastsFunction,
  UpdateToastStateFunction,
  ToastNotificationMap
} from '../types';

export type ToastNotificationsContext = {
  addToast: AddToastFunction;
  removeToast: RemoveToastFunction;
  removeAllToasts: RemoveAllToastsFunction;
  toastNotificationState: ToastNotificationMap;
  updateToastNotificationState: UpdateToastStateFunction;
};
