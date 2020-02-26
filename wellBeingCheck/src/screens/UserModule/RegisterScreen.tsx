import React, { memo, useState, useCallback } from 'react';
import { Picker, View, Text, StyleSheet, TouchableOpacity, Modal, SafeAreaView, ScrollView } from 'react-native';
import { AsyncStorage } from 'react-native';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import { theme, newTheme } from '../../core/theme';
import { resources } from '../../../GlobalResources';
//import { Navigation } from '../../types';
import { EvilIcons, Feather } from '@expo/vector-icons';

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
import { Drawer, Title, Provider, Portal, Dialog, Paragraph } from 'react-native-paper';
import LogoClear from '../../components/LogoClear';
import LogoClearSmall from '../../components/LogoClearSmall';

type RegisterState = {
  password: string,
  passwordError: string,
  passwordConfirm: string,
  passwordConfirmError: string,
  securityQuestion: string,
  securityQuestionError: string,
  securityAnswer: string,
  securityAnswerError: string,
  modalShow: boolean,
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class RegisterScreen extends React.Component<Props, RegisterState> {

  constructor(RegisterState) {
    super(RegisterState)
    this.state = {
      password: "",
      passwordError: "",
      passwordConfirm: "",
      passwordConfirmError: "",
      securityQuestion: "",
      securityQuestionError: "",
      securityAnswer: "",
      securityAnswerError: "",
      modalShow: true,
    };
    //this._retrieveData('user_password');
    this._accountAlreadyExists();
  }

  _accountAlreadyExists() {
    const currentPassword = this._retrieveData('user_password');
    if (!!currentPassword) {
      //user already has account
      //alert('user account already exixst! - navigation block commented');
      //this.props.navigation.navigate('HomeScreen');
    }
  }

  _getPasswordErrorText(errorCode) {
    switch (errorCode) {
      case 200:
        return '';
        break;
      case 10:
        return resources.getString("reg.pass.validation.empty")
        break;
      case 20:
        return resources.getString("reg.pass.validation.min_eight")
        break;
      case 30:
        return resources.getString("reg.pass.validation.upper")
        break;
      case 40:
        return resources.getString("reg.pass.validation.special")
        break;
      case 50:
        return resources.getString("reg.pass.validation.lower")
        break;
      case 60:
        return resources.getString("reg.pass.validation.number")
        break;
      default:
        return '';
    }
  }

  _validateForm = () => {
    const isPasswordValid = passwordValidator(this.state.password);
    const isPasswordConfirmValid = passwordConfirmValidator(this.state.password, this.state.passwordConfirm);
    const isSecurityQuestionValid = securityQuestionValidator(this.state.securityQuestion);
    const isSecurityAnswerValid = securityAnswerValidator(this.state.securityAnswer);

    //translate password error
    let passwordErrorText = this._getPasswordErrorText(isPasswordValid)

    if ((isPasswordValid == 200) && (isPasswordConfirmValid == '') && (isSecurityQuestionValid == '') && (isSecurityAnswerValid == '')) {
      this.setState({ passwordError: '' });
      this.setState({ passwordConfirmError: '' });
      this.setState({ securityQuestionError: '' });
      this.setState({ securityAnswerError: '' });
      return true;
    }
    else {
      this.setState({ passwordError: passwordErrorText });
      this.setState({ passwordConfirmError: isPasswordConfirmValid });
      this.setState({ securityQuestionError: isSecurityQuestionValid });
      this.setState({ securityAnswerError: isSecurityAnswerValid });
      return false;
    }
  }

  _CreateAccount = () => {
    //validation passed lets store user
    let userAccountObj = {
      password: this.state.password,
      security_question: this.state.securityQuestion,
      security_answer: this.state.securityAnswer,
    };

    AsyncStorage.setItem('user_account', JSON.stringify(userAccountObj), () => {
      this.props.navigation.navigate('Dashboard');
    });
  }

  _onSignUpPressed = () => {
    const isValid = this._validateForm();
    if (isValid) {
      this._CreateAccount();
    }
    else {
    }
  };

  _storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
    }
  }

  _retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value != null) {
        return value;
      }
      else {
        return "";
      }
    } catch (error) {
    }
  }

  _showModal = () => this.setState({ modalShow: true });
  _hideModal = () => this.setState({ modalShow: false });

  render() {
    return (
      <Background>
        {/* <BackButton goBack={() => this.props.navigation.navigate('HomeScreen')} /> */}

        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>

            <LogoClearSmall />

            <Title style={styles.title}>Secure your account</Title>

            <View style={styles.passwordView}>
              <TextInput
                label="Enter password"
                returnKeyType="next"
                selectionColor={newTheme.colors.primary}
                underlineColor={newTheme.colors.primary}
                theme={newTheme}
                value={this.state.password}
                onChangeText={text => this.setState({ password: text })}
                error={!!this.state.passwordError}
                errorText={this.state.passwordError}
                secureTextEntry={true}
              />

              <TouchableOpacity
                style={styles.passwordHelpBtnBg}
                onPress={this._showModal}
              >
                <Text style={styles.passwordHelpBtnText}>?</Text>
              </TouchableOpacity>

              {/* <Button mode="outlined" onPress={this._onPasswordHelpPressed} style={styles.btnHelp}>
            ?
          </Button> */}
            </View>

            <TextInput
              label="Confirm password"
              returnKeyType="next"
              selectionColor={newTheme.colors.primary}
              underlineColor={newTheme.colors.primary}
              theme={newTheme}
              value={this.state.passwordConfirm}
              onChangeText={text => this.setState({ passwordConfirm: text })}
              error={!!this.state.passwordConfirmError}
              errorText={this.state.passwordConfirmError}
              secureTextEntry={true}
            />

            {/* mode can also be dropdown - dialog will allow more space */}
            <Picker
              selectedValue={this.state.securityQuestion}
              style={[styles.picker]}
              itemStyle={styles.pickerItem}
              onValueChange={value => this.setState({ securityQuestion: value })}>
              <Picker.Item label={resources.getString("reg.ques.select")} value="" />
              <Picker.Item label={resources.getString("reg.ques.mother")} value="reg.ques.mother" />
              <Picker.Item label={resources.getString("reg.ques.school")} value="reg.ques.school" />
              <Picker.Item label={resources.getString("reg.ques.car")} value="reg.ques.car" />
              <Picker.Item label={resources.getString("reg.ques.sport")} value="reg.ques.sport" />
              <Picker.Item label={resources.getString("reg.ques.job")} value="reg.ques.job" />
            </Picker>
            {this.state.securityQuestionError != '' ? (
              <Text style={styles.errorTest}>{this.state.securityQuestionError}</Text>
            ) : null
            }

            <TextInput
              label="Answer"
              returnKeyType="next"
              selectionColor={newTheme.colors.primary}
              underlineColor={newTheme.colors.primary}
              theme={newTheme}
              value={this.state.securityAnswer}
              onChangeText={text => this.setState({ securityAnswer: text })}
              error={!!this.state.securityAnswerError}
              errorText={this.state.securityAnswerError}
            />

            <View style={styles.footer}>
              <Button color={newTheme.colors.primary} mode="contained" onPress={this._onSignUpPressed} style={styles.button}>
                <Text style={styles.whiteText}>{resources.getString("reg.action.create")}</Text>
              </Button>
            </View>


            {/* <View style={styles.row}>
          <Text style={styles.label}>Already have an account? </Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View> */}

            <View>
              <Portal>
                <Dialog
                  visible={this.state.modalShow}
                  onDismiss={this._hideModal}>
                  <Dialog.Title>Password Requirments</Dialog.Title>
                  <Dialog.Content>
                    <View style={styles.pr_view}>
                      <Text style={styles.pr_text}>8 Characters</Text>
                      <TouchableOpacity style={styles.pr_btn}>
                        <EvilIcons size={25} name="check" />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.pr_view}>
                      <Text style={styles.pr_text}>1 Upper case</Text>
                      <TouchableOpacity style={styles.pr_btn}>
                        <EvilIcons size={25} name="check" />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.pr_view}>
                      <Text style={styles.pr_text}>1 Special character</Text>
                      <TouchableOpacity style={styles.pr_btn}>
                        <EvilIcons size={25} name="check" />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.pr_view}>
                      <Text style={styles.pr_text}>1 Lower case</Text>
                      <TouchableOpacity style={styles.pr_btn}>
                        <EvilIcons size={25} name="check" />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.pr_view}>
                      <Text style={styles.pr_text}>1 Number</Text>
                      <TouchableOpacity style={styles.pr_btn}>
                        <EvilIcons size={25} name="check" />
                      </TouchableOpacity>
                    </View>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <View>
                      <Button
                        color={newTheme.colors.primary}
                        style={styles.pr_action_btn}
                        onPress={this._hideModal}>
                        Ok
                      </Button>
                    </View>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </View>

          </ScrollView>
        </SafeAreaView>

      </Background >

    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  scrollView: {
  },
  pr_action_btn: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    position: 'relative',
  },
  pr_view: {
  },
  pr_text: {
    marginBottom: 8,
    fontSize: 15,
    color: 'grey',
  },
  pr_btn: {
    flexDirection: 'row',
    alignSelf: "flex-end",
    position: 'relative',
    right: 0,
    bottom: 20,
    color: 'green',
  },
  passwordHelpBtnText: {
    fontSize: 25,
    color: "black",
  },
  passwordHelpBtnBg: {
    backgroundColor: "white",
    paddingHorizontal: 23,
    paddingVertical: 10,
    borderRadius: 2,
    height: 58,
    position: 'relative',
    top: 18,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'grey',
  },
  passwordView: {
    flexDirection: 'row',
    width: 238,
  },
  btnHelp: {
    height: 60,
    position: 'relative',
    top: 8,
    borderStyle: 'solid',
    borderWidth: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  label: {
    color: theme.colors.secondary,
  },
  errorTest: {
    color: theme.colors.error,
    marginTop: 5,
    textAlign: 'left',
    alignSelf: 'stretch',
    marginLeft: 4,
  },
  button: {
    color: newTheme.colors.whiteText,
    width: 100,
    alignSelf: "flex-end",
    marginRight: -20,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  picker: {
    width: '100%',
    backgroundColor: '#ffff',
    borderColor: 'grey',
    borderWidth: 1,
  },
  pickerItem: {
    height: 50,
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: "flex-end",
    justifyContent: 'flex-end',
    paddingRight: 20,
  },
  whiteText: {
    color: newTheme.colors.whiteText
  },
});

export default memo(RegisterScreen);
