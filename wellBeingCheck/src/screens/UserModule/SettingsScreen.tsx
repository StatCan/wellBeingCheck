import React, {memo, useState, useCallback} from 'react';
import {
  Picker,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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

  render() {
    return (
      <View>
        <View style={styles.toolbar}>
          <BackButton goBack={() => this.props.navigation.navigate('Dashboard')}/>
          <Text style={styles.toolbarTitle}>Settings</Text>
        </View>

        <List.Section style={styles.mainStyle}>
          <List.Item
            title="Notifications"
            left={() => <List.Icon icon="bell-alert"/>}
            right={() => <Switch
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
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text style={styles.label}>Wake Time:</Text>
          <TimePicker time={this.state.waketime} timeType="wakeTime" handler = {this.wakeTimeHandler} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text style={styles.label}>Sleep Time:</Text>
          <TimePicker time={this.state.sleeptime} timeType="sleepTime" handler = {this.sleepTimeHandler} />
        </View>
        <Text style={[styles.label,{marginLeft:60}]}>Notification number per day:</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
          <Text style={styles.label}>Language:</Text>
          <Picker  
                    selectedValue={this.state.culture}
                    onValueChange={c => this.setState({culture:c})}
                    style={{ width: 100, height:100, marginBottom:20, justifyContent:'space-around' }}
                    mode="dropdown">
                    <Picker.Item label="English" value="1" />
                    <Picker.Item label="French" value="2" />
          </Picker>
        </View>
        </List.Section>

        <Button mode="contained" onPress={this._debugClearAllLocalData}>
          (Debug) -- Delete user account
        </Button>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainStyle: {
    marginTop: 0
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
  label:{color:'black', fontWeight:'900', fontSize: 14, padding:10}
});

export default memo(SettingsScreen);
