import React from 'react';
import Map from './components/map/map';
import { Provider } from 'react-redux';

import configureStore from './components/map/store';
const store = configureStore();

React.render(
  <Provider store={store}>
    {() =>
      <Map zoom={5} center={[42.877742, -97.380979]} />
    }
  </Provider>,
  document.getElementById('main')
);
