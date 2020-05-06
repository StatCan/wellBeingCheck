import React, { memo, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, Switch, AsyncStorage, Dimensions, Linking, PanResponder, Alert } from 'react-native';
import Button from '../../components/Button';
import { newTheme } from '../../core/theme';
import { List, Divider } from 'react-native-paper';
import TimePicker from '../../components/TimePicker'
//import { notificationAlgo, scheduleNotification20s } from '../../utils/notificationAlgo'
import { Notifications } from "expo";
import * as Permissions from 'expo-permissions';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { resources } from '../../../GlobalResources';
import { Provider as PaperProvider, Title, Portal, Dialog, RadioButton } from 'react-native-paper';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import * as IntentLauncher from 'expo-intent-launcher';
import {setupSchedules,checkInSchedule,validateSetting} from '../../utils/schedule';
import { Updates } from 'expo';

var scheduledDateArray = new Array();

type SettingsState = {
  notificationState: boolean,
  chosenNotificationState: boolean,
  notification: boolean,
  waketime: string,
  sleeptime: string,
  notificationcount: number,
  culture: string,
  cultureString: string,
  numPingsModalShow: boolean,
  languageModalShow: boolean,
  wakeTimePickerShow: boolean,
  sleepTimePickerShow: boolean,
  titleBackgroundColor: string,
  settingsFirstTime: boolean
}

interface Props {
  navigation: NavigationScreenProp<NavigationState,
    NavigationParams>;
}

const deviceHeight = Dimensions.get('window').height - 145;
let dirty=false;
class SettingsScreen extends React.Component<Props, SettingsState> {
  _panResponder: any;
  timer = 0

  _notificationSubscription: any;
  _isDirty: boolean;

  constructor(SettingsState) {
    super(SettingsState)
    this.state = {
      numPingsModalShow: false,
      notificationState: global.notificationState,
      chosenNotificationState: true,
      notification: true,
      waketime: global.awakeHour,
      sleeptime: global.sleepHour,
      notificationcount: global.pingNum,
      culture: resources.culture == 'fr'?'2':'1',
      cultureString: 'English',
      languageModalShow: false,
      wakeTimePickerShow: false,
      sleepTimePickerShow: false,
      titleBackgroundColor: "#000",
      settingsFirstTime: true
    };

    this.wakeTimeHandler = this.wakeTimeHandler.bind(this);
    this.sleepTimeHandler = this.sleepTimeHandler.bind(this);
    this.cancelTimeHandler = this.cancelTimeHandler.bind(this);

    /* --------------------Session Handler--------------------------- */
    //used to handle session
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: () => {
        this._initSessionTimer()
        return true
      },
      onMoveShouldSetPanResponder: () => {
        this._initSessionTimer()
        return true
      },
      onStartShouldSetPanResponderCapture: () => {
        this._initSessionTimer()
        return true
      },
      onMoveShouldSetPanResponderCapture: () => {
        this._initSessionTimer()
        return true
      },
      onPanResponderTerminationRequest: () => {
        this._initSessionTimer()
        return true
      },
      onShouldBlockNativeResponder: () => {
        this._initSessionTimer()
        return true
      },
    });
  }

  wakeTimeHandler(time) {
    time = time.substring(0, 5);
    this.setState({
      waketime: time,
      wakeTimePickerShow: false
    })
    if (global.debugMode)
      console.log("Value changed - setting dirty flag");
    this._isDirty = true;
  }

  cancelTimeHandler(time) {
    this.setState({
      wakeTimePickerShow: false,
      sleepTimePickerShow: false
    });
  }

  sleepTimeHandler(time) {
    time = time.substring(0, 5);
    this.setState({
      sleeptime: time,
      sleepTimePickerShow: false
    })
    if (global.debugMode) console.log("Value changed - setting dirty flag");
    this._isDirty = true;
  }

  askPermissions = async () => {
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
      this.setState({ notificationState: false });
      Notifications.cancelAllScheduledNotificationsAsync();

      Alert.alert(
        resources.getString("notification.resquest.title"),
        resources.getString("notification.resquest.message"),
        [
          {
            text: 'Cancel',
            onPress: () => {
              console.log('Cancel Pressed');
              this.setState({ notificationState: false });
              return false;
            },
            style: 'cancel',
          },
          {
            text: 'OK', onPress: () => {
              console.log('OK Pressed');
              if (Platform.OS === 'ios') {
                Linking.openURL('app-settings://notification/com.statcan.wellbeingcheck');
              } else {
                if (global.debugMode) console.log("Opening Android Settings Screen");
                IntentLauncher.startActivityAsync(IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS, {
                  data: 'package:com.statcan.wellbeingcheck'
                });
              }
            }
          },
        ],
        { cancelable: false }
      );
    } else {
      if (global.debugMode) console.log("Notifications Permission Granted");
      this.setState({ notificationState: true });
      return true;
    }
  };

  _handleSessionTimeOutRedirect = () => {
    Updates.reload();
  }

  _initSessionTimer() {
    clearTimeout(this.timer)
    this.timer = setTimeout(() =>
      this._expireSession()
      ,
      global.sessionTimeOutDuration)
  }

  _expireSession() {
    Alert.alert(
      resources.getString("session.modal.title"),
      resources.getString("session.modal.message"),
      [
        { text: resources.getString("session.modal.sign_in"), onPress: () => this._handleSessionTimeOutRedirect() },
      ],
      { cancelable: false }
    )
  }

  componentDidMount() {
    //Session Handler
    this._initSessionTimer()

  //  this._retrieveData('settings');
  }

  handleBackAction = async () => {
      if (global.debugMode) console.log("Handle Back Action");
      if(this.state.waketime!=global.awakeHour)dirty=true;
      if(this.state.sleeptime!=global.sleepHour)dirty=true;
      if(this.state.notificationcount!=global.pingNum)dirty=true;
      console.log('Dirty:'+dirty);
      if(this.state.notificationState){
          if(global.doneSurveyA){
              if(global.notificationState){
                 //notification was enabled, right now it is enabled too, so need to re-schedule only there is some setting value changed otherwise waiting to suvey B done
                 if(dirty){
                     let inp=checkInSchedule(new Date());
                     if(inp && global.schedules.length>0)setupSchedules(true);
                     else setupSchedules(false);
                 }
              }
              else{
                //notification was disabled, but right now it is enabled,need to setup schedules immediately, without waiting for surveyBdone, in case user never go survey B,but can still get 4 days notification,because he just turn it on
                setupSchedules(false);
              }
          }
          else {
               //do nothing because survey A is not done yet
          }
      }
      else {
         //notification disabled
         if(global.notificationState){
            //the notification was enabled before come in the setting screen, so we need cancell all the notifications
             Notifications.cancelAllScheduledNotificationsAsync();
             AsyncStorage.removeItem('Schedules');global.schedules=[];
             console.log('remove all notifications');
         }
         else {
            //do nothing, the schedule was removed already
         }
      }

      this.setState({ settingsFirstTime: false });
      if(dirty || this.state.notificationState!=global.notificationState){
          AsyncStorage.removeItem('ParadataSaved');global.paradataSaved=false;
      }

/*   Old code

    //if (this._isDirty || this.state.settingsFirstTime) {
      this.setState({ settingsFirstTime: false });
      if (this.state.notificationState && dirty){
           AsyncStorage.removeItem('ParadataSaved');global.paradataSaved=false;
        //  if (global.debugMode) console.log("Dirty flag set - scheduling notifications");
        //  notificationAlgo(this.state.waketime, this.state.sleeptime, this.state.notificationcount, this.state.finalDate);
        let inp=checkInSchedule(new Date());
        if(inp && global.doneSurveyA && global.schedules.length>0)setupSchedules(true);
      } else {
        if (global.debugMode) console.log("Notifications turned off - cancelling all notifications");
        Notifications.cancelAllScheduledNotificationsAsync();

      }
    //}
*/

    if (this.state.culture === "2") {
      resources.culture = 'fr';
    } else if (this.state.culture === "1") {
      resources.culture = 'en';
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
    dirty=false;
  }

  componentWillUnmount() {
    //Session Handler
    clearTimeout(this.timer)
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
      AsyncStorage.removeItem('EsmUserToken');
      AsyncStorage.setItem('EsmSurveyACode', 'none');
      AsyncStorage.removeItem('EsmCulture');
      AsyncStorage.removeItem('doneSurveyA');
      global.doneSurveyA = false;
      AsyncStorage.removeItem('LastDate');AsyncStorage.removeItem('Schedules');
      AsyncStorage.removeItem('PingNum');AsyncStorage.removeItem('AwakeHour');AsyncStorage.removeItem('SleepHour');
      AsyncStorage.removeItem('hasImage');global.hasImage=false;
      AsyncStorage.removeItem('ParadataSaved');global.paradataSaved=false;

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
      AsyncStorage.removeItem('first_time_login');
      alert("all data cleared");
    } catch (error) {
    }
  }

  _backButtonPressed = () => {
    console.log("Back button Pressed:"+this.state.waketime+'---'+this.state.sleeptime);
    let valid=validateSetting(this.state.waketime,this.state.sleeptime,this.state.notificationcount);
    console.log('validate:------->'+valid);
    if(valid==0)this.handleBackAction();
    else Alert.alert('',resources.getString("settingValidation"));
  }

  _storeSettings = () => {
    //validation passed lets store user
    let settingsObj = {
      notificationState: this.state.notificationState,
      chosenNotificationState: this.state.notificationState,
      wakeTime: this.state.waketime,
      sleepTime: this.state.sleeptime,
      notificationCount: this.state.notificationcount,
      culture: this.state.culture,
      cultureString: this.state.cultureString,
      settingsFirstTime: this.state.settingsFirstTime
    };
    AsyncStorage.setItem('Culture',this.state.culture);
    global.notificationState=this.state.notificationState;
    if(this.state.notificationState)AsyncStorage.setItem('NotificationState','true');else AsyncStorage.setItem('NotificationState','false');
    AsyncStorage.setItem('PingNum',this.state.notificationcount.toString());global.pingNum=this.state.notificationcount;
    AsyncStorage.setItem('AwakeHour',this.state.waketime);global.awakeHour=this.state.waketime;
    AsyncStorage.setItem('SleepHour',this.state.sleeptime);global.sleepHour=this.state.sleeptime;

    AsyncStorage.setItem('settings', JSON.stringify(settingsObj), () => {
      if (global.debugMode) console.log("Storing Settings: ", settingsObj);
      console.log('current View:' + global.currentView);
      if (global.currentView == 1) this.props.navigation.navigate('ResultScreen');
      else {
        this.props.navigation.state.params.refresh();
        this.props.navigation.navigate('Dashboard');
      }
    });
  }

  _retrieveData = async (key) => {

    await AsyncStorage.getItem(key, (err, result) => {
      if (global.debugMode) console.log("The result of getItem is: ", result);
      if (result) {
        let resultAsObj = JSON.parse(result);
    //    this.setState({ notificationState: resultAsObj.notificationState });
        this.setState({ chosenNotificationState: resultAsObj.chosenNotificationState });
     //   this.setState({ notificationcount: resultAsObj.notificationCount });
      //  this.setState({ waketime: resultAsObj.wakeTime });
     //   this.setState({ sleeptime: resultAsObj.sleepTime });
        this.setState({ culture: resultAsObj.culture });
        this.setState({ cultureString: resultAsObj.cultureString });
        this.setState({ settingsFirstTime: resultAsObj.settingsFirstTime });
      }
    });

    if (this.state.chosenNotificationState) {
      if (global.debugMode) console.log("Asking permissions...");
      this.askPermissions();
    }

    if (global.debugMode) console.log("Resources culture is: " + resources.culture);

    if (resources.culture == 'fr') {
      this.setState({ culture: '2' });
      this.setState({ cultureString: 'Français' });
    } else if (resources.culture == 'en') {
      this.setState({ culture: '1' });
      this.setState({ cultureString: 'English' });
    }
  }

  _changeLanguage(c) {

    this.setState({ culture: c });
    if (global.debugMode) console.log("Changing language to: " + c);

    if (c === "2") {
      resources.culture = 'fr';
      this.setState({ cultureString: 'Français' });
      this.setState({culture:'2'});
    } else if (c === "1") {
      resources.culture = 'en';
      this.setState({ cultureString: 'English' });
     this.setState({ culture:'1' });
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

  _openTermsConditions = () => {
    this.props.navigation.navigate('TOSSettingsScreen');
  }

  render() {

    let debugButtons;

    if (global.debugMode) {
      debugButtons =
        (<View>
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
        <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View style={styles.toolbar}>
            {/* <BackButton goBack={() => this._backButtonPressed()}/> */}
            <Text style={styles.toolbarTitle}>{resources.getString("settings")}</Text>
          </View>
          <View style={styles.containerStyle}>
            <ScrollView>
              <List.Section style={styles.mainStyle}>
                <List.Item
                  title={resources.getString("notifications")}
                  left={() => <List.Icon icon="bell-alert" />}
                  right={() => <Switch
                    style={{ margin: 10 }}
                    value={this.state.notificationState}
                    onValueChange={() => {
                      this.setState({
                        notificationState: !this.state.notificationState
                      });

                      if (global.debugMode) console.log("The notification state is: " + this.state.notificationState);

                      if (!this.state.notificationState) {
                        if (global.debugMode) console.log("Switch ON: Asking for Permissions");
                        this.askPermissions();
                        this._isDirty = true;
                        this.setState({
                          titleBackgroundColor: "#000"
                        });
                      }

                      if (this.state.notificationState) {
                        if (global.debugMode) console.log("Switch OFF: Disabling Notifications");
                        Notifications.cancelAllScheduledNotificationsAsync();
                        this._isDirty = true;
                        this.setState({
                          titleBackgroundColor: "#777"
                        });
                      }

                    }} />} />
                <Divider></Divider>
                <List.Item
                  style={styles.listStyle}
                  titleStyle={{ color: this.state.titleBackgroundColor }}
                  title={resources.getString("number_notifications")}
                  onPress={this._showNumPingsModal}
                  disabled={!this.state.notificationState}
                  description={this.state.notificationcount}
                  descriptionStyle={styles.descriptionStyle}
                />
                <Divider></Divider>
                 <List.Item
                    style={styles.listStyle2}
                    title={resources.getString("donotdisturbbetween")}
                    titleStyle={{ color: this.state.titleBackgroundColor }}
                 />
                <List.Item
                  style={styles.listStyle1a}
                  title={this.state.waketime}
                  titleStyle={{ color: this.state.titleBackgroundColor }}
                  onPress={this._showWakeTimePicker}
                  disabled={!this.state.notificationState}

                  descriptionStyle={styles.descriptionStyle}
                />
                <TimePicker
                  showTimePicker={this.state.wakeTimePickerShow}
                  style={styles.timePicker}
                  time={this.state.waketime}
                  timeType="wakeTime"
                  isVisible={this.state.wakeTimePickerShow}
                  handler={this.wakeTimeHandler}
                  cancelHandler={this.cancelTimeHandler}
                />
                <List.Item
                  style={styles.listStyle1b}
                  title={this.state.sleeptime}
                  titleStyle={{ color: this.state.titleBackgroundColor }}
                  onPress={this._showSleepTimePicker}
                  disabled={!this.state.notificationState}

                  descriptionStyle={styles.descriptionStyle}
                />
                <TimePicker
                  showTimePicker={this.state.sleepTimePickerShow}
                  style={styles.timePicker}
                  time={this.state.sleeptime}
                  timeType="sleepTime"
                  isVisible={this.state.sleepTimePickerShow}
                  handler={this.sleepTimeHandler}
                  cancelHandler={this.cancelTimeHandler}
                />
                <Divider></Divider>
                <List.Item
                  left={() => <List.Icon icon={require('../../assets/ic_wbc_language.png')} />}
                  title={resources.getString("language")}
                  onPress={this._showLanguageModal}
                  description={this.state.cultureString}
                  descriptionStyle={styles.descriptionStyle}
                />
                <List.Item
                  left={() => <List.Icon icon={require('../../assets/ic_wbc_terms_condition.png')} />}
                  title={resources.getString("terms_and_conditions")}
                  onPress={this._openTermsConditions}
                />
              </List.Section>
              {debugButtons}

              <View>
                <Portal>
                  <Dialog
                    visible={this.state.languageModalShow}
                    onDismiss={this._hideLanguageModal} >
                    <Dialog.Title>{resources.getString("language")}</Dialog.Title>
                    <Dialog.Content>
                      <RadioButton.Group onValueChange={c => this._changeLanguage(c)}
                        value={this.state.culture}>

                        <View style={styles.radioButtonContainerStyle}>
                          <RadioButton.Android value='1' color='green' uncheckedColor='#330033'>
                          </RadioButton.Android>
                          <Text style={styles.radioButtonTextEnStyle}>English </Text>
                        </View>

                        <View style={styles.radioButtonContainerStyle}>
                          <RadioButton.Android value='2' color='green' uncheckedColor='#330033'>
                          </RadioButton.Android>
                          <Text style={styles.radioButtonTextFrStyle}>Français</Text>
                        </View>

                      </RadioButton.Group>
                    </Dialog.Content>

                    <Dialog.Actions>
                      <View style={{ flexDirection: 'column', flex: 2 }}>
                        <Button
                          style={styles.dialog_action_btn}
                          onPress={this._hideLanguageModal}>
                          Ok
                           </Button>
                      </View>
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
                        onValueChange={n => {
                          this.setState({ notificationcount: parseInt(n) });
                          if (global.debugMode) console.log("Value changed - setting dirty flag");
                          this._isDirty = true;
                        }
                        }
                        value={this.state.notificationcount.toString()}>
                        <View style={styles.radioButtonContainerStyle}>
                          <RadioButton.Android value='2' color='green' uncheckedColor='#330033' style={styles.bottom}>
                          </RadioButton.Android>
                          <Text style={styles.radioButtonTextStyle}>2</Text>
                        </View>

                        <View style={styles.radioButtonContainerStyle}>
                          <RadioButton.Android value='3' color='green' uncheckedColor='#330033'>
                          </RadioButton.Android>
                          <Text style={styles.radioButtonTextStyle}>3</Text>
                        </View>

                        <View style={styles.radioButtonContainerStyle}>
                          <RadioButton.Android value='4' color='green' uncheckedColor='#330033'>
                          </RadioButton.Android>
                          <Text style={styles.radioButtonTextStyle}>4</Text>
                        </View>

                        <View style={styles.radioButtonContainerStyle}>
                          <RadioButton.Android value='5' color='green' uncheckedColor='#330033'>
                          </RadioButton.Android>
                          <Text style={styles.radioButtonTextStyle}>5</Text>
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
            </ScrollView>

          </View>
          <View style={styles.buttonView}>
            <Button style={styles.btnNext}
              mode="contained"
              onPress={()=>this._backButtonPressed()}>
              <Text style={styles.btnText}>{resources.getString("gl.return")}</Text>
            </Button>
          </View>
          <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
        </View>

      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: "flex-start",
    height: deviceHeight - 60
  },
  radioButtonContainerStyle: {
    flexDirection: 'row'
  },
  radioButtonTextStyle: {
    marginTop: 8,
    marginLeft: 5
  },
  radioButtonTextEnStyle: {
    marginTop: 8,
    marginLeft: 5,
    marginRight: 9
  },

  radioButtonTextFrStyle: {
    marginTop: 8,
    marginLeft: 5,
    marginRight: 5
  },
  descriptionStyle: {
    marginTop: 10
  },
  buttonView: {
    justifyContent: "flex-end"
  },
  timePicker: {
    width: 100,
    paddingRight: 100
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
    paddingTop: 20,
    paddingBottom: 15,
    flexDirection: 'row'
  },
  btnNext: {
    color: newTheme.colors.whiteText,
    width: 100,
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
   listStyle1a: {
      marginLeft: 60,height:30,width:120,
    },
     listStyle1b: {
          marginLeft: 180,height:30,width:120,marginTop:-30,marginBottom:10,
        },
  listStyle2: {
       marginLeft: 60,height:30,
     },
  listTitleLightStyle: {
    color: "#a7a5a6"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  input: { borderWidth: 1, width: 100, paddingLeft: 4 },
  label: {
    fontSize: 16,
    marginLeft: 40,
    padding: 10
  },

  Dialog: {
    width: 300,
    height: 200
  },
});

export default memo(SettingsScreen);
