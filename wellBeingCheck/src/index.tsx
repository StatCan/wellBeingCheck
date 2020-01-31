import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  LaunchScreen,
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
  SettingsScreen,
  ContactUsScreen,
  AboutScreen
} from './screens';

const Router = createStackNavigator(
  {
    LaunchScreen,
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    Dashboard,
    SettingsScreen,
    ContactUsScreen,
    AboutScreen
  },
  {
    initialRouteName: 'LaunchScreen',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
