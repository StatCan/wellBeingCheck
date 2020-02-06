import React, {memo, useState, useCallback} from 'react';
import {
  Picker,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch
} from 'react-native';
import {AsyncStorage} from 'react-native';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import {newTheme} from '../../core/theme';
import {List, Divider} from 'react-native-paper';
import TimePicker from '../../components/TimePicker'
import NotificationAlgo from '../../utils/notificationAlgo'
import { Notifications } from "expo";
import * as Permissions from 'expo-permissions';

import {NavigationParams, NavigationScreenProp, NavigationState} from 'react-navigation';

type SettingsState = {
  notificationState: boolean
}

interface Props {
  navigation : NavigationScreenProp < NavigationState,
  NavigationParams >;
}

class SettingsScreen extends React.Component < Props,
SettingsState > {

  constructor(SettingsState) {
    super(SettingsState)
    this.state = {
      notificationState: true
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
      alert("all data cleared");    
    } catch (error) {
    }
  }

  render() {
    return (
      <View>
        <View style={styles.toolbar}>
          <BackButton goBack={() => this.props.navigation.navigate('Dashboard')}/>
          <Text style={styles.toolbarTitle}>Settings</Text>
        </View>

        <List.Section style={styles.mainStyle}>
          <List.Item
            title="Notifications"
            left={() => <List.Icon icon="bell-alert"/>}
            right={() => <Switch
            value={this.state.notificationState}
            onValueChange={() => {
            this.setState({
              notificationState: !this.state.notificationState
            });
          }}/>}/>
          <Divider></Divider>
          <List.Item
            title="Number of notifications"
            left={() => <List.Icon color="#000" icon=""/>}/>
        </List.Section>

        <Button mode="contained" onPress={this._debugClearAllLocalData}>
          (Debug) -- Delete user account
        </Button>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainStyle: {
    marginTop: 0
  },
  toolbar: {
    backgroundColor: '#F4D2D1',
    paddingTop: 68,
    paddingBottom: 15,
    flexDirection: 'row'
  },
  toolbarButton: {
    width: 50,
    color: '#fff',
    textAlign: 'center'
  },
  toolbarTitle: {
    color: '#000',
    marginTop: 0,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    flex: 0.60
  }
});

export default memo(SettingsScreen);
