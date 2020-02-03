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

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class EQSurveyScreen extends React.Component<Props> {
  render() {
    return (
      <View>
        <BackButton goBack={() => this.props.navigation.navigate('Dashboard')} />
        <View style={styles.content}>
            <Text style={{ fontSize: 30 }}>Survey Screen</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    marginTop: 100
  }
});

export default memo(EQSurveyScreen);
