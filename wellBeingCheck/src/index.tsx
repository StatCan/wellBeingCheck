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
  EQSurveyScreen,
  TOSSettingsScreen
} from './screens';

const Router = createStackNavigator(
  {
    LaunchScreen: {
      screen: LaunchScreen,
      navigationOptions: {
        gestureEnabled: false
      },
    },
    GettingStartedScreen: {
      screen: GettingStartedScreen,
      navigationOptions: {
        gestureEnabled: false
      },
    },
    TermsOfServiceScreen: {
      screen: TermsOfServiceScreen,
      navigationOptions: {
        gestureEnabled: false
      },
    },
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        gestureEnabled: false
      },
    },
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {
        gestureEnabled: false
      },
    },
    RegisterScreen: {
      screen: RegisterScreen,
      navigationOptions: {
        gestureEnabled: false
      },
    },
    ForgotPasswordScreen: {
      screen: ForgotPasswordScreen,
      navigationOptions: {
        gestureEnabled: false
      },
    },
    ForgotPasswordChangeScreen: {
      screen: ForgotPasswordChangeScreen,
      navigationOptions: {
        gestureEnabled: false
      },
    },
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        gestureEnabled: false
      },
    },
    SettingsScreen: {
      screen: SettingsScreen,
      navigationOptions: {
        gestureEnabled: false
      },
    },
    ContactUsScreen: {
      screen: ContactUsScreen,
      navigationOptions: {
        gestureEnabled: false
      },
    },
    AboutScreen: {
      screen: AboutScreen,
      navigationOptions: {
        gestureEnabled: false
      },
    },
    ResultScreen: {
      screen: ResultScreen,
      navigationOptions: {
        gestureEnabled: false
      },
    },
    EQSurveyScreen: {
      screen: EQSurveyScreen,
      navigationOptions: {
        gestureEnabled: false
      },
    },
    TOSSettingsScreen: {
      screen: TOSSettingsScreen,
      navigationOptions: {
        gestureEnabled: false
      },
    },
  },
  {
    initialRouteName: 'LaunchScreen',
    navigationOptions: {
      gesturesEnabled: false
    },
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
