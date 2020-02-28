import React, { memo } from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import { AsyncStorage } from 'react-native';
import Background from '../components/Background';

import { newTheme } from '../core/theme';
import { Provider as PaperProvider, Title } from 'react-native-paper';
import { checkConnection } from '../utils/fetchJwToken';
import Constants from 'expo-constants';
import { resources } from '../../GlobalResources';
import LogoClear from '../components/LogoClear';
import AppBanner from '../components/AppBanner';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  NavigationEvents,
} from 'react-navigation';
import { SafeAreaConsumer } from 'react-native-safe-area-context';

type LaunchState = {
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class LaunchScreen extends React.Component<Props, LaunchState> {

  constructor(LaunchState) {
    super(LaunchState)
    //  this.chechConnection();
    //  this.getDeviceConnectionInfo();
    this.state = {
    };

    this.delay(3000).then(any => {
      //splach screen forced show 3000 = 3 seconds!
      this.bootstrapA();
      this._bootstarp();
    });
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("splash screen complete"));
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
        global.password = currentPassword;
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
    AsyncStorage.getItem('userToken', (err, result) => {

    });
  }

  bootstrapA = async () => {
    console.log('Prepare confiuration');
    let userToken = await AsyncStorage.getItem('EsmUserToken');
    if (userToken == null) userToken = Constants.deviceId;   //   global.userToken=this.generateShortGuid(24);
    global.userToken = userToken;
    let jwt = await AsyncStorage.getItem('EsmSurveyJWT');
    let doneSurveyA = await AsyncStorage.getItem('doneSurveyA'); console.log('SuvetA:' + doneSurveyA); global.doneSurveyA = doneSurveyA;
    if (jwt != null) global.jwToken = jwt;
    //  if(jwt==null)global.doneSurveyA=false;else {global.doneSurveyA=true;global.jwToken=jwt;}
    console.log('SuvetAa:' + global.doneSurveyA);

    //   if(!global.connectivity){alert('You are offline, try it later');return;}
    let isConnected = await checkConnection();
    if (!isConnected) { alert('You are offline, try it later'); return; }
    let url = global.webApiBaseUrl + 'GetConfiguration'; console.log(url);
    fetch(url)
      .then((response) => {
        console.log(url);
        if (response.status >= 400 && response.status < 600) {
          global.configurationReady = false;
          throw new Error("Access denied(1), Try again, if same thing would happen again contact StatCan");
        } else {
          response.json().then((responseJson) => {
            global.surveyAUrlEng = responseJson[0];
            global.surveyAUrlFre = responseJson[1];
            global.surveyThkUrlEng = responseJson[2];
            global.surveyThkUrlFre = responseJson[3];
            global.surveyBUrlEng = responseJson[4];
            global.surveyBUrlFre = responseJson[5];
            global.graphType0 = responseJson[6];
            global.graphType1 = responseJson[7];
            global.graphType2 = responseJson[8];
            global.graphType3 = responseJson[9];
            global.graphType4 = responseJson[10];
            global.graphType5 = responseJson[11];
            global.graphType6 = responseJson[12];
            global.graphType7 = responseJson[13];
            global.configurationReady = true;
          })
        }
      })
      .catch((error) => {
        console.error(error); global.configurationReady = false; alert("Network error");
      });
    console.log('Confiuration is ready');
  };
  generateGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
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
  render() {
    return (
      <PaperProvider theme={newTheme}>
        <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
        <AppBanner />
        <Background>
          <LogoClear />
          <Title>{resources.getString("app.name")}</Title>
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
