import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { Navigation } from '../types';

import {
  emailValidator,
  passwordValidator,
  nameValidator,
  pinValidator,
  pinConfirmValidator,
} from '../core/utils';

type Props = {
  navigation: Navigation;
};

const RegisterScreen = ({ navigation }: Props) => {
  const [pin, setPIN] = useState({ value: '', error: '' });
  const [pinconfirm, setPINConfirm] = useState({ value: '', error: '' });

  const _onSignUpPressed = () => {
    const pinError = pinValidator(pin.value);
    const pinConfirmError = pinConfirmValidator(pin.value, pinconfirm.value);

    if (pinError || pinConfirmError) {
      setPIN({ ...pin, error: pinError });
      setPINConfirm({ ...pinconfirm, error: pinConfirmError });
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
        label="PIN"
        returnKeyType="next"
        value={pin.value}
        onChangeText={text => setPIN({ value: text, error: '' })}
        error={!!pin.error}
        errorText={pin.error}
        keyboardType={'numeric'}
      />

      <TextInput
        label="PIN Confirm"
        returnKeyType="next"
        value={pinconfirm.value}
        onChangeText={text => setPINConfirm({ value: text, error: '' })}
        error={!!pinconfirm.error}
        errorText={pinconfirm.error}
        keyboardType={'numeric'}
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
});

export default memo(RegisterScreen);
