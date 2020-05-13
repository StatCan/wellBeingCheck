import React, { memo } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert, Linking } from 'react-native';
import { AsyncStorage } from 'react-native';
import Button from '../components/Button';
import { newTheme } from '../core/theme';
import { Provider as PaperProvider, Title, Paragraph } from 'react-native-paper';
import * as Permissions from 'expo-permissions';
import BackgroundWide from '../components/BackgroundWide';
import LogoClearSmall from '../components/LogoClearSmall';
import { resources } from '../../GlobalResources';
import AppBanner from '../components/AppBanner';
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
      title: resources.getString("Well-Being Check"),
    };
  }

  componentDidMount() {
    this.askPermissions();
  }

  askPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      if (global.debugMode) console.log("Notifications Permission Not Granted");
      global.notificationState = false; AsyncStorage.setItem('NotificationState', 'false');
      return false;
    }
    if (global.debugMode) console.log("Notifications Permission Granted");
    global.notificationState = true; AsyncStorage.setItem('NotificationState', 'true');
    return true;
  };

  _onTermsAgree = () => {
    console.log("_onTermsAgree");
    let userTermsAndConditionsObj = {
      termsOfService: true,
    };

    AsyncStorage.setItem('user_terms_and_conditions', JSON.stringify(userTermsAndConditionsObj), () => {
      this.props.navigation.navigate('RegisterScreen');
    });
  }

  _onTermsDisagree = () => {
    console.log("_onTermsDisagree");
    let userTermsAndConditionsObj = {
      termsOfService: false,
    };

    AsyncStorage.setItem('user_terms_and_conditions', JSON.stringify(userTermsAndConditionsObj), () => {
      //handle disagree
      Alert.alert('', resources.getString("terms_and_conditions_disagree"));
    });
  }
  toggleLanguage() {
    if (resources.culture == 'en') { resources.culture = 'fr'; AsyncStorage.setItem('Culture', '2'); } else { resources.culture = 'en'; AsyncStorage.setItem('Culture', '1'); }
    this.setState({ title: resources.getString("Well-Being Check") });
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
          <View style={styles.headerContainer}>
            <LogoClearSmall />
            <TouchableOpacity onPress={() => this.toggleLanguage()} style={{ alignSelf: 'flex-end', marginRight: 0 }}><Text>{resources.getString("Language")}</Text></TouchableOpacity>
          </View>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
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
        <View style={styles.footer}>
          <Button style={styles.btnDecline}
            mode="contained"
            onPress={this._onTermsDisagree}>
            <Text style={styles.whiteText}>{resources.getString("gl.decline")}</Text>
          </Button>
          <Button style={styles.btnAgree}
            mode="contained"
            onPress={this._onTermsAgree}>
            <Text style={styles.whiteText}>{resources.getString("gl.agree")}</Text>
          </Button>
        </View>
        <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 24,
    marginLeft: 20,
    marginTop: 15,
    justifyContent: 'space-between'
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: "flex-end",
    justifyContent: 'flex-end',
    paddingRight: 20,
  },
  btnDecline: {
    width: 120,
    backgroundColor: newTheme.colors.secondary,
    marginRight: 20,
  },
  btnAgree: {
    width: 120,
    backgroundColor: newTheme.colors.primary,
    alignSelf: "flex-end",
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 40,
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
    direction: "ltr"
  },
  scrollView: {
    width: (Dimensions.get('window').width) - 50,
    marginHorizontal: 20,
    marginTop: 20
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