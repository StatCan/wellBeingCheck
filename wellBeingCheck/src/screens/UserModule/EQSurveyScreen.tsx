import React, { memo, useState, useCallback } from 'react';
import { Image, View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator,Button } from 'react-native';
import { AsyncStorage } from 'react-native';
import { Ionicons,EvilIcons,Feather } from '@expo/vector-icons';
import WebView from 'react-native-webview';
import { resources } from '../../../GlobalResources';
import {fetchJwToken,checkConnection} from '../../utils/fetchJwToken';
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
    let disCode= 'const meta = document.createElement("meta"); meta.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"); meta.setAttribute("name", "viewport"); document.getElementsByTagName("head")[0].appendChild(meta);';
    let clearCookie='document.cookie.split(";").forEach(function(c) {document.cookie = c.trim().split("=")[0] + "=;" + "expires=Thu, 01 Jan 1970 00:00:00 UTC;";});';
    let jsCode=clearCookie+'document.addEventListener("message", function (message) { document.getElementById("langtest").click(); });var btn = document.createElement("button");btn.style.visibility ="hidden";btn.onclick = switchlang;btn.setAttribute("id", "langtest");document.body.appendChild(btn);    function switchlang() { var a = document.querySelector("a.sc-js-langchange");var href = a.href;if (href.indexOf("/q/fr")>0) {var res = href.replace("/q/fr", "/q/en");a.setAttribute("href", res);a.click();} else if (href.indexOf("/q/en")>0) {var res = href.replace("/q/en", "/q/fr");a.setAttribute("href", res);a.click();} }';
    this.state=({Sacode:'',jsCode:disCode+jsCode});
  }
  // componentDidMount(){this.handleSurveyBdone();}
   async handleSurveyAdone(){
        let isConnected=await checkConnection();
        if(!isConnected){alert('You are offline, try it later');return;}
        let jwt=await this.fetchJwToken();
        let result=false;
        if(jwt!='')result=await this.setPassword(jwt);
        if(!result){alert("Internal server error, Try again, if same thing would happen again contact StatCan");return;}
        console.log('survey A done'); global.doneSurveyA=true;AsyncStorage.setItem('doneSurveyA','true');
   }
   async handleSurveyBdone(){
         let isConnected=await checkConnection();
         if(!isConnected){alert('You are offline, try it later');return;}

         let types=await this.fetchGraphTypes();console.log('types:'+types);
         if(types!=null && types.length>0){
             this.fetchGraphs(types);
         }
   }
   async fetchGraphs(types:string[]){
      if(count>0)return;
      let jwt=await this.fetchJwToken();console.log('asdfasdfasdfasdf');
      if(jwt==''){alert("Internal server error, Try again, if same thing would happen again contact StatCan");return;}
      global.jwToken=jwt;
      let hh=deviceHeight-220;let hh1=deviceHeight-300;let ww=deviceWidth-80;
      let index=0;
      for(var i=0;i<types.length;i++){
          let url=global.webApiBaseUrl+'api/dashboard/graph?type='+types[i];
          if(types[i]=='mood')url+='&width='+ww+'&height='+hh1;
          else url+='&width='+deviceWidth+'&height='+hh;
          this.fetchImage(url,index,'en');index++;
          this.fetchImage(url,index,'fr');index++;
      }
      AsyncStorage.setItem('hasImage','1');console.log('Fetch images done');
   }
   fetchJwToken() {
         let url=global.webApiBaseUrl+'api/security/token';
         let data={deviceId:global.userToken,password:global.password}
         return fetch(url,{
               method: 'POST',
                 headers: {
                   'Content-Type': 'application/json',
                 },
                 body: JSON.stringify(data),
         })
         .then((response) => response.json())
         .then((responseData) => {
               return responseData;
             })
         .catch(error => console.warn(error));
     }
   setPassword(jwt:string) {
         let url=global.webApiBaseUrl+'api/security/password';
         let data={salt:'1234',passwordHash:'45678',securityQuestionId:'11',securityAnswerSalt:'4321',securityAnswerHash:'4444'}
         return fetch(url,{
               method: 'POST',
                 headers: {
                   'Content-Type': 'application/json',
                   'Authorization': 'Bearer ' + jwt,
                 },
                 body: JSON.stringify(data),
         })
         .then((response) => response.json())
         .then((responseJson) => {console.log('setPassword:'+responseJson);return responseJson;})
         .catch((error) => {console.error(error);});
    }
   resetPassword() {
              let url=global.webApiBaseUrl+'api/security/password';console.log(url);
              let data={deviceId:global.userToken,newSalt:'1234',newPasswordHash:'45678',securityAnswerHash:'4444'}
              return fetch(url,{
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json',},
                    body: JSON.stringify(data),
              })
               .then((response) => response.json())
               .then((responseJson) => {console.log('resetPassword:'+responseJson);return responseJson;})
              .catch((error) => {console.error(error);});
         }
   fetchGraphTypes(){
        let url=global.webApiBaseUrl+'api/dashboard/graphs';
        return fetch(url)
           .then((response) => response.json())
           .then((responseData) => {return responseData;})
           .catch(error => console.warn(error));
   }
   fetchImages(){
          console.log(count); if(count>0)return;
          console.log('Fetch images....');
          let hh=deviceHeight-220;let hh1=deviceHeight-300;let ww=deviceWidth-80;
          timeStamp=d.getFullYear().toString()+d.getMonth()+d.getDay()+d.getHours()+d.getMinutes()+d.getSeconds();
          let uri0=global.webApiBaseUrl+'api/dashboard/graph?type=mood&width='+ww+'&height='+hh1;
          let uri1=global.webApiBaseUrl+'api/dashboard/graph?type=mood&width='+ww+'&height='+hh1;
          let uri2=global.webApiBaseUrl+'api/dashboard/graph?type=location&width='+deviceWidth+'/'+hh;
          let uri3=global.webApiBaseUrl+'api/dashboard/graph?type=location&width='+deviceWidth+'/'+hh;
          let uri4=global.webApiBaseUrl+'api/dashboard/graph?type=people&width='+deviceWidth+'/'+hh;
          let uri5=global.webApiBaseUrl+'api/dashboard/graph?type=people&width='+deviceWidth+'/'+hh;
          let uri6=global.webApiBaseUrl+'api/dashboard/graph?type=activity&width='+deviceWidth+'/'+hh;
          let uri7=global.webApiBaseUrl+'api/dashboard/graph?type=activity&width='+deviceWidth+'/'+hh;
          this.fetchImage(uri0,0);
          this.fetchImage(uri1,1);
          this.fetchImage(uri2,2);
          this.fetchImage(uri3,3);
          this.fetchImage(uri4,4);
          this.fetchImage(uri5,5);
          this.fetchImage(uri6,6);
          this.fetchImage(uri7,7);
          AsyncStorage.setItem('hasImage','1');console.log('Fetch images done');
          //count=1;
    }
   fetchAllImages(){
      let url='http://localhost:49159/'+'AllImages/aaa/'+timeStamp+'/en/'+deviceWidth+'/'+deviceHeight;
      fetch(url).then( response => console.log(response));
      }
   async fetchImage(url:string,index:number,culture:string) {
       let isConnected=await checkConnection();
       if(!isConnected){alert('You are offline, try it later');return;}
                   let token=global.jwToken;   console.log(url);     //await fetchJwToken();console.log(url);
                   fetch(url, {
                             method: 'GET',
                             headers: {'Authorization': 'Bearer ' + token,
                                        'Accept-language':culture
                             },

                           })
                   .then( response =>{
                       console.log(response.status);
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
         console.log('Beofore eq:'+uri);
    return (
          <View style={{ flex: 1, marginTop: 0 }}>
           <View>
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')} style={{marginLeft:0}}><EvilIcons name="arrow-left" size={32} color="black" /></TouchableOpacity>
                      <TouchableOpacity onPress={()=>this.fetchAllImages()}><Image source={require('../../assets/ic_logo_loginmdpi.png')} style={{width:34,height:34}} /></TouchableOpacity>

                      <TouchableOpacity onPress={() => this.webView.postMessage('test')} style={{alignSelf:'flex-end'}}><Ionicons name="ios-globe" size={30} color="black" /></TouchableOpacity>
                  </View>
              </View>
                <WebView
                          ref={(view) => this.webView = view} incognito={true} pointerEvents="none"
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
                                      this.handleSurveyBdone();count=1;
                                       global.showThankYou=2;
                                 }
                                 else {
                                      this.handleSurveyAdone();
                                        global.showThankYou=1;
                                      count=1;

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
    marginTop: 0,
    width: deviceWidth,
    height: deviceHeight + 2000
  },
  logo: { width: 300, height: 40 },
});

//export default memo(EQSurveyScreen);
// <TouchableOpacity onPress={() => this.webView.postMessage('test')} style={{alignSelf:'flex-end'}}><EvilIcons name="gear" size={32} color="black" /></TouchableOpacity>

//  <TouchableOpacity onPress={() => this.props.navigation.navigate('SettingsScreen')} style={{marginRight:0}}><EvilIcons name="gear" size={32} color="black" /></TouchableOpacity>
// <TouchableOpacity onPress={() => this.webView.postMessage('test')} style={{alignSelf:'flex-end'}}><Ionicons name="ios-globe" size={30} color="black" /></TouchableOpacity>
