# react-toasts

> Toast notification component for React.

[![NPM](https://img.shields.io/npm/v/react-toasts.svg)](https://www.npmjs.com/package/react-toasts) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-toasts
```

## Usage
`react-toasts` leverages `React Context` to provide a global means of managing toasts notifications. `ToastNotificationsProvider` Parent element is required to access the necessary `Context` value.

```tsx
import * as React from 'react'

import {ToastNotificationsProvider} from 'react-toasts'

class Example extends React.Component {
  render () {
    return (
      <ToastNotificationsProvider>
        <ChildComponents/>
      </ToastNotificationsProvider>
    )
  }
}
```
`react-toasts` leverages `react-dom createPortal` to render a fixed container on the view port. Positioning of a set of `Toasts` can be configured via the `placement` prop of a `ToastNotificationProvider`

```tsx
export type ToastNotificationsProviderProps = {
  parentNode?: HTMLElement; //Defaults to window.document.body
  placement?: PlacementType;
  children: React.ReactNode;
};

export type PlacementType =
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left'
  | 'top-right'
  | 'top-center'
  | 'top-left';
```

Once a `ToastNotificationsProvider` is mounted the it's child components can interface with it via React's `Context API` for `Class Components` or `useToastNotifications` hook for `Functional Components`.

Toast Notifications Context: 
```tsx
export type ToastNotificationsContext = {
  addToast: AddToastFunction;
  removeToast: RemoveToastFunction;
  removeAllToasts: RemoveAllToastsFunction;
  toastNotificationState: ToastNotificationMap;
  updateToastNotificationState: UpdateToastStateFunction;
};
```

Main interface is the provided `addToast` function:

```tsx
type AddToastFunction = ({
  contents,
  variant
}: {
  contents?: (id: ToastId) => React.ReactChild;
  variant?: 'info' | 'warning' | 'error' | 'success';
}) => ToastId;


```

Adding Toast Example:

```tsx 
import React from 'react'
import {ToastNotificationsContext} from 'react-toasts'

class Example extends React.Component<any,any>{
  static contextType = ToastNotificationsContext;

  componentDidMount(){
    const {addToast} = this.context
    const toastId = addToast({variant:'warning' , contents: (id)=>"Here's a warning toast!"})
  }

  render(){
    return<div/>
  }
}


```


```tsx 

import React from 'react'
import {useToastNotifications} from 'react-toasts'

const example = () =>{
  const {addToast} = useToastNotifications()

  React.useEffect(()=>{
    const toastId = addToast({variant:'warning' , contents: (id)=>"Here's a warning toast!"})
  },[])

  return <div>sample stuff... </div>
}
```

Removing Notifications: 
`react-toasts` provides a built in close button for user's to dismiss a given notification. However if manual removal is needed a `removeToast` and `removeAllToasts` are provided from the `ToastNotificationsContext`.

```tsx
import React from 'react'
import {useToastNotifications} from 'react-toasts'

const childComponent = (referenceToastId:string) =>{
  const {removeToast} = useToastNotifications()

  React.useEffect(()=>{
    removeToast(referenceToastId)
  },[])

  return <div>sample stuff... </div>
}
```

```tsx
import React from 'react'
import {ToastNotificationsContext} from 'react-toasts'

class Example extends React.Component<{toastId:string},any>{
  static contextType = ToastNotificationsContext;

  handleButtonClick(){
    const {removeToast} = this.context
    const {toastId} = this.props

    removeToast(toastId)
  }

  render(){return <button onClick={()=>handleButtonClick()}>Dismiss Notification!</button>}
}
```



## License

MIT © [hungboy](https://github.com/hungboy)
