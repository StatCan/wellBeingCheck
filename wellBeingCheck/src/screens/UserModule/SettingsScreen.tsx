import React, { memo, useState, useCallback } from 'react';
import { Picker, View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { AsyncStorage } from 'react-native';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import { theme } from '../../core/theme';
//import { Navigation } from '../../types';

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
import { Drawer, List, Divider } from 'react-native-paper';

type SettingsState = {
  notificationState: boolean,
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class SettingsScreen extends React.Component<Props, SettingsState> {

  constructor(SettingsState) {
    super(SettingsState)
    this.state = {
      notificationState: true,
    };
  }

  render() {
    return (
      <View>
        <BackButton goBack={() => this.props.navigation.navigate('HomeScreen')} />

        <List.Section>
          <List.Subheader>Settings</List.Subheader>
          <List.Item
            title="Notifications"
            left={() => <List.Icon icon="bell-alert" />}
            right={() =>
              <Switch
                value={this.state.notificationState}
                onValueChange={() => { this.setState({ notificationState: !this.state.notificationState }); }
                }
              />
            }
          />
          <Divider></Divider>
          <List.Item
            title="Number of notifications"
            left={() => <List.Icon color="#000" icon="" />}
          />
        </List.Section>

      </View>
    );
  }
}

const styles = StyleSheet.create({

});

export default memo(SettingsScreen);
