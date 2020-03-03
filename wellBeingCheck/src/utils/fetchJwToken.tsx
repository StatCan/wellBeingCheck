import NetInfo from '@react-native-community/netinfo';

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
                     console.log('Connection type', state.type);
                     console.log('Is connected?', state.isConnected);
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
               let url=global.webApiBaseUrl+'CheckConnection';console.log(url);
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
      let url=global.webApiBaseUrl+'api/security/token';
      let data={deviceId:global.userToken,password:hashString(global.password,global.passwordSalt)}
      return fetch(url,{
          method: 'POST',
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify(data),})
        .then((response) => response.json())
        .then((responseData) => {return responseData;})
        .catch(error => console.warn(error));
    }