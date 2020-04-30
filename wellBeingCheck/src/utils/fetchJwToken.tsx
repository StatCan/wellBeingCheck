import NetInfo from '@react-native-community/netinfo';
import { AsyncStorage } from 'react-native';

export function fetchJwToken1() {
  let token='123456';
  return new Promise(resolve => {
       var now=new Date(); var diffTime = Math.abs(now -global.tokenDoB)/1000/60;
      if(global.jwToken!='' && diffTime<15){console.log('get token');resolve(global.jwToken);}
      else{
          if(global.userToken!='' && global.password!=''){
               let url=global.webApiBaseUrl+'Token/'+global.userToken+'/'+global.password;console.log('fetch token');
               fetch(url,{method: 'POST'})
               .then((response)=>response.json()).then((responseJson)=>{global.jwToken=responseJson;token=responseJson; global.tokenDoB=new Date(); resolve(token);  })
               .catch((error) => { console.error(error); });
          }
      }
  });
}

export function checkConnection() {
     return new Promise(resolve => {
               NetInfo.fetch().then(state => {
                   //  console.log('Connection type', state.type);
                     //console.log('Is connected?', state.isConnected);
                   //  alert('Connection type:'+ state.type+'->Is connected?'+state.isConnected);
                   resolve(state.isConnected);
                   });
      });
}

export function hashString(str,salt) {
               return str.split("").reverse().join("")+salt;
           }

export function checkConnection1() {
     return new Promise(resolve => {
               let url=global.webApiBaseUrl+'CheckConnection';  console.log(url);
               fetch(url,{method: 'GET'})
               .then((response)=>{
                   if(response.status==200){
                        response.json().then((responseJson) => {
                                if(responseJson=="OK"){console.log('OK'); global.connectivity=true; resolve(true);}
                                else  { global.connectivity=false;console.log('Bad'); resolve(false);}
                                                              });
                   }
                  else { global.connectivity=false;console.log('Bad');
                   resolve(false);}
               })
               .catch((error) => { console.error('Bad: '+error);resolve(false) });
      });
}
export function fetchJwToken() {
      let url=global.webApiBaseUrl+'api/security/token';console.log(global.sac);
      let data={deviceId:global.userToken,sac:global.sac,password:hashString(global.password,global.passwordSalt)}
  //   let data={deviceId:'iphone5yu',sac:'6881265148395520',password:'patateHacheAvecSel'}
      return fetch(url,{
          method: 'POST',
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify(data),})
        .then((response) => response.json())
        .then((responseData) => {return responseData;})
        .catch(error => console.warn(error));
    }

export function parseJwt (token) {
       var jwtDecode = require('jwt-decode');
      return jwtDecode(token);
    };
export function saveParaData(jwt,paraData){
             let url=global.webApiBaseUrl+'api/paradata';console.log(url);
             fetch(url, {
                  method: 'POST',
                  headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt},
                  body: JSON.stringify(paraData),
             })
             .then((response) =>{
                 if(response.status==200){console.log('paradata saved successfully');AsyncStorage.setItem('ParadataSaved','true');global.paradataSaved=true;  return true;}
                 else {console.log('paradata Bad:'+response.status);return false;}
                 } )          // response.json())
             .catch((error)=>{console.log(error.message);return false;});
      }