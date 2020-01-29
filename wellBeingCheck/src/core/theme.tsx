import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#600EE6',
    secondary: '#414757',
    error: '#f13a59',
  },
};

export const newTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6FBCA7',
    whiteText: '#FFFFFF',
    accent: '#f1c40f',
    secondary: '#414757',
    error: '#f13a59',
    text: '#000000'
  },
};
