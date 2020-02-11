import React, { memo } from 'react';
import { Text, StyleSheet } from 'react-native';
import { AsyncStorage } from 'react-native';
import Button from '../components/Button';
import { newTheme } from '../core/theme';
import { Provider as PaperProvider, Title, Paragraph } from 'react-native-paper';
import AppBanner from '../components/AppBanner';
import LogoClearSmall from '../components/LogoClearSmall';
import BackgroundWide from '../components/BackgroundWide';
import { resources } from '../../GlobalResources';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  SafeAreaView,
  ScrollView,
} from 'react-navigation';

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

        <BackgroundWide>

          <LogoClearSmall />

          <Title style={styles.title}>{resources.getString("getting_started")}</Title>

          <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
              <Paragraph style={styles.paragraph}>
                {resources.getString("getting_started_content")}
              </Paragraph>
            </ScrollView>
          </SafeAreaView>

        </BackgroundWide>

        <Button style={styles.btnNext}
          mode="contained"
          onPress={this._onGettingStartedNext}>
          <Text style={styles.btnText}>{resources.getString("gl.next")}</Text>
        </Button>

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
  btnNext: {
    color: newTheme.colors.whiteText,
    width: 100,
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 10,
  },
  btnText: {
    color: newTheme.colors.whiteText,
  },
  container: {
    flex: 1,
    width: '100%',
  },
  scrollView: {
    width: '100%',
    marginHorizontal: 20,
  },
  text: {
  },
});

export default memo(GettingStartedScreen);
