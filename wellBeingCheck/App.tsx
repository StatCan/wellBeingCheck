import React from 'react';
import {LogBox} from 'react-native';
import { Provider } from 'react-native-paper';
import App from './src';
import { theme } from './src/core/theme';
import './Globals.js';
LogBox.ignoreLogs(['Require cycle:','Setting a timer']);  //,'React Native version mismatch'
//console.ignoredYellowBox = ['Require cycle:','Setting a timer'];
const Main = () => (
  <Provider theme={theme}>
    <App />
  </Provider>
);

export default Main;
