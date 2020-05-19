import React, { memo } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert, Linking, ActivityIndicator } from 'react-native';
//import { View, StyleSheet, Dimensions, TouchableOpacity, Alert, Linking, ActivityIndicator } from 'react-native';
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
import * as Font from 'expo-font';

//import Text from '../components/CustomFont';


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
  title: string,
  fontLoaded: boolean
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
      fontLoaded: false
    };
  }


  componentDidMount = async () => {
    this.askPermissions();
    //load the lato font from the local folder
    await Font.loadAsync({
      'Lato-Black': require('../assets/fonts/Lato/Lato-Black.ttf'),
      'Lato-BlackItalic': require('../assets/fonts/Lato/Lato-BlackItalic.ttf'),
      'Lato-Bold': require('../assets/fonts/Lato/Lato-Bold.ttf'),
      'Lato-BoldItalic': require('../assets/fonts/Lato/Lato-BoldItalic.ttf'),
      'Lato-Italic': require('../assets/fonts/Lato/Lato-Italic.ttf'),
      'Lato-Light': require('../assets/fonts/Lato/Lato-Light.ttf'),
      'Lato-LightItalic': require('../assets/fonts/Lato/Lato-LightItalic.ttf'),
      'Lato-Regular': require('../assets/fonts/Lato/Lato-Regular.ttf'),
      'Lato-Thin': require('../assets/fonts/Lato/Lato-Thin.ttf'),
      'Lato-ThinItalic': require('../assets/fonts/Lato/Lato-ThinItalic.ttf'),
    });
    this.setState({ fontLoaded: true });
  };
  

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
    // if (!this.state.fontLoaded) {
    //   console.log('fontloading .....')
    //   return <Text>loading</Text>
    // }

    return (
      <PaperProvider theme={newTheme}>

        <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
        <AppBanner />
        <SafeAreaView style={styles.container}>

          <View style={styles.headerContainer}>
            <LogoClearSmall />
            <TouchableOpacity onPress={() => this.toggleLanguage()} style={{ alignSelf: 'flex-end', marginRight: 0 }}>
              <Text >{resources.getString("Language")}</Text></TouchableOpacity>
          </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
              <Title style={styles.title}>{resources.getString("terms_and_conditions")}</Title>

              <Paragraph style={styles.paragraph}>
                <Text >
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

                        { pattern: /Disclaimer  |General terms and conditions|Modification of Terms and Conditions|Privacy notice/, style: styles.bold },
                        { pattern: /Confidentiality statement| Confidentiality statement|Official language notice|Accessibility notice/, style: styles.bold },
                        { pattern: /Use of content|Unique identifier|Applicable law  |Limitation of liability/, style: styles.bold },
                        { pattern: /Disclosure statement|Copyright notice |Trademark notice|No warranties|Indemnity|Restrictions|Modifications and access|Ownership|Maintenance and support/, style: styles.bold },

                        { pattern: /Désistement |Conditions générales  |Modification des conditions générales|Avis de confidentialité/, style: styles.bold },
                        { pattern: /Énoncé de confidentialité|Langues officielles  |Avis de l’accessibilité|Utilisation du contenu/, style: styles.bold },
                        { pattern: /Use of content|Code d’identification unique |Lois applicables |Limitation de la responsabilité/, style: styles.bold },
                        { pattern: /Avis de divulgations|Droit d’auteur |Avis concernant l'image de marque|Aucune garantie|Indemnité|Restrictions|Modification et accès|Propriété|Maintenance et soutien/, style: styles.bold },


                        { type: 'url', style: styles.url, onPress: this.handleUrlPress },

                      ]
                    }
                    childrenProps={{ allowFontScaling: false }}
                  >
                    {resources.getString("terms_and_conditions_content")}
                  </ParsedText>
                </Text>
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
    color: '#656262',
   // fontFamily: 'Lato-Black',
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
    color: '#656262',
   // fontFamily: 'Lato-Regular',
  },
  italic: {
    fontStyle: 'italic',
    //fontFamily: 'Lato-Italic'
  },
  bold: {
    fontWeight: 'bold',
    color: '#66cc99',
    //fontFamily: 'Lato-Bold',
    fontSize: 18
  },
  url: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default memo(TermsOfServiceScreen);