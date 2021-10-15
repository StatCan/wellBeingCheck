import React, { memo } from 'react';
import { Picker, View, Text, StyleSheet, TouchableOpacity, Modal, SafeAreaView, ScrollView, BackHandler,Platform } from 'react-native';
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
  securityQuestionId: string,
  securityQuestionError: string,
  securityAnswer: string,
  securityAnswerError: string,
  modalShow: boolean,
  modalSecrectQuestionShow: boolean,
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
let pass='';let justFocused=false;

class RegisterScreen extends React.Component<Props, RegisterState> {
  backHandler: any;

  constructor(RegisterState) {
    super(RegisterState)
    this.state = {
      password: "",
      passwordIsHidden: true,
      passwordError: "",
      passwordConfirm: "",
      passwordConfirmError: "",
      securityQuestion: "",
      securityQuestionId: "",
      securityQuestionError: "",
      securityAnswer: "",
      securityAnswerError: "",
      modalShow: true,
      modalSecrectQuestionShow: false,
      title: resources.getString("Well-Being Check"),
      pasVal_length: false,
      passVal_Upper: false,
      passVal_Special: false,
      passVal_Lower: false,
      passVal_Number: false,
    };
    //this._retrieveData('user_password');
    this._accountAlreadyExists();
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    return true;
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
      security_question_id: this.state.securityQuestionId,
    };

    AsyncStorage.setItem('user_account', JSON.stringify(userAccountObj), () => {
      global.securityAnswer = this.state.securityAnswer; global.password = passwordHashed; global.securityQuestionId =this.state.securityQuestionId;
        global.syslog+='Register:'+(new Date()).toString()+','; AsyncStorage.setItem('Syslog',global.syslog); //Test only
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
    if (resources.culture == 'en') {
      resources.culture = 'fr';
      AsyncStorage.setItem('Culture', '2');
    } else {
      resources.culture = 'en';
      AsyncStorage.setItem('Culture', '1');
    }
    this.setState({ title: resources.getString("Well-Being Check") });
    this._validateForm()
  }

  _handleSecQuesSelectMother = () => {
    this.setState({ securityQuestion: 'reg.ques.mother', securityQuestionId: "1" });
    this._hideSecretQuestionModal()
  };
  _handleSecQuesSelectSchool = () => {
    this.setState({ securityQuestion: 'reg.ques.school', securityQuestionId: "2" });
    this._hideSecretQuestionModal()
  };
  _handleSecQuesSelectSport = () => {
    this.setState({ securityQuestion: 'reg.ques.sport', securityQuestionId: "3" });
    this._hideSecretQuestionModal()
  };
  _handleSecQuesSelectCar = () => {
    this.setState({ securityQuestion: 'reg.ques.car', securityQuestionId: "4" });
    this._hideSecretQuestionModal()
  };
  _handleSecQuesSelectJob = () => {
    this.setState({ securityQuestion: 'reg.ques.job', securityQuestionId: "5" });
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

  //We had to move the validation form utils to here since they cannot be constatnts. The updates would not take effect instantly
  _passwordInputChange = (text) => {
    const passText = text;
        const pasValLength =  text.length >= 8;
        const passValUpper =  (/[A-Z]/.test(text));
        const passValSpecial =  (/[~@!#$%^&*(),.?:{}|<>=\/_-`|\[\];'"\\\-\+]/.test(text));
   //  const passValSpecial =  (/[/~!@#$%^&*`|(){}]/.test(text));
   //     const passValSpecial =  (/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi.test(text));
        const passValLower =  (/[a-z]/.test(text));
        const passValNumber =  (/[0-9]/.test(text));

        if(Platform.OS == 'ios' && text!='' && this.state.passwordIsHidden){
            text=pass+text;pass='';
            }
        const isPasswordValid = passwordValidator(text);
        let passwordErrorText = this._getPasswordErrorText(isPasswordValid)
        if (isPasswordValid == 200)passwordErrorText='';
         this.setState({ password: text,pasVal_length: pasValLength,passVal_Upper: passValUpper,passVal_Special: passValSpecial,passVal_Lower: passValLower,passVal_Number: passValNumber,passwordError: passwordErrorText });
  }
 keyPressed=(e)=>{
      if(Platform.OS == 'ios' && this.state.passwordIsHidden){
      let ch=e.nativeEvent.key;
       if(ch==='Backspace' && justFocused){pass='';}
       justFocused=false;}
  }
  render() {
    return (
      <PaperProvider theme={newTheme}>
        <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
        <Background>

          <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', width: '100%', height: 24, marginTop: 0, marginBottom: 10, justifyContent: 'space-between' }}>
              <LogoClearSmall />
              <TouchableOpacity onPress={() => this.toggleLanguage()} style={{ alignSelf: 'flex-end', marginRight: 0 }}
              accessible={true}
              accessibilityRole="button"
              >
                <Text>{resources.getString("Language")}</Text></TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollView}>

              <Title style={styles.title}>{resources.getString("Secure your account")}</Title>

              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={styles.passwordInput}>
                  <TextInput ref={this.refInput}
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
                    onFocus={()=>{justFocused=true;console.log('retriving:'+pass+'JustFocused:'+justFocused);
                    if(this.state.passwordIsHidden)this.setState({password:pass});}}
                    onEndEditing={()=>{console.log('End editing');pass=this.state.password;console.log('saving:'+pass);}}
                    onKeyPress={(e)=>this.keyPressed(e)}
                    accessibilityLabel={resources.getString('Accessibility.passwordInputText')}
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
                secureTextEntry={this.state.passwordIsHidden}
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
                onChangeText={text => this.setState({ securityAnswer: text})}
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
                        <View style={styles.secretQuestion}>
                          <Text style={[styles.pr_text, { color: 'black' }]}>{resources.getString("reg.ques.mother")}</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={this._handleSecQuesSelectSchool}
                      >
                        <View style={styles.secretQuestion}>
                          <Text style={[styles.pr_text, { color: 'black' }]}>{resources.getString("reg.ques.school")}</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={this._handleSecQuesSelectCar}
                      >
                        <View style={styles.secretQuestion}>
                          <Text style={[styles.pr_text, { color: 'black' }]}>{resources.getString("reg.ques.car")}</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={this._handleSecQuesSelectSport}
                      >
                        <View style={styles.secretQuestion}>
                          <Text style={[styles.pr_text, { color: 'black' }]}>{resources.getString("reg.ques.sport")}</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={this._handleSecQuesSelectJob}
                      >
                        <View style={styles.secretQuestion}>
                          <Text style={[styles.pr_text, { color: 'black' }]}>{resources.getString("reg.ques.job")}</Text>
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
          </SafeAreaView>

        </Background >
        <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
      </PaperProvider >
    );
  }
}
//color={this.state.passVal_Number ? "green" : ""}   //temparily remove it, it has problem
const styles = StyleSheet.create({
  passwordInput: {
    width: 208,
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
    width: 45,
    borderStyle: 'solid',
    borderColor: '#a7a6a5',
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    borderLeftWidth: 0,
  },
  secretQuestionViewInput: {
    color: 'grey',
    fontSize: 16,
    marginLeft:13,marginRight:13,
  //  top: 15,
   // left: 10,
  },
  secretQuestionView: {
    backgroundColor: 'white',
    height: 55,
    borderStyle: 'solid',
    borderWidth: 1.5,
    borderColor: '#a7a6a5',
    borderRadius: 2,justifyContent: 'center',
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
     flexDirection:'row',
  },
  pr_text: {
    marginBottom: 8,marginTop:8,width:'89%',
    fontSize: 15,
    color: 'grey',
  },
  pr_btn: {
    flexDirection: 'row',width:'10%',
    alignSelf: "flex-end",
    position: 'relative',
    right: 0,
    bottom: 8,
    color: '#66cc99',
  },
  passwordHelpBtnText: {
    fontSize: 23,
    color: "black",
  },
  passwordHelpBtnBg: {
    backgroundColor: "white",
    paddingHorizontal: 9,
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
  secretQuestion: {
    flexDirection: 'row', flexWrap: 'wrap', paddingRight: 2, paddingLeft: 2,
  }
});

export default memo(RegisterScreen);
