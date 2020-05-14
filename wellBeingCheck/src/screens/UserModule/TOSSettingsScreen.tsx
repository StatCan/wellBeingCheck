import React, { memo } from 'react';
import { View, Text, StyleSheet, Dimensions, Linking } from 'react-native';
import { AsyncStorage } from 'react-native';
import Button from '../../components/Button';
import { newTheme } from '../../core/theme';
import { Provider as PaperProvider, Title, Paragraph } from 'react-native-paper';
import * as Permissions from 'expo-permissions';
import BackgroundWide from '../../components/BackgroundWide';
import LogoClearSmall from '../../components/LogoClearSmall';
import { resources } from '../../../GlobalResources';
import AppBanner from '../../components/AppBanner';
import ParsedText from 'react-native-parsed-text';


import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  SafeAreaView,
  ScrollView,
} from 'react-navigation';
import { SafeAreaConsumer } from 'react-native-safe-area-context';

type TermsOfServiceState = {
  termsOfService: boolean,
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class TermsOfServiceScreen extends React.Component<Props, TermsOfServiceState> {

  constructor(TermsOfServiceState) {
    super(TermsOfServiceState)
    this.state = {
      termsOfService: false,
    };
  }

  _openSettingsScreen = () => {
    this.props.navigation.navigate('SettingsScreen');
  }
  handleUrlPress(url, matchIndex /*: number*/) {
    Linking.openURL(url);
  }

  render() {
    return (
      <PaperProvider theme={newTheme}>
        <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
        <AppBanner />
          <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
              <LogoClearSmall />
              <Title style={styles.title}>{resources.getString("terms_and_conditions")}</Title>
              <Paragraph style={styles.paragraph}>
              <ParsedText
                style={styles.text}
                parse={
                  [
                    { pattern: /Statistics Act/, style: styles.italic },
                    { pattern: /Privacy Act/, style: styles.italic },
                    { pattern: /Access to Information Act/, style: styles.italic },
                    { pattern: /Official Languages Act/, style: styles.italic },
                    { pattern: /Standard on Optimizing Website and Applications for Mobile Devices/, style: styles.italic },
                    { pattern: /Copyright Act of Canada/, style: styles.italic },

                    { pattern: /Loi sur la statistique/, style: styles.italic },
                    { pattern: /Loi sur la protection des renseignements personnels/, style: styles.italic },
                    { pattern: /Loi sur l'accès à l'information/, style: styles.italic },
                    { pattern: /Loi sur les langues officielles/, style: styles.italic },
                    { pattern: /Norme sur l’optimisation des sites Web et des applications pour appareils mobiles/, style: styles.italic },
                    { pattern: /Loi sur le droit d'auteur du Canada/, style: styles.italic },
                    {type: 'url',                       style: styles.url, onPress: this.handleUrlPress},
                  ]
                }
                childrenProps={{ allowFontScaling: false }}
              >
                 {resources.getString("terms_and_conditions_content")}
              </ParsedText>
              </Paragraph>
            </ScrollView>
          </SafeAreaView>
        <Button style={styles.btnNext}
          mode="contained"
          onPress={this._openSettingsScreen}>
          <Text style={styles.btnText}>{resources.getString("gl.return")}</Text>
        </Button>
        <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: "flex-end",
    justifyContent: 'flex-end',
    paddingRight: 20,
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  label: {
    color: newTheme.colors.secondary,
  },
  whiteText: {
    color: newTheme.colors.whiteText
  },
  container: {
    flex: 1,
    width: (Dimensions.get('window').width) - 50,
  },
  paragraph: {
    alignSelf: 'baseline',
    fontSize: 15,
    width: '100%',
    end: 0,
    direction: "ltr"
  },
  scrollView: {
    width: (Dimensions.get('window').width) - 50,
    marginHorizontal: 20,
  },
  text: {
  },
  italic: {
    fontStyle: 'italic',
  },
  url: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default memo(TermsOfServiceScreen);