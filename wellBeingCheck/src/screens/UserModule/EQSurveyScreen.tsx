import React, { memo, useState, useCallback } from 'react';
import { Image, View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator,Button,YellowBox } from 'react-native';
import { AsyncStorage } from 'react-native';
//import { Ionicons,EvilIcons,Feather } from '@expo/vector-icons';
import { AntDesign,FontAwesome } from '@expo/vector-icons';
import WebView from 'react-native-webview';
import { resources } from '../../../GlobalResources';
import {fetchJwToken,checkConnection,hashString} from '../../utils/fetchJwToken';
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
export default class EQSurveyScreen extends React.Component<Props, ScreenState> {
  constructor(Props) {
    super(Props)
    let disCode= 'const meta = document.createElement("meta"); meta.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"); meta.setAttribute("name", "viewport"); document.getElementsByTagName("head")[0].appendChild(meta);';
    let clearCookie='document.cookie.split(";").forEach(function(c) {document.cookie = c.trim().split("=")[0] + "=;" + "expires=Thu, 01 Jan 1970 00:00:00 UTC;";});';
    let jsCode=clearCookie+'document.addEventListener("message", function (message) { document.getElementById("langtest").click(); });var btn = document.createElement("button");btn.style.visibility ="hidden";btn.onclick = switchlang;btn.setAttribute("id", "langtest");document.body.appendChild(btn);    function switchlang() { var a = document.querySelector("a.sc-js-langchange");var href = a.href;if (href.indexOf("/q/fr")>0) {var res = href.replace("/q/fr", "/q/en");a.setAttribute("href", res);a.click();} else if (href.indexOf("/q/en")>0) {var res = href.replace("/q/en", "/q/fr");a.setAttribute("href", res);a.click();} }';
    this.state=({Sacode:'',jsCode:disCode+jsCode,webviewLoaded: false});
    setTimeout(()=>{this.setState({webviewLoaded: true})}, 4000);
  }
   componentDidMount(){
        this.handleSurveyBdone();
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
             // result=await this.setPasswordNew();
              if(!result){alert("Internal server error(set password), Try again, if same thing would happen again contact StatCan");return;}
              console.log('survey A done'); global.doneSurveyA=true;AsyncStorage.setItem('doneSurveyA','true');
              //New flow:A and B will be done at first time
              let types=await this.fetchGraphTypes();console.log('types:'+types);
              if(types!=null && types.length>0){
                 await this.fetchGraphs(types);
              }
              count=1;AsyncStorage.setItem('hasImage','1');console.log('Fetch images Down');global.hasImage=true;
         }
      async handleSurveyBdone(){
               let isConnected=await checkConnection();
               if(!isConnected){alert('You are offline, try it later');return;}
               let jwt=await fetchJwToken();  console.log('Token:'+jwt);
               if(jwt==''){alert("Internal server error(token), Try again, if same thing would happen again contact StatCan");return;}
               global.jwToken=jwt;
               let types=await this.fetchGraphTypes();
          //   let types=['mood','activity','location','people'];
               console.log('types:'+types);
               if(types!=null && types.length>0){
                  await this.fetchGraphs(types);
               }
               count=1;AsyncStorage.setItem('hasImage','1');console.log('Fetch images Down');global.hasImage=true;
         }
      async fetchGraphs(types:string[]){
            if(count>0)return;

            let hh=deviceHeight-220;let hh1=deviceHeight-300;let ww=deviceWidth-80;
            let index=0;
            for(var i=0;i<types.length;i++){
                let url=global.webApiBaseUrl+'api/dashboard/graph/'+types[i].type;
                if(types[i].type=='overall')url+='&width='+ww+'&height='+hh1;
                else url+='?width='+deviceWidth+'&height='+hh;
                this.fetchImage(url,index,'en');index++;
                this.fetchImage(url,index,'fr');index++;
            }
            AsyncStorage.setItem('hasImage','1');console.log('Fetch images done');
         }
/*      async setPasswordNew() {
            var service=new BackEndService();
                    var result= await service.setPassword(
                             salt: '4321',
                             hashedPassword: '1234567890',
                             securityQuestionId: 11,
                             securityAnswerSalt: '4321',
                             hashedSecurityAnswer: '4444');
             if(service.isResultFailure(result))return false;
             else return true;
      }*/
      setPassword(jwt:string) {
               let url=global.webApiBaseUrl+'api/security/password';
               let data={salt:global.passwordSalt,passwordHash:hashString(global.password,global.passwordSalt),securityQuestionId:'11',securityAnswerSalt:'4321',securityAnswerHash:'4444'}
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
                    let data={deviceId:global.userToken,newSalt:global.passwordSalt,newPasswordHash:hashString(global.password,global.passwordSalt),securityAnswerHash:'4444'}
                    return fetch(url,{
                          method: 'PUT',
                          headers: {'Content-Type': 'application/json',},
                          body: JSON.stringify(data),
                    })
                     .then((response) => response.json())
                     .then((responseJson) => {console.log('resetPassword:'+responseJson);return responseJson;})
                    .catch((error) => {console.error(error);});
               }
      async fetchGraphTypes(){
              let url=global.webApiBaseUrl+'api/dashboard/graphs';
              return fetch(url,{
                 method: 'GET',
                                     headers: {
                                       'Content-Type': 'application/json',
                                       'Authorization': 'Bearer ' + global.jwToken,
                                     }
              })
                 .then((response) => response.json())
                 .then((responseData) => {return responseData;})
                 .catch(error => console.warn(error));
         }
   fetchImages(){
          console.log(count); if(count>0)return;
          console.log('Fetch images....');
          let timeStamp='';
          let d=new Date();let hh=deviceHeight-220;let hh1=deviceHeight-300;let ww=deviceWidth-80;
          timeStamp=d.getFullYear().toString()+d.getMonth()+d.getDay()+d.getHours()+d.getMinutes()+d.getSeconds();
          let uri0=global.webApiBaseUrl+'Mood/aaa/'+timeStamp+'/en/'+deviceWidth+'/'+hh;
          let uri1=global.webApiBaseUrl+'Mood/aaa/'+timeStamp+'/fr/'+deviceWidth+'/'+hh;
          let uri2=global.webApiBaseUrl+'Location/aaa/'+timeStamp+'/en/'+deviceWidth+'/'+hh;
          let uri3=global.webApiBaseUrl+'Location/aaa/'+timeStamp+'/fr/'+deviceWidth+'/'+hh;
          let uri4=global.webApiBaseUrl+'People/aaa/'+timeStamp+'/en/'+deviceWidth+'/'+hh;
          let uri5=global.webApiBaseUrl+'People/aaa/'+timeStamp+'/fr/'+deviceWidth+'/'+hh;
          let uri6=global.webApiBaseUrl+'Activity/aaa/'+timeStamp+'/en/'+deviceWidth+'/'+hh;
          let uri7=global.webApiBaseUrl+'Activity/aaa/'+timeStamp+'/fr/'+deviceWidth+'/'+hh;
          this.fetchImage(uri0,0);
          this.fetchImage(uri1,1);
          this.fetchImage(uri2,2);
          this.fetchImage(uri3,3);
          this.fetchImage(uri4,4);
          this.fetchImage(uri5,5);
          this.fetchImage(uri6,6);
          this.fetchImage(uri7,7);
          AsyncStorage.setItem('hasImage','1');console.log('Fetch images Down');global.hasImage=true;
          //count=1;
    }
   async fetchImage(url:string,index:number) {
       let isConnected=await checkConnection();
       if(!isConnected){alert('You are offline, try it later');return;}
                   let token=global.jwToken;   console.log(url);     //await fetchJwToken();console.log(url);
                   fetch(url, {
                             method: 'GET',
                             headers: {'Authorization': 'Bearer ' + token,
                                        'Accept-language':global.culture
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
     let userAgent=Platform.OS=='ios'?'Apple deviceId/'+global.userToken:'Android deviceId/'+global.userToken;console.log(userAgent);
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
                          renderLoading={() => {
                            return this.displaySpinner();
                          }}
                          onNavigationStateChange={(navState) => {
                            if (navState.url =='') { // You must validate url to enter or navigate
                              this.webView.stopLoading();
                            }
                            console.log('nav changed:'+navState.url);
                            if(navState.url.indexOf('submiterror-erreursoumission')>0||navState.url==global.surveyThkUrlEng ||navState.url==global.surveyThkUrlFre){
                                 let jsCode=' var sac ="1234566789";sac= document.querySelector("div.sc-box-main p span.ecf-bold").innerText; window.ReactNativeWebView.postMessage(sac);';
                                 this.setState({jsCode:jsCode});
                            }
                          }}

                          onMessage={event => {
                                console.log('sa-code======='+event.nativeEvent.data);
                                global.sac=event.nativeEvent.data;
                                console.log('count in b:'+count);
                                if(global.doneSurveyA){
                                    if(count>0){count=0;return;}
                                    console.log('redady to fetch image');
                                   // this.fetchImages();
                                    this.handleSurveyBdone();
                                    count=1;  global.showThankYou=2;
                                }
                                else {
                                    console.log('survey A done'); global.doneSurveyA=true;AsyncStorage.setItem('doneSurveyA','true');
                                   // this.fetchImages();
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
