import React, { memo } from 'react';
import { View, Text, StyleSheet, Dimensions, Linking,PanResponder } from 'react-native';
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
    global.resetTimer();//global.globalTick=0;
    this.props.navigation.navigate('SettingsScreen');
  }
  handleUrlPress(url, matchIndex /*: number*/) {
    global.resetTimer();//  global.globalTick=0;
         Linking.openURL(url);
  }

  render() {
    return (
      <PaperProvider theme={newTheme}>
        <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
        <AppBanner />
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView} {...global.panResponder.panHandlers}>
            <LogoClearSmall />
            <Title style={styles.title}>{resources.getString("terms_and_conditions")}</Title>


            <Text
                accessibilityRole='header'
                accessible={true}
                accessibilityLabel={resources.getString("terms_and_conditions_content.Disclaimer")}
                style={styles.ParagraphHeader}
                >{resources.getString("terms_and_conditions_content.Disclaimer")} </Text>

                <Paragraph style={styles.paragraph}>
                  <Text>

                 <ParsedText
                      style={styles.text}
                      parse={
                        [
                          { pattern: /Statistics Act/, style: styles.italic },
                          { pattern: /Loi sur la statistique/, style: styles.italic },
                          { type: 'url', style: styles.url, onPress: this.handleUrlPress },
                        ]
                      }
                      childrenProps={{ allowFontScaling: false }}
                    >
                      {resources.getString("terms_and_conditions_content.Disclaimer.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>


             <Text
                accessibilityRole='header'
                accessible={true}
                accessibilityLabel={resources.getString("terms_and_conditions_content.T&A")}
                style={styles.ParagraphHeader}
                >{resources.getString("terms_and_conditions_content.T&A")} </Text>

                <Paragraph style={styles.paragraph}>
                  <Text>

                 <ParsedText
                      style={styles.text}
                      parse={
                        [
                          { pattern: /Statistics Act/, style: styles.italic },
                          { pattern: /Privacy Act/, style: styles.italic },
                          { pattern: /Access to Information Act/, style: styles.italic },
                          { pattern: /Loi sur la statistique/, style: styles.italic },
                          { pattern: /Loi sur la protection des renseignements personnels/, style: styles.italic },
                          { pattern: /Loi sur l'accès à l'information/, style: styles.italic },
                          { type: 'url', style: styles.url, onPress: this.handleUrlPress },
                        ]
                      }
                      childrenProps={{ allowFontScaling: false }}
                    >
                      {resources.getString("terms_and_conditions_content.T&A.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>

              <Text
                accessibilityRole='header'
                accessible={true}
                accessibilityLabel={resources.getString("terms_and_conditions_content.Modif")}
                style={styles.ParagraphHeader}
                >{resources.getString("terms_and_conditions_content.Modif")} </Text>

                <Paragraph style={styles.paragraph}>
                  <Text>

                 <ParsedText
                      style={styles.text}
                      parse={
                        [
                          { type: 'url', style: styles.url, onPress: this.handleUrlPress },
                        ]
                      }
                      childrenProps={{ allowFontScaling: false }}
                    >{resources.getString("terms_and_conditions_content.Modif.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>

                <Text
                accessibilityRole='header'
                accessible={true}
                accessibilityLabel={resources.getString("terms_and_conditions_content.privacy")}
                style={styles.ParagraphHeader}
                >{resources.getString("terms_and_conditions_content.privacy")} </Text>

                <Paragraph style={styles.paragraph}>
                  <Text>

                 <ParsedText
                      style={styles.text}
                      parse={
                        [
                          { pattern: /Statistics Act/, style: styles.italic },
                          { pattern: /Privacy Act/, style: styles.italic },
                          { pattern: /Loi sur la statistique/, style: styles.italic },
                          { pattern: /Loi sur la protection des renseignements personnels/, style: styles.italic },
                          { type: 'url', style: styles.url, onPress: this.handleUrlPress },
                        ]
                      }
                      childrenProps={{ allowFontScaling: false }}
                    >
                      {resources.getString("terms_and_conditions_content.privacy.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>
                <Text
                accessibilityRole='header'
                accessible={true}
                accessibilityLabel={resources.getString("terms_and_conditions_content.confidentiality")}
                style={styles.ParagraphHeader}
                >{resources.getString("terms_and_conditions_content.confidentiality")} </Text>

                <Paragraph style={styles.paragraph}>
                  <Text>

                 <ParsedText
                      style={styles.text}
                      parse={
                        [
                          { pattern: /Statistics Act/, style: styles.italic },
                          { pattern: /Loi sur la statistique/, style: styles.italic },
                          { type: 'url', style: styles.url, onPress: this.handleUrlPress },
                        ]
                      }
                      childrenProps={{ allowFontScaling: false }}
                    >
                      {resources.getString("terms_and_conditions_content.confidentiality.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>
                <Text
                accessibilityRole='header'
                accessible={true}
                accessibilityLabel={resources.getString("terms_and_conditions_content.language")}
                style={styles.ParagraphHeader}
                >{resources.getString("terms_and_conditions_content.language")} </Text>

                <Paragraph style={styles.paragraph}>
                  <Text>

                 <ParsedText
                      style={styles.text}
                      parse={
                        [
                          { pattern: /Official Languages Act/, style: styles.italic },
                          { pattern: /Loi sur les langues officielles/, style: styles.italic },
                          { type: 'url', style: styles.url, onPress: this.handleUrlPress },
                        ]
                      }
                      childrenProps={{ allowFontScaling: false }}
                    >
                      {resources.getString("terms_and_conditions_content.language.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>
               <Text
                accessibilityRole='header'
                accessible={true}
                accessibilityLabel={resources.getString("terms_and_conditions_content.accessibility")}
                style={styles.ParagraphHeader}
                >{resources.getString("terms_and_conditions_content.accessibility")}</Text>

                <Paragraph style={styles.paragraph}>
                  <Text>

                 <ParsedText
                      style={styles.text}
                      parse={
                        [
                          { pattern: /Standard on Optimizing Website and Applications for Mobile Devices/, style: styles.italic },
                          { pattern: /Norme sur l’optimisation des sites Web et des applications pour appareils mobiles/, style: styles.italic },
                          { type: 'url', style: styles.url, onPress: this.handleUrlPress },
                        ]
                      }
                      childrenProps={{ allowFontScaling: false }}
                    >{resources.getString("terms_and_conditions_content.accessibility.a")}
                    </ParsedText>
                  </Text>
                </Paragraph>
               <Text
                accessibilityRole='header'
                accessible={true}
                accessibilityLabel={resources.getString("terms_and_conditions_content.useofcontent")}
                style={styles.ParagraphHeader}
                >{resources.getString("terms_and_conditions_content.useofcontent")} </Text>

                <Paragraph style={styles.paragraph}>
                 <Text>
                 <ParsedText
                      style={styles.text}
                      parse={
                        [
                          { type: 'url', style: styles.url, onPress: this.handleUrlPress },
                        ]
                      }
                      childrenProps={{ allowFontScaling: false }}
                    >{resources.getString("terms_and_conditions_content.useofcontent.a")}
                    </ParsedText>
                  </Text>
                </Paragraph>
            <Text
                accessibilityRole='header'
                accessible={true}
                accessibilityLabel={resources.getString("terms_and_conditions_content.uniqueIdentifier")}
                style={styles.ParagraphHeader}
                >{resources.getString("terms_and_conditions_content.uniqueIdentifier")} </Text>

                <Paragraph style={styles.paragraph}>
                  <Text>
                 <ParsedText
                      style={styles.text}
                      parse={
                        [
                          { type: 'url', style: styles.url, onPress: this.handleUrlPress },
                        ]
                      }
                      childrenProps={{ allowFontScaling: false }}
                    >
                      {resources.getString("terms_and_conditions_content.uniqueIdentifier.a")}
                    </ParsedText>
                  </Text>
                </Paragraph>
                <Text
                accessibilityRole='header'
                accessible={true}
                accessibilityLabel={resources.getString("terms_and_conditions_content.Law")}
                style={styles.ParagraphHeader}
                >{resources.getString("terms_and_conditions_content.Law")} </Text>
                <Paragraph style={styles.paragraph}>
                  <Text>
                 <ParsedText
                      style={styles.text}
                      parse={
                        [
                          { type: 'url', style: styles.url, onPress: this.handleUrlPress },
                        ]
                      }
                      childrenProps={{ allowFontScaling: false }}
                    >{resources.getString("terms_and_conditions_content.Law.a")}
                    </ParsedText>
                  </Text>
                </Paragraph>
                <Text
                accessibilityRole='header'
                accessible={true}
                accessibilityLabel={resources.getString("terms_and_conditions_content.Liability")}
                style={styles.ParagraphHeader}
                >{resources.getString("terms_and_conditions_content.Liability")} </Text>

                <Paragraph style={styles.paragraph}>
                  <Text>
                 <ParsedText
                      style={styles.text}
                      parse={
                        [
                          { type: 'url', style: styles.url, onPress: this.handleUrlPress },
                        ]
                      }
                      childrenProps={{ allowFontScaling: false }}
                    >
                      {resources.getString("terms_and_conditions_content.Liability.a")}
                    </ParsedText>
                  </Text>
                </Paragraph>
                <Text
                accessibilityRole='header'
                accessible={true}
                accessibilityLabel={resources.getString("terms_and_conditions_content.disclosure")}
                style={styles.ParagraphHeader}
                >{resources.getString("terms_and_conditions_content.disclosure")} </Text>
                <Paragraph style={styles.paragraph}>
                  <Text>
                 <ParsedText
                      style={styles.text}
                      parse={
                        [
                          { type: 'url', style: styles.url, onPress: this.handleUrlPress },
                        ]
                      }
                      childrenProps={{ allowFontScaling: false }}
                    >{resources.getString("terms_and_conditions_content.disclosure.a")}
                    </ParsedText>
                  </Text>
                </Paragraph>

                <Text
                accessibilityRole='header'
                accessible={true}
                accessibilityLabel={resources.getString("terms_and_conditions_content.copyright")}
                style={styles.ParagraphHeader}
                >{resources.getString("terms_and_conditions_content.copyright")} </Text>

                <Paragraph style={styles.paragraph}>
                  <Text>
                  <ParsedText
                      style={styles.text}
                      parse={
                        [
                          { pattern: /Copyright Act of Canada/, style: styles.italic },
                          { pattern: /Loi sur le droit d'auteur du Canada/, style: styles.italic },
                          { type: 'url', style: styles.url, onPress: this.handleUrlPress },
                        ]
                      }
                      childrenProps={{ allowFontScaling: false }}
                    >
                    {resources.getString("terms_and_conditions_content.copyright.a")}
                    </ParsedText>
                  </Text>
                </Paragraph>
                <Text
                accessibilityRole='header'
                accessible={true}
                accessibilityLabel={resources.getString("terms_and_conditions_content.trademark")}
                style={styles.ParagraphHeader}
                >{resources.getString("terms_and_conditions_content.trademark")} </Text>
                <Paragraph style={styles.paragraph}>
                 <Text>
                 <ParsedText
                      style={styles.text}
                      parse={
                        [
                          { type: 'url', style: styles.url, onPress: this.handleUrlPress },
                        ]
                      }
                      childrenProps={{ allowFontScaling: false }}
                    >{resources.getString("terms_and_conditions_content.trademark.a")}
                    </ParsedText>
                  </Text>
                </Paragraph>
                <Text
                accessibilityRole='header'
                accessible={true}
                accessibilityLabel={resources.getString("terms_and_conditions_content.nowarranties")}
                style={styles.ParagraphHeader}
                >{resources.getString("terms_and_conditions_content.nowarranties")} </Text>
                <Paragraph style={styles.paragraph}>
                  <Text>
                 <ParsedText
                      style={styles.text}
                      parse={
                        [
                          { type: 'url', style: styles.url, onPress: this.handleUrlPress },
                        ]
                      }
                      childrenProps={{ allowFontScaling: false }}
                    >{resources.getString("terms_and_conditions_content.nowarranties.a")}
                    </ParsedText>
                  </Text>
                </Paragraph>
                <Text
                accessibilityRole='header'
                accessible={true}
                accessibilityLabel={resources.getString("terms_and_conditions_content.indemnity")}
                style={styles.ParagraphHeader}
                >{resources.getString("terms_and_conditions_content.indemnity")} </Text>
                <Paragraph style={styles.paragraph}>
                <Text>
                 <ParsedText
                      style={styles.text}
                      parse={
                        [
                          { type: 'url', style: styles.url, onPress: this.handleUrlPress },
                        ]
                      }
                      childrenProps={{ allowFontScaling: false }}>
                      {resources.getString("terms_and_conditions_content.indemnity.a")}
                    </ParsedText>
                  </Text>
                </Paragraph>
                <Text
                accessibilityRole='header'
                accessible={true}
                accessibilityLabel={resources.getString("terms_and_conditions_content.restrictions")}
                style={styles.ParagraphHeader}
                >{resources.getString("terms_and_conditions_content.restrictions")} </Text>
                <Paragraph style={styles.paragraph}>
                  <Text>
                 <ParsedText
                      style={styles.text}
                      parse={
                        [
                          { type: 'url', style: styles.url, onPress: this.handleUrlPress },
                        ]
                      }
                      childrenProps={{ allowFontScaling: false }}>
                      {resources.getString("terms_and_conditions_content.restrictions.a")}
                    </ParsedText>
                  </Text>
                </Paragraph>
               <Text
                accessibilityRole='header'
                accessible={true}
                accessibilityLabel={resources.getString("terms_and_conditions_content.modifications")}
                style={styles.ParagraphHeader}
                >{resources.getString("terms_and_conditions_content.modifications")} </Text>
                <Paragraph style={styles.paragraph}>
                  <Text>
                 <ParsedText
                      style={styles.text}
                      parse={
                        [
                          { type: 'url', style: styles.url, onPress: this.handleUrlPress },
                        ]
                      }
                      childrenProps={{ allowFontScaling: false }}>
                      {resources.getString("terms_and_conditions_content.modifications.a")}
                    </ParsedText>
                  </Text>
                </Paragraph>
               <Text
                accessibilityRole='header'
                accessible={true}
                accessibilityLabel={resources.getString("terms_and_conditions_content.ownership")}
                style={styles.ParagraphHeader}
                >{resources.getString("terms_and_conditions_content.ownership")} </Text>
                <Paragraph style={styles.paragraph}>
                 <Text>
                 <ParsedText
                      style={styles.text}
                      parse={
                        [
                          { type: 'url', style: styles.url, onPress: this.handleUrlPress },
                        ]
                      }
                      childrenProps={{ allowFontScaling: false }}>
                      {resources.getString("terms_and_conditions_content.ownership.a")}
                    </ParsedText>
                  </Text>
                </Paragraph>
                <Text
                accessibilityRole='header'
                accessible={true}
                accessibilityLabel={resources.getString("terms_and_conditions_content.maintenance")}
                style={styles.ParagraphHeader}
                >{resources.getString("terms_and_conditions_content.maintenance")} </Text>
                <Paragraph style={styles.paragraph}>
                  <Text>
                 <ParsedText
                      style={styles.text}
                      parse={
                        [
                          { type: 'url', style: styles.url, onPress: this.handleUrlPress },
                        ]
                      }
                      childrenProps={{ allowFontScaling: false }}
                    >
                      {resources.getString("terms_and_conditions_content.maintenance.a")}
                    </ParsedText>
                  </Text>
                </Paragraph>




            {/* <Paragraph style={styles.paragraph}>
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
            </Paragraph> */}
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
    color: '#000',
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
  ParagraphHeader:{
    fontWeight: 'bold',
    color: '#66cc99',
    //fontFamily: 'Lato-Bold',
    fontSize: 18
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
    color: '#000',

  },
  italic: {
    fontStyle: 'italic',
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