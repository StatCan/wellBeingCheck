import React, { memo, useState, useCallback } from 'react';
import { Picker, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import { newTheme } from '../../core/theme';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
//import { Navigation } from '../../types';

import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

import {
  passwordValidator,
  passwordConfirmValidator,
  securityQuestionValidator,
  securityAnswerValidator,
} from '../../core/utils';
import { Drawer } from 'react-native-paper';

type LoginState = {
  password: string,
  passwordError: string,
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class LoginScreen extends React.Component<Props, LoginState> {

  constructor(LoginState) {
    super(LoginState)
    this.state = {
      password: "",
      passwordError: "",
    };
  }

  _onLoginPressed = () => {
    AsyncStorage.getItem('user_account', (err, result) => {
      console.log(result);
      if (result) {
        let resultAsObj = JSON.parse(result)
        let currentPassword = resultAsObj.password
        const inputPassword = this.state.password
        if (currentPassword !== inputPassword) {
          //incorrect pasword
          this.setState({ passwordError: 'incorrect password' });
        }
        else {
          //user login success - redirect
          this.props.navigation.navigate('Dashboard');
        }
      }
      else {
        this.setState({ passwordError: 'incorrect password' });
      }
    });
  }

  render() {
    return (
      <PaperProvider theme={newTheme}>
      <Background>
        <BackButton goBack={() => this.props.navigation.navigate('HomeScreen')} />

        <Logo />

        <Header>Well-Being Check</Header>

        <TextInput
          label="Password"
          returnKeyType="next"
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
          error={!!this.state.passwordError}
          errorText={this.state.passwordError}
          secureTextEntry={true}
        />

        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')}
          >
            <Text style={styles.label}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>

        <Button
          mode="contained"
          onPress={this._onLoginPressed}>
          Login
      </Button>

        <View style={styles.row}>
          <Text style={styles.label}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('RegisterScreen')}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </Background>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  label: {
    color: newTheme.colors.secondary,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: newTheme.colors.primary,
  }
});

export default memo(LoginScreen);
