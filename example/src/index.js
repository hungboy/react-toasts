import React from 'react';
import ReactDOM from 'react-dom';
import { ToastNotificationsProvider } from 'react-toasts';
import './index.css';
import App from './App';

ReactDOM.render(
  <ToastNotificationsProvider>
    <App />
  </ToastNotificationsProvider>,
  document.getElementById('root')
);
