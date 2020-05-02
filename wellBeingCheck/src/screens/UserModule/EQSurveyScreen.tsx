import React, { memo, useState, useCallback } from 'react';
import { Image, View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator,Button,YellowBox, Platform,Alert } from 'react-native';
import { AsyncStorage,PanResponder } from 'react-native';

import WebView from 'react-native-webview';
import { resources } from '../../../GlobalResources';
import {fetchJwToken,checkConnection,hashString,parseJwt,saveParaData} from '../../utils/fetchJwToken';
const deviceHeight =Math.floor(Dimensions.get('window').height);
const deviceWidth =Math.floor(Dimensions.get('window').width);
//import {BackEndService} from '../../api/back-end.service';
import { setupSchedules} from '../../utils/schedule';
import { Updates } from 'expo';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
type ScreenState = {
  Sacode: string, jsCode: string
}
YellowBox.ignoreWarnings(['Require cycle:']);
let count = 0;//temporarily limit to get image just once, because eq will show exception page twice.
const WEB_API_BASE_URL = global.webApiBaseUrl + 'api';
let jsCode = '';
export default class EQSurveyScreen extends React.Component<Props, ScreenState> {
  _panResponder: any;
  timer = 0
  constructor(Props) {
    super(Props)
    let disCode = 'const meta = document.createElement("meta"); meta.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"); meta.setAttribute("name", "viewport"); document.getElementsByTagName("head")[0].appendChild(meta);';
    let clearCookie = 'document.cookie.split(";").forEach(function(c) {document.cookie = c.trim().split("=")[0] + "=;" + "expires=Thu, 01 Jan 1970 00:00:00 UTC;";});';
    jsCode = clearCookie + 'document.addEventListener("message", function (message) { document.getElementById("langtest").click(); });var btn = document.createElement("button");btn.style.visibility ="hidden";btn.onclick = switchlang;btn.setAttribute("id", "langtest");document.body.appendChild(btn);    function switchlang() { var a = document.querySelector("a.sc-js-langchange");var href = a.href;if (href.indexOf("/q/fr")>0) {var res = href.replace("/q/fr", "/q/en");a.setAttribute("href", res);a.click();} else if (href.indexOf("/q/en")>0) {var res = href.replace("/q/en", "/q/fr");a.setAttribute("href", res);a.click();} }';
    this.state = ({ Sacode: '', jsCode: disCode + jsCode, webviewLoaded: false });
    setTimeout(() => { this.setState({ webviewLoaded: true }) }, 4000);

    /* --------------------Session Handler--------------------------- */
    //used to handle session
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: () => {
        this._initSessionTimer()
        return true
      },
      onMoveShouldSetPanResponder: () => {
        this._initSessionTimer()
        return true
      },
      onStartShouldSetPanResponderCapture: () => {
        this._initSessionTimer()
        return false
      },
      onMoveShouldSetPanResponderCapture: () => {
        this._initSessionTimer()
        return true
      },
      onPanResponderTerminationRequest: () => {
        this._initSessionTimer()
        return true
      },
      onShouldBlockNativeResponder: () => {
        this._initSessionTimer()
        return true
      },
    });
  }
  componentDidMount() {
    //Session Handler
    this._initSessionTimer()
  }
  /* --------------------Session Handler--------------------------- */
  _resetTimer() {
    //Session Handler
    clearTimeout(this.timer)
    this.timer = setTimeout(() =>
      Alert.alert(
        resources.getString("session.modal.title"),
        resources.getString("session.modal.message"),
        [
          { text: resources.getString("session.modal.sign_in"), onPress: () => this._handleSessionTimeOutRedirect() },
        ],
        { cancelable: false }
      )
      ,
      global.sessionTimeOutDuration)
  }
  _handleSessionTimeOutRedirect = () => {
    Updates.reload();
  }
  _initSessionTimer() {
    clearTimeout(this.timer)
    this.timer = setTimeout(() =>
      this._expireSession()
      ,
      global.sessionTimeOutDuration)
  }
  _expireSession() {
    Alert.alert(
      resources.getString("session.modal.title"),
      resources.getString("session.modal.message"),
      [
        { text: resources.getString("session.modal.sign_in"), onPress: () => this._handleSessionTimeOutRedirect() },
      ],
      { cancelable: false }
    )
  }
  componentWillUnmount() {
    //Session Handler
    clearTimeout(this.timer)
  }
  async handleSurveyAdone(){
     let isConnected=await checkConnection();
     if(!isConnected){Alert.alert('',resources.getString('offline'));return;}
     let jwt=await fetchJwToken();  console.log('Token:'+jwt);
     if(jwt==''){Alert.alert('',resources.getString("securityIssue"));return;}
     global.jwToken=jwt;
     let result=false;
     result=await this.setPassword(jwt);
      //  result=await this.setPasswordNew();
     if(!result){Alert.alert('',resources.getString("securityIssue"));return;}
     console.log('survey A done'); global.doneSurveyA=true;AsyncStorage.setItem('doneSurveyA','true');
     count=1;
     AsyncStorage.setItem('hasImage','0');global.hasImage=0;console.log('hasImage after survey A done.........'+global.hasImage);
     global.fetchAction=false;
     setupSchedules();
     await this.saveDefaultParadata(jwt);
 }
  async handleSurveyBdone(){
     let isConnected=await checkConnection();console.log('In handle B');
     if(!isConnected){Alert.alert('',resources.getString('offline'));return;}
     let jwt=await fetchJwToken();
     if(jwt==''){Alert.alert('',resources.getString("securityIssue"));return;}
     global.jwToken=jwt;
     let types=await this.fetchGraphTypes();
     //  let types=await this.fetchGraphTypesNew();
     //  let types=['overall','activity','people','location'];
     console.log('types:'+types);
     if(types!=null && types.length>0){
          await this.fetchGraphs(types);
     }
     count=1;AsyncStorage.setItem('hasImage','1');global.hasImage=1;
     // Save Survey B Done State
     AsyncStorage.setItem('doneSurveyB','true');
     global.fetchAction=false;
     setupSchedules(false);
     console.log('Paradata saved:'+global.paradataSaved);
     if(!global.paradataSaved)await this.saveDefaultParadata(jwt);
     this.props.navigation.navigate('Dashboard');
  }
  async fetchGraphs(types: string[]) {
    let hh = deviceHeight - 220; let hh1 = deviceHeight - 300; let ww = deviceWidth - 80;
    let index = 0;
    for (var i = 0; i < types.length; i++) {
      let url = global.webApiBaseUrl + 'api/dashboard/graph/' + types[i];
      //  if(types[i].type=='overall')url+='?width='+deviceWidth+'&height='+hh;
      //  else url+='?width='+deviceWidth+'&height='+hh;
      url += '?width=' + deviceWidth + '&height=' + hh;
      this.fetchImage(url, index, 'en'); index++;
      this.fetchImage(url, index, 'fr'); index++;
    }
    AsyncStorage.setItem('hasImage', '1'); console.log('Fetch images done');
  }
  setPassword(jwt:string) {
               let url=global.webApiBaseUrl+'api/security/password';
               let data={salt:global.passwordSalt,passwordHash:hashString(global.password,global.passwordSalt),securityQuestionId:global.securityQuestionId,securityAnswerSalt:global.securityAnswerSalt,securityAnswerHash:hashString(global.securityAnswer,global.securityAnswerSalt)}
               return fetch(url,{
                     method: 'POST',
                       headers: {
                         'Content-Type': 'application/json',
                         'Authorization': 'Bearer ' + jwt,
                       },
                       body: JSON.stringify(data),
               })
               .then((response) =>{ if(response.status==200){return true;}  else {console.log('Bad:'+response.status);return false;}} )          // response.json())
              // .then((responseJson) => {console.log('setPassword:'+responseJson);return responseJson;})
               .catch((error) => {console.error(error);return false;});
          }
  resetPassword(newPass) {
     let url=global.webApiBaseUrl+'api/security/password';console.log(url);
     let data={
         deviceId:global.userToken,
         sac:global.sac,
         newSalt:global.passwordSalt,
         newPasswordHash:hashString(newPass,global.passwordSalt),
         securityAnswerHash:hashString(global.securityAnswer,global.securityAnswerSalt),
         newSecurityQuestionId:global.securityQuestionId,
         newSecurityAnswerSalt:global.securityAnswerSalt,
         newSecurityAnswerHash:hashString(global.securityAnswer,global.securityAnswerSalt)
     }
     return fetch(url,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(data),
     })
     .then((response) =>{
         if(response.status==200){console.log('good');global.password=newPass; return true;}
         else {console.log('Bad:'+response.status);return false;}
     } )    // .then((response) => response.json())
           //  .then((responseJson) => {console.log('resetPassword:'+responseJson);    return responseJson;})
     .catch((error) => {console.error(error);console.log('Bad');return false;});
  }
  async fetchGraphTypes() {
    let types = [];
    let url = global.webApiBaseUrl + 'api/dashboard/graphs';
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + global.jwToken,
      }
    })
      .then((response) => response.json())
      .then((result) => {
        if (result != null && result.length > 0) {
          result.forEach(function (graphLink) {
            types.push(graphLink.type);
          });
        }
        return types;
      })
      .catch(
        error => {
          console.warn(error);
          return types;
        }
      );
  }

  async fetchImage(url: string, index: number, culture: string) {
    let isConnected = await checkConnection();
    if (!isConnected) {
      Alert.alert(resources.getString("internet.offline"));
      return;
    }
    let token = global.jwToken;
    fetch(url, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token, 'Accept-language': culture },
    })
      .then(response => {
        console.log(response.status);
        if (response.status == 200) {
          response.blob()
            .then(blob => {
              var reader = new FileReader();
              reader.onload = function () {
                console.log('image' + index);
                AsyncStorage.setItem('image' + index, this.result);
              };
              reader.readAsDataURL(blob);
            })
        }
        else {
          let tt = Alert.alert(resources.getString("internet.offline"));
          throw new Error("Access denied, Try again later, if same thing would happen again contact StatCan");
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  async saveDefaultParadata(jwt) {
    let list =global.schedules; var snt = [];
        if(list.length>0){
            list.forEach(function(s){
               snt.push(s.Datetime);
            });
        }
        let paraData = {
          "PlatFormVersion": Platform.Version,
          "DeviceName": Expo.Constants.deviceName,
          "NativeAppVersion": Expo.Constants.nativeAppVersion,
          "NativeBuildVersion": Expo.Constants.nativeBuildVersion,
          "DeviceYearClass": Expo.Constants.deviceYearClass,
          "SessionID": Expo.Constants.sessionId,
          "WakeTime": global.awakeHour,
          "SleepTime": global.sleepHour,
          "NotificationCount": global.pingNum,
         // "NotificationEnable": true,
          "ScheduledNotificationTimes": snt
        };
    console.log(paraData);
    var result = await saveParaData(jwt, paraData);
  }
  displaySpinner() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
  onLoadEnd() {
  }
  render() {
    let uri = '';//http://barabasy.eastus.cloudapp.azure.com/anonymous-anonyme/en/login-connexion/load-charger/eqgsd0ed709a7df0465da7cb4881b290ff22';
    if (global.doneSurveyA) {
      if (resources.culture == 'en')
        uri = global.surveyBUrlEng;
      else
        uri = global.surveyBUrlFre;
    }
    else {
      if (resources.culture == 'en')
        uri = global.surveyAUrlEng;
      else
        uri = global.surveyAUrlFre;
    }
    console.log('Beofore eq:' + uri);
    let userAgent = Platform.OS == 'ios' ? 'Apple DeviceId/' + global.userToken : 'Android DeviceId/' + global.userToken; console.log('EQ userAgent' + userAgent);
    return (
      <View
        style={{ flex: 1, marginTop: 40 }}
        {...this._panResponder.panHandlers}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')} 
                            style={{ marginLeft: 5, marginTop: 10,marginBottom:5 }}>
                <Image source={require('../../assets/ic_logo_loginmdpi.png')} 
                       style={{ width: 38, height: 38 }} />
          </TouchableOpacity>
        </View>
        {(this.state.webviewLoaded) ? null : <ActivityIndicator size="large" color="lightblue" style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 20 }} />}
        <WebView
          ref={(view) => this.webView = view} incognito={true} useWebKit={true}
          style={styles.webview}
          applicationNameForUserAgent={userAgent}
          scrollEnabled={true}
          source={{ uri: uri }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={false}
          scalesPageToFit={true}
          startInLoadingState={true}
          injectedJavaScript={this.state.jsCode}
          automaticallyAdjustsScrollViewInsets={false}
          renderLoading={() => { return this.displaySpinner(); }}
          onLoadEnd={this.onLoadEnd()}
          onNavigationStateChange={(navState) => {
            console.log('nav changed:' + navState.url);
            if (navState.url == global.surveyThkUrlEng || navState.url == global.surveyThkUrlFre) {
              console.log('THank you count:' + count);
              if (global.fetchAction) {
                global.fetchAction = false;
                let jsCode1 = 'var sac ="1234566789";sac= document.querySelector("div.sc-box-main p span.ecf-bold").innerText;window.ReactNativeWebView.postMessage(sac);';
                console.log('Survey done.......................................................');
                if (global.doneSurveyA) {
                  console.log('EQSurveyScreenTHank you B........................' + global.fetchAction);
                  this.handleSurveyBdone();
                  global.showThankYou = 2;
                  this.props.navigation.navigate('Dashboard');
                  count = 1;
                }
                else {
                  console.log('Thank you AAAA.....' + global.fetchAction);
                  if (Platform.OS == 'ios') { this.setState({ jsCode: jsCode1 }); }
                  else { this.webView.injectJavaScript(jsCode1); }
                }
              }
              else this.props.navigation.navigate('Dashboard');
            }
          }}
          onMessage={event => {
            var ss = event.nativeEvent.data;
            global.sac = ss.substring(4);
            console.log('sa-code=======' + global.sac);
            AsyncStorage.setItem('SacCode', global.sac);
            console.log('done A:' + global.doneSurveyA);
            if (global.doneSurveyA) {
              console.log('redady to fetch image');
              this.setState({ jsCode: jsCode });
              count = 1; global.showThankYou = 2;
            }
            else {
              console.log('survey A done'); global.doneSurveyA = true; AsyncStorage.setItem('doneSurveyA', 'true');
              this.handleSurveyAdone();
              count = 1; global.showThankYou = 1;
            }
            this.props.navigation.navigate('Dashboard');
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    marginTop: 100
  },
  webview: {
    //  flex: 1,
    marginTop: 0,
    width: deviceWidth,
    height: deviceHeight + 2000
  },
  logo: { width: 300, height: 40 },
});