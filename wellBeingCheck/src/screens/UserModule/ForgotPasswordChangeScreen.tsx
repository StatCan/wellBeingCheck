import React, { memo } from 'react';
import { Picker, View, Text, StyleSheet, TouchableOpacity, Modal, SafeAreaView, ScrollView } from 'react-native';
import { AsyncStorage } from 'react-native';
import Background from '../../components/Background';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { theme, newTheme } from '../../core/theme';
import { resources } from '../../../GlobalResources';
import { Provider as PaperProvider } from 'react-native-paper';
import { EvilIcons, Feather } from '@expo/vector-icons';
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
import LogoClear from '../../components/LogoClear';

type ForgotPasswordChangeState = {
  password: string,
  passwordError: string,
  passwordConfirm: string,
  passwordConfirmError: string,
  modalShow: boolean,
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class ForgotPasswordChangeScreen extends React.Component<Props, ForgotPasswordChangeState> {

  constructor(RegisterState) {
    super(RegisterState)
    this.state = {
      password: "",
      passwordError: "",
      passwordConfirm: "",
      passwordConfirmError: "",
      modalShow: false,title: resources.getString("Well-Being Check")
    };
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

    //translate password error
    let passwordErrorText = this._getPasswordErrorText(isPasswordValid)
    let passwordConfirmErrorText = this._getPasswordConfirmErrorText(isPasswordConfirmValid)

    if ((isPasswordValid == 200) && (isPasswordConfirmValid == '')) {
      this.setState({ passwordError: '' });
      this.setState({ passwordConfirmError: '' });
      return true;
    }
    else {
      this.setState({ passwordError: passwordErrorText });
      this.setState({ passwordConfirmError: passwordConfirmErrorText });
      return false;
    }
  }

  _CreateNewAccount = () => {
    //validation passed lets store user
    AsyncStorage.getItem('user_account', (err, result) => {
      console.log(result);
      if (result) {
        let resultAsObj = JSON.parse(result)
        let secQue = resultAsObj.security_question;
        let secAnsw = resultAsObj.security_answer;

        //first hash the password as md5
        let passwordHashed = md5.hex_md5(this.state.password);

        let userAccountObj = {
          password: passwordHashed,
          security_question: secQue,
          security_answer: secAnsw,
        };

        AsyncStorage.setItem('user_account', JSON.stringify(userAccountObj), () => {
          this.props.navigation.navigate('Dashboard');
        });
      }
      else {
        alert('Failed to create new account!')
      }
    });
  }

  _onSignUpPressed = () => {
    const isValid = this._validateForm();
    if (isValid) {
      this._CreateNewAccount();
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
  toggleLanguage() {
    if (resources.culture == 'en') resources.culture = 'fr'; else resources.culture = 'en';
    this.setState({ title: resources.getString("Well-Being Check") });
  }
  render() {
    return (
      <PaperProvider theme={newTheme}>
        <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
        <Background>
           <View style={styles.logo}>
                                    <LogoClearSmall />
                  <TouchableOpacity onPress={() => this.toggleLanguage()} style={{ height: 60 }}><Text>{resources.getString("Language")}</Text></TouchableOpacity>
                </View>
            <ScrollView style={styles.scrollView}>

              <Title style={styles.title}>{resources.getString("password_recovery_change.title")}</Title>
              <View style={styles.passwordView}>
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
                  secureTextEntry={true}
                />
                <TouchableOpacity
                  style={styles.passwordHelpBtnBg}
                  onPress={this._showModal}
                >
                  <Text style={styles.passwordHelpBtnText}>?</Text>
                </TouchableOpacity>
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

              <View style={styles.footer}>
                <Button  color={theme.colors.secondary} mode="contained" onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')} style={styles.btnCancel}>
                                                <Text style={styles.whiteText}>{resources.getString("gl.cancel")}</Text>
                </Button>
                <Button color={newTheme.colors.primary} mode="contained" onPress={this._onSignUpPressed} style={styles.btnNext}>
                  <Text style={styles.whiteText}>{resources.getString("reg.action.create")}</Text>
                </Button>

              </View>

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

        </Background >
        <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
     logo: {
      justifyContent: 'space-between',flexDirection:'row',width:'100%',
      marginTop: 10,
      marginBottom: 10,
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

export default memo(ForgotPasswordChangeScreen);
