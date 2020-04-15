import {Platform,AsyncStorage} from 'react-native';
export async function saveParadataAlgo(jwt){
     if(!global.paraDataSaved && global.doneSurveyA){
          var snt = [];
          let result = await AsyncStorage.getItem('settings');
          let pingNum=1;
          if(result!=null){
             let settings = JSON.parse(result);
             pingNum=settings.notificationCount;snt=settings.scheduledDateArray;
          }
          let paraData = {
                    "PlatFormVersion": Platform.Version,
                    "DeviceName": Expo.Constants.deviceName,
                    "NativeAppVersion": Expo.Constants.nativeAppVersion,
                    "NativeBuildVersion":Expo.Constants.nativeBuildVersion,
                    "DeviceYearClass":Expo.Constants.deviceYearClass,
                    "SessionID":Expo.Constants.sessionId,
                    "NotificationCount": pingNum,
                    "NotificationEnable":true,
                    "ScheduledNotificationTimes": snt
                    };
          console.log(paraData);
          let result=false;
          //     result=await saveParaData(jwt,paraData);
          if(result){AsyncStorage.setItem('paraDataSaved','true');global.paraDataSaved=true;}else {AsyncStorage.setItem('paraDataSaved','false');global.paraDataSaved=false;}
     }
 }
function saveParaData(jwt,paraData){
             let url=global.webApiBaseUrl+'api/paradata';console.log(url);
             fetch(url, {
                  method: 'POST',
                  headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt},
                  body: JSON.stringify(paraData),
             })
             .then((response) =>{
                 if(response.status==200){console.log('paradata saved successfully');  return true;}
                 else {console.log('paradata Bad:'+response.status);return false;}
                 } )          // response.json())
             .catch((error)=>{console.log(error.message);return false;});
      }