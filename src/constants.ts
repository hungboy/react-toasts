import { ToastVariant, ToastId, GenerateContentsFunction } from './types';

export const DEFAULT_GENERATE_CONTENTS_FUNCTION: GenerateContentsFunction = (
  id: ToastId
) => `Sample Toast Notification.........${id}`;
export const DEFAULT_TOAST_VARIANT: ToastVariant = 'info';

export const DEFAULT_TRANSITION_DURATION_MS = 500;
export const DEFAULT_TOAST_GUTTER_PX = 10;
export const DEFAULT_WRAPPER_HEIGHT = 'auto';
