import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, SafeAreaView,Alert,LogBox } from 'react-native';
import { AsyncStorage } from 'react-native';
import Background from '../../components/Background';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { newTheme } from '../../core/theme';
import { resources } from '../../../GlobalResources';
import { Provider as PaperProvider } from 'react-native-paper';
import { EvilIcons, Feather, FontAwesome } from '@expo/vector-icons';
import md5 from "react-native-md5";
import { setupSchedules,cancelSchedule,sendDelayedNotification} from '../../utils/schedule';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,NavigationEvents,
} from 'react-navigation';

import LogoClear from '../../components/LogoClear';
import AppBanner from '../../components/AppBanner';
import { SafeAreaConsumer } from 'react-native-safe-area-context';


import { Notifications } from "expo";
import * as Permissions from 'expo-permissions';

type LoginState = {
  password: string,
  passwordError: string,
  title: string,
  passwordIsHidden: boolean,
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
LogBox.ignoreLogs(['Require cycle:','Setting a timer']);
//console.ignoredYellowBox = ['Require cycle:','Setting a timer'];
class LoginScreen extends React.Component<Props, LoginState> {

  constructor(LoginState) {
    super(LoginState)
    this.state = {
      password: "",
      passwordError: "",
      title: resources.getString("Well-Being Check"),
      passwordIsHidden: true,
    };
  }

  toggleLanguage() {
    if (resources.culture == 'en') {
      resources.culture = 'fr';
      AsyncStorage.setItem('Culture', '2');
    } else {
      resources.culture = 'en';
      AsyncStorage.setItem('Culture', '1');
    }
    this.setState({ title: resources.getString("Well-Being Check") });

    //correct error message for password if already set
    if (this.state.passwordError != '') {
      this.setState({ passwordError: resources.getString("login.Wrongpassword.message") });
    }
  }

  _onLoginPressed = () => {
    AsyncStorage.getItem('user_account', (err, result) => {
      console.log(result);
      if (result) {
        let resultAsObj = JSON.parse(result)
        let currentPassword = resultAsObj.password;
        const inputPassword = this.state.password;

        if (global.debugMode) {
          alert('skipping password check due to debug mode')
          this.props.navigation.navigate('Dashboard');
          return;
        }

        //first hash the password as md5
        let passwordHashed = md5.hex_md5(inputPassword);

        if (currentPassword !== passwordHashed) {
          //incorrect pasword
          this.setState({ passwordError: resources.getString("login.Wrongpassword.message") });
        }
        else {
          //user login success - redirect
          this.props.navigation.navigate('Dashboard');
        }
      }
      else {
        this.setState({ passwordError: resources.getString("login.Wrongpassword.message")});
      }
    });
  }

  _togglePasswordHidden = () => {
    if (this.state.passwordIsHidden) {
      this.setState({ passwordIsHidden: false });
    }
    else {
      this.setState({ passwordIsHidden: true });
    }
  }

  _passwordEyeSlashState = () => {
    if (this.state.passwordIsHidden) {
      this.setState({ passwordIsHidden: false });
    }
    else {
      this.setState({ passwordIsHidden: true });
    }
  }

async onTestA(){
   Alert.alert('',resources.getString('offline'));
     setupSchedules();
   }
onTestB(){
    setupSchedules(false);
    }
onTestC(){
   setupSchedules(true);
}
onTestD(){
   sendDelayedNotification(new Date(),"aaaa","vvvv");
}
async onTestD(){
    AsyncStorage.removeItem('LastDate');global.lastDate=null;
    AsyncStorage.removeItem('Schedules');global.schedules=[];
    console.log('reset done');}

  render() {
    const bannerPathEnglish = require('../../assets/statscan_banner.png');
    const bannerPathFrench = require('../../assets/statscan_banner_fr.png');
    return (
      <PaperProvider theme={newTheme}>
        <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
        <View style={styles.statusBar}>
          <Image source={resources.culture == 'fr' ? bannerPathFrench : bannerPathEnglish} style={styles.image} />
        </View>
        <Background>
          <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>


              <View style={styles.toggleLink}>
                <TouchableOpacity
                  onPress={() => this.toggleLanguage()}
                  accessible={true}
                  accessibilityLabel={resources.getString("Language")}
                  accessibilityRole="button"
                  accessibilityHint="language toggle"
                >
                  <Text>{resources.getString("Language")}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.logoClear}>
                <LogoClear />
              </View>

             <View style={styles.logo}>
                <Text style={{ fontSize:20}}
                accessible={true}
                accessibilityRole="text"
                accessibilityHint="application name"
                accessibilityLabel={resources.getString("Accessibility.ApplicationName")}
                >
                  {resources.getString("Well-Being Check")}
                </Text>
              </View>

              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={styles.passwordInput}>
                  <TextInput
                    label={resources.getString("Enter password")}
                    returnKeyType="next"
                    value={this.state.password}
                    onChangeText={text => this.setState({ password: text })}
                    error={!!this.state.passwordError}
                    errorText={this.state.passwordError}
                    secureTextEntry={this.state.passwordIsHidden}
                    accessibilityLabel={resources.getString('Accessibility.passwordInputText')}
                  />
                </View>

                <View>
                  <TouchableOpacity
                    style={styles.passwordEyeIconBg}
                    onPress={this._togglePasswordHidden}
                    activeOpacity={1}
                    accessible={false}
                  >
                    <Feather
                      style={styles.passwordEyeIcon}
                      size={20} name={this.state.passwordIsHidden ? "eye-off" : "eye"}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.forgotPassword}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')}
                  accessible={true}
                    accessibilityRole="button"
                    accessibilityHint="Forgot Password recovery"
                    accessibilityLabel={resources.getString("login.forgot_password")}
                >
                  <Text style={styles.label}>{resources.getString("login.forgot_password")}</Text>
                </TouchableOpacity>
              </View>
               <NavigationEvents onDidFocus={() => this.setState({password: ''})} />
              <View style={styles.footer}>
                <Button
                  color={newTheme.colors.primary}
                  style={styles.btnLogin}
                  mode="contained"
                  onPress={this._onLoginPressed}>
                  <Text style={styles.whiteText}>{resources.getString("login.login")}</Text>
                </Button>

              </View>
            </ScrollView>
          </SafeAreaView>
         <NavigationEvents onDidFocus={() =>this.setState({ title: resources.getString("Well-Being Check") }) } />
        </Background >
          <View style={{backgroundColor:'#f7f8f9',width:'100%',height:48,borderColor:'red',bordertWidth:1,alignItems:'flex-end'}}>
                          <Image source={require('../../assets/img_canadamdpi.png')} style={{ width: 128, height: 40,resizeMode:'stretch'}} />

          </View>

      </PaperProvider >
    );
  }
}

const styles = StyleSheet.create({
  passwordInput: {
    width: 250,
    borderRightWidth: 0,
  },
  passwordEyeIcon: {
    top: 18,
    left: 12,
  },
  passwordEyeIconBg: {
    right: 1,
    backgroundColor: 'white',
    height: 58.6,
    top: 17.8,
    width: 50,
    borderStyle: 'solid',
    borderColor: '#a7a6a5',
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    borderRightWidth: 1.5,
    borderLeftWidth: 0,
  },
  toggleLink: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom:20
   // bottom: 140,
  },
  logoClear: {

    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    width: '100%',
  },
  scrollView: {
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  logo: {
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 20,
    fontWeight:'bold',

  },
  label: {
    color: newTheme.colors.secondary,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: newTheme.colors.primary,
  },
  whiteText: {
    color: newTheme.colors.whiteText
  },
  btnLogin: {
    color: newTheme.colors.whiteText,
    width: 100,
    alignSelf: "flex-end",
    marginRight: -20,
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: "flex-end",
    justifyContent: 'flex-end',
    paddingRight: 20,
  },
  image: {
    maxWidth: 300,
    minWidth: 250,
    height: 50,
  },
  statusBar: {
    backgroundColor: "#f7f8f9",
    height: 50,
  },
});

export default memo(LoginScreen);
       // <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
           /* <View style={styles.logo}>
                <Text>{resources.getString("Well-Being Check")}</Text>
               <Button onPress={this.onTestA}><Text> AAA</Text></Button>
                                               <Button onPress={this.onTestB}><Text>BBB</Text></Button>
                                               <Button onPress={this.onTestC}><Text>CCC</Text></Button>
                                               <Button onPress={this.onTestD}><Text>DDD</Text></Button>

                                <Button onPress={()=>this.onTestA()}><Text> AAA</Text></Button>
                                <Button onPress={()=>this.onTestB()}><Text> BBB</Text></Button>
              </View>*/