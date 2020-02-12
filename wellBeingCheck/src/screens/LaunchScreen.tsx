import React, { memo, useState, useCallback } from 'react';
import { Picker, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
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
  NavigationEvents,
} from 'react-navigation';

import {

} from '../core/utils';
import { Drawer } from 'react-native-paper';
import Constants from 'expo-constants';
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
    this.bootstrapA();

  }
  //determine if user already has an account
  _bootstarp = () => {
    console.log("_bootstarp");
    AsyncStorage.getItem('user_account', (err, userAccountResult) => {
      console.log(userAccountResult);
      let userAccountResultObj = JSON.parse(userAccountResult)
      let currentPassword = null
      if (userAccountResultObj) {
        currentPassword = userAccountResultObj.password;
        global.password=currentPassword;
      }

      AsyncStorage.getItem('user_getting_started', (err, userGettingStartedResult) => {
        console.log(userGettingStartedResult);
        let userGettingStartedResultObj = JSON.parse(userGettingStartedResult)
        let gettingStarted = false
        if (userGettingStartedResultObj) {
          console.log(userGettingStartedResultObj)
          gettingStarted = userGettingStartedResultObj.gettingStarted
        }

        AsyncStorage.getItem('user_terms_and_conditions', (err, userTermsResult) => {
          console.log(userTermsResult);
          let userTermsResultObj = JSON.parse(userTermsResult)
          let termsOfService = false
          if (userTermsResultObj) {
            termsOfService = userTermsResultObj.termsOfService
          }
          //here we have all results
          if (gettingStarted == false) {
            console.log("!gettingStarted");
            this.props.navigation.navigate('GettingStartedScreen');
          }
          else if (termsOfService == false) {
            console.log("!termsOfService");
            this.props.navigation.navigate('TermsOfServiceScreen');
          }
          else if ((currentPassword == null) || (currentPassword == "")) {
            console.log("!currentPassword");
            this.props.navigation.navigate('RegisterScreen');
          }
          else {
            //user has seen getting started, and accepted terms and has a new account
            this.props.navigation.navigate('LoginScreen');
          }
        });
      });
    });
    AsyncStorage.getItem('userToken',(err,result)=>{

    });
  }
  bootstrapA = async () => {
      let userToken = await AsyncStorage.getItem('EsmUserToken');
      if (userToken == null)userToken= Constants.deviceId;   //   global.userToken=this.generateShortGuid(24);
      global.userToken=userToken;
      let doneSurveyA = await AsyncStorage.getItem('doneSurveyA');
      if(doneSurveyA==null)global.doneSurveyA=false;else global.doneSurveyA=true;
      global.doneSurveyA=true;
      let url = global.webApiBaseUrl+'GetConfiguration';
      let token=this.fetchJwToken();console.log(token);console.log(url);
      fetch(url)
            .then((response) =>{
               if (response.status >= 400 && response.status < 600) {
                  global.jwToken='';
                  throw new Error("Access denied(1), Try again, if same thing would happen again contact StatCan");
               }else{
                  response.json().then((responseJson) => {
                         global.jwToken=responseJson[0];
                         global.surveyAUrlEng=responseJson[1];
                         global.surveyAUrlFre=responseJson[2];
                         global.surveyThkUrlEng=responseJson[3];
                         global.surveyThkUrlFre=responseJson[4];
                         global.surveyBUrlEng=responseJson[5];
                         global.surveyBUrlFre=responseJson[6];
                    })
              }
            })
            .catch((error) => {
              console.error(error);
            });
    };
  generateGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  generateShortGuid(len) {
          var buf = [],
              chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
              charlen = chars.length,
              length = len || 32;

          for (var i = 0; i < length; i++) {
              buf[i] = chars.charAt(Math.floor(Math.random() * charlen));
          }

          return buf.join('');
      }
  fetchJwToken() {
          console.log('global.jwt:'+global.jwToken);
          if(global.jwToken!='')return global.jwToken;
          if(global.userToken!='' && global.password!=''){
             let url=global.webApiBaseUrl+'Token/'+global.userToken+'/'+global.password;
             return fetch(url)
             .then((response) => response.json())
             .then((responseJson) => {
                 global.jwToken=responseJson;
             })
             .catch((error) => {
                  console.error(error);
             });
          }
          else {
             alert("Not registered");
          }

                                      }
  render() {
    return (
      <PaperProvider theme={newTheme}>
        <Background>
        </Background>
        <NavigationEvents
          onDidFocus={() => this._bootstarp()}
        />
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
});

export default memo(LaunchScreen);
