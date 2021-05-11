
import React, { memo } from 'react';
import { Picker, View, Text, StyleSheet, TouchableOpacity, Modal, SafeAreaView, ScrollView, Alert,Platform } from 'react-native';
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
import { checkConnection, hashString } from '../../utils/fetchJwToken';
import md5 from "react-native-md5";
import { BackEndService } from '../../api/back-end.service';
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
  passwordIsHidden: boolean,
  passwordError: string,
  passwordConfirm: string,
  passwordConfirmError: string,
  modalShow: boolean,
  title: string,
  pasVal_length: boolean,
  passVal_Upper: boolean,
  passVal_Special: boolean,
  passVal_Lower: boolean,
  passVal_Number: boolean,
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
const WEB_API_BASE_URL = global.webApiBaseUrl + 'api';
let pass='';
class ForgotPasswordChangeScreen extends React.Component<Props, ForgotPasswordChangeState> {

  constructor(RegisterState) {
    super(RegisterState)
    this.state = {
      password: "",
      passwordIsHidden: true,
      passwordError: "",
      passwordConfirm: "",
      passwordConfirmError: "",
      modalShow: false,
      title: resources.getString("Well-Being Check"),
      pasVal_length: false,
      passVal_Upper: false,
      passVal_Special: false,
      passVal_Lower: false,
      passVal_Number: false,
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
        let success = true;
        if (global.doneSurveyA) {
          success = this.resetPassword(passwordHashed);
        }
        if (success) {
          AsyncStorage.setItem('user_account', JSON.stringify(userAccountObj), () => {
            global.securityAnswer = secAnsw; global.password = passwordHashed;
            console.log('new password...............:' + global.password);
            this.props.navigation.navigate('Dashboard');
          });
        } else {
          alert('Failed to create new account!');
        }

      }
      else {
        alert('Failed to create new account!')
      }
    });
  }

  //resetPassword  tested well
  async resetPassword(newPass) {
    let isConnected = await checkConnection();
    if (!isConnected) { alert('You are offline, try it later'); return false; }
    let url = global.webApiBaseUrl + 'api/security/password'; console.log(url);
    let data = {
      deviceId: global.userToken,
      sac: global.sac,
      newSalt: global.passwordSalt,
      newPasswordHash: hashString(newPass, global.passwordSalt),
      securityAnswerHash: hashString(global.securityAnswer, global.securityAnswerSalt),
      newSecurityQuestionId: global.securityQuestionId,
      newSecurityAnswerSalt: global.securityAnswerSalt,
      newSecurityAnswerHash: hashString(global.securityAnswer, global.securityAnswerSalt)
    }
    console.log(data);
    let data1 = {
      salt: global.passwordSalt,
      passwordHash: hashString(global.password, global.passwordSalt),
      securityQuestionId: global.securityQuestionId,
      securityAnswerSalt: global.securityAnswerSalt,
      securityAnswerHash: hashString(global.securityAnswer, global.securityAnswerSalt)
    }

    return fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status == 200) { console.log('good'); global.password = newPass; return true; }
        else { console.log('Bad:' + response.status); return false; }
      })    // .then((response) => response.json())
      //  .then((responseJson) => {console.log('resetPassword:'+responseJson);    return responseJson;})
      .catch((error) => { console.error(error); console.log('Bad'); return false; });
  }

  //resetPasswordNew test failed  check later
  async resetPasswordNew(newPass) {
    let service = new BackEndService(
      WEB_API_BASE_URL,
      'fr-CA',
      global.userToken,
      global.sac,
      'null',
      fetch
    );
    let result = await service.resetPassword(
      global.passwordSalt,
      hashString(newPass, global.passwordSalt),
      hashString(global.securityAnswer, global.securityAnswerSalt),
      global.securityQuestionId,
      global.securityAnswerSalt,
      hashString(global.securityAnswer, global.securityAnswerSalt)
    );
    if (service.isResultFailure(result)) { console.log('bad'); return false; }
    else { global.password = newPass; console.log('good'); return true; }
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
    if (resources.culture == 'en') {
      resources.culture = 'fr';
      AsyncStorage.setItem('Culture', '2');
    } else {
      resources.culture = 'en';
      AsyncStorage.setItem('Culture', '1');
    }
    this.setState({ title: resources.getString("Well-Being Check") });
    this._validateForm();
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


  //We had to move the validation form utils to here since they cannot be constatnts. The updates would not take effect instantly
  _passwordInputChange = (text) => {
    const passText = text;
    const pasValLength =  text.length >= 8;
    const passValUpper =  (/[A-Z]/.test(text));
    const passValSpecial =  (/[@!#$%^&*(),.?:{}|<>]/.test(text));
    console.log('Is has special character:'+passValSpecial);

//     const passValSpecial =  (!/[@!#$%^&*(),.?:{}|<>]/.test(password))
    const passValLower =  (/[a-z]/.test(text));
    const passValNumber =  (/[0-9]/.test(text));

    if(Platform.OS == 'ios' && text!='' && this.state.passwordIsHidden){
        console.log('Pass:'+pass+'->'+text);text=pass+text;pass='';console.log('Input:'+text);}
    const isPasswordValid = passwordValidator(text);
    let passwordErrorText = this._getPasswordErrorText(isPasswordValid)
    if (isPasswordValid == 200)passwordErrorText='';
     this.setState({ password: text,pasVal_length: pasValLength,passVal_Upper: passValUpper,passVal_Special: passValSpecial,passVal_Lower: passValLower,passVal_Number: passValNumber,passwordError: passwordErrorText });

    /*if (isPasswordValid == 200) {
      this.setState({ passwordError: '' });
    }
    else {
      this.setState({ passwordError: passwordErrorText });
    }*/
  }
keyPressed=(e)=>{
      if(Platform.OS == 'ios' && this.state.passwordIsHidden){
      let ch=e.nativeEvent.key;
      console.log('Key Press:'+ch);
       if(ch==='Backspace' && justFocused){pass='';console.log('Backspace clicked new pass='+pass);}
       justFocused=false;}
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

            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={styles.passwordInput}>
                <TextInput
                  label={resources.getString("Enter password")}
                  returnKeyType="next"
                  selectionColor={newTheme.colors.primary}
                  underlineColor={newTheme.colors.primary}
                  theme={newTheme}
                  value={this.state.password}
                  onChangeText={text => this._passwordInputChange(text)}
                  error={!!this.state.passwordError}
                  errorText={this.state.passwordError}
                  secureTextEntry={this.state.passwordIsHidden}
                  onFocus={()=>{justFocused=true;console.log('retriving:'+pass+'JustFocused:'+justFocused);if(this.state.passwordIsHidden)this.setState({password:pass});}}
                  onEndEditing={()=>{console.log('End editing');pass=this.state.password;console.log('saving:'+pass);}}
                  onKeyPress={(e)=>this.keyPressed(e)}
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
                  activeOpacity={1}
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

            <View style={styles.footer}>
              <Button color={theme.colors.secondary} mode="contained" onPress={() => this.props.navigation.navigate('LoginScreen')} style={styles.btnCancel}>
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
                       {this.state.pasVal_length?<EvilIcons size={25} name="check" />:null}

                      </TouchableOpacity>
                    </View>
                    <View style={styles.pr_view}>
                      <Text style={styles.pr_text}>{resources.getString("reg.pass.hint_upper")}</Text>
                      <TouchableOpacity style={styles.pr_btn}>
                         {this.state.passVal_Upper?<EvilIcons size={25} name="check" />:null}

                      </TouchableOpacity>
                    </View>
                    <View style={styles.pr_view}>
                      <Text style={styles.pr_text}>{resources.getString("reg.pass.hint_special")}</Text>
                      <TouchableOpacity style={styles.pr_btn}>
                          {this.state.passVal_Special?<EvilIcons size={25} name="check" />:null}

                      </TouchableOpacity>
                    </View>
                    <View style={styles.pr_view}>
                      <Text style={styles.pr_text}>{resources.getString("reg.pass.hint_lower")}</Text>
                      <TouchableOpacity style={styles.pr_btn}>
                         {this.state.passVal_Lower?<EvilIcons size={25} name="check" />:null}

                      </TouchableOpacity>
                    </View>
                    <View style={styles.pr_view}>
                      <Text style={styles.pr_text}>{resources.getString("reg.pass.hint_number")}</Text>
                      <TouchableOpacity style={styles.pr_btn}>
                         {this.state.passVal_Number?<EvilIcons size={25} name="check" />:null}

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
  logo: {
    justifyContent: 'space-between', flexDirection: 'row', width: '100%',
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


  // <EvilIcons size={25} name="check" color={this.state.pasVal_length ? "green" : ""} />
  // <EvilIcons size={25} name="check" color={this.state.passVal_Upper ? "green" : ""} />
  // <EvilIcons size={25} name="check" color={this.state.passVal_Special ? "green" : ""} />
  //  <EvilIcons size={25} name="check" color={this.state.passVal_Lower ? "green" : ""} />
  // <EvilIcons size={25} name="check" color={this.state.passVal_Number ? "green" : ""} />
