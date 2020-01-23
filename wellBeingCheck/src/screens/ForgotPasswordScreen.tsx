import React, { memo, useState, useCallback } from 'react';
import { Picker, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
//import { Navigation } from '../types';

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
} from '../core/utils';
import { Drawer } from 'react-native-paper';

type ForgotPasswordState = {
  securityQuestion: string,
  securityAnswer: string,
  securityAnswerError: string,
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class ForgotPasswordScreen extends React.Component<Props, ForgotPasswordState> {

  constructor(ForgotPasswordState) {
    super(ForgotPasswordState)
    this.state = {
      securityQuestion: "",
      securityAnswer: "",
      securityAnswerError: "",
    };
    this._accountAlreadyExists();
  }

  _accountAlreadyExists() {
    AsyncStorage.getItem('user_account', (err, result) => {
      console.log(result);
      if (result) {
        let resultAsObj = JSON.parse(result)
        let secQue = resultAsObj.security_question;
        this.setState({ securityQuestion: secQue });
      }
      else {
        this.setState({ securityQuestion: 'no account exists' });
      }
    });
  }

  _onResetPasswordPressed = () => {
    AsyncStorage.getItem('user_account', (err, result) => {
      console.log(result);
      if (result) {
        let resultAsObj = JSON.parse(result)
        let userSetSecAnswer = resultAsObj.security_answer
        const inputAnswer = this.state.securityAnswer

        if (userSetSecAnswer !== inputAnswer) {
          //incorrect pasword
          this.setState({ securityAnswerError: 'incorrect answer' });
        }
        else {
          //user login success - redirect
          this.props.navigation.navigate('Dashboard');
        }
      }
      else {
      }
    });
  }

  render() {
    return (
      <Background>
        <BackButton goBack={() => this.props.navigation.navigate('LoginScreen')} />

        <Logo />

        <Header>Restore Password</Header>

        <Text style={styles.label}>{this.state.securityQuestion}</Text>

        <TextInput
          label="Security Answer"
          returnKeyType="next"
          value={this.state.securityAnswer}
          onChangeText={text => this.setState({ securityAnswer: text })}
          error={!!this.state.securityAnswerError}
          errorText={this.state.securityAnswerError}
        />

        <Button mode="contained" onPress={this._onResetPasswordPressed} style={styles.button}>
          Reset Password
        </Button>

        <TouchableOpacity
          style={styles.back}
          onPress={() => this.props.navigation.navigate('LoginScreen')}
        >
          <Text style={styles.label}>← Back to login</Text>
        </TouchableOpacity>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  back: {
    width: '100%',
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
  label: {
    color: theme.colors.secondary,
    width: '100%',
  },
});

export default memo(ForgotPasswordScreen);
