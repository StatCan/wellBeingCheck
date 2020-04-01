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
  ForgotPasswordChangeScreen,
  Dashboard,
  SettingsScreen,
  ContactUsScreen,
  AboutScreen,
  ResultScreen,
//  ResultSummaryScreen,
  EQSurveyScreen,
  TOSSettingsScreen
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
    ForgotPasswordChangeScreen,
    Dashboard,
    SettingsScreen,
    ContactUsScreen,
    AboutScreen,
    ResultScreen,
 //   ResultSummaryScreen,
    EQSurveyScreen,
    TOSSettingsScreen
  },
  {
    initialRouteName: 'LaunchScreen',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
