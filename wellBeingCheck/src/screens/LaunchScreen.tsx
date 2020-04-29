import React, { memo } from 'react';
import { StyleSheet, StatusBar, View,Image,YellowBox} from 'react-native';
import { AsyncStorage } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Background from '../components/Background';
import * as Localization from 'expo-localization';
import { newTheme } from '../core/theme';
import { Provider as PaperProvider, Title } from 'react-native-paper';
import { checkConnection } from '../utils/fetchJwToken';
import Constants from 'expo-constants';
import { resources } from '../../GlobalResources';
import LogoClear from '../components/LogoClear';
import AppBanner from '../components/AppBanner';
import {generateNewDeviceId,isValidDeviceId} from '../api/device-id.service';
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
YellowBox.ignoreWarnings(['Require cycle:'])
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
    if (global.debugMode) console.log("_bootstrap");
    if (global.debugMode) console.log("LaunchScreen._bootstrap Thank you page lunch page: "+ global.showThankYou);

    // Set language based on locale
    if (global.debugMode)  console.log("Locale is: " + Localization.locale);
    if (global.debugMode) console.log("resources culture: " + resources.culture);

<<<<<<< Updated upstream
    // if (Localization.locale === "en-CA"){
    //   resources.culture = 'en';
    // } else if (Localization.locale === "fr-CA"){
    //   resources.culture = 'fr';
    // }

    AsyncStorage.getItem('settings', (err, settingsObject) => {
      if (global.debugMode)  console.log(settingsObject);
      let LocalSettingsObject = JSON.parse(settingsObject)
      let appLanguage= LocalSettingsObject.culture;
      if (global.debugMode)  console.log("language from the storage "+ appLanguage)
      if (appLanguage==="2") {
        resources.culture = 'fr';
       
     } else {
      resources.culture = 'en';
     }
    })

   if (Localization.locale.substring(0,2) === "en" && (resources.culture==='en'|| resources.culture==='') ){
      resources.culture = 'en';
      if (global.debugMode)   console.log("Locale is 1: en-ca:res=en " + Localization.locale +"ressource"+resources.culture);
    } else if   (Localization.locale.substring(0,2) === "en" && (resources.culture==='fr'||resources.culture==='')) {
      resources.culture = 'fr';
      if (global.debugMode)   console.log("Locale is 2: en-ca:res=fr " + Localization.locale +"ressource"+resources.culture);
    } else if (Localization.locale === "fr-CA" && (resources.culture==='en'||resources.culture==='')) {
      resources.culture = 'en';
      if (global.debugMode)    console.log("Locale is 3: fr-ca:res=en " + Localization.locale +"ressource"+resources.culture);
    } else if (Localization.locale === "fr-CA" && (resources.culture==='fr'||resources.culture==='')) {
      resources.culture = 'fr';
      if (global.debugMode)   console.log("Locale is 4: fr-ca:res=fr " + Localization.locale +"ressource"+resources.culture);
=======
    AsyncStorage.getItem('settings',(err,settingobject)=>{
    console.log("launchScreen._bootstrap settings object values"+ settingobject)
    let localSettingObject = JSON.parse(settingobject)
    let language=localSettingObject.culture;
    console.log("launchScreen._bootstrap language"+ language);
    if (language===1) {
      resources.culture="en";
    } else {
      resources.culture="fr";
    }
    
    });

    console.log("Test Locale is  " + Localization.locale + " ressource .culture "+resources.culture);
    
   if (Localization.locale.substring(0,2) === "en" && (resources.culture==="en") ){
      resources.culture = "en";
      console.log("Locale is 1: en-ca:res=en " + Localization.locale +"ressource"+resources.culture);

    } else if  (Localization.locale.substring(0,2) === "en" && (resources.culture==="fr")) {
      resources.culture = "fr";
      console.log("Locale is 2: en-ca:res=fr " + Localization.locale +"ressource"+resources.culture);

    } else if (Localization.locale.substring(0,2) === "fr"  && (resources.culture==="en")) {
      resources.culture = "en";
      console.log("Locale is 3: fr-ca:res=en " + Localization.locale +"ressource"+resources.culture);
    } else if (Localization.locale.substring(0,2) === "fr" && (resources.culture==="fr")) {

      resources.culture = "fr";
      console.log("Locale is 4: fr-ca:res=fr " + Localization.locale +"ressource"+resources.culture);
>>>>>>> Stashed changes
    }

    AsyncStorage.getItem('user_account', (err, userAccountResult) => {
      if (global.debugMode) console.log(userAccountResult);
      let userAccountResultObj = JSON.parse(userAccountResult)
      let currentPassword = null
      if (userAccountResultObj) {
        currentPassword = userAccountResultObj.password;
        global.password = currentPassword;
      }
      if (global.debugMode) console.log('password.....................:'+global.password);
      AsyncStorage.getItem('user_getting_started', (err, userGettingStartedResult) => {
        if (global.debugMode) console.log(userGettingStartedResult);
        let userGettingStartedResultObj = JSON.parse(userGettingStartedResult)
        let gettingStarted = false
        if (userGettingStartedResultObj) {
          console.log(userGettingStartedResultObj)
          gettingStarted = userGettingStartedResultObj.gettingStarted
        }

        AsyncStorage.getItem('user_terms_and_conditions', (err, userTermsResult) => {
          if (global.debugMode) console.log(userTermsResult);
          let userTermsResultObj = JSON.parse(userTermsResult)
          let termsOfService = false
          if (userTermsResultObj) {
            termsOfService = userTermsResultObj.termsOfService
          }
          //here we have all results
          if (gettingStarted == false) {
            if (global.debugMode)  console.log("!gettingStarted");
            this.props.navigation.navigate('GettingStartedScreen');
          }
          else if (termsOfService == false) {
            if (global.debugMode)   console.log("!termsOfService");
            this.props.navigation.navigate('TermsOfServiceScreen');
          }
          else if ((currentPassword == null) || (currentPassword == "")) {
            if (global.debugMode)  console.log("!currentPassword");
            this.props.navigation.navigate('RegisterScreen');
          }
          else {
            //user has seen getting started, and accepted terms and has a new account
            this.props.navigation.navigate('LoginScreen');
          }
        });
      });
    });
}

  bootstrapA = async () => {
    if (global.debugMode) console.log('Prepare configuration');
          let userToken = await AsyncStorage.getItem('EsmUserToken');
          let sac = await AsyncStorage.getItem('SacCode');
          
          if (userToken == null ||userToken==''){
              var deviceId=generateNewDeviceId();
              var valid=isValidDeviceId(deviceId);
              if (global.debugMode) console.log('is valid:'+valid);
              userToken= deviceId;
              AsyncStorage.setItem('EsmUserToken',userToken);
          }
          else global.sac = sac;
          global.userToken=userToken;
          if (global.debugMode) console.log('DeviceId:'+global.userToken);
          if (global.debugMode) console.log('Sac:'+global.sac);
=======
          else global.sac=sac;
          global.userToken=userToken;console.log('DeviceId:'+ global.userToken);console.log('Sac:'+global.sac);
>>>>>>> Stashed changes
          let doneSurveyA = await AsyncStorage.getItem('doneSurveyA');
          global.doneSurveyA = doneSurveyA;
          if (global.debugMode) console.log('SurveyA:'+ global.doneSurveyA);
          let hasImage = await AsyncStorage.getItem('hasImage');if(hasImage!=null) global.hasImage=hasImage;
          if (global.debugMode) console.log('Launch.BootStrapA Has image on startup.............:'+ global.hasImage);
          this._bootstrap();
        };
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
            <Image source={require('../assets/img_canadamdpi.png')} 
                   style={{ width: 128, height: 40, resizeMode:'stretch'}} />
          </View>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
});

export default memo(LaunchScreen);
