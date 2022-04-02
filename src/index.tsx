import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'

import App from './App';
import './index.css';

import store from './store'

ReactDOM.render(
  <React.StrictMode>
    <Provider {...store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

