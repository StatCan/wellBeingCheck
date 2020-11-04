import { PanResponder} from 'react-native';
import { resources } from './GlobalResources';
global.name='AAA';
    global.department='bbb';
global.question='';
global.answer='';
global.timeStamp=0;
global.surveyACode='';

global.doneSurveyA=false;
global.debugMode=true;
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
global.webApiBaseUrl='http://wellbeingcheckuat.canadacentral.cloudapp.azure.com/wellbeing-bienetre/';   //'http://localhost:50170/'; ////http://wellbeingcheck.canadacentral.cloudapp.azure.com/WebApiForEsmDev/';    //'http://barabasy.eastus.cloudapp.azure.com/WebApiForEsmDev/';  //'http://localhost:50170/';   //'http://barabasy.eastus.cloudapp.azure.com/WebApiForEsmDev/';      //'http://localhost:49159/'   //'http://barabasy.eastus.cloudapp.azure.com/WebApiForEsm/';//'http://localhost:49159/'

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

global.currentVersion='';
global.pingNum=2;

// --------------future change to make timer follow the culture change--------
if (resources.culture == "fr") {
  global.awakeHour='8:00 h';
  global.sleepHour='22:00 h'; 
  console.log("-------------------fr----------s----------s----------")
} else {
  global.awakeHour='8:00 AM';
  global.sleepHour='10:00 PM';
  console.log("-------------------en----------s----------s----------")
}
// global.awakeHour='08:00';
// global.sleepHour='22:00';
global.schedules=[];
global.lastDate=null;
global.warningNotificationId=null;
global.paradataSaved=false;
global.passwordSaved=false;
global.notificationState=true;
global.surveyCount=0;
global.busy=8;
global.fetchCount=8;
global.curDayPassed =[];

global.received='';  //test only
global.sendouts='';   //test only
global.warningDate=null;

global.globalTimer =null;
global.globalTick=0;
global.globalTimeOutCallback=null;
global.loading=false;
global.timeoutPopup=false;
 //Business wants 7  min (420000 millisecond) for the time-out  
global.timerTime=420000;
//global.timerTime=30000*1;
//global.timerTime=900000;//30000*1;
global.repeatCheck1=async ()=>{
    console.log('Timer check..............................');
    if (global.globalTick>0) {
         clearInterval(global.globalTimer);
         global.globalTimer =null;
         console.log('Timer killed1..................');
         if(global.globalTimeOutCallback!=null && typeof global.globalTimeOutCallback=='function'){
               global.globalTimeOutCallback();
         }
         else {
           clearInterval(global.globalTimer);console.log('Timer killed2..................');
         }
         global.globalTick=0;
    }
    else if(global.globalTick==0)global.globalTick++;
    else if(global.globalTick<0)clearInterval(global.globalTimer);
}
global.repeatCheck=async ()=>{
    console.log('Timer check..............................');
    clearInterval(global.globalTimer);
    global.globalTimer =null;
    if(global.globalTimeOutCallback!=null && typeof global.globalTimeOutCallback=='function'){
           global.globalTimeOutCallback();
        }
}
global.resetTimer=()=>{
     clearInterval(global.globalTimer);
     global.globalTimer =null;
     global.timerStart=new Date();
     global.globalTimer=setInterval(global.repeatCheck,global.timerTime);
}
global.createGlobalTimer=()=>{global.timerStart=new Date();global.globalTimer=setInterval(global.repeatCheck,global.timerTime);}
global.panResponder=null;
global.createPanResponder=()=>{
    console.log('create pan responder.....................');
    global.panResponder=PanResponder.create({
          onStartShouldSetPanResponder: () => {
            global.resetTimer();
            return true;
          },

        onMoveShouldSetPanResponder: () =>{  global.resetTimer();   return false;},
        onStartShouldSetPanResponderCapture: () => { global.resetTimer();  return false; },

         //For performence, just enable what is necceesary
          // onStartShouldSetPanResponderCapture: () =>false,
          // onMoveShouldSetPanResponderCapture: () => false, 
          // onPanResponderTerminationRequest: () => true,
          // onShouldBlockNativeResponder: () => false,

          // onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
          //          global.resetTimer(); console.log('On onMoveShouldSetPanResponderCapture.........................:'+gestureState);
          //         return false;
          //       },
          // onPanResponderGrant: (evt, gestureState) => {
          //         global.resetTimer(); console.log('On onPanResponderGrant.........................:'+gestureState);
          //         return false;
          //       },
          // onPanResponderMove: (evt, gestureState) => {
          //         global.resetTimer(); console.log('On onPanResponderMove.........................:'+gestureState);
          //         return false;
          //       },
          // onPanResponderTerminationRequest: (evt, gestureState) => {
          //          global.resetTimer(); console.log('On onPanResponderTerminationRequest.........................:'+gestureState);
          //         return false
          //       },
          // onPanResponderRelease: (evt, gestureState) => {
          //          global.resetTimer(); console.log('On onPanResponderRelease.........................:'+gestureState);
          //         return true;
          //       },
          // onPanResponderTerminate: (evt, gestureState) => {
          //          global.resetTimer(); console.log('On onPanResponderTerminate.........................:'+gestureState);
          //         return false;
          //       },
          // onShouldBlockNativeResponder: (evt, gestureState) => {
          //       global.resetTimer(); console.log('On onShouldBlockNativeResponder.........................:'+gestureState);
          //         return false;
          //       },



          /*  this.panResponder = PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onMoveShouldSetPanResponder: () => true,
                onPanResponderMove: this.handlePanResponderMove,
                onPanResponderRelease: this.handlePanResponderRelease,
                onPanResponderGrant: () => this.setState({ active: true }),
              });*/



        });
}
global.createPanResponder1=()=>{
    console.log('create pan responder.....................');
    global.panResponder=PanResponder.create({
          onStartShouldSetPanResponder: () => {
            global.globalTick=0;
            return true;
          },

        onMoveShouldSetPanResponder: () =>{  global.globalTick=0;   return false;},
        onStartShouldSetPanResponderCapture: () => {global.globalTick=0;  return false; },

         //For performence, just enable what is necceesary
          // onStartShouldSetPanResponderCapture: () =>false,
          // onMoveShouldSetPanResponderCapture: () => false,
          // onPanResponderTerminationRequest: () => true,
          // onShouldBlockNativeResponder: () => false,

          // onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
          //         global.globalTick=0; console.log('On onMoveShouldSetPanResponderCapture.........................:'+gestureState);
          //         return false;
          //       },
          // onPanResponderGrant: (evt, gestureState) => {
          //        global.globalTick=0; console.log('On onPanResponderGrant.........................:'+gestureState);
          //         return false;
          //       },
          // onPanResponderMove: (evt, gestureState) => {
          //        global.globalTick=0; console.log('On onPanResponderMove.........................:'+gestureState);
          //         return false;
          //       },
          // onPanResponderTerminationRequest: (evt, gestureState) => {
          //          global.globalTick=0; console.log('On onPanResponderTerminationRequest.........................:'+gestureState);
          //         return false
          //       },
          // onPanResponderRelease: (evt, gestureState) => {
          //         global.globalTick=0; console.log('On onPanResponderRelease.........................:'+gestureState);
          //         return true;
          //       },
          // onPanResponderTerminate: (evt, gestureState) => {
          //         global.globalTick=0; console.log('On onPanResponderTerminate.........................:'+gestureState);
          //         return false;
          //       },
          // onShouldBlockNativeResponder: (evt, gestureState) => {
          //      global.globalTick=0; console.log('On onShouldBlockNativeResponder.........................:'+gestureState);
          //         return false;
          //       },



          /*  this.panResponder = PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onMoveShouldSetPanResponder: () => true,
                onPanResponderMove: this.handlePanResponderMove,
                onPanResponderRelease: this.handlePanResponderRelease,
                onPanResponderGrant: () => this.setState({ active: true }),
              });*/



        });
}
global.timerStart=null;
global.pauseTimer=()=>{
    clearInterval(global.globalTimer);global.globalTimer =null;
}
global.resumeTimer=()=>{
     let d1=new Date();let d2=new Date(global.timerStart);console.log(d1);console.log(d2);
    let diff=parseInt(d1.getTime())-parseInt(d2.getTime());console.log('time tick.......:'+d1.getTime()+'-'+d1.getTime()+'='+diff);
    if(diff>=global.timerTime){
        if(!global.timeoutPopup)
             global.globalTimeOutCallback();   //global.repeatCheck();
    }
    else {
        clearInterval(global.globalTimer);
        global.globalTimer =null;
        global.timerStart=new Date();
        global.globalTimer=setInterval(global.repeatCheck,global.timerTime-diff);
    }
}

