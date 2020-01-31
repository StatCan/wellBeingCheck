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
    ContactUsScreen
  },
  {
    initialRouteName: 'LaunchScreen',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
