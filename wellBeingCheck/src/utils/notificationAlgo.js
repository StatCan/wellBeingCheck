
import { Notifications } from "expo";

// Num Pings
const options = [
  {
    key: 2,
    text: '2',
  },
  {
    key: 3,
    text: '3',
  },
  {
    key: 4,
    text: '4',
  },
  {
    key: 5,
    text: '5',
  },
];

// Methodology: Selection Probabilities
// For Weekdays and Weekends
const primeTimeAwakeIntervals = [
{ 
  awakeHourBefore: 16,
  weekDayPercentage: 5,  // A
  weekendPercentage: 5   // F
},
{ 
  awakeHourBefore: 17,
  weekDayPercentage: 10, // B
  weekendPercentage: 10  // G
},
{ 
  awakeHourBefore: 18,
  weekDayPercentage: 10, // C
  weekendPercentage: 10  // H
},
{ 
  awakeHourBefore: 19,
  weekDayPercentage: 25, // D
  weekendPercentage: 20  // I
},
{ 
  awakeHourBefore: 20,
  weekDayPercentage: 25, // E
  weekendPercentage: 20  // J
}];

var scheduledDateArray = new Array();

// Unit Test the Scheduling Algorithm
// awakeHour: Default is 6h or 6am
// sleepHour: Default is 22h or 10pm

export function notificationAlgo(awakeHour = 6, sleepHour = 22, numPings = 5) {

  awakeHour = parseInt(awakeHour.substring(0, 2));
  sleepHour = parseInt(sleepHour.substring(0, 2));

  if (global.debugMode) console.log("Awake Hour is: " + awakeHour);
  if (global.debugMode) console.log("Sleep Hour is: " + sleepHour);

  // Clear existing notifications
  Notifications.cancelAllScheduledNotificationsAsync()

  // Based on defaults awakeInterval is 16
  awakeInterval = sleepHour - awakeHour;

  if (numPings > 5 || numPings < 2) {
    if (global.debugMode) console.log("numPings has an invalid value");
    return;
  }

  // Safety Check
  if (numPings > awakeInterval) numPings = awakeInterval;

  if (awakeHour > sleepHour) awakeInterval = awakeHour + 24;

  // Now come up with a time to set notifications to

  var awakeOneHourTimeIntervalsBefore = [];
  var awakeOneHourTimeIntervalsAfter = [];

  for (i = 0; i <= awakeInterval; i++) {
    awakeOneHourTimeIntervalsBefore[i] = awakeHour + (i - 1);
    awakeOneHourTimeIntervalsAfter[i] = awakeHour + i;
  }

  // For testing purposes print to console
  if (global.debugMode) console.log("One Hour Time Intervals i.e. 6h to 7h");
  if (global.debugMode) console.log(awakeOneHourTimeIntervalsBefore);
  if (global.debugMode) console.log(awakeOneHourTimeIntervalsAfter);

  var chosenHoursBefore = [];

  // Schedule for the next 30 days
  // For testing purposes, day set to a few days
  for (day = 0; day < 30; day++) {

    // Now choose number of random hours based on number of pings
    for (i = 0; i < numPings; i++ ){
      chosenHoursBefore[i] = awakeOneHourTimeIntervalsBefore[Math.floor(Math.random() * awakeOneHourTimeIntervalsBefore.length)];
      while (checkForDuplicates(chosenHoursBefore)){
          chosenHoursBefore[i] = awakeOneHourTimeIntervalsBefore[Math.floor(Math.random() * awakeOneHourTimeIntervalsBefore.length)];
      }
    }

    if (global.debugMode) console.log("Chosen One Hour Time Intervals for Day: " + day);
    if (global.debugMode) console.log(chosenHoursBefore);

    // TODO:  Have randomization between 'Before' and 'After' time intervals
    // i.e. Between 6h and 7h (currently set to on the hour above)

    // Now schedule for each day the chosen random hours
    chosenHoursBefore.forEach(item => {
      this.scheduleNotificationBasedOnTime(item, day);
    });
  }
}

function checkForDuplicates(array) {
  var values = Object.create(null);
  for (var i = 0; i < array.length; ++i) {
      var value = array[i];
      if (value in values) {
          return true;
      }
      values[value] = true;
  }
  return false;
}

export function scheduleNotification20s() {
  if (global.debugMode) console.log("Scheduling Test Notification 20s");
  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('chat-messages', {
      name: 'Chat messages',
      sound: true,
      vibrate: true,
    });
  }
  let notificationId = Notifications.scheduleLocalNotificationAsync(
    {
      title: "Scheduled Notification",
      body: "Scheduled Notification 20s",
      ios: { sound: true },
      android: {
        "channelId": "chat-messages"
      }
    },
    {
      time: new Date().getTime() + 20000
    }
  );

  if (global.debugMode) console.log(notificationId);
};

scheduleNotificationBasedOnTime = async (hour, day) => {
  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('survey-messages', {
      name: 'Survey messages',
      sound: true,
      vibrate: true,
    });
  }

  if (global.debugMode) console.log("The current date is: " + Date.now());

  var currentDate = new Date();
  var currentYear = currentDate.getUTCFullYear();
  var currentMonth = currentDate.getUTCMonth();
  var currentDay = currentDate.getUTCDate();
  var currentHour = currentDate.getUTCHours();

  // Round up the minutes, seconds and milliseconds as per requirements
  // Add day and hour offset
  scheduledTime = new Date(currentYear, currentMonth, currentDay + day, currentHour + hour, 0, 0, 0);

  //We can do it this way as well but less control
  //scheduledTime = new Date().getTime() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * day + 1000 * 60 * hour;

  if (global.debugMode) console.log("Scheduling a notification for: " + scheduledTime);

  scheduledDateArray.push(scheduledTime);

  let notificationId = Notifications.scheduleLocalNotificationAsync(
    {
      title: "Scheduled Notification",
      body: "Scheduled Notification for the Survey!",
      ios: { sound: true },
      android: {
        "channelId": "survey-messages"
      }
    },
    {
      time: scheduledTime
    }
  );
  if (global.debugMode) console.log(notificationId);
};
