import React, { memo, useState, useCallback } from 'react';
import { Picker, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import { theme, newTheme } from '../../core/theme';
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
import { Drawer, Title } from 'react-native-paper';
import LogoClear from '../../components/LogoClear';
import LogoClearSmall from '../../components/LogoClearSmall';

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
      //alert('user account already exixst! - navigation block commented');
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
        {/* <BackButton goBack={() => this.props.navigation.navigate('HomeScreen')} /> */}

        <LogoClearSmall />

        <Title style={styles.title}>Secure your account</Title>

        <TextInput
          label="Enter password"
          returnKeyType="next"
          selectionColor = {newTheme.colors.primary}
          underlineColor = {newTheme.colors.primary}
          theme = {newTheme}
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
          error={!!this.state.passwordError}
          errorText={this.state.passwordError}
          secureTextEntry={true}
        />

        <TextInput
          label="Confirm password"
          returnKeyType="next"
          selectionColor = {newTheme.colors.primary}
          underlineColor = {newTheme.colors.primary}
          theme = {newTheme}
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
          <Picker.Item label="Select question" value="" />
          <Picker.Item label="Mother's Maiden name" value="Mother's Maiden name" />
          <Picker.Item label="Year of Birth" value="Year of Birth" />
        </Picker>
        {this.state.securityQuestionError != '' ? (
          <Text style={styles.errorTest}>{this.state.securityQuestionError}</Text>
          ): null
        }

        <TextInput
          label="Answer"
          returnKeyType="next"
          selectionColor = {newTheme.colors.primary}
          underlineColor = {newTheme.colors.primary}
          theme = {newTheme}
          value={this.state.securityAnswer}
          onChangeText={text => this.setState({ securityAnswer: text })}
          error={!!this.state.securityAnswerError}
          errorText={this.state.securityAnswerError}
        />

        <Button mode="contained" onPress={this._onSignUpPressed} style={styles.button}>
          Sign Up
        </Button>

        {/* <View style={styles.row}>
          <Text style={styles.label}>Already have an account? </Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View> */}
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
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
    backgroundColor: newTheme.colors.primary,
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
