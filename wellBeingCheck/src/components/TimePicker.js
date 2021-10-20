/** @format */

import React, { useState } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Appearance } from "react-native-appearance";
import { resources } from "../../GlobalResources";
//import { DepthDataAccuracy } from "expo/build/AR";

const TimePicker = (props) => {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  isDarkModeEnabled = Appearance.getColorScheme() === "dark";

  const hideTimePicker = () => {
    props.cancelHandler();
  };
  let times = props.time.split(":");
  let date = new Date();

  var contains = function (haystack, needle) {
    return !!~haystack.indexOf(needle);
  };

  if (contains(times[1], "p") || contains(times[1], "P")) {
    var pmTime = times[0];
    console.log("ttttt----this the add fonction2222", pmTime);
    times[0] = parseInt(pmTime) + 12;
    console.log("1111111111----this the add after update", times[0]);
  }

  date.setHours(parseInt(times[0]));

  console.log("0- timer props ;", props);
  console.log("1- timer times ;", times);
  console.log("3- timepicker    times[0]));", times[0]);

  date.setMinutes(parseInt(times[1]));
  date.setSeconds(0);
  date.setMilliseconds(0);

  const handleConfirm = (time) => {
    if (global.debugMode) console.log("A time has been picked: ", time);
    //var options = { hour12: false, hour: "2-digit", minute: "2-digit" };

    if (resources.culture == "fr") {
      var options = { hour12: false, hour: "2-digit", minute: "2-digit" };
      console.log("--------------------this is a french language");
    } else {
      var options = { hour12: true, hour: "2-digit", minute: "2-digit" };
      console.log("--------------------this is a english language");
    }

    if (props.timeType === "wakeTime") {
      if (global.debugMode)
        console.log("The timetype is wake time: " + props.timeType);
      props.handler(time.toLocaleTimeString([], options));
    } else if (props.timeType === "sleepTime") {
      if (global.debugMode)
        console.log("The timetype is sleep time: " + props.timeType);
      props.handler(time.toLocaleTimeString([], options));
    }
    //  hideTimePicker();
  };
  const NameDisplay = React.memo(
    function () {
      return (
        <View>
          <DateTimePickerModal
            mode={"time"}
            isVisible={props.isVisible}
            //android props
            is24Hour={resources.culture == "fr" ? true : false} //this in case we need to have 24 hours clock for android is24Hour={true}
            display="spinner"
            date={date}
            //ios props
            headerTextIOS={resources.getString("timepicker.title")}
            cancelTextIOS={resources.getString("timepicker.canceltext")}
            confirmTextIOS={resources.getString("timepicker.confirmtext")}
            //handler
            onConfirm={handleConfirm}
            onCancel={hideTimePicker}
            //locale={TimePickerlanguage.value=="fr"? "en_GB":""}
            locale={resources.getString("Local24")}
          />
        </View>
      );
    },
    [props.isVisible]
  );

  return <NameDisplay />;
};

const styles = StyleSheet.create({
  input: { borderWidth: 1, width: 100, paddingLeft: 4 },
  label: {
    color: "black",
    fontSize: 16,
    padding: 10,
    alignItems: "flex-start",
  },
});

export default TimePicker;
