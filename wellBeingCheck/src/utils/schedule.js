import { Notifications } from "expo";
import { AsyncStorage } from 'react-native';
import * as Permissions from 'expo-permissions';
import { resources } from '../../GlobalResources';
//GSS29 Data from algorithm specification
const primeTimeAwakeIntervals = [
  {
    awakeHourBefore: 10,
    weekDayPercentage: 4,  // A
    weekendPercentage: 4   // N
  },
  {
    awakeHourBefore: 11,
    weekDayPercentage: 5, // B
    weekendPercentage: 5  // O
  },
  {
    awakeHourBefore: 12,
    weekDayPercentage: 5, // C
    weekendPercentage: 8  // P
  },
  {
    awakeHourBefore: 13,
    weekDayPercentage: 5, // D
    weekendPercentage: 10  // Q
  },
  {
    awakeHourBefore: 14,
    weekDayPercentage: 5, // E
    weekendPercentage: 11  // R
  },
  {
    awakeHourBefore: 15,
    weekDayPercentage: 5, // F
    weekendPercentage: 8  // S
  },
  {
    awakeHourBefore: 16,
    weekDayPercentage: 4, // G
    weekendPercentage: 7  // T
  },
  {
    awakeHourBefore: 17,
    weekDayPercentage: 5, // H
    weekendPercentage: 5  // U
  },
  {
    awakeHourBefore: 18,
    weekDayPercentage: 10, // I
    weekendPercentage: 7  // V
  },
  {
    awakeHourBefore: 19,
    weekDayPercentage: 13, // J
    weekendPercentage: 9  // W
  },
  {
    awakeHourBefore: 20,
    weekDayPercentage: 15, // K
    weekendPercentage: 9  // X
  },
  {
    awakeHourBefore: 21,
    weekDayPercentage: 12, // L
    weekendPercentage: 7  // Y
  },
  {
    awakeHourBefore: 22,
    weekDayPercentage: 6, // M
    weekendPercentage: 4  // Z
  }];
//Setup notification with notification 3 parameters to specify when the notification will be fired, the title and body message string
setupNotification = async (datetime,title,message) => {
  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('survey-messages', {
      name: 'Survey messages',
      sound: true,
      vibrate: true,
    });
  }
  let scheduledTime = new Date(datetime);let msg='Info:'+new Date(datetime)+' '+message;
 // console.log(msg);
  let notificationId =await Notifications.scheduleLocalNotificationAsync(
    {
      title: title,
      body: msg,
      data: JSON.stringify({scheduledTime:scheduledTime}),   //Test only
      ios: { sound: true },
      android: {
        "channelId": "survey-messages"
      }
    },
    {
      time: scheduledTime
    }
  );
  return notificationId;
};
//Ask the permission to setup notification, this function return true/false, we can setup notification only when this function return true
askPermissions = async () => {
    let result=false;
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
      Notifications.cancelAllScheduledNotificationsAsync();
      global.sendouts='';AsyncStorage.setItem('Sendouts', sendouts);
    }
    if (finalStatus !== "granted") {
      // In final status, we asked for permission of the OS and we were denied, so we need to ask
      if (global.debugMode) console.log("Notifications Permission Not Granted");
      Notifications.cancelAllScheduledNotificationsAsync();
       global.sendouts='';AsyncStorage.setItem('Sendouts', sendouts);
    }else{
      if (global.debugMode) console.log("Notifications Permission Granted");
      result=true;
    }
    return result;
  };
//cancell all notifications which were setup before
function cancellAllSchedules(){
     Notifications.cancelAllScheduledNotificationsAsync();
     global.sendouts='';AsyncStorage.setItem('Sendouts', sendouts);
//      if (Platform.OS === 'android') {
//         Notifications.deleteChannelAndroidAsync('survey-messages').then(()=>{console.log('channel was cancelled');});
//      }
}
//Cancel a notification by notificationId
export function cancelSchedule(localNotificationId){
    Notifications.cancelScheduledNotificationAsync(localNotificationId);
}
//Setup Day5 notification, basically is same function with setupNotification,will consider to be eliminated in next version
async function setupWarning(dt,title,message){
    if (Platform.OS === 'android') {
                            Notifications.createChannelAndroidAsync('survey-messages', {
                              name: 'Survey messages',
                              sound: true,
                              vibrate: true,
                            });
                          }
    let scheduledTime = new Date(dt);
    let warningId=await Notifications.scheduleLocalNotificationAsync(
                            {
                              title: title,
                              body: message,
                              ios: { sound: true },
                              android: {
                                "channelId": "survey-messages"
                              }
                            },
                            {
                              time: new Date(dt)
                            }
                          );
    return warningId;
}
/*Main workflow function, its parameter is used to specify whether or not the new notification will affect the current's old notification
Since it is very complicated, so better to read the workflow PDF file first,
It has 2 main scenarios: Does lastDate flag exist ?
    A1) if the answer is no, that mean survey A is not done yet, will setup a brand new set of notifications, and then set the lastDate to the survey's last day that is 30 days later the day you finish the survey A
    A2) if the answer is yes, then we have to determine the current day is already in the the notification schedules we created before
        B1) if the answer is no, so no existing notification will get affected, so just create a new set of notifications
        B2) if the answer is yes , then we have to determine if current day will get affected
             C1) if the answer is no, so we just calculate how many days of notification need to append, and setup them
             C2) if the answer is yes, first we have to deal with current day. we have to calculate how many and which notifications for current day have been fired already, how many and which notifications for current day have not been fired yet,
                 because current day's notifications will get affected, we have to re-arrange new notifications for those not-done-notifacations
                 secondly, we still have to calculate how many days of notification need to be appended beside the current day and setup them
for how to calculate these notification schedule, the next function will get into play*/
export async function setupSchedules(affectCurrent=false){
    let sendouts='';//Test only
    let permission=await askPermissions();if(!permission)return;
    let title=resources.getString("scheduleTitle");//   "Scheduled Notification";
    let message=resources.getString("scheduleMessage");//"Scheduled Notification for the Survey!";
    let lastMessage=resources.getString("scheduleMessage1");//"We haven’t heard from you in a while. Sign in for a Well-being Check!";///"Nous n’avons pas eu de vos nouvelles depuis un certain temps. Connectez-vous pour obtenir un Bilan bien-être!";
    let schedules = [];let currentDateTime=new Date();console.log('current date:'+currentDateTime);currentDateTime.setMinutes(currentDateTime.getMinutes()+5);  //give 5 minute for the program to run
    let today=new Date(currentDateTime);today.setHours(0);today.setMinutes(0);today.setSeconds(0);today.setMilliseconds(0);
    let currentTime=roundUp(currentDateTime.toLocaleTimeString());
    let awake=roundUp(global.awakeHour); let sleep=roundDown(global.sleepHour);let count=global.pingNum;console.log('LastDate:'+global.lastDate);
    let ch = currentDateTime.getHours();
    let nightShiftUpdate = false; if ((awake > sleep) && (ch >= 0 && ch < sleep)) nightShiftUpdate = true;
    if(global.lastDate==null){   //Survey A
         let lastDate=new Date(currentDateTime); console.log('Setup notification after survey A');
         lastDate.setDate(currentDateTime.getDate()+30);lastDate.setHours(0);lastDate.setMinutes(0);lastDate.setSeconds(0);lastDate.setMilliseconds(0);
         let days = getFollowingDays(currentDateTime,lastDate,true,4,nightShiftUpdate);console.log('days:'+days);
         let day5=getNextDay(currentDateTime);
         let cdt=new Date(currentDateTime);cdt.setHours(cdt.getHours()+1);
         if(days.length>0){
            day5=getNextDay(days[days.length-1]);
            days.forEach(function (d, index) {
                  let ccc=count;let cdtf=currentDateTime;
                  if(index==0){ccc=Math.max(1,count-1);cdtf=cdt; }
                  var schObj  =calculateSchedule(awake, sleep, ccc, d,cdtf);
                  var selected=schObj.Selected;
                  if (selected.length > 0) {
                       selected.forEach(function (s) {
                              schedules.push(s);
                       });
                  }
            });
         }
         if(schedules.length>0){
             let dt=new Date(day5);dt.setHours(sleep-2);
             schedules.forEach(async function(s,index){
                 let cont = true;
                 if (index < schedules.length - 1) {
                      let s1 = schedules[index + 1];
                      if ((s1.Day == s.Day) && (s1.Hour - s.Hour == 1)) cont = false;
                 }
                 let ss = new Date(s.Datetime);
                 if (cont) {
                        let mm = Math.random() * 59;
                        ss.setMinutes(mm);
                        schedules[index].Datetime = ss;
                 }
                 let notificationId=await setupNotification(ss,title,message);
                 console.log('notificationId:'+notificationId+'->'+ss.toString());sendouts+=notificationId+':'+ss.toString()+'\r\n';
             });
             let warningNotificationId=await setupWarning(dt,title,lastMessage);
             var l=lastDate.toString();console.log('Last day:'+l);
             AsyncStorage.setItem('LastDate',lastDate.toString());
             AsyncStorage.setItem('WarningNotificationId',warningNotificationId.toString());
             global.warningNotificationId=warningNotificationId;
             console.log('warning notification:'+dt+' Id:'+warningNotificationId);
             global.lastDate=lastDate;
          //   AsyncStorage.setItem('Schedules',JSON.stringify(schedules));global.schedules=schedules;
             global.curDayPassed =[]; AsyncStorage.setItem('CurDayPassed',JSON.stringify(global.curDayPassed));
             updatePreScheduleList(schedules,currentDateTime,false);
         }
    }
    else { //Survey B or change setting
        let lastDate=new Date(global.lastDate);console.log('Setup notification after survey B or changing seeting');
        let isInSchedules=checkInSchedule(currentDateTime);console.log('is in period:'+isInSchedules);
        if(isInSchedules){
            let warningId=global.warningNotificationId;console.log('current is in schedules');
            if(affectCurrent){  //for change setting,  This part is hard core
                let f=getAffectedDay(currentDateTime,count);  let day5=getNextDay(currentDateTime);
                if(f==null){  //No affected day, go normal schedule
                    console.log('No affected day');
                    let tomorrow = new Date(currentDateTime); tomorrow.setDate(tomorrow.getDate() + 1); tomorrow.setHours(0); tomorrow.setMinutes(0); tomorrow.setSeconds(0); tomorrow.setMilliseconds(0);
                    let days = getFollowingDays(tomorrow,lastDate,true,4,false);
                    if(days.length>0){
                       day5=getNextDay(days[days.length-1]);
                       days.forEach(function (d, index) {
                            var schObj  =calculateSchedule(awake, sleep, count, d,currentDateTime);
                            var selected=schObj.Selected;
                            if (selected.length > 0) {
                                 selected.forEach(function (s) {
                                      schedules.push(s);
                                 });
                            }
                       });
                    }
                }
                else {
                    let affectedDay=f.AffectedDay; let leftOverCount=count- f.PassedCount;let passedList = f.PassedList;
                    console.log('leftover:'+leftOverCount+'='+count+'-'+f.PassedCount);
                    let ddd =parseInt((lastDate - affectedDay)/ (1000 * 60 * 60 * 24), 10); if (ddd == 30) leftOverCount = leftOverCount - 1;  //because survey A already conducted 1

                    console.log('Setup notification will affect current day:'+affectedDay.toString()+'->'+leftOverCount);
                    let days = getFollowingDays(affectedDay,lastDate,true,4,false);
                    if(days.length>0){
                       day5=getNextDay(days[days.length-1]);
                       days.forEach(function (d, index) {
                          if(index==0){  //affected day
                             if(leftOverCount>0){
                                 var schObj  =calculateSchedule(awake, sleep, leftOverCount, d,currentDateTime);
                                 var selected=schObj.Selected;
                                 if (selected.length > 0) {
                                     selected.forEach(function (s) {
                                         schedules.push(s);
                                     });
                                 }
                             }
                          }else{
                             var schObj=calculateSchedule(awake, sleep, count, d,currentDateTime);
                             var selected=schObj.Selected;
                             if (selected.length > 0) {
                                  selected.forEach(function (s) {
                                     schedules.push(s);
                                  });
                             }
                          }
                       });
                       if (passedList.length > 0) updateCurDayPassed(passedList);
                    }
                }
                if(schedules.length>0){
                    cancellAllSchedules();
                    schedules.forEach(async function(s,index){
                         let cont = true;
                         if (index < schedules.length - 1) {
                               let s1 = schedules[index + 1];
                               if ((s1.Day == s.Day) && (s1.Hour - s.Hour == 1)) cont = false;
                         }
                         let ss = new Date(s.Datetime);
                         if (cont) {
                            let mm = Math.random() * 59;
                            ss.setMinutes(mm);schedules[index].Datetime = ss;
                         }
                         let notificationId=await setupNotification(ss,title,message);
                         console.log('notificationId:'+notificationId+'->'+ss.toString());sendouts+=notificationId+':'+ss.toString()+'\r\n';
                    });

                    let dt=new Date(day5);dt.setHours(sleep-2);
                    let warningNotificationId=await setupWarning(dt,title,lastMessage);
                    AsyncStorage.setItem('WarningNotificationId',warningNotificationId.toString());
                    global.warningNotificationId=warningNotificationId;
                    console.log('warning notification:'+warningNotificationId);

                  //  AsyncStorage.setItem('Schedules',JSON.stringify(schedules)); global.schedules=schedules;
                  updatePreScheduleList(schedules,currentDateTime,false);
                }
            }
            else{  //for survey B, simply append new schedules
               let nob=getNecessary(currentDateTime);
               let necessary=nob.Necessary;let moredays=nob.Days;
               if(!necessary ||moredays==0){console.log('Already have 4 days schedules, no need to add more');return;}
               //cancelSchedule(warningId);

               let startDay=getStartDay();console.log('Setup notification will not affect current day,and the re-schedule start day:'+startDay.toString());
               if(startDay>global.lastDate)return;
               let days = getFollowingDays(startDay,lastDate,true,Math.min(moredays, 4), false);
               let day5=getNextDay(currentDateTime);
               if(days.length>0){
                     day5=getNextDay(days[days.length-1]);
                     days.forEach(function (d, index) {
                                    var schObj  =calculateSchedule(awake, sleep, count, d,currentDateTime);
                                    var selected=schObj.Selected;
                                    if (selected.length > 0) {
                                        selected.forEach(function (s) {
                                              schedules.push(s);
                                        });
                                    }
                                });
                     global.curDayPassed = []; AsyncStorage.setItem('CurDayPassed',JSON.stringify(global.curDayPassed));
               }
               if(schedules.length>0){
                     schedules=updateSchedulesList(schedules,currentDateTime);
                     if(global.warningNotificationId!=null) cancelSchedule(global.warningNotificationId);
                      schedules.forEach(async function(s,index){
                           let cont = true;
                           if (index < schedules.length - 1) {
                               let s1 = schedules[index + 1];
                               if ((s1.Day == s.Day) && (s1.Hour - s.Hour == 1)) cont = false;
                           }
                           let ss = new Date(s.Datetime);
                           if (cont) {
                                let mm = Math.random() * 59;
                                ss.setMinutes(mm);schedules[index].Datetime = ss;
                           }
                           let notificationId=await setupNotification(ss,title,message);
                           console.log('notificationId:'+notificationId+'->'+ss.toString());sendouts+=notificationId+':'+ss.toString()+'\r\n';
                      });
                     let dt=new Date(day5);dt.setHours(sleep-2);
                     let warningNotificationId=await setupWarning(dt,title,lastMessage);
                     AsyncStorage.setItem('WarningNotificationId',warningNotificationId.toString());
                     global.warningNotificationId=warningNotificationId;
                     console.log('warning notification:'+warningNotificationId);

                   //  AsyncStorage.setItem('Schedules',JSON.stringify(schedules)); global.schedules=schedules;
                     updatePreScheduleList(schedules,currentDateTime,true);
                 }
            }
        }
        else{
             if(today>global.lastDate)return;
             console.log('Current is NOT in schedules');
             let days = getFollowingDays(currentDateTime,lastDate,true, 4, false);
             let day5=getNextDay(currentDateTime);
             if(days.length>0){
                 day5=getNextDay(days[days.length-1]);
                 days.forEach(function (d, index) {
                     let cc = count; if (index == 0) cc = count - 1;//count minimum=2
                     var schObj  =calculateSchedule(awake, sleep, cc, d,currentDateTime);
                     var selected=schObj.Selected;
                     if (selected.length > 0) {
                         selected.forEach(function (s) {
                               schedules.push(s);
                         });
                     }
                 });
                 global.curDayPassed = []; AsyncStorage.setItem('CurDayPassed',JSON.stringify(global.curDayPassed));
             }
             if(schedules.length>0){
                  cancellAllSchedules();
                  schedules.forEach(async function(s,index){
                       let cont = true;
                       if (index < schedules.length - 1) {
                           let s1 = schedules[index + 1];
                           if ((s1.Day == s.Day) && (s1.Hour - s.Hour == 1)) cont = false;
                       }
                       let ss = new Date(s.Datetime);
                       if (cont) {
                          let mm = Math.random() * 59;
                          ss.setMinutes(mm);schedules[index].Datetime = ss;
                       }
                       let notificationId=await setupNotification(ss,title,message);
                       console.log('notificationId:'+notificationId+'->'+ss.toString());sendouts+=notificationId+':'+ss.toString()+'\r\n';
                  });
                 let dt=new Date(day5);dt.setHours(sleep-2);
                 let warningNotificationId=await setupWarning(dt,title,lastMessage);
                 AsyncStorage.setItem('WarningNotificationId',warningNotificationId.toString());
                 global.warningNotificationId=warningNotificationId;
                 console.log('warning notification:'+warningNotificationId);

               //  AsyncStorage.setItem('Schedules',JSON.stringify(schedules));global.schedules=schedules;
                 updatePreScheduleList(schedules,currentDateTime,false);
             }
    }
    }

    global.sendouts=sendouts; AsyncStorage.setItem('Sendouts', sendouts);
}
/*Main function to calculate the notificationschedule, the parameters are used to indicate the schedule date, awake hour,sleep hour,how many times of notification for this day, and current time
the algorithm will not arrange any notification for the time which has been passed for the day(time<current), for detail see the work flowpdf file*/
 function calculateSchedule(awakeHour, sleepHour, count, date, current) {
      //The current is the affected day time, if current is in this date, then thisd date will partially schedule
         var selected = []; var selected1 = []; var str = '';
         if (current == null) current = new Date(2020, 1, 1, 0, 0, 0, 0);
         var current1 = new Date(current); current1.setHours(0); current1.setMinutes(0); current1.setSeconds(0); current1.setMilliseconds(0);
      //   if (date < current1) return { Selected: selected, LogInfo: str };  //if date is early than current date time, return empty directly, because go through will also return empty,but will affect nightshift
         var isWeekend = isWeekendDay(date);
         //Step 1: Specify awake interval
         str += '<h2>Step 1: Specify awake interval</h2>';

         var awakeInterval = sleepHour - awakeHour; if (awakeHour > sleepHour) awakeInterval += 24;
         if (count > awakeInterval) count = awakeInterval;
         str += '<p>Date:' + date + ' Is Weekend:' + isWeekend + '</p>';
         str += '<p>Ping Num:' + count + '</p>';
         str += '<p>awakeHour:' + awakeHour+ '</p>';
         str += '<p>sleepHour:' +sleepHour + '</p>';
         str += '<p>Awake interval:' + awakeInterval + '</p>';
         //Step 2:Specify awake interval probability(including specify, adjust, second adjust)
         str += '<h2>Step 2:Specify awake interval probability(including specify, adjust, second adjust)</h2>';
         var intervals = [];
         str += '<h3>Intervals:</h3>';
         var totalPrimary = 0; var totalPrimaryWeekend = 0; var countNonPrimary = 0; var excessUnit = 0; var excessUnitWeekend = 0; var minPrimary = 100; var minPrimaryWeekend = 100;
         if (awakeHour <= sleepHour) {
             for (var i = awakeHour; i < sleepHour; i++) {
                 var dt = new Date(date); dt.setMinutes(0); dt.setSeconds(0); dt.setMilliseconds(0); dt.setHours(i);
                 if (dt < current) continue;   //if this interval has already passed, no neeed to schedule
                 var found = primeTimeAwakeIntervals.find(function (element) {
                     return element.awakeHour == i;
                 });
                 if (found != null) {
                     if (isWeekend) {
                         if (found.weekendPercentage < minPrimary) minPrimary = found.weekendPercentage;
                         totalPrimary += found.weekendPercentage;
                         var e = {DateTime:dt, Hour: i, Percentage: found.weekendPercentage, isPrimary: true, acculative: 0, isSelected: false,Over:0 };
                         intervals.push(e);
                     }
                     else {
                         if (found.weekDayPercentage < minPrimary) minPrimary = found.weekDayPercentage;
                         totalPrimary += found.weekDayPercentage;
                         var e = { DateTime: dt, Hour: i, Percentage: found.weekDayPercentage, isPrimary: true, acculative: 0, isSelected: false,Over:0 };
                         intervals.push(e);
                     }

                 }
                 else {
                     countNonPrimary++;
                     var e = { DateTime: dt, Hour: i, Percentage: 0, isPrimary: false, acculative: 0, isSelected: false,Over:0 };
                     intervals.push(e);
                 }
             }
         }
         else {   //Night shift
             for (var i = awakeHour; i < 24; i++) {
                 var dt = new Date(date); dt.setMinutes(0); dt.setSeconds(0); dt.setMilliseconds(0);dt.setHours(i);
                 if (dt < current) continue;
                 var found = primeTimeAwakeIntervals.find(function (element) {
                     return element.awakeHour == i;
                 });
                 if (found != null) {
                     if (isWeekend) {
                         if (found.weekendPercentage < minPrimary) minPrimary = found.weekendPercentage;
                         totalPrimary += found.weekendPercentage;
                         var e = { DateTime: dt, Hour: i, Percentage: found.weekendPercentage, isPrimary: true, acculative: 0, isSelected: false,Over:0 };
                         intervals.push(e);
                     }
                     else {
                         if (found.weekDayPercentage < minPrimary) minPrimary = found.weekDayPercentage;
                         totalPrimary += found.weekDayPercentage;
                         var e = { DateTime: dt, Hour: i, Percentage: found.weekDayPercentage, isPrimary: true, acculative: 0, isSelected: false,Over:0 };
                         intervals.push(e);
                     }
                 }
                 else {
                     countNonPrimary++;
                     var e = { DateTime: dt, Hour: i, Percentage: 0, isPrimary: false, acculative: 0, isSelected: false,Over:0 };
                     intervals.push(e);
                 }
             }
             for (var i = 0; i < sleepHour; i++) {
                 var dt = new Date(date); dt.setDate(date.getDate() + 1); dt.setHours(i); dt.setMinutes(0); dt.setSeconds(0); dt.setMilliseconds(0);
                 if (dt < current) continue;
                 var found = primeTimeAwakeIntervals.find(function (element) {
                     return element.awakeHour == i;
                 });
                 if (found != null) {
                     if (isWeekend) {
                         if (found.weekendPercentage < minPrimary) minPrimary = found.weekendPercentage;
                         totalPrimary += found.weekendPercentage;
                         var e = { DateTime: dt, Hour: i, Percentage: found.weekendPercentage, isPrimary: true, acculative: 0, isSelected: false,Over:1 };
                         intervals.push(e);
                     }
                     else {
                         if (found.weekDayPercentage < minPrimary) minPrimary = found.weekDayPercentage;
                         totalPrimary += found.weekDayPercentage;
                         var e = { DateTime: dt, Hour: i, Percentage: found.weekDayPercentage, isPrimary: true, acculative: 0, isSelected: false,Over:1 };
                         intervals.push(e);
                     }
                 }
                 else {
                     countNonPrimary++;
                     var e = { DateTime: dt, Hour: i, Percentage: 0, isPrimary: false, acculative: 0, isSelected: false,Over:1 };
                     intervals.push(e);
                 }
             }
         }
         if (countNonPrimary > 0) {
             excessUnit = (100 - totalPrimary) / countNonPrimary;
         }
         intervals.forEach(function (e) {
             str += '<p>Date:' + e.DateTime+' Hour: ' + e.Hour + ' Percentage: ' + e.Percentage + ' IsPrimary: ' + e.isPrimary + '</p > ';
         });
         if (100 - totalPrimary > 0 && countNonPrimary > 0) {
             str += '<h3>We have to do First time adjust for non primary interval, since total 100 - totalPrimary > 0 and count of NonPrimary interval > 0</h3>';
             intervals.forEach(function (e) {
                 if (!e.isPrimary) {
                     e.Percentage = excessUnit;
                 }
             });
         }
         str += '<h3>Intervals after adjust:</h3>';
         intervals.forEach(function (e) {
             str += '<p>Date:' + e.DateTime +' Hour:' + e.Hour + ' Percentage:' + e.Percentage.toFixed(2) + ' IsPrimary:' + e.isPrimary + '</p>';
         });
         if (excessUnit > minPrimary) {
             str += '<h3>We have to do Second time adjust for non primary interval, since some non primary probability > minimum of primary probability</h3>';
         }
         if (excessUnit > minPrimary) {
             var x1 = 100 - totalPrimary;
             var y1 = x1 - minPrimary * countNonPrimary;
             intervals.forEach(function (e) {
                 if (e.isPrimary) {
                     e.Percentage = e.Percentage + y1 * e.Percentage / totalPrimary;
                 }
                 else {
                     e.Percentage = minPrimary;
                 }
             });
         }
         str += '<h3>Intervals after second adjust:</h3>';
         intervals.forEach(function (e) {
             str += '<p>Date:' + e.DateTime +' Hour:' + e.Hour + ' Percentage:' + e.Percentage.toFixed(2) + ' IsPrimary:' + e.isPrimary + '</p>';
         });
         //Step 3:Pick distribution
         str += '<h2>Step 3:Pick distribution</h2>';
         var acculative = 0;
         intervals.forEach(function (e) {
             acculative += e.Percentage;
             e.acculative = acculative;
         });
         count = Math.min(count, intervals.length);
         do {
             var rnd = Math.random() * acculative;
             var found = intervals.find(function (e) {
                 return e.acculative > rnd;
             });
             if(found!=null){
              if (!selected1.includes(found.Hour)) { selected.push({ Datetime: found.DateTime, Hour: found.Hour,Over:found.Over,Day:date }); selected1.push(found.Hour); }
             }
          } while (selected.length < count);
         intervals.forEach(function (e) {
             if (selected1.includes(e.Hour)) e.isSelected = true;
         });
         str += '<h3>Intervals list:</h3>';
         intervals.forEach(function (e) {
             str += '<p> Hour:' + e.Hour + ' Percentage:' + e.Percentage.toFixed(2) + ' IsPrimary:' + e.isPrimary;
             if (e.isSelected) str += ' Is selected:<input type="checkbox" checked/>';
             str += '</p>';
         });

         //Step 4:Setup alarm
         str += '<h2>Step 4:Setup alarm(omitted)</h2>';

         selected.sort(function (a, b) {
             var dateA = new Date(a.Datetime), dateB = new Date(b.Datetime); return dateA - dateB;
         });
         return { Selected: selected, LogInfo: str };

     }
 function convertToDateTime(str) {
        var v = str.split(':');
        var h = v[0];
        var m = v[1];
        var s = v[2];
        var d = new Date(); d.setHours(h); d.setMinutes(m); d.setSeconds(s);
        return d;
    }
 function roundUp(time) {
        var v = time.split(':');
        var r = v[0]; var isSharp = true;
        if (v[1] > 0 || v[2] > 0) {
            r++; isSharp = false;
        }
       // return {Hour:parseInt(r),IsSharp:isSharp};
       return parseInt(r);
    }
 function roundDown(time) {
        var v = time.split(':');
        var isSharp = true;
        if (v[1] > 0 || v[2] > 0)isSharp = false;
      //  return { Hour: parseInt(v[0]), IsSharp: isSharp };
      return parseInt(v[0]);
    }
 function isWeekendDay(date) {
            //   date = new Date(date.toString().replace(/-/g, '\/'));
            var day = date.getDay();
            var isWeekend = (day === 6) || (day === 0);
            return isWeekend;
        }
 function getFollowingDays(currentDay, lastDay, includeCurrentDay,maxDays=4,nightShiftUpdate=false) {
       //  var date = new Date(currentDay.toString().replace(/-/g, '\/'));
       var date = new Date(currentDay);
       date.setHours(0); date.setMinutes(0); date.setSeconds(0); date.setMilliseconds(0);
       if (nightShiftUpdate) date.setDate(date.getDate()-1);
       if (lastDay == null) { lastDay = new Date(date); lastDay.setDate(date.getDate()+29); }
       else lastDay = new Date(lastDay);  //new Date(lastDay.toString().replace(/-/g, '\/'));
       if (!includeCurrentDay) date.setDate(date.getDate() + 1);
       var days = [];
       if (date > lastDay) return days;
       var timeDiff = (lastDay -date);
       var ds = timeDiff / (1000 * 60 * 60 * 24);
       var count = Math.min(maxDays,ds);
       for (var i = 0; i < count; i++) {
           var day = new Date(date);
           day.setDate(date.getDate() + i);
           days.push(day);
       }
       return days;
  }
 function getNextDay(date){
     var temp=new Date(date);temp.setHours(0);temp.setMinutes(0);temp.setSeconds(0);temp.setMilliseconds(0);
     var date1 = new Date(temp);var nextDay = date1.setDate(temp.getDate() + 1);
     return date1;
 }
 function getNonPassedCountOfADay(datetime) {  //This approach is socomplecated, use getAffectedDay approach
     var count = 0;let hour=23;let firstMatch=true;
     let list =global.schedules;
     let list1=[];
     let cur=new Date(datetime);cur.setHours(0);cur.setMinutes(0);cur.setSeconds(0);cur.setMilliseconds(0);
     list.forEach(function (l) {
                if (+l.Day == +cur && l.Datetime>datetime) {
                    count++;
                    if(firstMatch){hour=l.Hour;firstMatch=false;}
                }
     });
     return {Count:count,Hour:hour};
 }
 function getAffectedDay(datetime,countNum) {
         let result = null; let currPassed = [];
         let list =global.schedules;
         let fday = list[0]; let lday = list[list.length - 1];
         let fd = new Date(list[0].Datetime); let ld = new Date(list[list.length - 1].Datetime);
         let curDay = new Date(datetime); curDay.setHours(0); curDay.setMinutes(0); curDay.setSeconds(0); curDay.setMilliseconds(0);
         var found = list.find(function (l) {
             return l.Datetime > datetime;
         });
         if (found != null) {
             let sch = found.Day; let index = list.indexOf(found);
             if (sch > curDay && list[0].Day > curDay) {
                 let pnum = global.curDayPassed.length;
                 result = { AffectedDay: curDay, PassedCount: pnum, PassedList: currPassed };
                 return result;
             }
             let count = 0;
             list.forEach(function (l) {
                 if (+l.Day == +sch && +l.Datetime <= +datetime) count++;
             });
             let ddd = parseInt((sch - fday.Day) / (1000 * 60 * 60 * 24), 10);
             if (ddd > 1) {
                 result = { AffectedDay: sch, PassedCount: count, PassedList: currPassed };
             }
             else if (ddd == 1) {
                 let prev = list[0];
                 if (index > 0) prev = list[index - 1];
                 if (+prev.Day != +fday.Day) {
                     result = { AffectedDay: sch, PassedCount: count, PassedList: currPassed };
                 }
                 else {
                     let numUpdate = index;//update index;
                     if (global.curDayPassed != null) numUpdate += global.curDayPassed.length;
                     for (let i = 0; i < index; i++)currPassed.push(list[i]);
                     result = { AffectedDay: prev.Day, PassedCount: numUpdate, PassedList: currPassed };
                 }
             }
             else if (ddd == 0) {
                 let numUpdate = count;//update index;
                 if (global.curDayPassed != null) numUpdate += global.curDayPassed.length;
                 for (let i = 0; i < index; i++)currPassed.push(list[i]);
                 result = { AffectedDay: sch, PassedCount: numUpdate, PassedList: currPassed };
             }
         }
         else {
             if (datetime > ld) {//datetime
                 if (+curDay == +lday.Day) {
                     count = 0;
                     list.forEach(function (l) {
                         if (+l.Day == +curDay && +l.Datetime <= +datetime) { count++; currPassed.push(l.Datetime); }
                     });
                     let numUpdate = count;//update index;
                     if (global.curDayPassed != null) numUpdate += global.curDayPassed.length;
                     result = { AffectedDay: curDay, PassedCount: numUpdate };
                 } else {
                     result = { AffectedDay: curDay, PassedCount: 0, PassedList: currPassed };
                 }
                 //let tomorrow = new Date(currentDateTime); tomorrow.setDate(tomorrow.getDate() + 1); tomorrow.setHours(0); tomorrow.setMinutes(0); tomorrow.setSeconds(0); tomorrow.setMilliseconds(0);
                 //result = { AffectedDay: tomorrow, PassedCount:0 };
             }
             if (datetime < fd) result = { AffectedDay: curDay, PassedCount: 0, PassedList: currPassed};//shouldn't happen
         }
         return result;
     }
 function filterListByDate(date,list) {
            date = new Date(date.toString().replace(/-/g, '\/'));
            var date1 = new Date(date); date1.setHours(hour); date1.setMinutes(0); date1.setSeconds(0);
            var date2 = new Date(date); date2.setHours(24); date2.setMinutes(0); date2.setSeconds(0);
            var list1 = [];
            list.forEach(function (l) {
                //debugger;
                //var a = +l; var b = +date1; var c = l.getTime(); var d = date1.getTime();
                if (+l >= +date1 && l < date2)
                    list1.push(l);
            })
            return list1;
        }
 export function checkInSchedule(datetime){
    let result = false;
    let list =global.schedules;
    if (list.length > 0) {
         var d1 = new Date(list[0].Datetime); d1.setHours(0);d1.setMinutes(0);d1.setSeconds(0);d1.setMilliseconds(0);
         var d2 = new Date(list[list.length - 1].Datetime); d2.setHours(0);d2.setMinutes(0);d2.setSeconds(0);d2.setMilliseconds(0);
         var d = new Date(datetime);  d.setHours(0);d.setMinutes(0);d.setSeconds(0);d.setMilliseconds(0);console.log(d.toString());
       //  if (+d >= +d1 && +d <= +d2) result = true;
         if (+d <= +d2) result = true;
    }
    return result;
 }
 function getStartDay(){
    let list =global.schedules; let s=list[list.length - 1];
    var d2 = new Date(s.Day); d2.setHours(0);d2.setMinutes(0);d2.setSeconds(0);d2.setMilliseconds(0);
    d2.setDate(d2.getDate()+1);
    return d2;
 }
 function getNecessary(datetime){  //datetime is in period:datetime< last schedule day
      let result=false;let moredays=0;
      let list =global.schedules; let s=list[list.length - 1];
      var d1 = new Date(datetime); d1.setHours(0);d1.setMinutes(0);d1.setSeconds(0);d1.setMilliseconds(0);
      var d2 = new Date(s.Day); d2.setHours(0);d2.setMinutes(0);d2.setSeconds(0);d2.setMilliseconds(0);
      var d3=new Date(d1);d3.setDate(datetime.getDate()+3);
      if(d3>global.lastDate)d3=global.lastDate;
      if(d3>d2){
         result=true;
         var timeDiff =Math.abs(d3 -d2);
         var ds = timeDiff / (1000 * 60 * 60 * 24);
         moredays=Math.min(ds,4)
      }
      return {Necessary:result,Days:moredays};
 }
 function updateSchedulesList(schedules,startDatetime){
      let list=[];
      var ds = new Date(startDatetime); ds.setHours(0);ds.setMinutes(0);ds.setSeconds(0);ds.setMilliseconds(0);
      let list1 =global.schedules;let list2=schedules;
      list1.forEach(function(l){
          if(+l.Day>=+ds)list.push(l);
      });
      list2.forEach(function(l){list.push(l);});
      return list;
 }

 function updatePreScheduleList(schedules,datetime, append) {
         let list1 = global.schedules;
         let list2 = schedules;
         let list3 = [];
         let curDay = new Date(datetime); curDay.setHours(0); curDay.setMinutes(0); curDay.setSeconds(0); curDay.setMilliseconds(0);
         if (append) {
             list1.forEach(function (l, index) {
                 if (+l.Day >= +curDay) list3.push(l);
             });
             global.curDayPassed = []; AsyncStorage.setItem('CurDayPassed',JSON.stringify(global.curDayPassed));
         }
         else {
             list1.forEach(function (l, index) {
                 if (+l.Day == +curDay && +l.Datetime <= +datetime) list3.push(l);
             });
             if (global.curDayPassed.length > 0) {
                 list3 = list3.filter(function (el) {
                     return global.curDayPassed.indexOf(el) < 0;
                 });
             }
         }
         global.schedules = list3.concat(list2); AsyncStorage.setItem('Schedules',JSON.stringify(global.schedules));
         AsyncStorage.setItem('CurDayPassed',JSON.stringify(global.curDayPassed));
     }
 function updateCurDayPassed(passedList) {
     var list = global.curDayPassed.concat(passedList.filter((item) =>  global.curDayPassed.indexOf(item) < 0))
      global.curDayPassed = list.sort(function (a, b) { return a.Datetime - b.Datetime });
     AsyncStorage.setItem('CurDayPassed',JSON.stringify(global.curDayPassed));
 }

 export async function testSchedule(){
     let permission=await askPermissions();if(!permission)return;
     cancellAllSchedules();
    let schedules=[];
    let current=new Date();
    for(var i=0;i<2;i++){
       let d=new Date(current);d.setMinutes(current.getMinutes()+i+1);
       schedules.push(d);
    }
    let d5=new Date(schedules[schedules.length-1]);d5.setMinutes(d5.getMinutes()+2);
    let title='test1';let message='message1';let message2='warning message';
    schedules.forEach(async function(s,index){
           let ttt=title+index;console.log('ddd:'+s);
           let notificationId=await setupNotification(s,ttt,message);
           console.log('notificationId:'+notificationId+' dt:'+s);
      });
     let warningNotificationId=await setupWarning(d5,'Waaaaarrrrrnnnning',message2);
     console.log('warningId:'+warningNotificationId+' dt:'+d5);global.warningNotificationId=warningNotificationId;
 }
 export function validateSetting(awakeHour,sleepHour,count){
     if(awakeHour==sleepHour)return 1;
     result=0;
     let awake=roundUp(awakeHour); let sleep=roundDown(sleepHour);
     let awakeInterval = sleep - awake; if (awake > sleep) awakeInterval += 24;
     if(count<2 || count>5)result=4;//never happen,
     if (awakeInterval<3)result=1;
     return result;
 }
 export async function sendRateAppNotification(){
     let msg=resources.getString("rateAppMsg"); let title=resources.getString("notifications");
     if (Platform.OS === 'android')msg+=' Google Play Store.';
     else msg+=' App Store.';
     let dt=new Date();dt.setHours(dt.getHours()+1);
     let notificationId=await setupWarning(dt,title,msg);

 }
