import React, { memo } from 'react';
import { StyleSheet, StatusBar, View,Image } from 'react-native';
import { AsyncStorage } from 'react-native';
import Background from '../components/Background';
import * as Localization from 'expo-localization';
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

    this.delay(2000).then(any => {
      //splach screen forced show 3000 = 3 seconds!
      this.bootstrapA();
    });
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("splash screen complete"));
  }

  //determine if user already has an account
  _bootstrap = () => {
    console.log("_bootstrap");

    // Set language based on locale
    console.log("Locale is: " + Localization.locale);

    if (Localization.locale === "en-CA"){
      resources.culture = 'en';
    } else if (Localization.locale === "fr-CA"){
      resources.culture = 'fr';
    }

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
          console.log('Prepare confiuration')
          let userToken = await AsyncStorage.getItem('EsmUserToken');
          if (userToken == null ||userToken==''){userToken=this.generateShortGuid(20);AsyncStorage.setItem('EsmUserToken',userToken);}      //userToken= Constants.deviceId;   //   global.userToken=this.generateShortGuid(24);
          global.userToken=userToken;
          let doneSurveyA = await AsyncStorage.getItem('doneSurveyA');global.doneSurveyA=doneSurveyA;
          console.log('SurveyA:'+global.doneSurveyA);
          let hasImage = await AsyncStorage.getItem('hasImage');if(hasImage!=null)global.hasImage=hasImage;
          this._bootstrap();
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
          <Title>{resources.getString("Well-Being Check")}</Title>
        </Background>
        <NavigationEvents
          // onDidFocus={() => this.bootstrapA()}
        />
         <View style={{backgroundColor:'#f7f8f9',width:'100%',height:48,borderColor:'red',bordertWidth:1,alignItems:'flex-end'}}>
                   <Image source={require('../assets/img_canadamdpi.png')} style={{ width: 128, height: 40,resizeMode:'stretch'}} />
          </View>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
});

export default memo(LaunchScreen);
