import React, { memo, useState, useCallback } from 'react';
import { Picker, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import { theme } from '../../core/theme';

import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
i18n.fallbacks = true;
i18n.locale = Localization.locale;
i18n.translations = {
  en: { welcome: 'Hello', name: 'Charlie' },
  ja: { welcome: 'こんにちは' },
};

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

type RegisterState = {
  password: string,
  passwordError: string,
  passwordConfirm: string,
  passwordConfirmError: string,
  securityQuestion: string,
  securityQuestionError: string,
  securityAnswer: string,
  securityAnswerError: string,
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class RegisterScreen extends React.Component<Props, RegisterState> {

  constructor(RegisterState) {
    super(RegisterState)
    this.state = {
      password: "",
      passwordError: "",
      passwordConfirm: "",
      passwordConfirmError: "",
      securityQuestion: "",
      securityQuestionError: "",
      securityAnswer: "",
      securityAnswerError: "",
    };
    //this._retrieveData('user_password');
    this._accountAlreadyExists();
  }

  _accountAlreadyExists() {
    const currentPassword = this._retrieveData('user_password');
    if (!!currentPassword) {
      //user already has account
      alert('user account already exixst! - navigation block commented');
      //this.props.navigation.navigate('HomeScreen');
    }
  }

  _validateForm = () => {
    const isPasswordValid = passwordValidator(this.state.password);
    const isPasswordConfirmValid = passwordConfirmValidator(this.state.password, this.state.passwordConfirm);
    const isSecurityQuestionValid = securityQuestionValidator(this.state.securityQuestion);
    const isSecurityAnswerValid = securityAnswerValidator(this.state.securityAnswer);

    if ((isPasswordValid == '') && (isPasswordConfirmValid == '') && (isSecurityQuestionValid == '') && (isSecurityAnswerValid == '')) {
      this.setState({ passwordError: '' });
      this.setState({ passwordConfirmError: '' });
      this.setState({ securityQuestionError: '' });
      this.setState({ securityAnswerError: '' });
      return true;
    }
    else {
      this.setState({ passwordError: isPasswordValid });
      this.setState({ passwordConfirmError: isPasswordConfirmValid });
      this.setState({ securityQuestionError: isSecurityQuestionValid });
      this.setState({ securityAnswerError: isSecurityAnswerValid });
      return false;
    }
  }

  _CreateAccount = () => {
    //validation passed lets store user
    let userAccountObj = {
      password: this.state.password,
      security_question: this.state.securityQuestion,
      security_answer: this.state.securityAnswer,
    };

    AsyncStorage.setItem('user_account', JSON.stringify(userAccountObj), () => {
      this.props.navigation.navigate('Dashboard');
    });
  }

  _onSignUpPressed = () => {
    const isValid = this._validateForm();
    if (isValid) {
      this._CreateAccount();
    }
    else {
    }
  };

  _storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
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
      <Background>
        <BackButton goBack={() => this.props.navigation.navigate('HomeScreen')} />

        <Logo />

        <Header>Create Account</Header>

        <Header>{Resources.t('welcome')}</Header>

        <TextInput
          label="Password"
          returnKeyType="next"
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
          error={!!this.state.passwordError}
          errorText={this.state.passwordError}
          secureTextEntry={true}
        />

        <TextInput
          label="Password Confirm"
          returnKeyType="next"
          value={this.state.passwordConfirm}
          onChangeText={text => this.setState({ passwordConfirm: text })}
          error={!!this.state.passwordConfirmError}
          errorText={this.state.passwordConfirmError}
          secureTextEntry={true}
        />

        {/* mode can also be dropdown - dialog will allow more space */}
        <Picker
          mode='dialog'
          selectedValue={this.state.securityQuestion}
          style={[styles.picker]} itemStyle={styles.pickerItem}
          onValueChange={value => this.setState({ securityQuestion: value })}>
          <Picker.Item label="Select a security question" value="" />
          <Picker.Item label="What is your mother’s maiden name?" value="What is your mother’s maiden name?" />
          <Picker.Item label="What primary school did you go to?" value="What primary school did you go to?" />
          <Picker.Item label="What was your first car?" value="What was your first car?" />
          <Picker.Item label="What is your favourite game or sport?" value="What is your favourite game or sport?" />
          <Picker.Item label="What was your first job? " value="What was your first job? " />
        </Picker>
        {this.state.securityQuestionError != '' ? (
          <Text style={styles.errorTest}>{this.state.securityQuestionError}</Text>
        ) : null
        }

        <TextInput
          label="Security Answer"
          returnKeyType="next"
          value={this.state.securityAnswer}
          onChangeText={text => this.setState({ securityAnswer: text })}
          error={!!this.state.securityAnswerError}
          errorText={this.state.securityAnswerError}
        />

        <Button mode="contained" onPress={this._onSignUpPressed} style={styles.button}>
          Sign Up
        </Button>

        <View style={styles.row}>
          <Text style={styles.label}>Already have an account? </Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  errorTest: {
    color: theme.colors.error,
    marginTop: 5,
    textAlign: 'left',
    alignSelf: 'stretch',
    marginLeft: 4,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  picker: {
    width: '100%',
    backgroundColor: '#ffff',
    borderColor: '#330033',
    borderWidth: 10,
  },
  pickerItem: {
    color: 'red',
    width: '80%'
  },
});

export default memo(RegisterScreen);
