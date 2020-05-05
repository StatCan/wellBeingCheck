import React, { memo, useState, useCallback } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { AsyncStorage } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import LogoClear from '../../components/LogoClear';
import AppBanner from '../../components/AppBanner';
import Background from '../../components/Background';
import LogoClearSmall from '../../components/LogoClearSmall';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { theme, newTheme } from '../../core/theme';

import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

import {
  passwordValidator,
  passwordConfirmValidator,
  securityQuestionValidator,
  securityAnswerValidator,
} from '../../core/utils';
import { Drawer } from 'react-native-paper';
import { resources } from '../../../GlobalResources';

type ForgotPasswordState = {
  securityQuestion: string,
  securityAnswer: string,
  securityAnswerError: string,
  title: string,
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class ForgotPasswordScreen extends React.Component<Props, ForgotPasswordState> {

  constructor(ForgotPasswordState) {
    super(ForgotPasswordState)
    this.state = {
      securityQuestion: "",
      securityAnswer: "",
      securityAnswerError: "",
      title: resources.getString("Well-Being Check"),
    };
    this._accountAlreadyExists();
  }

  _accountAlreadyExists() {
    AsyncStorage.getItem('user_account', (err, result) => {
      console.log(result);
      if (result) {
        let resultAsObj = JSON.parse(result)
        let secQue = resultAsObj.security_question;
        this.setState({ securityQuestion: secQue });
      }
      else {
        this.setState({ securityQuestion: 'no account exists' });
      }
    });
  }

  _onResetPasswordPressed = () => {
    AsyncStorage.getItem('user_account', (err, result) => {
      console.log(result);
      if (result) {
        let resultAsObj = JSON.parse(result)
        let userSetSecAnswer = resultAsObj.security_answer
        const inputAnswer = this.state.securityAnswer

        if (userSetSecAnswer !== inputAnswer) {
          //incorrect pasword
          this.setState({ securityAnswerError: resources.getString("password.recovery.incorrectAnswer")});
        }
        else {
          //user login success - redirect
          this.props.navigation.navigate('ForgotPasswordChangeScreen');
        }
      }
      else {
      }
    });
  }

  toggleLanguage() {
    if (resources.culture == 'en'){resources.culture = 'fr';AsyncStorage.setItem('Culture','2');} else {resources.culture = 'en';AsyncStorage.setItem('Culture','1');}
    this.setState({ title: resources.getString("Well-Being Check") });
  }

  render() {
    const securityQuestionValue = this.state.securityQuestion;
    const securityQuestion = resources.getString(securityQuestionValue);

    return (
      <PaperProvider theme={newTheme}>
        <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
        <Background>
          <View style={styles.logo}>
            <LogoClearSmall />
            <TouchableOpacity
              onPress={() => this.toggleLanguage()}
              style={{ height: 60 }}
            >
              <Text>{resources.getString("Language")}</Text>
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={{ minHeight: 100 }}>

            <Text style={styles.header}>{resources.getString("password_recovery.title")}</Text>

            <Text style={styles.securityQuestionText}>{securityQuestion}</Text>

            <TextInput
              label={resources.getString("answer")}
              returnKeyType="next"
              value={this.state.securityAnswer}
              onChangeText={text => this.setState({ securityAnswer: text })}
              error={!!this.state.securityAnswerError}
              errorText={this.state.securityAnswerError}
            />

            <View style={styles.footer}>
              <Button
                color={theme.colors.secondary}
                style={styles.btnCancel}
                mode="contained"
                onPress={() => this.props.navigation.navigate('LoginScreen')}
              >
                <Text style={styles.whiteText}>{resources.getString("gl.cancel")}</Text>
              </Button>

              <Button
                color={newTheme.colors.primary}
                style={styles.btnNext}
                mode="contained"
                onPress={this._onResetPasswordPressed}
              >
                <Text style={styles.whiteText}>{resources.getString("gl.next")}</Text>
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
  logo: {
    justifyContent: 'space-between', flexDirection: 'row', width: '100%',
    marginTop: 10,
    marginBottom: 100,
  },
  back: {
    width: '100%',
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
  label: {
    color: theme.colors.secondary,
    width: '100%',
  },
  header: {
    color: 'black',
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },
  securityQuestionText: {
  },
  whiteText: {
    color: newTheme.colors.whiteText
  },
  btnCancel: {
    color: newTheme.colors.whiteText,
    width: 140,
    alignSelf: "flex-end",
    marginRight: 20,
  },
  btnNext: {
    color: newTheme.colors.whiteText,
    width: 140,
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
});

export default memo(ForgotPasswordScreen);
