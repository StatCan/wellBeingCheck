import React, { memo } from 'react';
import Background from '../components/Background';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity,ActivityIndicator, BackHandler, AsyncStorage, PanResponder, Alert,Linking, YellowBox, Platform,AppState } from 'react-native';
import { checkConnection, hashString, fetchJwToken } from '../utils/fetchJwToken';
import { resources } from '../../GlobalResources';

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

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

type HomeState = {
  refresh: string,
  firstTimeLoginModal: boolean,
  showThankYou: boolean,
  thankYouText: string,loaded:boolean,
  disabled:boolean
}
YellowBox.ignoreWarnings(['Require cycle:','Setting a timer','Warning: ReactNative.createElement']);
console.ignoredYellowBox = ['Require cycle:','Setting a timer'];

const WEB_API_BASE_URL = global.webApiBaseUrl + 'api';

class Dashboard extends React.Component<Props, HomeState> {
  _panResponder: any;
  timer = null;
  backHandler: any;
  constructor(HomeState) {
    super(HomeState);
    let txt = '';
    if (global.showThankYou == 1) txt = resources.getString('ThankYouA'); else if (global.showThankYou == 2) txt = resources.getString('ThankYouB');
    this.state = {
      refresh: '1',
      disabled:!(global.busy==8),
      firstTimeLoginModal: false,
      showThankYou: !(global.showThankYou == 0),
      thankYouText: txt,
      loaded:global.loading,
    };
    this._refresh = this._refresh.bind(this);
    this.handleAppStateChange=this.handleAppStateChange.bind(this);
    this._firstTimeLogin();
    /* --------------------Session Handler--------------------------- */
     this.onSessionOut=this.onSessionOut.bind(this);
     if(global.globalTimeOutCallback==null)global.globalTimeOutCallback=this.onSessionOut;
     console.ignoredYellowBox = ['Require cycle:','Setting a timer'];
     if(global.globalTimer==null){global.createGlobalTimer();console.log('global timer setup.....................');}
     if(global.panResponder==null){global.createPanResponder();}

  }

  onSessionOut(){
    let result=false;global.timeoutPopup=true;
    Alert.alert(
       '',
       resources.getString("session.modal.message"),
       [
         { text: resources.getString("session.modal.sign_in"), onPress: () => {result=false;global.timeoutPopup=false;this.props.navigation.navigate('LoginScreen'); } },
       ],
       { cancelable: false }
    )
    return result;
  }

  componentDidMount() {
      this.backHandler =BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
      AppState.removeEventListener("change", this.handleAppStateChange);
      AppState.addEventListener("change", this.handleAppStateChange);
  }

  componentWillUnmount() {
    this.backHandler.remove();
     AppState.removeEventListener("change", this.handleAppStateChange);
  }

  handleAppStateChange=(nextAppState)=>{
       if(nextAppState=='active')global.resumeTimer();
       else {global.pauseTimer();console.log('detect inactive in dashboard');}
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

  checkThankYou() {
     if(global.globalTimeOutCallback==null)global.globalTimeOutCallback=this.onSessionOut;
     if(global.globalTimer==null){global.createGlobalTimer();console.log('global timer setup.....................');}
     if(global.panResponder==null){global.createPanResponder();}
    if(global.showThankYou ==20){
              const APP_STORE_LINK = 'itms://itunes.apple.com/us/app/apple-store/myiosappid?mt=8';
              const PLAY_STORE_LINK = 'market://details?id=myandroidappid';
         global.showThankYou=0;
         let msg=resources.getString("rateAppMsg"); let title=resources.getString("notifications");
         if (Platform.OS === 'android')msg+=' Google Play Store.';else msg+=' App Store.';
        Alert.alert(
                resources.getString("feedback"),
                msg,
                [
                  {
                    text: resources.getString("ratenow"),
                    onPress: () => {
                     if (Platform.OS === 'ios') {Linking.openURL('https://www.apple.com/ca/ios/app-store/'); }
                     else { Linking.openURL('https://play.google.com/store/apps/details?id=com.statcan.wellbeingcheck')}
                    },
                    style: 'cancel',
                  },
                  {
                    text: resources.getString("later"),
                      onPress: () => {
                        return false;
                    }
                  },
                ],
                { cancelable: false }
              );
        return;
    }
    let txt = '';
    if (global.showThankYou == 1) txt = resources.getString('ThankYouA'); 
    else if (global.showThankYou == 2)  txt = resources.getString('ThankYouB');
    this.setState({ showThankYou: !(global.showThankYou == 0), thankYouText: txt });
    if(!(global.showThankYou == 0)){
       this.setState({loaded:false});
       setTimeout(() => {
             global.showThankYou = 0;
             this.setState({ showThankYou: false,loaded:false }) }, 5000);
    }
    else {
       this.setState({loaded:false})
    }
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
  async saveParaData(){
             let isConnected=await checkConnection();
             if(!isConnected){Alert.alert('',resources.getString('offline'));return;}
             let jwt=await fetchJwToken();
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
                                                                      "NotificationEnable":true,
                                                                      "ScheduledNotificationTimes": snt
                                                                  };
             let url=global.webApiBaseUrl+'api/paradata';console.log(url);
             let token=global.jwToken;
             fetch(url, {
                  method: 'POST',
                  headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt},
                  body: JSON.stringify(paraData),
             })
             .then((response) =>{
                 if(response.status==200){console.log('paradata saved successfully');  return true;}
                 else {console.log('paradata Bad:'+response.status);return false;}
                 } )          // response.json())
             .catch((error)=>{console.log(error.message);});
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
  async conductSurvey() {
  if(this.state.showThankYou){console.log('too quick!!!!!!!');return;}
     this.setState({ loaded: true });global.loading=true;
       let isConnected = await checkConnection();
       if (!isConnected) { Alert.alert('',resources.getString('offline')); this.setState({ loaded: false }); return; }
       let n=await this.getConfig();

       console.log('deviceId:'+global.userToken+'    password:'+global.password+'------->'+global.fetchAction);
       if(n){global.fetchAction=true;this.props.navigation.navigate('EQSurveyScreen');}
       else {Alert.alert('',resources.getString("securityIssue"));this.setState({ loaded: false }); return;}
       this.setState({loaded:false});
  }

  render() {
    return (
      <PaperProvider theme={newTheme}>
        <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
        <Background>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}
                accessible={false}
                >
            <TouchableOpacity style={{ marginLeft: 5, marginTop: 50 }} 
            accessible={false}
            >
              <Image source={require('../assets/WellnessCheckLogo.png')} style={{ width: 38, height: 38 }} />
            </TouchableOpacity>

            {/*-----------Setting button using UX logo ic_setting.png--------*/}
            <View>
              <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('SettingsScreen', { refresh: this._refresh })}
                  style={{ marginRight: 5, marginTop: 50 }}
                  accessible={true}
                  accessibilityLabel={resources.getString("settings")}
                  accessibilityRole="button"
                  >
                  <Image source={require('../assets/ic_setting.png')} />
                </TouchableOpacity>
              </View>
            </View>


          </View>
          <View style={styles.homeContainer} 
           {...global.panResponder.panHandlers}
          >
          <View>

              <View style={styles.outer}>
                 <View style={styles.inner}>
                    <TouchableOpacity onPress={() => this.conductSurvey()} 
                    style={{ flex: 0, justifyContent: 'center',width:'90%',height:'90%' }}
                    accessible={true}
                    accessibilityLabel={resources.getString("start_survey")}
                    accessibilityRole="button"
                    >
                      <Text style={styles.startButtonText}
                      accessible={false}
                      >{resources.getString("start_survey")}</Text>
                    </TouchableOpacity>
                </View>

              </View>

            {this.state.showThankYou &&
              <View style={{ backgroundColor: 'black', width: '80%', position: 'absolute', zIndex: 29, alignSelf: 'center', top: '70%', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white', fontSize: 14, marginTop: 10, marginBottom: 10 }}>{this.state.thankYouText}</Text></View>
            }

            <View style={[styles.homeButtonContainer, { marginBottom: 0, marginTop: 50 }, { flexDirection: 'row',alignItems:'center' }]}>

              {/*-----------Information button using UX logo ic_wbc_about_survey--------*/}
              <View>
                <View>
                  <View>
                    <TouchableOpacity 
                    onPress={() => { global.globalTick=0; 
                    console.log('time out issue testing'); 
                    this.props.navigation.navigate('AboutScreen')}}
                    style={styles.smallButton}
                    accessible={true}
                    accessibilityRole="button"
                    accessibilityLabel={resources.getString("about")}
                    >
                      <Image source={require('../assets/ic_wbc_about_survey.png')} />
                     {/* <Text style={styles.HomeMenuButton}> Information</Text> */}
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={styles.smallButtonText}
                      accessible={false}
                    >{resources.getString("about")}</Text>
                  </View>
                </View>
              </View>

              {/* ----------Contact us button using UX logo ic_wbc_contact_us----------- */}
              <View>

                <View>
                  <View>
                    <TouchableOpacity 
                      onPress={() => this.props.navigation.navigate('ContactUsScreen')} 
                      style={styles.smallButton}
                      accessible={true}
                      accessibilityRole="button"
                      accessibilityLabel={resources.getString("contact_us")}>
                      <Image source={require('../assets/ic_wbc_contact_us.png')} />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text 
                    style={styles.smallButtonText}
                    accessible={false}
                    >{resources.getString("contact_us")}</Text>
                  </View>
                </View>
              </View>

              {/*------------Result button using UX logo ic_wbc_dashboard----------*/}
              <View>

                <View>
                  <View>
                    <TouchableOpacity disabled={this.state.disabled} onPress={() => {
                      console.log('Has image before click result button:' + global.hasImage);
                      if (global.hasImage == 1) this.props.navigation.navigate('ResultScreen');
                      else Alert.alert('', resources.getString("NoDataAlert"));
                    }
                    }
                      style={styles.smallButton}
                      accessible={true}
                      accessibilityRole="button"
                      accessibilityLabel={resources.getString("result")}
                      >
                      <Image source={require('../assets/ic_wbc_dashboard.png')} />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={this.state.disabled?styles.smallButtonTextDis:styles.smallButtonText}
                      accessible={false}
                    
                    >{resources.getString("result")}</Text>
                  </View>
                </View>
              </View>



              {/* <TouchableOpacity onPress={() => { if (global.hasImage) this.props.navigation.navigate('ResultScreen'); else alert(resources.getString("NoDataAlert")); }} style={styles.smallButton}><EvilIcons name="chart" size={40} color="white" /><Text style={styles.smallButtonText}>{resources.getString("result")}</Text></TouchableOpacity> */}

            </View>
          </View>
          <NavigationEvents onDidFocus={() => this.checkThankYou()} />
          {(!this.state.loaded) ? null : <ActivityIndicator size="large" color="lightblue" style={{ position: 'absolute', top: '60%', left: '50%', zIndex: 20 }} />}
          <View>
            <Portal>
              <Dialog
                visible={this.state.firstTimeLoginModal}
                onDismiss={this._hide_firstTimeLoginModal}>
                <Dialog.Content>
                  <Paragraph>
                    {resources.getString('home_first_time_login_content')}
                    <Image style={{height:15, width:15, paddingLeft:5}} source={require('../assets/ic_setting.png')} />
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
    backgroundColor: 'lightgray',
    marginTop:40,
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
  },
  smallButtonTextDis: {
      color: 'gray',
      fontSize: 15,
      textAlign: 'center'
    },
    HomeMenuButton: {
      color: '#000000',
      fontSize: 15,
      textAlign: 'center',
      marginTop: 30,
    },
});

export default memo(Dashboard);
