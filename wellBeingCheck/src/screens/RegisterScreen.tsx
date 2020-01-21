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
  }

  _onSignUpPressed = () => {
    console.log("_onSignUpPressed");
    console.log(this.state);

    this.setState({passwordError: passwordValidator(this.state.password)});
    this.setState({passwordConfirmError: passwordConfirmValidator(this.state.password, this.state.passwordConfirm)});
    this.setState({securityQuestionError: securityQuestionValidator(this.state.securityQuestion)});
    this.setState({securityAnswerError: securityAnswerValidator(this.state.securityAnswer)});

    console.log(this.state.passwordError);

    this.props.navigation.navigate('HomeScreen');
  };

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
          onChangeText={text => this.setState({password: text})}
          error={!!this.state.passwordError}
          errorText={this.state.passwordError}
          secureTextEntry={true}
        />
  
        {/* <TextInput
          label="Paswword Confirm"
          returnKeyType="next"
          value={passwordConfirm.value}
          onChangeText={text => setPasswordConfirm({ value: text, error: '' })}
          error={!!passwordConfirm.error}
          errorText={passwordConfirm.error}
          secureTextEntry={true}
        />
  
        <Text>Security Question</Text>
        <Picker
          style={[styles.picker]} itemStyle={styles.pickerItem}
          onValueChange={(itemValue, itemIndex) =>
            setSecurityQuestion({ value: itemValue, error: '' })
          }>
          <Picker.Item label="Mother's Maiden name" value="mdn" />
          <Picker.Item label="Year of Birth" value="yob" />
        </Picker>
  
        <TextInput
          label="Security Answer"
          returnKeyType="next"
          value={securityAnswer.value}
          onChangeText={text => setSecurityAnswer({ value: text, error: '' })}
          error={!!securityAnswer.error}
          errorText={securityAnswer.error}
        /> */}
  
        <Button mode="contained" onPress={this._onSignUpPressed} style={styles.button}>
          Sign Up
        </Button>
  
        {/* <View style={styles.row}>
          <Text style={styles.label}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View> */}
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
