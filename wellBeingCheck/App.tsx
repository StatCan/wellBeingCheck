import React from 'react';
import { Provider } from 'react-native-paper';
import App from './src';
import { theme } from './src/core/theme';
import './Globals.js';
import './Resources.js';

const Main = () => (
  <Provider theme={theme}>
    <App />
  </Provider>
);

export default Main;
