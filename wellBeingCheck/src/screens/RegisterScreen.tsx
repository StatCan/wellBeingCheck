import React, { memo, useState } from 'react';
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
    this._retrieveData('user_password');
  }

  _onSignUpPressed = () => {
    console.log("_onSignUpPressed");
    console.log(this.state);

    this.setState({ passwordError: passwordValidator(this.state.password) });
    this.setState({ passwordConfirmError: passwordConfirmValidator(this.state.password, this.state.passwordConfirm) });
    this.setState({ securityQuestionError: securityQuestionValidator(this.state.securityQuestion) });
    this.setState({ securityAnswerError: securityAnswerValidator(this.state.securityAnswer) });

    console.log(this.state.passwordError);
    console.log(this.state.passwordConfirmError);
    console.log(this.state.securityQuestionError);
    console.log(this.state.securityAnswerError);

    if (
      (this.state.passwordError == '') &&
      (this.state.passwordConfirmError == '') &&
      (this.state.securityQuestionError == '') &&
      (this.state.securityAnswerError == '')
    ) {
      //validation passed lets store user
      this._storeData('user_password', this.state.password);
      this._storeData('user_security_question', this.state.securityQuestion);
      this._storeData('user_security_answer', this.state.securityAnswer);
      this.props.navigation.navigate('Dashboard');
    }
    else {
      alert('here');
    }
  };

  _storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      alert('saved');
    } catch (error) {
      alert('error');
      console.log(error);
    }
  }

  _retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value != null) {
        alert(value);
      }
      else {
        alert('value is null');
      }
    } catch (error) {
      alert('error');
      console.log(error);
    }
  }

  _handleSecurityQuestionChange(value) {
    this.setState({ securityQuestion: this.state.securityQuestion });
  }

  render() {
    return (
      <Background>
        {/* <BackButton goBack={() => navigation.navigate('HomeScreen')} /> */}

        <Logo />

        <Header>Create Account Armon</Header>

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

        <Text>Security Question</Text>
        <Picker
          style={[styles.picker]} itemStyle={styles.pickerItem}
          onValueChange={(itemValue, itemIndex) =>
            this._handleSecurityQuestionChange({ value: itemValue })
          }>
          <Picker.Item label="Mother's Maiden name" value="mdn" />
          <Picker.Item label="Year of Birth" value="yob" />
        </Picker>

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
    width: 100,
    backgroundColor: '#ffff',
    borderColor: '#330033',
    borderWidth: 10,
  },
  pickerItem: {
    color: 'red'
  },
});

export default memo(RegisterScreen);
