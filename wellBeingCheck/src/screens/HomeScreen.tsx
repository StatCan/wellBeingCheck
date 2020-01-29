import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import { Navigation } from '../types';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { AsyncStorage, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { newTheme } from '../core/theme';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

type HomeState = {
  canRegisterBtnIsDisabled: boolean,
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class HomeScreen extends React.Component<Props, HomeState> {
  constructor(RegisterState) {
    super(RegisterState)
    this.state = {
      canRegisterBtnIsDisabled: false
    };
    this._accountAlreadyExists();
  }

  _accountAlreadyExists() {
    const currentPassword = this._retrieveData('user_password');
    if (!!currentPassword) {
      //user already has account

    }
  }

  _retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value != null) {
        return value;
      }
      else {
        return "";
      }
    } catch (error) {
    }
  }

  render() {
    return (
      <PaperProvider theme={newTheme}>
      <Background>
        <Logo />
        <Text>Well-Being Check</Text>
        <Paragraph>
          Statistics Canada - Well Being Survey
        </Paragraph>
        <Button 
          mode="contained" 
          onPress={() => this.props.navigation.navigate('LoginScreen')}>
          <Text style={styles.whiteText}>
          Login
          </Text>
        </Button>
        <Button
          style={styles.createButton}
          mode="outlined"
          onPress={() => this.props.navigation.navigate('RegisterScreen')}
        >
          Create Account
    </Button>
      </Background>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  createButton: {
    opacity: 1
  },
  whiteText: {
    color: newTheme.colors.whiteText
  }
});

export default memo(HomeScreen);