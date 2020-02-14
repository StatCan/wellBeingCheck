import React, { memo, useState, useCallback } from 'react';
import { Image, View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator,Button } from 'react-native';
import { AsyncStorage } from 'react-native';
import { Ionicons,EvilIcons,Feather } from '@expo/vector-icons';
import WebView from 'react-native-webview';
import { resources } from '../../../GlobalResources';
import {fetchJwToken} from '../../utils/fetchJwToken';
const deviceHeight =Math.floor(Dimensions.get('window').height);
const deviceWidth =Math.floor(Dimensions.get('window').width);

import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
type ScreenState={
    Sacode:string,jsCode:string
}
let count=0;//temporarily limit to get image just once, because eq will show exception page twice.
export default class EQSurveyScreen extends React.Component<Props, ScreenState> {
  constructor(Props) {
    super(Props)
    let clearCookie='document.cookie.split(";").forEach(function(c) {document.cookie = c.trim().split("=")[0] + "=;" + "expires=Thu, 01 Jan 1970 00:00:00 UTC;";});';
    let jsCode=clearCookie+'document.addEventListener("message", function (message) { document.getElementById("langtest").click(); });var btn = document.createElement("button");btn.style.visibility ="hidden";btn.onclick = switchlang;btn.setAttribute("id", "langtest");document.body.appendChild(btn);    function switchlang() { var a = document.querySelector("a.sc-js-langchange");var href = a.href;if (href.indexOf("/q/fr")>0) {var res = href.replace("/q/fr", "/q/en");a.setAttribute("href", res);a.click();} else if (href.indexOf("/q/en")>0) {var res = href.replace("/q/en", "/q/fr");a.setAttribute("href", res);a.click();} }';
    this.state=({Sacode:'',jsCode:jsCode});
  }
  // componentDidMount(){this.fetchImages();}
   fetchSacCode() {
             let url='http://barabasy.eastus.cloudapp.azure.com/WebApiForEsm/GetSacCode/'+global.userToken;
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        global.surveyACode=responseJson;
        AsyncStorage.setItem('EsmSurveyACode',responseJson);
        console.log('Sac:'+global.surveyACode);
      })
      .catch((error) => {
        console.error(error);
      });
           }
   fetchImages(){
          console.log(count); if(count>0)return;
          console.log('Fetch images....');
          let timeStamp='';
          let d=new Date();
          timeStamp=d.getFullYear().toString()+d.getMonth()+d.getDay()+d.getHours()+d.getMinutes()+d.getSeconds();
          let uri0=global.webApiBaseUrl+'WarnFW/en/'+deviceWidth;
          let uri1=global.webApiBaseUrl+'MacaroniFW/aaa/'+timeStamp+'/en/'+deviceWidth;
          let uri2=global.webApiBaseUrl+'ScalableBarFW/aaa/'+timeStamp+'/en/'+deviceWidth;
          let uri3=global.webApiBaseUrl+'ScalableLineFW/aaa/'+timeStamp+'/en/'+deviceWidth;
          let uri4=global.webApiBaseUrl+'ScalableLine/aaa/'+timeStamp+'/en/';
          let uri5=global.webApiBaseUrl+'ScalableCBarFW/aaa/'+timeStamp+'/en/'+deviceWidth;
          let uri6=global.webApiBaseUrl+'BulletinFW/aaa/'+timeStamp+'/en/'+deviceWidth;
          let uri7=global.webApiBaseUrl+'TableFW/aaa/'+timeStamp+'/en/'+deviceWidth;
          this.fetchImage(uri0,0);
          this.fetchImage(uri1,1);
          this.fetchImage(uri2,2);
          this.fetchImage(uri3,3);
          this.fetchImage(uri4,4);
          this.fetchImage(uri5,5);
          this.fetchImage(uri6,6);
          this.fetchImage(uri7,7);
          AsyncStorage.setItem('hasImage','1');console.log('Fetch images Down');
          //count=1;
    }
   fetchImage111(url:string,index:number) {
          let token=fetchJwToken();
          fetch(url, {
                    method: 'GET',
                    headers: {
                      'Authorization': 'Bearer ' + token
                    }
                  })
          .then( response =>{
           //       if(response.status==440){utility.General(,,,fetchImage(url,index));}   //TODO:
           //       else                                   let
                  if (response.status >= 400 && response.status < 600) {   //TODO:
                       global.jwToken='';
                       throw new Error("Access denied(G"+index+"), Try again, if same thing would happen again contact StatCan");
                  }else{   //200
                       response.blob()
                       .then(blob =>{
                             var reader = new FileReader() ;
                             reader.onload = function(){
                             // console.log(this.result);// <--- `this.result` contains a base64 data URI
                             console.log('image'+index);
                             AsyncStorage.setItem('image'+index, this.result);
                             } ;
                             reader.readAsDataURL(blob) ;
                             })
                  }
            })
          .catch(err => { console.log(err) })
        }
   async fetchImage(url:string,index:number) {
                   let token=await fetchJwToken();console.log(url);
                   fetch(url, {
                             method: 'GET',
                             headers: {'Authorization': 'Bearer ' + token}
                           })
                   .then( response =>{
                       if(response.status==200){
                             response.blob()
                             .then(blob =>{
                                   var reader = new FileReader() ;
                                   reader.onload = function(){
                                   // console.log(this.result);// <--- `this.result` contains a base64 data URI
                                   console.log('image'+index);
                                   AsyncStorage.setItem('image'+index, this.result);
                                   } ;
                                   reader.readAsDataURL(blob) ;
                             })
                       }
                       else { throw new Error("Access denied, Try again later, if same thing would happen again contact StatCan");}
                       })
                   .catch(err => { console.log(err) })
                 }
   displaySpinner() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
   render() {
     let uri='';//http://barabasy.eastus.cloudapp.azure.com/anonymous-anonyme/en/login-connexion/load-charger/eqgsd0ed709a7df0465da7cb4881b290ff22';
     if(global.doneSurveyA){
         if(global.culture=='en')
              uri=global.surveyBUrlEng;
         else
            uri=global.surveyBUrlFre;
     }
     else{
         if(global.culture=='en')
             uri=global.surveyAUrlEng;
         else
             uri=global.surveyAUrlFre;
         }
    return (
          <View style={{ flex: 1, marginTop: 24 }}>
           <View style={{height:24}}>
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')} style={{marginLeft:0}}><EvilIcons name="arrow-left" size={32} color="black" /></TouchableOpacity>
                       <Image source={require('../../assets/ic_logo_loginmdpi.png')} style={{width:34,height:34}} />
                     <TouchableOpacity onPress={() => this.props.navigation.navigate('SettingsScreen')} style={{marginRight:0}}><EvilIcons name="gear" size={32} color="black" /></TouchableOpacity>
                  </View>
              </View>
                <WebView
                          ref={(view) => this.webView = view} incognito={true}
                          style={styles.webview}
                          userAgent={global.userToken}
                          scrollEnabled={true}
                          source={{uri:uri}}
                          javaScriptEnabled={true}
                          domStorageEnabled={true}
                          startInLoadingState={false}
                          scalesPageToFit={true}
                          startInLoadingState={true}
                          injectedJavaScript={this.state.jsCode}
                          renderLoading={() => {
                            return this.displaySpinner();
                          }}
                          onNavigationStateChange={(navState) => {

                            if (navState.url =='') { // You must validate url to enter or navigate
                              this.webView.stopLoading();
                            }
                            console.log(navState.url);
                            if(navState.url.indexOf('submiterror-erreursoumission')>0||navState.url==global.surveyThkUrlEng ||navState.url==global.surveyThkUrlFre){
                                  console.log('count in b:'+count);
                                 if(global.doneSurveyA){
                                     if(count>0){count=0;return;}
                                      console.log('redady to fetch image');
                                      this.fetchImages();count=1;
                                 }
                                 else {
                                    console.log('survey A done'); global.doneSurveyA=true;AsyncStorage.setItem('doneSurveyA','true');count=1;
                                 }
                                this.props.navigation.navigate('Dashboard');
                            }
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
    marginTop: 24,
    width: deviceWidth,
    height: deviceHeight + 2000
  },
  logo: { width: 300, height: 40 },
});

//export default memo(EQSurveyScreen);
// <TouchableOpacity onPress={() => this.webView.postMessage('test')} style={{alignSelf:'flex-end'}}><EvilIcons name="gear" size={32} color="black" /></TouchableOpacity>

//  <TouchableOpacity onPress={() => this.props.navigation.navigate('SettingsScreen')} style={{marginRight:0}}><EvilIcons name="gear" size={32} color="black" /></TouchableOpacity>
// <TouchableOpacity onPress={() => this.webView.postMessage('test')} style={{alignSelf:'flex-end'}}><Ionicons name="ios-globe" size={30} color="black" /></TouchableOpacity>
