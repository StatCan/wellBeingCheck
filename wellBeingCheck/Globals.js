import { PanResponder} from 'react-native';
global.name='AAA';
global.department='bbb';
global.question='';
global.answer='';
global.timeStamp=0;
global.surveyACode='';

global.doneSurveyA=false;
global.debugMode=false;
global.currentNotificationDate='';

global.jwToken='';
global.userToken='';
global.password='1234';
global.surveyAUrlEng='';
global.surveyAUrlFre='';
global.surveyBUrlEng='';
global.surveyBUrlFre='';
global.surveyThkUrlEng='';
global.surveyThkUrlFre='';
global.surveyExceptionUrlEng='';
global.surveyExceptionUrlFre='';
global.doneSurveyA=false;
global.hasImage=0;
global.webApiBaseUrl='http://wellbeingcheck.canadacentral.cloudapp.azure.com/wellbeing-bienetre1/';   //'http://localhost:50170/'; ////http://wellbeingcheck.canadacentral.cloudapp.azure.com/WebApiForEsmDev/';    //'http://barabasy.eastus.cloudapp.azure.com/WebApiForEsmDev/';  //'http://localhost:50170/';   //'http://barabasy.eastus.cloudapp.azure.com/WebApiForEsmDev/';      //'http://localhost:49159/'   //'http://barabasy.eastus.cloudapp.azure.com/WebApiForEsm/';//'http://localhost:49159/'

global.connectivity=false;
global.showThankYou=0;
global.configurationReady=false;
global.sac='';
global.passwordSalt='1234';
global.securityAnswerSalt='4321';
global.securityAnswer="aaaa";
global.securityQuestionId=4,

global.graphType0='WarnFW';
global.graphType1='MacaroniFW';
global.graphType2='ScalableBarFW';
global.graphType3='ScalableLineFW';
global.graphType4='ScalableLine';
global.graphType5='ScalableCBarFW';
global.graphType6='BulletinFW';
global.graphType7='';
global.configurationReady=false;
global.currentView=0;
global.fetchAction=true;

global.pingNum=2;
global.awakeHour='8:00';
global.sleepHour='22:00';
global.schedules=[];
global.lastDate=null;
global.warningNotificationId=null;
global.paradataSaved=false;
global.passwordSaved=false;
global.notificationState=true;
global.surveyCount=0;
global.busy=8;
global.fetchCount=8;

global.globalTimer =null;
global.globalTick=0;
global.globalTimeOutCallback=null;
global.timerTime=60000;//900000;//30000*1;
global.repeatCheck=async ()=>{
    console.log('Timer check..............................');
    if (global.globalTick>0) {
         clearInterval(global.globalTimer);global.globalTimer =null;console.log('Timer killed1..................');
         if(global.globalTimeOutCallback!=null && typeof global.globalTimeOutCallback=='function'){
               global.globalTimeOutCallback();
         }
         else {
           clearInterval(globla.globalTimer);console.log('Timer killed2..................');
         }
         global.globalTick=0;
    }
    else if(global.globalTick==0)global.globalTick++;
    else if(global.globalTick<0)clearInterval(global.globalTimer);
}
global.createGlobalTimer=()=>global.globalTimer=setInterval(global.repeatCheck,global.timerTime);
global.panResponder=null;
global.createPanResponder=()=>{
    console.log('create pan responder.....................');
    global.panResponder=PanResponder.create({
          onStartShouldSetPanResponder: () => {
            global.globalTick=0;
            return true;
          },
          onMoveShouldSetPanResponder: () =>{  global.globalTick=0; console.log('On Move.........................');  return true;},
          onStartShouldSetPanResponderCapture: () => {global.globalTick=0; console.log('On Click.................'); return false; },

         //For performence, just enable what is necceesary
         /* onStartShouldSetPanResponderCapture: () =>false,
          onMoveShouldSetPanResponderCapture: () => false,
          onPanResponderTerminationRequest: () => true,
          onShouldBlockNativeResponder: () => false,

          onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                  global.globalTick=0; console.log('On onMoveShouldSetPanResponderCapture.........................:'+gestureState);
                  return false;
                },
          onPanResponderGrant: (evt, gestureState) => {
                 global.globalTick=0; console.log('On onPanResponderGrant.........................:'+gestureState);
                  return false;
                },
          onPanResponderMove: (evt, gestureState) => {
                 global.globalTick=0; console.log('On onPanResponderMove.........................:'+gestureState);
                  return false;
                },
          onPanResponderTerminationRequest: (evt, gestureState) => {
                   global.globalTick=0; console.log('On onPanResponderTerminationRequest.........................:'+gestureState);
                  return false
                },
          onPanResponderRelease: (evt, gestureState) => {
                  global.globalTick=0; console.log('On onPanResponderRelease.........................:'+gestureState);
                  return true;
                },
          onPanResponderTerminate: (evt, gestureState) => {
                  global.globalTick=0; console.log('On onPanResponderTerminate.........................:'+gestureState);
                  return false;
                },
          onShouldBlockNativeResponder: (evt, gestureState) => {
               global.globalTick=0; console.log('On onShouldBlockNativeResponder.........................:'+gestureState);
                  return false;
                },
*/



        });
}