import React, { useState } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Appearance } from 'react-native-appearance';
import { resources } from '../../GlobalResources';
import { DepthDataAccuracy } from "expo/build/AR";

const TimePicker = (props) => {

  // state ={
  //   locale:"en_GB"
  // }
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  isDarkModeEnabled = Appearance.getColorScheme() === 'dark'
  
  const hideTimePicker = () => {
    props.cancelHandler();
  };
   let times=props.time.split(':');
   let date=new Date(); date.setHours(parseInt(times[0])); date.setMinutes(parseInt(times[1])); date.setSeconds(0); date.setMilliseconds(0);
  const handleConfirm = time => {
    if (global.debugMode) console.log("A time has been picked: ", time);

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
 const NameDisplay = React.memo(function () {
  return  <View>
                 <DateTimePickerModal

                     mode={"time"}
                     isDarkModeEnabled={isDarkModeEnabled}
                     isVisible={props.isVisible}

                     //android props
                     is24Hour={resources.getString("Is24hours")} //this in case we need to have 24 hours clock for android is24Hour={true}
                     display='spinner'
                     date={date}

                     //ios props
                     headerTextIOS = {resources.getString("timepicker.title")}
                     cancelTextIOS = {resources.getString("timepicker.canceltext")}
                     confirmTextIOS = {resources.getString("timepicker.confirmtext")}

                     //handler
                     onConfirm={handleConfirm}
                     onCancel={hideTimePicker}
                    
                    //locale={TimePickerlanguage.value=="fr"? "en_GB":""}
                     locale={resources.getString("Local24")}
                 />
             </View>;
},[props.isVisible]);

  return (
   <NameDisplay />

  );
};

const styles = StyleSheet.create({
    input:{borderWidth: 1, width:100, paddingLeft: 4},
    label:{color:'black', fontSize: 16, padding:10, alignItems: "flex-start"}
  });

export default TimePicker;


