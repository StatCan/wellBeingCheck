import React, { memo, useState, useCallback } from 'react';
import { Picker, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { newTheme } from '../core/theme';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
//import { Navigation } from '../../types';

import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

import {

} from '../core/utils';
import { Drawer } from 'react-native-paper';

type LaunchState = {
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class LaunchScreen extends React.Component<Props, LaunchState> {

  constructor(LaunchState) {
    super(LaunchState)
    this.state = {
    };

    this._bootstarp();
  }

  //determine if user already has an account
  _bootstarp = () => {
    const surveyAcode=AsyncStorage.getItem('EsmSurveyACode');global.surveyAcode=surveyAcode;
        if(surveyAcode!='none')global.doneSurveyA=true;console.log("Read from localStorage:"+surveyAcode);
    AsyncStorage.getItem('user_account', (err, result) => {
      console.log(result);
      if (result) {
        let resultAsObj = JSON.parse(result)
        let currentPassword = resultAsObj.password

        if (currentPassword != "") {
          this._loginFlow();
        }
        else {
          this._firstLoginFlow();
        }
      }
      else {
        this._firstLoginFlow();
      }
    });
  }

  _firstLoginFlow() {
    this.props.navigation.navigate('RegisterScreen');
  }

  _loginFlow() {
    this.props.navigation.navigate('LoginScreen');
  }

  render() {
    return (
      <PaperProvider theme={newTheme}>
        <Background>
        </Background>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
});

export default memo(LaunchScreen);
