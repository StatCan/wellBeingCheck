import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  LaunchScreen,
  GettingStartedScreen,
  TermsOfServiceScreen,
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
  SettingsScreen,
  ContactUsScreen,
  AboutScreen,
  ResultScreen,
  ResultSummaryScreen,
  EQSurveyScreen,
} from './screens';

const Router = createStackNavigator(
  {
    LaunchScreen,
    GettingStartedScreen,
    TermsOfServiceScreen,
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    Dashboard,
    SettingsScreen,
    ContactUsScreen,
    AboutScreen,
    ResultScreen,
    ResultSummaryScreen,
    EQSurveyScreen
  },
  {
    initialRouteName: 'LaunchScreen',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
