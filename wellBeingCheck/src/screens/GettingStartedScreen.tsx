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
import { DefaultTheme, Provider as PaperProvider, Card, Title, Paragraph, Headline, Banner } from 'react-native-paper';
import Constants from 'expo-constants';

import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  SafeAreaView,
  ScrollView,
} from 'react-navigation';
import AppBanner from '../components/AppBanner';
import LogoClear from '../components/LogoClear';
import LogoClearSmall from '../components/LogoClearSmall';

type GettingStartedState = {
  gettingStarted: boolean,
  bannerVisibility: boolean,
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class GettingStartedScreen extends React.Component<Props, GettingStartedState> {

  constructor(GettingStartedState) {
    super(GettingStartedState)
    this.state = {
      gettingStarted: false,
      bannerVisibility: true,
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
        <AppBanner />

        <Background>

          <LogoClearSmall />

          <Title style={styles.title}>Getting Started</Title>

          <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
              <Paragraph style={styles.paragraph}>
                Whya are we conducting this study?

                What is Lorem Ipsum?
  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </Paragraph>
            </ScrollView>
          </SafeAreaView>

          <Button
            mode="contained"
            onPress={this._onGettingStartedNext}>
            <Text style={styles.whiteText}>Next</Text>
          </Button>

        </Background>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    alignSelf: 'baseline',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  paragraph: {
    alignSelf: 'baseline',
    fontSize: 15,
    width: '100%',
    end: 0,
    direction: "ltr"
  },
  label: {
    color: newTheme.colors.secondary,
  },
  whiteText: {
    color: newTheme.colors.whiteText
  },
  container: {
    flex: 1,
    width: '100%',
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    width: '100%',
    marginHorizontal: 20,
  },
  text: {
  },
});

export default memo(GettingStartedScreen);
