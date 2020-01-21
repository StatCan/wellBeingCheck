import React, { memo, useState } from 'react';
import { Picker, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { Navigation } from '../types';

import {
  passwordValidator,
  passwordConfirmValidator,
  securityQuestionValidator,
  securityAnswerValidator,
} from '../core/utils';

type Props = {
  navigation: Navigation;
};

const RegisterScreen = ({ navigation }: Props) => {
  const [password, setPassword] = useState({ value: '', error: '' });
  const [passwordConfirm, setPasswordConfirm] = useState({ value: '', error: '' });
  const [securityQuestion, setSecurityQuestion] = useState({ value: '', error: '' });
  const [securityAnswer, setSecurityAnswer] = useState({ value: '', error: '' });

  const _onSignUpPressed = () => {
    const passwordError = passwordValidator(password.value);
    const passwordConfirmError = passwordConfirmValidator(password.value, passwordConfirm.value);
    const securityQuestionError = securityQuestionValidator(securityQuestion.value);
    const securityAnswerError = securityAnswerValidator(securityAnswer.value);

    if (passwordError || passwordConfirmError || securityQuestionError || securityQuestionError) {
      setPassword({ ...password, error: passwordError });
      setPasswordConfirm({ ...passwordConfirm, error: passwordConfirmError });
      setSecurityQuestion({ ...securityQuestion, error: securityQuestionError });
      setSecurityAnswer({ ...securityAnswer, error: securityAnswerError });
      return;
    }

    navigation.navigate('Dashboard');
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />

      <Logo />

      <Header>Create Account</Header>

      <TextInput
        label="Paswword"
        returnKeyType="next"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry={true}
      />

      <TextInput
        label="Paswword Confirm"
        returnKeyType="next"
        value={passwordConfirm.value}
        onChangeText={text => setPasswordConfirm({ value: text, error: '' })}
        error={!!passwordConfirm.error}
        errorText={passwordConfirm.error}
        secureTextEntry={true}
      />

      <Text>Security Question</Text>
      <Picker
        style={[styles.picker]} itemStyle={styles.pickerItem}
        onValueChange={(itemValue, itemIndex) =>
          setSecurityQuestion({ value: itemValue, error: '' })
        }>
        <Picker.Item label="Mother's Maiden name" value="mdn" />
        <Picker.Item label="Year of Birth" value="yob" />
      </Picker>

      <TextInput
        label="Security Answer"
        returnKeyType="next"
        value={securityAnswer.value}
        onChangeText={text => setSecurityAnswer({ value: text, error: '' })}
        error={!!securityAnswer.error}
        errorText={securityAnswer.error}
      />

      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
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
    width: 100,
    backgroundColor: '#ffff',
    borderColor: '#330033',
    borderWidth: 10,
  },
  pickerItem: {
    color: 'red'
  },
});

export default memo(RegisterScreen);
