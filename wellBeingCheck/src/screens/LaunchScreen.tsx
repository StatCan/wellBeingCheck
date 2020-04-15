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
      console.log('password.....................:'+global.password);
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

  }

  bootstrapA = async () => {
          console.log('Prepare confiuration');
          let userToken = await AsyncStorage.getItem('EsmUserToken');
          let sac = await AsyncStorage.getItem('SacCode');
          if (userToken == null ||userToken==''){
              var deviceId=generateNewDeviceId();
              var valid=isValidDeviceId(deviceId);console.log('is valid:'+valid);
              userToken= deviceId;
              AsyncStorage.setItem('EsmUserToken',userToken);
          }
          else global.sac=sac;
          global.userToken=userToken;console.log('DeviceId:'+global.userToken);console.log('Sac:'+global.sac);
          let doneSurveyA = await AsyncStorage.getItem('doneSurveyA');global.doneSurveyA=doneSurveyA;
          console.log('SurveyA:'+global.doneSurveyA);
          let hasImage = await AsyncStorage.getItem('hasImage');if(hasImage!=null)global.hasImage=hasImage;
          let paraDataSaved = await AsyncStorage.getItem('paraDataSaved');global.paraDataSaved=paraDataSaved;
          console.log('Para Data saved:'+global.paraDataSaved);
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
                   <Image source={require('../assets/img_canadamdpi.png')} style={{ width: 128, height: 40,resizeMode:'stretch'}} />
          </View>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
});

export default memo(LaunchScreen);
