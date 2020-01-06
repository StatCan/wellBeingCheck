
import { Notifications } from "expo";

// Unit Test the Scheduling Algorithm
// awakeHour: Default is 6h or 6am
// sleepHour: Default is 22h or 10pm

export function notificationAlgo(awakeHour = 6, sleepHour = 22) {

    // Clear existing notifications
    Notifications.cancelAllScheduledNotificationsAsync()

    numPings = this.state.notificationcount;

    // Based on defaults awakeInterval is 16
    awakeInterval = sleepHour - awakeHour;

    if (numPings > 5 || numPings < 2) console.log("numPings has an invalid value")

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
    console.log("One Hour Time Intervals i.e. 6h to 7h");
    console.log(awakeOneHourTimeIntervalsBefore);
    console.log(awakeOneHourTimeIntervalsAfter);

    var chosenHoursBefore = [];

    // Schedule for the next 30 days

    for (day = 0; day < 31; day++) {

        // Now choose number of random hours based on number of pings
        for (i = 0; i < numPings; i++ ){
            chosenHoursBefore[i] = Math.floor(Math.random() * awakeOneHourTimeIntervalsBefore.length);
        }

        console.log("Chosen One Hour Time Intervals for Day: " + day);
        console.log(chosenHoursBefore);

        // TODO:  Have randomization between 'Before' and 'After' time intervals
        // i.e. Between 6h and 7h (currently set to on the hour above)


        // Now schedule for each day the chosen random hours
        chosenHoursBefore.forEach(item => {
            this.scheduleNotificationBasedOnTime(item, day);
        });
    }
}

scheduleNotificationBasedOnTime = async (hour, day) => {
    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('survey-messages', {
        name: 'Scheduled Notification for the Survey!',
        sound: true,
        vibrate: true,
      });
    }

    // TODO: Change this to an actual time not just hours in the future
    scheduledTime = new Date().getTime() + day + hour * 60 * 1000;

    console.log("Scheduling a notification for: " + scheduledTime);

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
    console.log(notificationId);
  };
