import React, { memo } from 'react';
import Background from '../components/Background';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, BackHandler, AsyncStorage, PanResponder, Alert, YellowBox } from 'react-native';
import { checkConnection, hashString, fetchJwToken } from '../utils/fetchJwToken';
import { resources } from '../../GlobalResources';
import { notificationAlgo } from '../utils/notificationAlgo'
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { Provider as PaperProvider, Portal, Dialog, Paragraph, Button } from 'react-native-paper';
import { newTheme } from '../core/theme';
import { BackEndService } from '../api/back-end.service';
import { Updates } from 'expo';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState, NavigationEvents,
} from 'react-navigation';

YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);
interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

type HomeState = {
  refresh: string,
  firstTimeLoginModal: boolean,
  showThankYou: boolean,
  thankYouText: string,
}
YellowBox.ignoreWarnings(['Require cycle:'])
const WEB_API_BASE_URL = global.webApiBaseUrl + 'api';

class Dashboard extends React.Component<Props, HomeState> {
  _panResponder: any;
  timer = 0

  constructor(HomeState) {
    super(HomeState);
    let txt = '';
    if (global.showThankYou == 1) txt = resources.getString('ThankYouA'); else if (global.showThankYou == 2) txt = resources.getString('ThankYouB');
    this.state = {
      refresh: '1',
      firstTimeLoginModal: false,
      showThankYou: !global.showThankYou == 0,
      thankYouText: txt,
    };
    this._refresh = this._refresh.bind(this);
    this._firstTimeLogin();

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

  componentDidMount() {
    //Session Handler
    this._initSessionTimer()

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    var wakeTime;
    var sleepTime;
    var numPings;
    var doneSurveyA;
    var finalDate;

    // Only call updating notifications if Survey A was done
    AsyncStorage.getItem('finalDate', (err, finalDateResult) => {
      if (global.debugMode) console.log("The result of finalDate getItem is: ", finalDateResult);

      if (finalDateResult) {
        finalDate = finalDateResult;

        AsyncStorage.getItem('currentNotificationDate', (err, currentNotificationDateResult) => {
          if (global.debugMode) console.log("The result of currentNotificationDate getItem is: ", currentNotificationDateResult);
          var currentNotificationDateResultDate = new Date(JSON.parse(currentNotificationDateResult));
          if (global.debugMode) console.log("The currentNotificationDate (Date Object) is: " + currentNotificationDateResultDate);
          var finalDateResultDate = new Date(JSON.parse(finalDateResult));
          if (global.debugMode) console.log("The finalDate getTime is: " + finalDateResultDate.getTime());
          var currentNotificationDateResultTime = currentNotificationDateResultDate.getTime();

          if (currentNotificationDateResultTime < finalDateResultDate.getTime()) {

            if (global.debugMode) console.log("The time is less than finalDate - now checking Survey A Done Flag...");

            AsyncStorage.getItem('doneSurveyA', (err, doneSurveyAResult) => {
              if (global.debugMode) console.log("The result of doneSurveyA getItem is: ", doneSurveyAResult);
              if (doneSurveyAResult) {
                doneSurveyA = doneSurveyAResult;


                console.log("Ali---------The result of doneSurveyA getItem is : ", doneSurveyA);

                if (doneSurveyA == 'true') {
                  AsyncStorage.getItem('settings', (err, settingsResult) => {
                    if (global.debugMode) console.log("The result of Settings getItem is: ", settingsResult);
                    if (settingsResult) {
                      let resultAsObj = JSON.parse(settingsResult);
                      wakeTime = resultAsObj.wakeTime;
                      sleepTime = resultAsObj.sleepTime;
                      numPings = resultAsObj.notificationCount;

                      if (global.debugMode) console.log("The saved wakeTime is: " + wakeTime);
                      if (global.debugMode) console.log("The saved sleepTime is: " + sleepTime);
                      if (global.debugMode) console.log("The saved numPings is: " + numPings);

                      if (!wakeTime) wakeTime = "6:00";
                      if (!sleepTime) sleepTime = "22:00"
                      if (!numPings) numPings = 2;

                      // First check if notification set date
                      notificationAlgo(wakeTime, sleepTime, numPings);
                    }
                  });
                }
              }
            });
          }
        });
      }
    });
  }

  _show_firstTimeLoginModal = () => this.setState({ firstTimeLoginModal: true });
  _hide_firstTimeLoginModal = () => this.setState({ firstTimeLoginModal: false });

  _firstTimeLogin = () => {
    AsyncStorage.getItem('first_time_login', (err, result) => {
      console.log(result);
      if (result) {
        let resultAsObj = JSON.parse(result)
        let firstTimeLogin = resultAsObj.firstTimeLogin;
      }
      else {
        //show first time dialog
        let firstTimeLoginObj = {
          firstTimeLogin: false,
        };
        AsyncStorage.setItem('first_time_login', JSON.stringify(firstTimeLoginObj), () => {
          //first time login flagged saved - show dialog/alert
          this.setState({ firstTimeLoginModal: true });
        });
      }
    });
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

  _handleSessionTimeOutRedirect = () => {
    Updates.reload();
  }

  componentWillUnmount() {
    //Session Handler
    clearTimeout(this.timer)

    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  checkThankYou() {
    let txt = '';
    console.log("Dashboard.checkThankyou :Ali The result of Thank You getItem is :global.showThankYou= "+ global.showThankYou);
    if (global.showThankYou == 1) txt = resources.getString('ThankYouA'); else if (global.showThankYou == 2)  txt = resources.getString('ThankYouB');
    this.setState({ showThankYou: !global.showThankYou == 0, thankYouText: txt });
    setTimeout(() => { 
      global.showThankYou = 0; 
      this.setState({ showThankYou: false }) }, 6000);
  }

  handleBackButton() {
    return true;
  }

  async getConfigNew() {
    let service = new BackEndService(
      global.webApiBaseUrl + 'api',
      'en-CA',
      null,
      null,
      null,
      fetch
    );

    let links = await service.getLinks();
    if (service.isResultFailure(links)) {
      return false;
    }

    //   var links=await new BackEndService().getLinks();
    //   if(links.hasOwnProperty('exception'))return false;
    global.surveyAUrlEng = links.questionnaireA.enUrl;
    global.surveyAUrlFre = links.questionnaireA.frUrl;
    global.surveyThkUrlEng = links.confirmationPage.enUrl;
    global.surveyThkUrlFre = links.confirmationPage.frUrl;
    global.surveyBUrlEng = links.questionnaireB.enUrl;
    global.surveyBUrlFre = links.questionnaireB.frUrl;
    global.surveyExceptionUrlEng = links.exceptionPage.enUrl;
    global.surveyExceptionUrlFre = links.exceptionPage.frUrl;
    global.configurationReady = true; console.log('Configuration is ready'); return true;
  }

  async getConfig() {
    return new Promise(resolve => {
      let url = global.webApiBaseUrl + 'api/config/links';
      console.log(url);

      fetch(url)
        .then((response) => {
          console.log(url);
          if (response.status >= 400 && response.status < 600) {
            global.configurationReady = false;
            resolve(false);
          } else {
            response.json().then((responseJson) => {
              global.surveyAUrlEng = responseJson.questionnaireA.enUrl;
              global.surveyAUrlFre = responseJson.questionnaireA.frUrl;
              global.surveyThkUrlEng = responseJson.confirmationPage.enUrl;
              global.surveyThkUrlFre = responseJson.confirmationPage.frUrl;
              global.surveyBUrlEng = responseJson.questionnaireB.enUrl;
              global.surveyBUrlFre = responseJson.questionnaireB.frUrl;
              global.surveyExceptionUrlEng = responseJson.exceptionPage.enUrl;
              global.surveyExceptionUrlFre = responseJson.exceptionPage.frUrl;
              global.configurationReady = true;

              console.log('Configuration is ready'); resolve(true);
            })
          }
        })
        .catch((error) => { global.configurationReady = false; resolve(false); });
    });
  }

  _refresh() {
    // Force refresh Home Screen as a Back action on Stack Navigator does not call
    // any lifecycle methods including render()
    if (global.debugMode) console.log("Refreshing Home Screen...");
    if (global.debugMode) console.log("The language set is: " + resources.culture);
    this.setState({ refresh: '1' });
  }

  //saveParaData tested well
  async saveParaData() {
    let isConnected = await checkConnection();
    if (!isConnected) {
      Alert.alert(resources.getString("internet.offline"));
      return;
    }

    let jwt = await fetchJwToken();
    var snt = ["2020/02/01 08:10:00", "2020/02/01 12:10:00", "2020/02/01 18:10:00"];
    let paraData = {
      "PlatFormVersion": "1.2",
      "DeviceName": "Andoird",
      "NativeAppVersion": "2.2",
      "NativeBuildVersion": "3.2",
      "DeviceYearClass": "4.2",
      "SessionID": "5.2",
      "WakeTime": "07:12",
      "SleepTime": "21.2",
      "NotificationCount": "2",
      "NotificationEnable": true,
      "ScheduledNotificationTimes": snt
    };

    let url = global.webApiBaseUrl + 'api/paradata'; console.log(url);
    let token = global.jwToken;

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt },
      body: JSON.stringify(paraData),
    })
      .then((response) => {
        if (response.status == 200) {
          console.log('paradata saved successfully');
          return true;
        }
        else { console.log('paradata Bad:' + response.status); return false; }
      })          // response.json())
      .catch((error) => { console.log(error.message); });
  }


  //saveParadataNew test failed  check later
  async saveParaDataNew() {
    let isConnected = await checkConnection();
    if (!isConnected) {
      Alert.alert(resources.getString("internet.offline"));
      return false;
    }
    let backEndService = new BackEndService(
      WEB_API_BASE_URL,
      'fr-CA',
      global.userToken,
      global.sac,
      hashString(global.password, global.passwordSalt),
      fetch
    );
    let result = await backEndService.submitParadata({
      deviceId: 'iphone5yu',
      questionnaireB: [
        { time: '2020-03-25 10:03:19', notificationTime: '2020-03-25- 9:18:00' },
        { time: '2020-03-25 15:23:29', notificationTime: null },
        { time: '2020-03-26 7:33:39', notificationTime: '2020-03-25- 21:18:00' },
      ]
    });
    if (backEndService.isResultFailure(result)) {
      console.log('paradatanew failed');
      return false;
    }
    else {
      console.log('paradatanew saved successfully');
      return true;
    }
  }

  async sendRequest() {
    let token = await fetchJwToken(); console.log('send:' + token);
    let url = global.webApiBaseUrl + 'api/Values';
    let cul = global.culture; console.log(cul);
    console.log(url);
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept-language': cul
      }
    })
      .then(res => {
        console.log(res.status);
        if (res.status == 200) {
          res.json().then(data => {
            console.log(data);
            Alert.alert('Received data successfully');
          })
        }
        else {   //401
          throw new Error("Access denied, Try again later, if same thing would happen again contact StatCan");

        }
      })
      .catch(err => { console.log(err) })
  }

  // launch survey
  async conductSurvey() {
    let isConnected = await checkConnection();
    if (!isConnected) {
      Alert.alert(resources.getString("internet.offline"));
      return;
    }
    let n = await this.getConfig();

    console.log('deviceId:' + global.userToken + ' password:' + global.password);
    if (n) {
      global.fetchAction = true;
      this.props.navigation.navigate('EQSurveyScreen');
    }
    else {
      Alert.alert(resources.getString("network.error.general"));
      return;
    }
  }

  render() {
    return (
      <PaperProvider theme={newTheme}>
        <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
        <Background>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <TouchableOpacity style={{ marginLeft: 5, marginTop: 50 }}><Image source={require('../assets/ic_logo_loginmdpi.png')} style={{ width: 38, height: 38 }} /></TouchableOpacity>

            {/*-----------Setting button using UX logo ic_setting.png--------*/}
            <View>
              <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('SettingsScreen', { refresh: this._refresh })}
                  style={{ marginRight: 5, marginTop: 50 }}>
                  <Image source={require('../assets/ic_setting.png')} />
                </TouchableOpacity>
              </View>
            </View>


          </View>
          <View style={styles.homeContainer}>
            <TouchableOpacity onPress={() => this.conductSurvey()}
              style={{ flex: 2, justifyContent: 'center' }}>
              <View style={styles.outer}>
                <View style={styles.inner}>
                  <Text style={styles.startButtonText}>{resources.getString("start_survey")}</Text>
                </View>
              </View>
            </TouchableOpacity>
            {this.state.showThankYou &&
              <View style={{ backgroundColor: 'black', width: '80%', position: 'absolute', zIndex: 29, alignSelf: 'center', top: '60%', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white', fontSize: 14, marginTop: 10, marginBottom: 10 }}>{this.state.thankYouText}</Text></View>
            }

            <View style={[styles.homeButtonContainer, { marginBottom: 0, marginTop: 50 }, { flexDirection: 'row' }]}>

              {/*-----------Information button using UX logo ic_wbc_about_survey--------*/}
              <View>
                <View>
                  <View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutScreen')}
                      style={styles.smallButton}>
                      <Image source={require('../assets/ic_wbc_about_survey.png')} />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={styles.smallButtonText}>{resources.getString("about")}</Text>
                  </View>
                </View>
              </View>

              {/* ----------Contact us button using UX logo ic_wbc_contact_us----------- */}
              <View>

                <View>
                  <View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ContactUsScreen')} style={styles.smallButton}>
                      <Image source={require('../assets/ic_wbc_contact_us.png')} />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={styles.smallButtonText}>{resources.getString("contact_us")}</Text>
                  </View>
                </View>
              </View>

              {/*------------Result button using UX logo ic_wbc_dashboard----------*/}
              <View>

                <View>
                  <View>
                    <TouchableOpacity onPress={() => {
                      console.log('Has image before click result button:' + global.hasImage);
                      if (global.hasImage == 1) this.props.navigation.navigate('ResultScreen');
                      else Alert.alert('', resources.getString("NoDataAlert"));
                    }
                    }
                      style={styles.smallButton}>
                      <Image source={require('../assets/ic_wbc_dashboard.png')} />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={styles.smallButtonText}>{resources.getString("result")}</Text>
                  </View>
                </View>
              </View>



              {/* <TouchableOpacity onPress={() => { if (global.hasImage) this.props.navigation.navigate('ResultScreen'); else alert(resources.getString("NoDataAlert")); }} style={styles.smallButton}><EvilIcons name="chart" size={40} color="white" /><Text style={styles.smallButtonText}>{resources.getString("result")}</Text></TouchableOpacity> */}

            </View>
          </View>
          <NavigationEvents onDidFocus={() => this.checkThankYou()} />
          <View>
            <Portal>
              <Dialog
                visible={this.state.firstTimeLoginModal}
                onDismiss={this._hide_firstTimeLoginModal}>
                <Dialog.Content>
                  <Paragraph>
                    {resources.getString('home_first_time_login_content')}
                  </Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <View>
                    <Button
                      color={newTheme.colors.primary}
                      style={styles.dialogDismissBtn}
                      onPress={this._hide_firstTimeLoginModal}>
                      Ok
                      </Button>
                  </View>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>

        </Background>
        <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  dialogDismissBtn: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    position: 'relative',
  },
  gearIcon: {
  },
  startButtonText: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  },
  background: {
    flex: 1,
    width: deviceWidth,
    height: null,
  },
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40
  },
  logo: {
    width: 300,
    height: 100
  },
  homeButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between'
  },
  homeButtonColumn: {
    width: 150,
    height: 150,
    justifyContent: 'space-between',
    alignContent: 'space-between'
  },
  homeButton: { width: 100 },
  homeSeperator: {
    width: 20,
    height: 150
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 95,
    width: 190, height: 190,
    alignSelf: 'center',
    backgroundColor: '#66cc99'
  },
  outer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'lightgray',
    borderRadius: 110,
    borderWidth: 1,
    width: 220, height: 220,
    alignSelf: 'center',
    shadowColor: "gray",
    shadowOffset: {
      width: 10,
      height: 8,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 16,
    backgroundColor: 'lightgray'
  },
  smallButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#66cc99',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 4
  },
  smallButtonText: {
    color: '#000000',
    fontSize: 15,
    textAlign: 'center'
  }
});

export default memo(Dashboard);
