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
  timer = null

  constructor(Props) {
    super(Props)
    let disCode = 'const meta = document.createElement("meta"); meta.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"); meta.setAttribute("name", "viewport"); document.getElementsByTagName("head")[0].appendChild(meta);';
    let clearCookie = 'document.cookie.split(";").forEach(function(c) {document.cookie = c.trim().split("=")[0] + "=;" + "expires=Thu, 01 Jan 1970 00:00:00 UTC;";});';
    jsCode = clearCookie + 'document.addEventListener("message", function (message) { document.getElementById("langtest").click(); });var btn = document.createElement("button");btn.style.visibility ="hidden";btn.onclick = switchlang;btn.setAttribute("id", "langtest");document.body.appendChild(btn);    function switchlang() { var a = document.querySelector("a.sc-js-langchange");var href = a.href;if (href.indexOf("/q/fr")>0) {var res = href.replace("/q/fr", "/q/en");a.setAttribute("href", res);a.click();} else if (href.indexOf("/q/en")>0) {var res = href.replace("/q/en", "/q/fr");a.setAttribute("href", res);a.click();} }';
    this.state = ({ Sacode: '', jsCode: disCode + jsCode, webviewLoaded: false });
    setTimeout(() => { this.setState({ webviewLoaded: true }) }, 4000);
  }

  displaySpinner() {
    return (
      <View>
        <ActivityIndicator size="large" style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 20 }}  />
      </View>
    );
  }
  onLoadEnd() {
  }
  render() {
    let uri = 'http://barabasy.eastus.cloudapp.azure.com/anonymous-anonyme/en/login-connexion/load-charger/eqgsd0ed709a7df0465da7cb4881b290ff22';
    return (
        <WebView
          ref={(view) => this.webView = view} incognito={true} useWebKit={true}
          style={[styles.webview]}
          containerStyle={{ flex: 1}}
          scrollEnabled={true}
          source={{ uri: uri }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={true}
          startInLoadingState={true}

          automaticallyAdjustsScrollViewInsets={false}
          renderLoading={() => { return this.displaySpinner(); }}
        />
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
    marginTop: 20,
    width: deviceWidth,
    height:deviceHeight-40     //height: deviceHeight + 2000
  },
  logo: { width: 300, height: 40 },
});