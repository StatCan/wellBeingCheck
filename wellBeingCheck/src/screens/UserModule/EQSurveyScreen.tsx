import React, { memo, useState, useCallback } from 'react';
import { Image, View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { AsyncStorage } from 'react-native';
import { Ionicons,EvilIcons,Feather } from '@expo/vector-icons';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import { newTheme } from '../../core/theme';
import { List, Divider } from 'react-native-paper';
import WebView from 'react-native-webview';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class EQSurveyScreen extends React.Component<Props> {

  displaySpinner() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
  state={jsCode:''};

  render() {

    if (global.debugMode) console.log("Debug Mode ON");
    if (global.debugMode) console.log("The Resources Culture is: " + resources.culture);
    const dt=new Date();console.log(dt.toISOString());console.log(global.surveyACode);console.log(global.userToken);
    let uri=global.surveyACode==''?'http://barabasy.eastus.cloudapp.azure.com/anonymous-anonyme/en/login-connexion/load-charger/eqgsab4602447bbc45ad8e85328d21f6c1b4':'http://barabasy.eastus.cloudapp.azure.com/anonymous-anonyme/en/login-connexion/load-charger/eqgs0a8c12086319496aadc23bacf80cba8b';
    if(global.surveyACode==''){
       if(resources.culture=='en')
            uri='http://barabasy.eastus.cloudapp.azure.com/anonymous-anonyme/en/login-connexion/load-charger/eqgsab4602447bbc45ad8e85328d21f6c1b4';
       else
            uri='http://barabasy.eastus.cloudapp.azure.com/anonymous-anonyme/fr/login-connexion/load-charger/eqgsab4602447bbc45ad8e85328d21f6c1b4';

    }
    else{
           if(resources.culture=='en')
                uri='http://barabasy.eastus.cloudapp.azure.com/anonymous-anonyme/en/login-connexion/load-charger/eqgs0a8c12086319496aadc23bacf80cba8b';
           else
                uri='http://barabasy.eastus.cloudapp.azure.com/anonymous-anonyme/fr/login-connexion/load-charger/eqgs0a8c12086319496aadc23bacf80cba8b';
    }

    const uri1='https://webdashboardapp.azurewebsites.net/Home/ConductSurvey?userToken='+global.userToken+'&notificationId='+dt.toISOString()+'&culture='+resources.culture;
    const uri2='http://localhost:56761/Home/ConductSurvey?userToken='+global.userToken+'&notificationId='+dt.toISOString()+'&culture='+resources.culture;
    console.log(uri);
     let jsCode='document.addEventListener("message", function (message) { document.getElementById("langtest").click(); });var btn = document.createElement("button");btn.style.visibility ="hidden";btn.onclick = switchlang;btn.setAttribute("id", "langtest");document.body.appendChild(btn);    function switchlang() { var a = document.querySelector("a.sc-js-langchange");var href = a.href;if (href.indexOf("/q/fr")>0) {var res = href.replace("/q/fr", "/q/en");a.setAttribute("href", res);a.click();} else if (href.indexOf("/q/en")>0) {var res = href.replace("/q/en", "/q/fr");a.setAttribute("href", res);a.click();} }';
    return (

      <View style={{ flex: 1, marginTop: 10 }}>
        <BackButton goBack={() => this.props.navigation.navigate('Dashboard')} />
       <ScrollView style={{marginTop:75}}>
       <View style={{height:30}}>
              
              <View style={{flexDirection:'row',alignSelf:'flex-end'}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('LocalNotification')} style={{alignSelf:'flex-end'}}><EvilIcons name="gear" size={32} color="black" /></TouchableOpacity>
                <TouchableOpacity onPress={() => this.webView.postMessage('test')} style={{alignSelf:'flex-end'}}><EvilIcons name="gear" size={32} color="black" /></TouchableOpacity>
                </View>
          </View>
            <WebView
                      ref={(view) => this.webView = view}
                      style={styles.webview}
                      userAgent={global.userToken}
                   //   source={{ uri: 'https://www68.statcan.gc.ca/ecp-pce/en/load-init/Test_Test/' }}
                      source={{uri:uri}}
                      javaScriptEnabled={true}
                      domStorageEnabled={true}
                      startInLoadingState={false}
                      scalesPageToFit={true}
                      startInLoadingState={true}
                      injectedJavaScript={jsCode}
                      renderLoading={() => {
                        return this.displaySpinner();
                      }}
                      onNavigationStateChange={(navState) => {
                        if (navState.url == "") { // You must validate url to enter or navigate
                          this.webView.stopLoading();
                        }
                        if(navState.url=="http://barabasy.eastus.cloudapp.azure.com/anonymous-anonyme/en/operations/submitconfirmation-confirmationsoumission"){
                            let jsCode=' var button = document.createElement("button");button.innerHTML = "Back"; button.className += "btn"; button.className += " btn-primary";button.onclick = function () {var sac = document.querySelector("div.sc-box-main p span.ecf-bold").innerText;window.postMessage(sac); return false;};document.body.appendChild(button);';
                            this.setState({jsCode:jsCode});
                          //  this.props.navigation.navigate('Home');
                        }
                      }}
                      onMessage={event => {
                    //    if (event.nativeEvent.data == "Hello React Native!")
                          if(global.surveyACode=='none'){
                            console.log(event.nativeEvent.data);
                            AsyncStorage.setItem('EsmSurveyACode', event.nativeEvent.data);
                            global.surveyACode = event.nativeEvent.data;global.doneSurveyA=true;
                           // this.forceUpdate();
                            this.props.navigation.navigate('Home');
                          }
                          else
                            this.props.navigation.navigate('Home');
                      }}

                    />
       </ScrollView>
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
    flex: 1,
    width: deviceWidth,
    height: deviceHeight-110
  },
  logo: { width: 300, height: 40 },
});

export default memo(EQSurveyScreen);
