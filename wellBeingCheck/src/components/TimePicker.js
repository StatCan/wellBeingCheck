import React, { useState } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Appearance } from 'react-native-appearance'

const TimePicker = (props) => {

  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  isDarkModeEnabled = Appearance.getColorScheme() === 'dark'

 const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = time => {
    if (global.debugMode) console.log("A time has been picked: ", time);

    // Round up the hours then set minutes to 0
    time.setHours(time.getHours() + Math.round(time.getMinutes()/60));
    time.setMinutes(0);

    var options = { hour12: false, hour: '2-digit', minute:'2-digit'};
   
    if (props.timeType === "wakeTime"){
      if (global.debugMode) console.log("The timetype is: " + props.timeType);
      props.handler(time.toLocaleTimeString([], options));
    } else if (props.timeType === "sleepTime") {
      if (global.debugMode) console.log("The timetype is: " + props.timeType);
      props.handler(time.toLocaleTimeString([], options));
    }

    hideTimePicker();
  };

  return (
    <View>
        <Text style={styles.label} onPress={showTimePicker}>{props.time}</Text>
        <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            isDarkModeEnabled={isDarkModeEnabled}
            onConfirm={handleConfirm}
            onCancel={hideTimePicker}
        />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center"
    },
    input:{borderWidth: 1, width:100, paddingLeft: 4},
    label:{color:'black', fontSize: 16, padding:10}
  });

export default TimePicker;