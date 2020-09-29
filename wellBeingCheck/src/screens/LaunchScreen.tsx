import React, { memo,useEffect } from 'react';
import { StyleSheet, StatusBar, View,Image,YellowBox,Button,Dimensions,Alert} from 'react-native';
import { AsyncStorage } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Background from '../components/Background';
import * as Localization from 'expo-localization';
import { newTheme } from '../core/theme';
import { Provider as PaperProvider, Title } from 'react-native-paper';
//import { checkConnection } from '../utils/fetchJwToken';
import { Notifications } from "expo";
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
import {fetchJwToken,checkConnection,fetchGraphs,fetchGraphTypes,fetchImage} from '../utils/fetchJwToken';
const deviceHeight =Math.floor(Dimensions.get('window').height);
const deviceWidth =Math.floor(Dimensions.get('window').width);
type LaunchState = {
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
YellowBox.ignoreWarnings(['Require cycle:','Setting a timer']);
console.ignoredYellowBox = ['Require cycle:','Setting a timer'];
let pkg = require('../../app.json');
class LaunchScreen extends React.Component<Props, LaunchState> {

  constructor(LaunchState) {
    super(LaunchState)
    //  this.chechConnection();
    //  this.getDeviceConnectionInfo();
    this.state = {title:''};
    this.getCulture();

    this.delay(2000).then(any => {
      //splach screen forced show 3000 = 3 seconds!
       this.bootstrapA();
    });
    this.onNotification=this.onNotification.bind(this);
  }
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("splash screen complete"));
  }
  //determine if user already has an account
  _bootstrap = () => {


    AsyncStorage.getItem('user_account', (err, userAccountResult) => {
      if (global.debugMode) console.log(userAccountResult);
      let userAccountResultObj = JSON.parse(userAccountResult)
      let currentPassword = null
      if (userAccountResultObj) {
        currentPassword = userAccountResultObj.password;
        global.password = currentPassword;
      }
      AsyncStorage.getItem('user_getting_started', (err, userGettingStartedResult) => {
        if (global.debugMode) console.log(userGettingStartedResult);
        let userGettingStartedResultObj = JSON.parse(userGettingStartedResult)
        let gettingStarted = false
        if (userGettingStartedResultObj) {
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
            this.props.navigation.navigate('GettingStartedScreen');
          }
          else if (termsOfService == false) {
            this.props.navigation.navigate('TermsOfServiceScreen');
          }
          else if ((currentPassword == null) || (currentPassword == "")) {
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
          else global.sac=sac;
          global.userToken=userToken;console.log('DeviceId:'+global.userToken);console.log('Sac:'+global.sac);
          let doneSurveyA = await AsyncStorage.getItem('doneSurveyA');global.doneSurveyA=doneSurveyA;
          console.log('SurveyA:'+global.doneSurveyA);
          let hasImage = await AsyncStorage.getItem('hasImage');if(hasImage!=null)global.hasImage=hasImage;
          console.log('Has image on startup.............:'+global.hasImage);

          let pingNum=await AsyncStorage.getItem('PingNum');if(pingNum==null)pingNum=2;global.pingNum=pingNum;
          let awakeHour=await AsyncStorage.getItem('AwakeHour');if(awakeHour==null)awakeHour='8:00';global.awakeHour=awakeHour;
          let sleepHour=await AsyncStorage.getItem('SleepHour');if(sleepHour==null)sleepHour='22:00';global.sleepHour=sleepHour;
          let paradataSaved=await AsyncStorage.getItem('ParadataSaved');
          if(paradataSaved==null || paradataSaved=='false')paradataSaved=false;else paradataSaved=true;
          global.paradataSaved=paradataSaved;

          let passwordSaved=await AsyncStorage.getItem('PasswordSaved');
          if(passwordSaved==null || passwordSaved=='false')paradataSaved=false;else paradataSaved=true;
          global.passwordSaved=paradataSaved;
          console.log('Paradata saved:'+global.paradataSaved+'    Password saved:'+global.passwordSaved);
          let curDayPassed=await AsyncStorage.getItem('CurDayPassed');if(curDayPassed==null)curDayPassed=[];else curDayPassed=JSON.parse(curDayPassed);global.curDayPassed=curDayPassed;
          let schedules=await AsyncStorage.getItem('Schedules');if(schedules==null)schedules=[];else schedules=JSON.parse(schedules);global.schedules=schedules;
          let lastDate=await AsyncStorage.getItem('LastDate'); if(lastDate!=null)global.lastDate=new Date(lastDate);console.log('LastDate:'+global.lastDate);
          let warningNotificationId=await AsyncStorage.getItem('WarningNotificationId');if(warningNotificationId!=null)global.warningNotificationId=parseInt(warningNotificationId);
          console.log('schedule:'+global.pingNum+' '+global.awakeHour+' '+global.sleepHour+' '+global.lastDate+' wid:'+global.warningNotificationId+' s_length:'+global.schedules.length+'Schedules:');
          let list=global.schedules;
          for(let i=0;i<list.length;i++){
             console.log(new Date(list[i].Datetime)+" ->"+new Date(list[i].Day));
          }

          let notificationState=await AsyncStorage.getItem('NotificationState');
          if(notificationState==null ||notificationState=='true')notificationState=true;else notificationState=false;
          global.notificationState=notificationState;
          let surveyCount=await AsyncStorage.getItem('SurveyCount');
          if(surveyCount==null)surveyCount=0;else surveyCount=parseInt(surveyCount);global.surveyCount=surveyCount;
          let received=await AsyncStorage.getItem('Received');if(received!=null)global.received=received;
          global.currentVersion=pkg.expo.version;
          console.log('Current version:'+pkg.expo.version+' Culture:'+resources.culture+'  NotificationState:'+global.notificationState+' SurveyCount:'+global.surveyCount);

      let sendouts=await AsyncStorage.getItem('Sendouts');
      if(sendouts!=null)global.sendouts=sendouts;

          this._bootstrap();
        };
  onNotification(n) {
     //  console.log('received notification:'+JSON.stringify(n));
        let json = n.data; console.log(n.notificationId+':'+new Date(json.scheduledTime));
       //this.props.navigation.navigate('Dashboard');
       global.received+=global.received=n.notificationId+':'+new Date(json.scheduledTime)+'\r\n';
       AsyncStorage.setItem('Received',global.received);
       }

  async getCulture(){
     let culture=await AsyncStorage.getItem('Culture');console.log('saved culture:'+culture);
     if(culture==null){
         if(Localization.locale.substring(0,2) == 'fr')resources.culture = 'fr';else resources.culture = 'en';
     }
     else {
         if(culture=='2')resources.culture = 'fr';else resources.culture = 'en';
          }
     this.setState({title:resources.getString("Well-Being Check")});
   }
  componentDidMount() {Notifications.addListener(this.onNotification);this.checkUpgrade();}
  async checkUpgrade(){
      console.log('Check upgrade');
      let currentVersion=await AsyncStorage.getItem('CurrentVersion');console.log('currentVersion:'+currentVersion);
      if(currentVersion==null){
           console.log('Notification cancelled');
           Notifications.cancelAllScheduledNotificationsAsync(); global.sendouts='(Re)Install,Cancelled';AsyncStorage.setItem('Sendouts', sendouts);
           AsyncStorage.setItem('CurrentVersion', pkg.expo.version);
      }
      else {
          if(global.hasImage==1){
                if(currentVersion!=pkg.expo.version){
                    let isConnected=await checkConnection();
                    if(!isConnected){Alert.alert('',resources.getString('offline'));return;}
                    let jwt=await fetchJwToken();console.log(jwt);
                    if(jwt==''){Alert.alert('',resources.getString("securityIssue"));return;}
                    global.jwToken=jwt;global.busy=0;
                    let types=await fetchGraphTypes();console.log(types);
                    if(types!=null && types.length>0){
                          await fetchGraphs(types,deviceWidth,deviceHeight);
                    }
                    AsyncStorage.setItem('CurrentVersion', pkg.expo.version);
                }
            }
          else {
             if(currentVersion!=pkg.expo.version) AsyncStorage.setItem('CurrentVersion', pkg.expo.version);
          }
      }


  }
  render() {
    return (
      <PaperProvider theme={newTheme}>
        <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
        <AppBanner />
        <Background>
          <LogoClear />
          <Title>{this.state.title}</Title>
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



//async checkUpgrade(){
//      console.log('Check upgrade');
//      let currentVersion=await AsyncStorage.getItem('CurrentVersion');console.log('currentVersion:'+currentVersion);
//      if(currentVersion==null){
//           console.log('Notification cancelled');
//           Notifications.cancelAllScheduledNotificationsAsync(); global.sendouts='(Re)Install,Cancelled';AsyncStorage.setItem('Sendouts', sendouts);
//           AsyncStorage.setItem('CurrentVersion', pkg.expo.version);
//      }
//
//      if(global.hasImage==1){
//          if(currentVersion==null ||(currentVersion!=null && currentVersion!=pkg.expo.version)){
//              let isConnected=await checkConnection();
//              if(!isConnected){Alert.alert('',resources.getString('offline'));return;}
//              let jwt=await fetchJwToken();console.log(jwt);
//              if(jwt==''){Alert.alert('',resources.getString("securityIssue"));return;}
//              global.jwToken=jwt;global.busy=0;
//              let types=await fetchGraphTypes();console.log(types);
//              if(types!=null && types.length>0){
//                    await fetchGraphs(types,deviceWidth,deviceHeight);
//              }
//              AsyncStorage.setItem('CurrentVersion', pkg.expo.version);
//          }
//      }
//
//  }