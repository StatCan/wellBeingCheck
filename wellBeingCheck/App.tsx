import React from 'react';
import {YellowBox} from 'react-native';
import { Provider } from 'react-native-paper';
import App from './src';
import { theme } from './src/core/theme';
import './Globals.js';
YellowBox.ignoreWarnings(['Require cycle:',]);
const Main = () => (
  <Provider theme={theme}>
    <App />
  </Provider>
);

export default Main;
