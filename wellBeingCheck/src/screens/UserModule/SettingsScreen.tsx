import React, { memo, useState, useCallback } from 'react';
import { Picker, View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { AsyncStorage } from 'react-native';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import { newTheme } from '../../core/theme';
import { List, Divider } from 'react-native-paper';

import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

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

  _debugClearAllLocalData() {
    try {
      AsyncStorage.removeItem('user_account', (err) => {
        console.log("user account deleted");
        console.log(err);
        console.log("all data cleared");
      });
      AsyncStorage.removeItem('user_terms_and_conditions', (err) => {
        console.log("user terms deleted");
        console.log(err);
        console.log("all data cleared");
      });
      AsyncStorage.removeItem('user_getting_started', (err) => {
        console.log("user getting started deleted");
        console.log(err);
        console.log("all data cleared");
      });
    } catch (error) {
    }
  }

  render() {
    return (
      <View>

        <BackButton goBack={() => this.props.navigation.navigate('Dashboard')} />

        <List.Section style={styles.mainStyle}>
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

        <Button
          mode="contained"
          onPress={this._debugClearAllLocalData}>
          (Debug) -- Delete user account
        </Button>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainStyle: { marginTop: 100 }
});

export default memo(SettingsScreen);
