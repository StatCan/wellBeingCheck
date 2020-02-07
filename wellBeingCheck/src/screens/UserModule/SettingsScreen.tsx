import React, {memo, useState, useCallback} from 'react';
import {
  Picker,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Switch
} from 'react-native';
import {AsyncStorage} from 'react-native';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import {newTheme} from '../../core/theme';
import {List, Divider} from 'react-native-paper';
import TimePicker from '../../components/TimePicker'
import NotificationAlgo from '../../utils/notificationAlgo'
import { Notifications } from "expo";
import * as Permissions from 'expo-permissions';

var scheduledDateArray = new Array();

import {NavigationParams, NavigationScreenProp, NavigationState} from 'react-navigation';

type SettingsState = {
  notificationState: boolean,
  notification: boolean, 
  waketime: string, 
  sleeptime: string, 
  notificationcount: number, 
  culture: string 
}

interface Props {
  navigation : NavigationScreenProp < NavigationState,
  NavigationParams >;
}

class SettingsScreen extends React.Component < Props, SettingsState > {

  constructor(SettingsState) {
    super(SettingsState)
    this.state = {
      notificationState: true,
      notification: true, 
      waketime: '08:00', 
      sleeptime: '21:00', 
      notificationcount: 5, 
      culture: 'English' 
    };
    this.wakeTimeHandler = this.wakeTimeHandler.bind(this);
    this.sleepTimeHandler = this.sleepTimeHandler.bind(this);
  }

  wakeTimeHandler(time) {
    this.setState({
      waketime: time
    })
  }

  sleepTimeHandler(time) {
    this.setState({
      sleeptime: time
    })
  }

  askPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      if (global.debugMode) console.log("Notifications Permission Not Granted");
      return false;
    }
    if (global.debugMode) console.log("Notifications Permission Granted");
    return true;
  };

  componentDidMount() {

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.

    if (global.debugMode) console.log("DEBUGMODE ON - Outputting Console Logs");
    if (global.debugMode) console.log("Settings Screen Component Mounted");
    this.askPermissions();
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    if (global.debugMode) console.log("Notification was clicked - navigating to Survey");
    this.props.navigation.navigate('CurrentEQ');
  };

  _debugClearAllLocalData() {
    try {
      AsyncStorage.removeItem('user_account', (err) => {
        console.log("user account deleted");
        console.log(err);
        console.log("all data cleared");
      });
      AsyncStorage.removeItem('EsmUserToken');AsyncStorage.setItem('EsmSurveyACode','none'); AsyncStorage.removeItem('EsmCulture')
      AsyncStorage.removeItem('user_terms_and_conditions', (err) => {
        console.log("user terms deleted");
        console.log(err);
        console.log("all data cleared");
      });
      AsyncStorage.removeItem('user_getting_started', (err) => {
        console.log("user getting started deleted");
        console.log(err);
        console.log("all data cleared");
      });
      alert("all data cleared");    
    } catch (error) {
    }
  }

  _backButtonPressed(){

    if (debugMode) console.log("Back button Pressed");

    if(this.state.culture==2) resources.culture ='fr';
    else resources.culture ='en';

    if (global.debugMode) console.log("Platform version: " + Platform.Version);
    if (global.debugMode) console.log("Device Name: " + Expo.Constants.deviceName);
    if (global.debugMode) console.log("Native App Version: " + Expo.Constants.nativeAppVersion);
    if (global.debugMode) console.log("Native Build Version: " + Expo.Constants.nativeBuildVersion);
    if (global.debugMode) console.log("Device Year Class: " + Expo.Constants.deviceYearClass);
    if (global.debugMode) console.log("Session ID: " + Expo.Constants.sessionId);
    if (global.debugMode) console.log("Wake Time: " + this.state.waketime);
    if (global.debugMode) console.log("Sleep Time: " + this.state.sleeptime);
    if (global.debugMode) console.log("Notification Count: " + this.state.notificationcount);
    if (global.debugMode) console.log("Scheduled Notification Times: " + scheduledDateArray);

    this.props.navigation.navigate('Dashboard');
  }

  render() {

    let debugButtons;

    if (global.debugMode){
      debugButtons =         
      (<View style={{alignItems: 'center', marginTop: 20, justifyContent: 'space-around' }}>
        <Button mode="contained" onPress={this._debugClearAllLocalData}>
            (Debug) Delete user account
        </Button>
      </View>);
    }
    return (
      <View>
        <View style={styles.toolbar}>
          <BackButton goBack={() => this._backButtonPressed()}/>
          <Text style={styles.toolbarTitle}>Settings</Text>
        </View>

        <List.Section style={styles.mainStyle}>
          <List.Item
            title="Notifications"
            left={() => <List.Icon icon="bell-alert"/>}
            right={() => <Switch
            style={{margin: 10}}
            value={this.state.notificationState}
            onValueChange={() => {
            this.setState({
              notificationState: !this.state.notificationState
            });
          }}/>}/>
          <Divider></Divider>
          <List.Item
            style={styles.listStyle}
            title="Number of notifications"
          />
          {/* Temporary Implementation */}
          <Picker  
                selectedValue={this.state.notificationcount}
                onValueChange={n => this.setState({notificationcount:n})}
                style={{ width: 100, height:100, marginLeft: 30, marginBottom:40, justifyContent:'space-around' }}
                mode="dropdown">
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
          </Picker>

          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text style={styles.label}>Wake Time:</Text>
            <TimePicker time={this.state.waketime} timeType="wakeTime" handler = {this.wakeTimeHandler} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text style={styles.label}>Sleep Time:</Text>
            <TimePicker time={this.state.sleeptime} timeType="sleepTime" handler = {this.sleepTimeHandler} />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text style={{marginLeft: 38, fontSize: 16, marginTop: 60}}>Language:</Text>
            <Picker  
                selectedValue={this.state.culture}
                onValueChange={c => this.setState({culture:c})}
                style={{ width: 100, height:100, marginBottom:20, marginTop:40, justifyContent:'space-around' }}
                mode="dropdown">
                <Picker.Item label="English" value="1" />
                <Picker.Item label="French" value="2" />
            </Picker>
          </View>
        </List.Section>

        {debugButtons}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainStyle: {
    marginTop: 20
  },
  toolbar: {
    backgroundColor: '#F4D2D1',
    paddingTop: 68,
    paddingBottom: 15,
    flexDirection: 'row'
  },
  toolbarButton: {
    width: 50,
    color: '#fff',
    textAlign: 'center'
  },
  toolbarTitle: {
    color: '#000',
    marginTop: 0,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    flex: 0.60
  },
  listStyle: {
    marginLeft: 60
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  input:{borderWidth:1,width:100,paddingLeft:4},
  label:{
    fontSize: 16,
    marginLeft: 20,
    padding:10
  }
});

export default memo(SettingsScreen);
