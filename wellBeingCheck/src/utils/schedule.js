import { Notifications } from "expo";
import { AsyncStorage } from 'react-native';
import * as Permissions from 'expo-permissions';

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
setupNotification = async (datetime,title,message) => {
  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('survey-messages', {
      name: 'Survey messages',
      sound: true,
      vibrate: true,
    });
  }
  scheduledTime = new Date(datetime);
  let notificationId = Notifications.scheduleLocalNotificationAsync(
    {
      title: title,
      body: message,
      ios: { sound: true },
      android: {
        "channelId": "survey-messages"
      }
    },
    {
      time: scheduledTime
    }
  );
  if (global.debugMode) console.log('set notification:'+notificationId);
  return notificationId;
};
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
    }
    if (finalStatus !== "granted") {
      // In final status, we asked for permission of the OS and we were denied, so we need to ask
      if (global.debugMode) console.log("Notifications Permission Not Granted");
      Notifications.cancelAllScheduledNotificationsAsync();
    }else{
      if (global.debugMode) console.log("Notifications Permission Granted");
      result=true;
    }
    return result;
  };
export function cancellAllSchedules(){
     Notifications.cancelAllScheduledNotificationsAsync();
}
export function cancelSchedule(localNotificationId){
    Notifications.cancelScheduledNotificationAsync(localNotificationId);
}
export function setupSchedules(affectCurrent=false){
    let title="Scheduled Notification";
    let message="Scheduled Notification for the Survey!";
    let lastMessage="We haven’t heard from you in a while. Sign in for a Well-being Check!/Nous n’avons pas eu de vos nouvelles depuis un certain temps. Connectez-vous pour obtenir un Bilan bien-être!";
    let schedules = [];let currentDateTime=new Date();console.log('current date:'+currentDateTime);
    let today=new Date(currentDateTime);today.setHours(0);today.setMinutes(0);today.setSeconds(0);today.setMilliseconds(0);
    let currentTime=roundUp(currentDateTime.toLocaleTimeString());
    let awake=roundUp(global.awakeHour); let sleep=roundDown(global.sleepHour);let count=global.pingNum;console.log('LastDate:'+global.lastDate);
    if(global.lastDate==null){   //Survey A
         let lastDate=new Date(currentDateTime);  console.log('SURVEY aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
         lastDate.setDate(currentDateTime.getDate()+30);lastDate.setHours(0);lastDate.setMinutes(0);lastDate.setSeconds(0);lastDate.setMilliseconds(0);
         let days = getFollowingDays(currentDateTime,lastDate,true);console.log('days:'+days);
         let day5=getNextDay(currentDateTime);console.log('ccccc:'+currentDateTime);

         if(days.length>0){
            day5=getNextDay(days[days.length-1]); console.log('day5:'+day5);
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
         if(schedules.length>0){
             let perm=askPermissions();
             if(!perm){alert("denied");return;}
             schedules.forEach(function(s){
                console.log(s.Datetime.toString());
                setupNotification(s.Datetime,title,message);
             });
             let dt=new Date(day5);dt.setHours(10);
             let warningNotificationId=setupNotification(dt,title,lastMessage);
              var l=lastDate.toString();console.log('aaaaaaaaaaaaaaaaa:'+l);
             AsyncStorage.setItem('LastDate',lastDate.toString());
             AsyncStorage.setItem('WarningNotificationId',warningNotificationId);global.warningNotificationId=warningNotificationId;
             global.lastDate=lastDate;
             AsyncStorage.setItem('Schedules',JSON.stringify(schedules));
             global.schedules=schedules;

         }
    }
    else { //Survey B or change setting
        let lastDate=new Date(global.lastDate);console.log('SURVEY bbbbbbbbbbbbb cccccccccccc');
        let isInSchedules=checkInSchedule(currentDateTime);console.log('is in period:'+isInSchedules);
        if(isInSchedules){
            let warningId=global.warningNotificationId;console.log('SURVEY bbbbbbbb  in schedules');
            if(affectCurrent){  //for change setting,  This part is hard core
                let f=getAffectedDay(currentDateTime);  let day5=getNextDay(currentDateTime);console.log('SURVEY affect bbbbbbbbbbbbb');
                if(f==null){  //No affected day, go normal schedule
                    let days = getFollowingDays(currentDateTime,lastDate,true);
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
                    let affectedDay=f.AffectedDay; let leftOverCount=f.LeftOverCount;
                    let days = getFollowingDays(affectedDay,lastDate,true);
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
                    }
                }
                if(schedules.length>0){
                    let perm=askPermissions();
                    if(!perm){alert("denied");return;}
                    cancellAllSchedules();
                    schedules.forEach(function(s){
                        console.log(s.Datetime.toString());
                        setupNotification(s.Datetime,title,message);
                    });
                    let dt=new Date(day5);dt.setHours(10);
                    let warningNotificationId=setupNotification(dt,title,lastMessage);
                    AsyncStorage.setItem('WarningNotificationId',warningNotificationId);global.warningNotificationId=warningNotificationId;
                    AsyncStorage.setItem('Schedules',JSON.stringify(schedules));
                    global.schedules=schedules;
                }
            }
            else{  //for survey B, simply append new schedules
               console.log('current date:'+currentDateTime);
               let nob=getNecessary(currentDateTime);
               let necessary=nob.Necessary;let moredays=nob.Days;
               if(!necessary ||moredays==0){console.log('Already have 4 days schedules, no need to add more');return;}
               //cancelSchedule(warningId);

               let startDay=getStartDay();console.log('SURVEY bbbbbbbb NON affect bbbbbbbbbbbbb');
               if(startDay>global.lastDate)return;
               let days = getFollowingDays(startDay,lastDate,true,moredays);
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
                            }
                 if(schedules.length>0){
                     schedules=updateSchedulesList(schedules,currentDateTime);
                     let perm=askPermissions();
                     if(!perm){alert("denied");return;}
                     cancelSchedule(global.warningNotificationId);
                     schedules.forEach(function(s){
                           console.log(s.Datetime.toString()+"->"+s.Day);
                           setupNotification(s.Datetime,title,message);
                     });
                     let dt=new Date(day5);dt.setHours(10);
                     let warningNotificationId=setupNotification(dt,title,lastMessage);
                     AsyncStorage.setItem('WarningNotificationId',warningNotificationId);global.warningNotificationId=warningNotificationId;

                     AsyncStorage.setItem('Schedules',JSON.stringify(schedules));
                     global.schedules=schedules;
                 }
            }
        }
        else{
             if(today>global.lastDate)return;
             console.log('SURVEY bbbbbbbb  NOT in schedules');
             let days = getFollowingDays(currentDateTime,lastDate,true);
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
             }
             if(schedules.length>0){
                  let perm=askPermissions();
                  if(!perm){alert("denied");return;}
                  cancellAllSchedules();
                  schedules.forEach(function(s){
                      console.log(s.Datetime.toString());
                      setupNotification(s.Datetime,title,message);
                  });
             let dt=new Date(day5);dt.setHours(10);
             let warningNotificationId=setupNotification(dt,title,lastMessage);
             AsyncStorage.setItem('WarningNotificationId',warningNotificationId);global.warningNotificationId=warningNotificationId;
             AsyncStorage.setItem('Schedules',JSON.stringify(schedules));
            global.schedules=schedules;
        }
    }
    }
}
 function calculateSchedule(awakeHour, sleepHour, count, date, current) {
      //The current is the affected day time, if current is in this date, then thisd date will partially schedule
         var selected = []; var selected1 = []; var str = '';
         if (current == null) current = new Date(2020, 1, 1, 0, 0, 0, 0);
         var current1 = new Date(current); current1.setHours(0); current1.setMinutes(0); current1.setSeconds(0); current1.setMilliseconds(0);
         if (date < current1) return { Selected: selected, LogInfo: str };  //if date is early than current date time, return empty directly, because go through will also return empty
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
 function getFollowingDays(currentDay, lastDay, includeCurrentDay,maxDays=4) {
       //  var date = new Date(currentDay.toString().replace(/-/g, '\/'));
          var date = new Date(currentDay);
         date.setHours(0); date.setMinutes(0); date.setSeconds(0); date.setMilliseconds(0);
         if (lastDay == null) { lastDay = new Date(date); lastDay.setDate(date.getDate()+30); }
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
 function getAffectedDay(datetime){
     let result=null;
     let list =global.schedules;
     var found=list.find(function(l){
        return l.Datetime>datetime;
     });
     if(found!=null){
         let sch=found.Day;
         let count=0;
         list.forEach(function(l){
            if (+l.Day == +sch && l.Datetime>datetime)count++;
         });
         result={AffectedDay:sch,LeftOverCount:count};
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
 function getTimePart(date){
    console.log(date.toLocaleTimeString());
    return date.getHours()+':'+date.getMinutes()+':'+d.getSeconds();
 }
 function checkInSchedule(datetime){
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

