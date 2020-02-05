import React, { memo, useState, useCallback } from 'react';
import { Picker, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { newTheme } from '../core/theme';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Constants from 'expo-constants';

import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  SafeAreaView,
  ScrollView,
} from 'react-navigation';

type GettingStartedState = {
  gettingStarted: boolean,
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class GettingStartedScreen extends React.Component<Props, GettingStartedState> {

  constructor(GettingStartedState) {
    super(GettingStartedState)
    this.state = {
      gettingStarted: false,
    };
  }

  _onGettingStartedNext = () => {
    console.log("_onGettingStartedNext");
    let userGettingStartedObj = {
      gettingStarted: true,
    };

    AsyncStorage.setItem('user_getting_started', JSON.stringify(userGettingStartedObj), () => {
      this.props.navigation.navigate('TermsOfServiceScreen');
    });
  }

  render() {
    return (
      <PaperProvider theme={newTheme}>
        <Background>

          <Logo />

          <Text>Getting Started</Text>

          <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
              <Text style={styles.text}>
                Whya are we conducting this study?

                What is Lorem Ipsum?
  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </Text>
            </ScrollView>
          </SafeAreaView>

          <Button
            mode="contained"
            onPress={this._onGettingStartedNext}>
            <Text style={styles.whiteText}>Agree</Text>
          </Button>

        </Background>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    color: newTheme.colors.secondary,
  },
  whiteText: {
    color: newTheme.colors.whiteText
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  text: {
  },
});

export default memo(GettingStartedScreen);