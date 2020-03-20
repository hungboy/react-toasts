import React, { Component } from 'react';

import { ToastNotificationsContext } from 'react-toasts';

export default class App extends Component {
  static contextType = ToastNotificationsContext;

  componentDidMount() {
    const { addToast } = this.context;
    if (addToast) {
      const variants = ['info', 'success', 'error', 'warning'];

      variants.map(variant => addToast({ variant }));
    }
  }

  render() {
    return <div></div>;
  }
}
