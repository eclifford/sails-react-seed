import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './app';
import todoApp from './components/todo/reducers';

let store = createStore(todoApp);

let rootElement = document.getElementById('main');
React.render(
  // The child must be wrapped in a function
  // to work around an issue in React 0.13.
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  rootElement
);
