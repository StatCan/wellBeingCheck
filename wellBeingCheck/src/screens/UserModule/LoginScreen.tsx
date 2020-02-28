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
import { resources } from '../../../GlobalResources';
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
import LogoClear from '../../components/LogoClear';
import AppBanner from '../../components/AppBanner';
import { SafeAreaConsumer } from 'react-native-safe-area-context';

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
      title:resources.getString("Well-Being Check")
    };
  }
   toggleLanguage(){
       if(resources.culture=='en')resources.culture='fr';else resources.culture='en';
       this.setState({title:resources.getString("Well-Being Check")});
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

        <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
        <AppBanner />
        <Background>
          {/* <BackButton goBack={() => this.props.navigation.navigate('HomeScreen')} /> */}
        <View style={{width:'100%', height:24,marginTop:0,alignItems:'flex-end',justifyContent:'flex-end'}}>
              <TouchableOpacity onPress={() => this.toggleLanguage()} style={{height:60 }}><Text>{resources.getString("Language")}</Text></TouchableOpacity>
        </View>
          <LogoClear />

          <Text>{resources.getString("Well-Being Check")}</Text>

          <TextInput
            label={resources.getString("Enter password")}
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
              <Text style={styles.label}>{resources.getString("Forgot your password?")}</Text>
            </TouchableOpacity>
          </View>

          <Button
            mode="contained"
            onPress={this._onLoginPressed}>
            <Text style={styles.whiteText}>{resources.getString("Login")}</Text>
          </Button>

        </Background>
        <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
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
  },
  whiteText: {
    color: newTheme.colors.whiteText
  }
});

export default memo(LoginScreen);
