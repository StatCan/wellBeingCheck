import React, { memo } from 'react';
import { Picker, View, Text, StyleSheet, TouchableOpacity, Modal, SafeAreaView, ScrollView } from 'react-native';
import { AsyncStorage } from 'react-native';
import Background from '../../components/Background';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { theme, newTheme } from '../../core/theme';
import { resources } from '../../../GlobalResources';
import { Provider as PaperProvider, List } from 'react-native-paper';
import { EvilIcons, Feather, FontAwesome } from '@expo/vector-icons';
import { Drawer, Title, Provider, Portal, Dialog } from 'react-native-paper';
import LogoClearSmall from '../../components/LogoClearSmall';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import md5 from "react-native-md5";

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

type RegisterState = {
  password: string,
  passwordIsHidden: boolean,
  passwordError: string,
  passwordConfirm: string,
  passwordConfirmError: string,
  securityQuestion: string,
  securityQuestionError: string,
  securityAnswer: string,
  securityAnswerError: string,
  modalShow: boolean,
  modalSecrectQuestionShow: boolean,
  title: string,
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class RegisterScreen extends React.Component<Props, RegisterState> {

  constructor(RegisterState) {
    super(RegisterState)
    this.state = {
      password: "",
      passwordIsHidden: true,
      passwordError: "",
      passwordConfirm: "",
      passwordConfirmError: "",
      securityQuestion: "",
      securityQuestionError: "",
      securityAnswer: "",
      securityAnswerError: "",
      modalShow: false,
      modalSecrectQuestionShow: false,
      title: resources.getString("Well-Being Check"),
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

  _getPasswordConfirmErrorText(errorCode) {
    switch (errorCode) {
      case 200:
        return '';
        break;
      case 10:
        return resources.getString("reg.pass_conf.empty")
        break;
      case 20:
        return resources.getString("reg.pass_conf.match")
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
    let passwordConfirmErrorText = this._getPasswordConfirmErrorText(isPasswordConfirmValid)

    if ((isPasswordValid == 200) && (isPasswordConfirmValid == '') && (isSecurityQuestionValid == '') && (isSecurityAnswerValid == '')) {
      this.setState({ passwordError: '' });
      this.setState({ passwordConfirmError: '' });
      this.setState({ securityQuestionError: '' });
      this.setState({ securityAnswerError: '' });
      return true;
    }
    else {
      this.setState({ passwordError: passwordErrorText });
      this.setState({ passwordConfirmError: passwordConfirmErrorText });
      this.setState({ securityQuestionError: isSecurityQuestionValid });
      this.setState({ securityAnswerError: isSecurityAnswerValid });
      return false;
    }
  }

  _CreateAccount = () => {
    //validation passed lets store user

    //first hash the password as md5
    let passwordHashed = md5.hex_md5(this.state.password);

    let userAccountObj = {
      password: passwordHashed,
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

  _showSecretQuestionModal = () => this.setState({ modalSecrectQuestionShow: true });
  _hideSecretQuestionModal = () => this.setState({ modalSecrectQuestionShow: false });

  toggleLanguage() {
    if (resources.culture == 'en') resources.culture = 'fr'; else resources.culture = 'en';
    this.setState({ title: resources.getString("Well-Being Check") });
  }

  _handleSecQuesSelectMother = () => {
    this.setState({ securityQuestion: 'reg.ques.mother' });
    this._hideSecretQuestionModal()
  };
  _handleSecQuesSelectSchool = () => {
    this.setState({ securityQuestion: 'reg.ques.school' });
    this._hideSecretQuestionModal()
  };
  _handleSecQuesSelectSport = () => {
    this.setState({ securityQuestion: 'reg.ques.sport' });
    this._hideSecretQuestionModal()
  };
  _handleSecQuesSelectCar = () => {
    this.setState({ securityQuestion: 'reg.ques.car' });
    this._hideSecretQuestionModal()
  };
  _handleSecQuesSelectJob = () => {
    this.setState({ securityQuestion: 'reg.ques.job' });
    this._hideSecretQuestionModal()
  };

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

  render() {
    return (
      <PaperProvider theme={newTheme}>
        <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
        <Background>

          <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', width: '100%', height: 24, marginTop: 0, marginBottom: 10, justifyContent: 'space-between' }}>
              <LogoClearSmall />
              <TouchableOpacity onPress={() => this.toggleLanguage()} style={{ alignSelf: 'flex-end', marginRight: 0 }}><Text>{resources.getString("Language")}</Text></TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollView}>

              <Title style={styles.title}>{resources.getString("Secure your account")}</Title>

              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={styles.passwordInput}>
                  <TextInput
                    label={resources.getString("Enter password")}
                    returnKeyType="next"
                    selectionColor={newTheme.colors.primary}
                    underlineColor={newTheme.colors.primary}
                    theme={newTheme}
                    value={this.state.password}
                    onChangeText={text => this.setState({ password: text })}
                    error={!!this.state.passwordError}
                    errorText={this.state.passwordError}
                    secureTextEntry={this.state.passwordIsHidden}
                  />
                </View>

                <View>
                  <TouchableOpacity
                    style={styles.passwordEyeIconBg}
                    onPress={this._togglePasswordHidden}
                    activeOpacity={1}
                  >
                    <Feather
                      style={styles.passwordEyeIcon}
                      size={20} name={this.state.passwordIsHidden ? "eye-off" : "eye"}
                    />
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity
                    style={styles.passwordHelpBtnBg}
                    onPress={this._showModal}
                  >
                    <Text style={styles.passwordHelpBtnText}>?</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TextInput
                label={resources.getString("confirm_password")}
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

              <TouchableOpacity
                onPress={this._showSecretQuestionModal}
              >
                <View style={styles.secretQuestionView}>
                  <Text style={styles.secretQuestionViewInput}>
                    {this.state.securityQuestion == '' ? resources.getString('reg.ques.select') : resources.getString(this.state.securityQuestion)}
                  </Text>
                </View>
              </TouchableOpacity>
              {this.state.securityQuestionError != '' ? (
                <Text style={styles.errorTest}>{this.state.securityQuestionError}</Text>
              ) : null
              }

              <TextInput
                label={resources.getString("the_answer_is:")}
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

              {/* secret question dialog */}
              <View>
                <Portal>
                  <Dialog
                    visible={this.state.modalSecrectQuestionShow}
                    onDismiss={this._hideSecretQuestionModal}>
                    <Dialog.Content>
                      <TouchableOpacity
                        onPress={this._handleSecQuesSelectMother}
                      >
                        <View>
                          <List.Item
                            title={resources.getString("reg.ques.mother")}
                          />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={this._handleSecQuesSelectSchool}
                      >
                        <View>
                          <List.Item
                            title={resources.getString("reg.ques.school")}
                          />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={this._handleSecQuesSelectCar}
                      >
                        <View>
                          <List.Item
                            title={resources.getString("reg.ques.car")}
                          />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={this._handleSecQuesSelectSport}
                      >
                        <View>
                          <List.Item
                            title={resources.getString("reg.ques.sport")}
                          />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={this._handleSecQuesSelectJob}
                      >
                        <View>
                          <List.Item
                            title={resources.getString("reg.ques.job")}
                          />
                        </View>
                      </TouchableOpacity>
                    </Dialog.Content>
                  </Dialog>
                </Portal>
              </View>

              {/* password help dialog */}
              <View>
                <Portal>
                  <Dialog
                    visible={this.state.modalShow}
                    onDismiss={this._hideModal}>
                    <Dialog.Title>{resources.getString("Password Requirements")}</Dialog.Title>
                    <Dialog.Content>
                      <View style={styles.pr_view}>
                        <Text style={styles.pr_text}>{resources.getString("reg.pass.hint_length")}</Text>
                        <TouchableOpacity style={styles.pr_btn}>
                          <EvilIcons size={25} name="check" />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.pr_view}>
                        <Text style={styles.pr_text}>{resources.getString("reg.pass.hint_upper")}</Text>
                        <TouchableOpacity style={styles.pr_btn}>
                          <EvilIcons size={25} name="check" />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.pr_view}>
                        <Text style={styles.pr_text}>{resources.getString("reg.pass.hint_special")}</Text>
                        <TouchableOpacity style={styles.pr_btn}>
                          <EvilIcons size={25} name="check" />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.pr_view}>
                        <Text style={styles.pr_text}>{resources.getString("reg.pass.hint_lower")}</Text>
                        <TouchableOpacity style={styles.pr_btn}>
                          <EvilIcons size={25} name="check" />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.pr_view}>
                        <Text style={styles.pr_text}>{resources.getString("reg.pass.hint_number")}</Text>
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
        <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
      </PaperProvider >
    );
  }
}

const styles = StyleSheet.create({
  passwordInput: {
    width: 190,
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
    borderLeftWidth: 0,

  },
  secretQuestionViewInput: {
    color: 'grey',
    fontSize: 16,
    top: 15,
    left: 10,
  },
  secretQuestionView: {
    backgroundColor: 'white',
    height: 55,
    borderStyle: 'solid',
    borderWidth: 1.5,
    borderColor: '#a7a6a5',
    borderRadius: 2,
  },
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
    // position: 'relative',
    top: 18,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'grey',
    right: 1,
  },
  passwordView: {
    flexDirection: 'row',
    width: 200,
    backgroundColor: 'blue'
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
    borderWidth: 1
  },
  pickerItem: {
    height: 50,
    fontSize: 15
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
