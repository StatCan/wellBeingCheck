import React, {memo, useState, useCallback} from 'react';
import {
  Picker,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Switch,
  AsyncStorage
} from 'react-native';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import {newTheme} from '../../core/theme';
import {List, Divider} from 'react-native-paper';
import TimePicker from '../../components/TimePicker'
import {notificationAlgo, scheduleNotification20s} from '../../utils/notificationAlgo'
import { Notifications } from "expo";
import * as Permissions from 'expo-permissions';
import {NavigationParams, NavigationScreenProp, NavigationState} from 'react-navigation';
import { resources } from '../../../GlobalResources';
import { Provider as PaperProvider, Title, Portal, Dialog, RadioButton } from 'react-native-paper';

var scheduledDateArray = new Array();

type SettingsState = {
  notificationState: boolean,
  notification: boolean, 
  waketime: string, 
  sleeptime: string, 
  notificationcount: number, 
  culture: string,
  numPingsModalShow: boolean,
  languageModalShow: boolean,
  wakeTimePickerShow: boolean,
  sleepTimePickerShow: boolean
}

interface Props {
  navigation : NavigationScreenProp < NavigationState,
  NavigationParams >;
}

class SettingsScreen extends React.Component < Props, SettingsState > {
  _notificationSubscription: any;

  wakeTimePickerChild;

  constructor(SettingsState) {
    super(SettingsState)
    this.state = {
      numPingsModalShow: false,
      notificationState: true,
      notification: true, 
      waketime: '08:00', 
      sleeptime: '21:00', 
      notificationcount: 2, 
      culture: '1',
      languageModalShow: false,
      wakeTimePickerShow: false,
      sleepTimePickerShow: false
    };
    this.wakeTimeHandler = this.wakeTimeHandler.bind(this);
    this.sleepTimeHandler = this.sleepTimeHandler.bind(this);
    this.cancelTimeHandler = this.cancelTimeHandler.bind(this);
  }

  wakeTimeHandler(time) {
    this.setState({
      waketime: time
    })
    this.setState({ wakeTimePickerShow: false })
  }

  cancelTimeHandler(time) {
    this.setState({ wakeTimePickerShow: false })
    this.setState({ sleepTimePickerShow: false })
  }

  sleepTimeHandler(time) {
    this.setState({
      sleeptime: time
    })
    this.setState({ sleepTimePickerShow: false })
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

    this._retrieveData('settings');
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
      AsyncStorage.removeItem('EsmUserToken');AsyncStorage.setItem('EsmSurveyACode','none'); AsyncStorage.removeItem('EsmCulture');
      AsyncStorage.removeItem('doneSurveyA');global.doneSurveyA=false;
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

  _backButtonPressed = () => {

    if (global.debugMode) console.log("Back button Pressed");

    notificationAlgo(this.state.waketime, this.state.sleeptime, this.state.notificationcount);

    if(this.state.culture === "2"){
      resources.culture ='fr';
    } else if (this.state.culture === "1"){
      resources.culture ='en';
    }

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

    this._storeSettings();
  }

  _storeSettings = () => {
    //validation passed lets store user
    let settingsObj = {
      notificationState: this.state.notificationState,
      wakeTime: this.state.waketime,
      sleepTime: this.state.sleeptime,
      notificationCount: this.state.notificationcount,
      culture: this.state.culture
    };

    AsyncStorage.setItem('settings', JSON.stringify(settingsObj), () => {
      if (global.debugMode) console.log("Storing Settings: " , settingsObj);

      this.props.navigation.state.params.refresh();
      this.props.navigation.navigate('Dashboard');
    });
  }

  _retrieveData = async (key) => {

    await AsyncStorage.getItem(key, (err, result) => {
      if (global.debugMode) console.log("The result of getItem is: ", result);
      if (result) {
        let resultAsObj = JSON.parse(result);
        this.setState({ notificationState: resultAsObj.notificationState });
        this.setState({ notificationcount: resultAsObj.notificationCount });
        this.setState({ waketime: resultAsObj.wakeTime });
        this.setState({ sleeptime: resultAsObj.sleepTime });
        this.setState({ culture: resultAsObj.culture });
      }
    });
  }

  _changeLanguage(c){

    this.setState({culture:c});
    if (global.debugMode) console.log("Changing language to: " + c);

    if(c === "2"){
      resources.culture ='fr';
    } else if (c === "1"){
      resources.culture ='en';
    }
  }

  _showNumPingsModal = () => this.setState({ numPingsModalShow: true });
  _hideNumPingsModal = () => this.setState({ numPingsModalShow: false });

  _showLanguageModal = () => this.setState({ languageModalShow: true });
  _hideLanguageModal = () => this.setState({ languageModalShow: false });

  _showWakeTimePicker = () => this.setState({ wakeTimePickerShow: true });
  _hideWakeTimePicker = () => this.setState({ wakeTimePickerShow: false });

  _showSleepTimePicker = () => this.setState({ sleepTimePickerShow: true });
  _hideSleepTimePicker = () => this.setState({ sleepTimePickerShow: false });

  render() {

    let debugButtons;

    if (global.debugMode){
      debugButtons =         
      (<View style={{alignItems: 'center', marginTop: 20, justifyContent: 'space-around' }}>
        <Button mode="contained" onPress={this._debugClearAllLocalData}>
            (Debug) Delete user account
        </Button>
        <Button mode="contained" onPress={() => scheduleNotification20s()}>
          Schedule 20s Notification
        </Button>
      </View>);
    }
    return (
      <PaperProvider theme={newTheme}>
      <View>
        <View style={styles.toolbar}>
          {/* <BackButton goBack={() => this._backButtonPressed()}/> */}
          <Text style={styles.toolbarTitle}>{resources.getString("settings")}</Text>
        </View>
        <ScrollView>

        <List.Section style={styles.mainStyle}>
          <List.Item
            title={resources.getString("notifications")}
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
            title={resources.getString("number_notifications")}
            onPress={this._showNumPingsModal}
          />
          <List.Item
            style={styles.listStyle}
            title={this.state.notificationcount}
            onPress={this._showNumPingsModal}
          />
          <List.Item
            style={styles.listStyle}
            title={resources.getString("wake_time")}
            onPress={this._showNumPingsModal}
          />
          <List.Item
            style={styles.listStyle}
            title={this.state.waketime}
            onPress={this._showWakeTimePicker}
            />
          <TimePicker 
            showTimePicker={this.state.wakeTimePickerShow} 
            style={styles.timePicker} 
            time={this.state.waketime} 
            timeType="wakeTime"
            isVisible={this.state.wakeTimePickerShow}
            handler = {this.wakeTimeHandler}
            cancelHandler = {this.cancelTimeHandler}
            />
          <List.Item
            style={styles.listStyle}
            title={resources.getString("sleep_time")}
            onPress={this._showSleepTimePicker}
          />
          <List.Item
            style={styles.listStyle}
            title={this.state.sleeptime}
            onPress={this._showSleepTimePicker}
          />
          <TimePicker 
            showTimePicker={this.state.sleepTimePickerShow} 
            style={styles.timePicker} 
            time={this.state.sleeptime} 
            timeType="sleepTime" 
            isVisible={this.state.sleepTimePickerShow}
            handler = {this.sleepTimeHandler} 
            cancelHandler = {this.cancelTimeHandler}
          />
          <List.Item
            style={styles.listStyle}
            title={resources.getString("language")}
            onPress={this._showLanguageModal}
          />
          <List.Item
            style={styles.listStyle}
            title={this.state.culture}
            onPress={this._showLanguageModal}
          />
        </List.Section>
        {debugButtons}
        </ScrollView>
        <View>
          <Portal>
            <Dialog
              visible={this.state.languageModalShow}
              onDismiss={this._hideLanguageModal}>
              <Dialog.Title>{resources.getString("language")}</Dialog.Title>
              <Dialog.Content>
                <RadioButton.Group
                  onValueChange={c => this._changeLanguage(c)}
                  value={this.state.culture}>
                  <View>
                    <Text>English</Text>
                    <RadioButton value="1" />
                  </View>
                  <View>
                    <Text>French</Text>
                    <RadioButton value="2" />
                  </View>
                </RadioButton.Group>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  style={styles.dialog_action_btn}
                  onPress={this._hideLanguageModal}>
                  Ok
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
        <View>
          <Portal>
            <Dialog
              visible={this.state.numPingsModalShow}
              onDismiss={this._hideNumPingsModal}>
              <Dialog.Title>{resources.getString("num_pings_dialog_title")}</Dialog.Title>
              <Dialog.Content>
                <RadioButton.Group
                  onValueChange={n => this.setState({notificationcount:parseInt(n)})}
                  value={this.state.notificationcount.toString()}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text>2</Text>
                    <RadioButton value="2" />
                  </View>
                  <View>
                    <Text>3</Text>
                    <RadioButton value="3" />
                  </View>
                  <View>
                    <Text>4</Text>
                    <RadioButton value="4" />
                  </View>
                  <View>
                    <Text>5</Text>
                    <RadioButton value="5" />
                  </View>
                </RadioButton.Group>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  style={styles.dialog_action_btn}
                  onPress={this._hideNumPingsModal}>
                  Ok
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </View>
      <Button style={styles.btnNext}
          mode="contained"
          onPress={this._backButtonPressed}>
          <Text style={styles.btnText}>{resources.getString("gl.return")}</Text>
      </Button>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  timePicker: {
    width:100,
    paddingRight:100
  },
  dialog_action_btn: {

  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },
  mainStyle: {
    marginTop: 20
  },
  toolbar: {
    backgroundColor: '#F4D2D1',
    paddingTop: 40,
    paddingBottom: 15,
    flexDirection: 'row'
  },
  btnNext: {
    color: newTheme.colors.whiteText,
    width: 120,
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 10,
  },
  btnText: {
    color: newTheme.colors.whiteText,
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
