import * as React from 'react';
import {
  ToastId,
  ToastVariant,
  GenerateContentsFunction,
  ToastState
} from '../../types';
import {
  DEFAULT_TRANSITION_DURATION_MS,
  DEFAULT_WRAPPER_HEIGHT,
  DEFAULT_TOAST_GUTTER_PX
} from '../../constants';
import { ToastNotificationsContext as ContextType } from '../../context/types';
import { ToastNotificationsContext } from '../../context';
import styles from './styles.scss';

const { useState, useRef, useEffect, useContext } = React;

export type IToastProps = {
  toastId: ToastId;
  contents: GenerateContentsFunction;
  variant: ToastVariant;
  state: ToastState;
};

export const calculateWrapperTransition = (
  transitionDuration: number = DEFAULT_TRANSITION_DURATION_MS
) => ({
  transition: `height ${transitionDuration}ms linear `
});

export const calculateToastTransition = (
  transitionDuration: number = DEFAULT_TRANSITION_DURATION_MS
) => ({
  transition: `opacity ${transitionDuration}ms `
});

export const Toast = ({ toastId, contents, variant, state }: IToastProps) => {
  const wrapperElement = useRef<HTMLDivElement>(null);
  const [wrapperHeight, setWrapperHeight] = useState<string>(
    DEFAULT_WRAPPER_HEIGHT
  );
  const [wrapperPaddingHeight, setWrapperPaddingHeight] = useState<number>(
    DEFAULT_TOAST_GUTTER_PX
  );
  const [toastOpacity, setToastOpacity] = useState<number>(0);

  const context = useContext<ContextType | null>(ToastNotificationsContext);

  if (context === null) {
    throw Error(
      'Toast Notification requires a Toast Notification Provider Parent.'
    );
  }

  const { updateToastNotificationState } = context;

  const handleToastClose = () => {
    updateToastNotificationState(toastId, ToastState.CLOSING);
  };
  useEffect(() => {
    if (state === ToastState.ENTERING) {
      setToastOpacity(1);
      updateToastNotificationState(toastId, ToastState.ENTERED);
    }
    if (
      state === ToastState.ENTERED &&
      wrapperElement.current?.offsetHeight &&
      wrapperHeight === DEFAULT_WRAPPER_HEIGHT
    ) {
      setWrapperHeight(`${wrapperElement.current.offsetHeight}px`);
    }
    if (state === ToastState.CLOSING) {
      setWrapperHeight('0px');
      setWrapperPaddingHeight(0);
      setToastOpacity(0);
      setTimeout(() => {
        updateToastNotificationState(toastId, ToastState.CLOSED);
      }, DEFAULT_TRANSITION_DURATION_MS);
    }
  }, [
    state,
    updateToastNotificationState,
    setWrapperHeight,
    wrapperHeight,
    setToastOpacity,
    toastId
  ]);
  return (
    <div
      ref={wrapperElement}
      style={{
        ...calculateWrapperTransition(),
        height: wrapperHeight,
        paddingTop: wrapperPaddingHeight
      }}
    >
      <div
        className={`${styles['toast-notification']} ${
          styles[`toast-notification-${variant}`]
        }`}
        style={{
          ...calculateToastTransition(),
          opacity: toastOpacity
        }}
      >
        <div
          className={`${styles['toast-notification__close-button']}`}
          onClick={() => handleToastClose()}
        />
        <div className="toast-notification__contents">{contents(toastId)}</div>
      </div>
    </div>
  );
};
