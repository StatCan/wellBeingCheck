
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
  var chosenProbability = [];
  var selectionProbabilitiesAwakeHour = new Array(awakeOneHourTimeIntervalsBefore.length);
  var selectionProbabilities24h = new Array(24);
  var remainingProbabilties = 0;

  if (global.debugMode) console.log("Length of selection probabilities array is: " + selectionProbabilities24h.length);

  if (global.debugMode) console.log("Chosen One Hour Time Intervals (24h format):");
  if (global.debugMode) console.log("-----------------------------------------------");

  // Assign hardcoded selection probabilties (out of 100)
  var index = 0;
  primeTimeAwakeIntervals.forEach(element => {
    selectionProbabilities24h[element.awakeHourBefore] = element.weekDayPercentage;
    remainingProbabilties += element.weekDayPercentage;
    if (global.debugMode) console.log("Adding selection probability: " + selectionProbabilities24h[element.awakeHourBefore] + "%" + " at position (24h time): " + element.awakeHourBefore);
  });


  if (global.debugMode) console.log("Output of selection probabilities array is: " + selectionProbabilities24h);

  if (global.debugMode) console.log("Length of selection probabilities array is: " + selectionProbabilities24h.length);
  remainingProbabilties = 100 - remainingProbabilties;

  if (global.debugMode) console.log("Probabilities remaining to be allocated: " + remainingProbabilties + "%");

  // Now only allocate to empty areas in union with the awake Interval
  for (i = 0; i < selectionProbabilities24h.length; i++ ){
    if (awakeOneHourTimeIntervalsBefore.includes(i)){
      if (selectionProbabilities24h[i] == null){
        // For now, limit awakeHour
        selectionProbabilities24h[i] = remainingProbabilties/(selectionProbabilitiesAwakeHour.length - primeTimeAwakeIntervals.length);
      }
    }
  }
  // 0 to 21h
  if (global.debugMode) console.log("The selection probability array is: " + selectionProbabilities24h);

  // Validate
  var sum = 0;
  selectionProbabilities24h.forEach(element => {
    sum += element;
  });

  if (global.debugMode) console.log("Validate:  The sum of the selection probability array is: " + sum);
  // Schedule for the next 30 days
  // For testing purposes, day set to a few days

  for (day = 0; day < 2; day++) {
    // For each ping, choose a number between 0-100 which would then fall in the array
    for (i = 0; i < numPings; i++ ){
      chosenProbability[i] = Math.floor(Math.random() * 100);

      while (checkForDuplicates(chosenProbability)){
        chosenProbability[i] = Math.floor(Math.random() * 100);
      }

      var marginalSum = 0;
      var done = false;
      
      for (j = 0; j < selectionProbabilities24h.length; j++) {
        // Keep adding to marginalSum until it exceeds chosenProbability[i] so then we know which hour to choose
        if (selectionProbabilities24h[j] != null) {
          marginalSum += selectionProbabilities24h[j];
        }
        if (marginalSum > chosenProbability[i] && !done) {
          chosenHoursBefore[i] = j;
          while (checkForDuplicates(chosenHoursBefore)){
            chosenHoursBefore[i] = awakeOneHourTimeIntervalsBefore[Math.floor(Math.random() * awakeOneHourTimeIntervalsBefore.length)];
          }
          done = true;
        }
      }
    }

    var outputDay = day + 1;

    if (global.debugMode) console.log("Chosen Probabilities (0-100) for Day: " + outputDay);
    if (global.debugMode) console.log(chosenProbability);
    
    if (global.debugMode) console.log("Chosen Hours for Day: " + outputDay);
    if (global.debugMode) console.log(chosenHoursBefore);

    // Now schedule for each day the chosen random hours
    chosenHoursBefore.forEach(item => {
      this.scheduleNotificationBasedOnTime(item, day);
    });
  }
};

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
