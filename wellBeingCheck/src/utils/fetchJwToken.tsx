import NetInfo from '@react-native-community/netinfo';
export function fetchJwToken2() {
   console.log('global.jwt:'+global.jwToken);
   var now=new Date();
   var diffTime = Math.abs(now -global.tokenDoB)/1000/60;console.log('DiffTime:'+diffTime);
   if(global.jwToken!='' && diffTime<15)return global.jwToken;
       if(global.userToken!='' && global.password!=''){
            let url=global.webApiBaseUrl+'Token/'+global.userToken+'/'+global.password;console.log(url);
            return fetch(url,{method: 'POST'})
               .then((response) =>{
                response.json()
                } )
               .then((responseJson) => { global.jwToken=responseJson;global.tokenDoB=new Date(); console.log('globalToken:'+global.jwToken)})
               .catch((error) => { console.error(error); });
       }else {
          alert("Not registered");
       }
   }

export function fetchJwToken1() {
   console.log('global.jwt:'+global.jwToken);
   var now=new Date();
   var diffTime = Math.abs(now -global.tokenDoB)/1000/60;console.log('DiffTime:'+diffTime);console.log(global.jwToken);
   if(global.jwToken!='' && diffTime<15)return global.jwToken;
       if(global.userToken!='' && global.password!=''){
           let url=global.webApiBaseUrl+'Token/'+global.userToken+'/'+global.password;
                 return fetch(url)
                   .then(
                     function(response) {
                       if (response.status !== 200) {
                         console.log('Looks like there was a problem. Status Code: ' +
                           response.status);
                         return;
                       }

                       // Examine the text in the response
                       response.json().then(function(data) {
                         global.jwToken=data;global.tokenDoB=new Date();
                         console.log('the token:'+data);
                         return data;
                       });
                     }
                   )
                   .catch(function(err) {
                     console.log('Fetch Error :-S', err);
                   });
   }
   }

export function  fetchJwToken3(){
     return new Promise(resolve => {
          let now=new Date();let token='';
             var diffTime = Math.abs(now -global.tokenDoB)/1000/60;console.log('DiffTime:'+diffTime);console.log(global.jwToken);
             if(global.jwToken!='' && diffTime<15)token=global.jwToken;
             else{
                 if(global.userToken!='' && global.password!=''){
                           let url=global.webApiBaseUrl+'Token/'+global.userToken+'/'+global.password;
                           console.log(url,{method: 'POST'});
                           fetch(url)
                              .then(
                                  function(response) {
                                       if (response.status === 200) {
                                         response.json().then(function(data) {
                                                                                 global.jwToken=data;global.tokenDoB=new Date();
                                                                                 console.log('the token:'+data);
                                                                                 token=data;
                                       })
                                        }
                                   })
                              .catch(function(err) {console.log('Fetch Error :-S', err);});
                   }
                   }
          resolve(token);
          }
          )
 }

export function fetchJwToken() {
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