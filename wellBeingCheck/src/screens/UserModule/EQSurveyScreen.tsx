import React, { memo, useState, useCallback } from 'react';
import { Image, View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator,Button,YellowBox } from 'react-native';
import { AsyncStorage } from 'react-native';
//import { Ionicons,EvilIcons,Feather } from '@expo/vector-icons';
import { AntDesign,FontAwesome } from '@expo/vector-icons';
import WebView from 'react-native-webview';
import { resources } from '../../../GlobalResources';
import {fetchJwToken,checkConnection,hashString,parseJwt} from '../../utils/fetchJwToken';
const deviceHeight =Math.floor(Dimensions.get('window').height);
const deviceWidth =Math.floor(Dimensions.get('window').width);
import {BackEndService} from '../../api/back-end.service';
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
YellowBox.ignoreWarnings(['Require cycle:']);
let count=0;//temporarily limit to get image just once, because eq will show exception page twice.

const WEB_API_BASE_URL =global.webApiBaseUrl+'api';
let jsCode='';
export default class EQSurveyScreen extends React.Component<Props, ScreenState> {
  constructor(Props) {
    super(Props)
    let disCode= 'const meta = document.createElement("meta"); meta.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"); meta.setAttribute("name", "viewport"); document.getElementsByTagName("head")[0].appendChild(meta);';
    let clearCookie='document.cookie.split(";").forEach(function(c) {document.cookie = c.trim().split("=")[0] + "=;" + "expires=Thu, 01 Jan 1970 00:00:00 UTC;";});';
    jsCode=clearCookie+'document.addEventListener("message", function (message) { document.getElementById("langtest").click(); });var btn = document.createElement("button");btn.style.visibility ="hidden";btn.onclick = switchlang;btn.setAttribute("id", "langtest");document.body.appendChild(btn);    function switchlang() { var a = document.querySelector("a.sc-js-langchange");var href = a.href;if (href.indexOf("/q/fr")>0) {var res = href.replace("/q/fr", "/q/en");a.setAttribute("href", res);a.click();} else if (href.indexOf("/q/en")>0) {var res = href.replace("/q/en", "/q/fr");a.setAttribute("href", res);a.click();} }';
    this.state=({Sacode:'',jsCode:disCode+jsCode,webviewLoaded: false});
    setTimeout(()=>{this.setState({webviewLoaded: true})}, 4000);
  }
   componentDidMount(){
     //   this.handleSurveyAdone();
    //  this.fetchGraphTypesNew();
    //  this.handleSurveyBdone();
      // this.setPasswordNew();
    //  this.resetPassword('Esm#12346789');
    //   this.resetPasswordNew('Esm#12346789');

   }

      async handleSurveyAdone(){
              let isConnected=await checkConnection();
              if(!isConnected){alert('You are offline, try it later');return;}
              let jwt=await fetchJwToken();
              console.log('Token:'+jwt);
              if(jwt==''){alert("Internal server error(token), Try again, if same thing would happen again contact StatCan");return;}
              global.jwToken=jwt;
              let result=false;
              result=await this.setPassword(jwt);
            //  result=await this.setPasswordNew();
              if(!result){alert("Internal server error(set password), Try again, if same thing would happen again contact StatCan");return;}
              console.log('survey A done'); global.doneSurveyA=true;AsyncStorage.setItem('doneSurveyA','true');
              //New flow:A and B will be done at first time, But Don't show image at this time
            /*  let types=await this.fetchGraphTypes();console.log('types:'+types);
              if(types!=null && types.length>0){
                 await this.fetchGraphs(types);
              }*/
              count=1;
            //  AsyncStorage.setItem('hasImage','1');console.log('Fetch images Down');global.hasImage=true;
         }
      async handleSurveyAdoneNew(){
            let isConnected=await checkConnection();
            if(!isConnected){alert('You are offline, try it later');return;}
            result=await this.setPasswordNew();
            if(!result){alert("Internal server error(set password), Try again, if same thing would happen again contact StatCan");return;}
            console.log('survey A done'); global.doneSurveyA=true;AsyncStorage.setItem('doneSurveyA','true');
            count=1;
       }
      async handleSurveyBdone(){
               let isConnected=await checkConnection();console.log('In handle B');
               if(!isConnected){alert('You are offline, try it later');return;}
               let jwt=await fetchJwToken();
               if(jwt==''){alert("Internal server error(token), Try again, if same thing would happen again contact StatCan");return;}
               global.jwToken=jwt;

               let types=await this.fetchGraphTypes();
             //  let types=await this.fetchGraphTypesNew();
             //  let types=['overall','activity','people','location'];
               console.log('types:'+types);
               if(types!=null && types.length>0){
                  await this.fetchGraphs(types);
               }
               count=1;AsyncStorage.setItem('hasImage','1');global.hasImage=true;
               this.props.navigation.navigate('Dashboard');
         }
      async handleSurveyBdoneNew(){
            let isConnected=await checkConnection();console.log('In handle B');
            if(!isConnected){alert('You are offline, try it later');return;}
            let types=await this.fetchGraphTypesNew();             //  let types=['overall','activity','people','location'];
             console.log('types:'+types);
             if(types!=null && types.length>0){
                  await this.fetchGraphs(types);
             }
             count=1;AsyncStorage.setItem('hasImage','1');global.hasImage=true;
      }
      async fetchGraphs(types:string[]){
         //   if(count>0)return;

            let hh=deviceHeight-220;let hh1=deviceHeight-300;let ww=deviceWidth-80;
            let index=0;
            for(var i=0;i<types.length;i++){
                let url=global.webApiBaseUrl+'api/dashboard/graph/'+types[i];
              //  if(types[i].type=='overall')url+='?width='+deviceWidth+'&height='+hh;
              //  else url+='?width='+deviceWidth+'&height='+hh;
                url+='?width='+deviceWidth+'&height='+hh;
                this.fetchImage(url,index,'en');index++;
                this.fetchImage(url,index,'fr');index++;
            }
            AsyncStorage.setItem('hasImage','1');console.log('Fetch images done');
         }
     //The new service call has problem
      async setPasswordNew() {
            var service=new BackEndService(
                global.webApiBaseUrl+'api/',
                                   'fr-CA',
                                   global.userToken,
                                   global.sac,
                                   'null',
                                   fetch
            );
                    var result= await service.setPassword(
                             global.passwordSalt,
                             hashString(global.password,global.passwordSalt),
                             global.securityQuestionId,
                             global.securityAnswerSalt,
                             hashString(global.securityAnswer,global.securityAnswerSalt));
             if(service.isResultFailure(result))return false;
             else return true;

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
      async resetPasswordNew(newPass){
           let service = new BackEndService(
                 WEB_API_BASE_URL,
                 'fr-CA',
                 global.userToken,
                 global.sac,
                 'null',
                 fetch
             );
           let result = await service.resetPassword(
                 global.passwordSalt,
                 hashString(newPass,global.passwordSalt),
                 hashString(global.securityAnswer,global.securityAnswerSalt),
                 global.securityQuestionId,
                 global.securityAnswerSalt,
                 hashString(global.securityAnswer,global.securityAnswerSalt)
             );
           if(service.isResultFailure(result)){console.log('bad');return false;}
           else{global.password=newPass;console.log('good');return true;}
      }
      async fetchGraphTypes(){
       let types=[];
              let url=global.webApiBaseUrl+'api/dashboard/graphs';
              return fetch(url,{
                 method: 'GET',
                                     headers: {
                                       'Content-Type': 'application/json',
                                       'Authorization': 'Bearer ' + global.jwToken,
                                     }
              })
                 .then((response) => response.json())
                 .then((result) => {
                        if(result!=null && result.length>0){
                           result.forEach(function (graphLink) {
                                           types.push(graphLink.type);
                                         });
                        }
                       return types;})
                 .catch(error =>{console.warn(error);return types;});
         }
      async fetchGraphTypesNew(){
           let types=[];
           let backEndService = new BackEndService(
                   global.webApiBaseUrl+'api/',
                  'fr-CA',
                   global.userToken,
                   global.sac,
                   hashString(global.password,global.passwordSalt),
                  fetch
              );
              let result = await backEndService.retrieveGraphLinks();
              if (!backEndService.isResultFailure(result)) {
                 global.jwToken=result.token;
                 //console.log(result.token);
                 result.graphs.forEach(function (graphLink) {
                   types.push(graphLink.type);
                 });
              }
            return types
      }
      async fetchImage(url:string,index:number,culture:string) {
          let isConnected=await checkConnection();
          if(!isConnected){alert('You are offline, try it later');return;}
          let token=global.jwToken;   console.log(url);     //await fetchJwToken();console.log(url);
       //   console.log(token);
          fetch(url, {
                method: 'GET',
                headers: {'Authorization': 'Bearer ' + token,'Accept-language':culture },
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
   onLoadEnd() {//  this.setState({ webviewLoaded: true });
   }
   render() {
     let uri='';//http://barabasy.eastus.cloudapp.azure.com/anonymous-anonyme/en/login-connexion/load-charger/eqgsd0ed709a7df0465da7cb4881b290ff22';
     if(global.doneSurveyA){
         if(resources.culture=='en')
              uri=global.surveyBUrlEng;
         else
            uri=global.surveyBUrlFre;
     }
     else{
         if(resources.culture=='en')
             uri=global.surveyAUrlEng;
         else
             uri=global.surveyAUrlFre;
         }
         console.log('Beofore eq:'+uri);
     let userAgent=Platform.OS=='ios'?'Apple DeviceId/'+global.userToken:'Android DeviceId/'+global.userToken;console.log('EQ userAgent'+userAgent);
    return (
          <View style={{ flex: 1, marginTop: 40}}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')} style={{marginLeft:5,marginTop:10}}><Image source={require('../../assets/ic_logo_loginmdpi.png')} style={{width:38,height:38}} /></TouchableOpacity>
                </View>
                 {(this.state.webviewLoaded) ? null : <ActivityIndicator size="large" color="lightblue" style={{position:'absolute',top:'50%',left:'50%',zIndex:20}}/>}
                <WebView
                          ref={(view) => this.webView = view} incognito={true} useWebKit={true}
                          style={styles.webview}
                          applicationNameForUserAgent={userAgent}
                          scrollEnabled={true}
                          source={{uri:uri}}
                          javaScriptEnabled={true}
                          domStorageEnabled={true}
                          startInLoadingState={false}
                          scalesPageToFit={true}
                          startInLoadingState={true}
                          injectedJavaScript={this.state.jsCode}
                          automaticallyAdjustsScrollViewInsets ={false}
                          renderLoading={() => {return this.displaySpinner();}}
                          onLoadEnd={this.onLoadEnd()}
                          onNavigationStateChange={(navState) => {
                            if (navState.url =='') { // You must validate url to enter or navigate
                              this.webView.stopLoading();
                            }
                            console.log('nav changed:'+navState.url);
                            if(navState.url==global.surveyThkUrlEng ||navState.url==global.surveyThkUrlFre){
                                 console.log('THank you count:'+count);
                                 let jsCode1='var sac ="1234566789";sac= document.querySelector("div.sc-box-main p span.ecf-bold").innerText;window.ReactNativeWebView.postMessage(sac);';
                                 console.log('Survey done.......................................................');
                                 if(global.doneSurveyA){console.log('THank you B........................');
                                        if(global.fetchAction){global.fetchAction=false;this.handleSurveyBdone();
                                           global.showThankYou=2; this.props.navigation.navigate('Dashboard');
                                        }
                                         count=1;
                                  }
                                  else {
                                     console.log('Thank you AAAA.....');
                                    // this.setState({jsCode:jsCode3});
                                    if(global.fetchAction){
                                        global.fetchAction=false;
                                        this.webView.injectJavaScript(jsCode1);
                                    }

                                  }
                            }
                          }}

                          onMessage={event => {
                                var ss=event.nativeEvent.data;
                                global.sac=ss.substring(4);
                                console.log('sa-code======='+global.sac);
                                AsyncStorage.setItem('SacCode', global.sac);
                                console.log('done A:'+global.doneSurveyA);
                                if(global.doneSurveyA){
                                    console.log('redady to fetch image');
                                    this.setState({jsCode:jsCode});
                                 //   this.handleSurveyBdone();
                                    count=1;  global.showThankYou=2;
                                }
                                else {
                                    console.log('survey A done'); global.doneSurveyA=true;AsyncStorage.setItem('doneSurveyA','true');
                                   // this.fetchImages();
                                    this.setState({jsCode:jsCode});
                                    this.handleSurveyAdone();
                                    count=1;global.showThankYou=2;
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
    marginTop:0,
    width: deviceWidth,
    height: deviceHeight + 2000
  },
  logo: { width: 300, height: 40 },
});

//export default memo(EQSurveyScreen);
// <TouchableOpacity onPress={() => this.webView.postMessage('test')} style={{alignSelf:'flex-end'}}><EvilIcons name="gear" size={32} color="black" /></TouchableOpacity>

//  <TouchableOpacity onPress={() => this.props.navigation.navigate('SettingsScreen')} style={{marginRight:0}}><EvilIcons name="gear" size={32} color="black" /></TouchableOpacity>
// <TouchableOpacity onPress={() => this.webView.postMessage('test')} style={{alignSelf:'flex-end'}}><Ionicons name="ios-globe" size={30} color="black" /></TouchableOpacity>
