import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView,Image } from 'react-native';
import { AsyncStorage } from 'react-native';
import Background from '../../components/Background';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { newTheme } from '../../core/theme';
import { resources } from '../../../GlobalResources';
import { Provider as PaperProvider } from 'react-native-paper';
import md5 from "react-native-md5";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import LogoClear from '../../components/LogoClear';
import AppBanner from '../../components/AppBanner';
import { SafeAreaConsumer } from 'react-native-safe-area-context';

type LoginState = {
  password: string,
  passwordError: string,
  title: string,
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class LoginScreen extends React.Component<Props, LoginState> {

  constructor(LoginState) {
    super(LoginState)
    this.state = {
      password: "",
      passwordError: "",
      title: resources.getString("Well-Being Check")
    };
  }

  toggleLanguage() {
    if (resources.culture == 'en') resources.culture = 'fr'; else resources.culture = 'en';
    this.setState({ title: resources.getString("Well-Being Check") });
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
          this.setState({ passwordError: 'incorrect password' });
        }
        else {
          //user login success - redirect
          this.props.navigation.navigate('Dashboard');
        }
      }
      else {
        this.setState({ passwordError: 'incorrect password' });
      }
    });
  }

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
          {/* <BackButton goBack={() => this.props.navigation.navigate('HomeScreen')} /> */}
          <View style={{ width: '100%', height: 24, marginTop: 40, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
            <TouchableOpacity onPress={() => this.toggleLanguage()} style={{ height: 60 }}><Text>{resources.getString("Language")}</Text></TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>

            <View style={styles.logo}>
              <LogoClear />
              <Text>{resources.getString("Well-Being Check")}</Text>
            </View>

            <TextInput
              label={resources.getString("Enter password")}
              returnKeyType="next"
              value={this.state.password}
              onChangeText={text => this.setState({ password: text })}
              error={!!this.state.passwordError}
              errorText={this.state.passwordError}
              secureTextEntry={true}
            />

            <View style={styles.forgotPassword}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')}
              >
                <Text style={styles.label}>{resources.getString("login.forgot_password")}</Text>
              </TouchableOpacity>
            </View>

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
        </Background>
        <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  logo: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
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
