import React, { memo } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert, Linking, ActivityIndicator, BackHandler,Modal} from 'react-native';
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
const pheight = (Math.floor(Dimensions.get('window').height) - 100)*0.4;
const width = Math.floor(Dimensions.get('window').width);

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
  fontLoaded: boolean,
  displayPopup:boolean,
  agree:boolean
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class TermsOfServiceScreen extends React.Component<Props, TermsOfServiceState> {
  backHandler: any;

  constructor(TermsOfServiceState) {
    super(TermsOfServiceState)
    this.state = {
      termsOfService: false,
      title: resources.getString("Well-Being Check"),
      fontLoaded: false,agree:false,displayPopup:false
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
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  };

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    return true;
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
   AsyncStorage.setItem('user_terms_and_conditions', JSON.stringify(userTermsAndConditionsObj));

   //handle disagree 2:
 //  this.props.navigation.navigate('DeclineScreen');

 //handle disagree 3:
   this.setState({displayPopup:true});


//handle disagree 1:
  //  AsyncStorage.setItem('user_terms_and_conditions', JSON.stringify(userTermsAndConditionsObj), () => {
  //    Alert.alert('', resources.getString("terms_and_conditions_disagree"));
   // });
  }

  toggleLanguage() {
    if (resources.culture == 'en') { resources.culture = 'fr'; AsyncStorage.setItem('Culture', '2'); } else { resources.culture = 'en'; AsyncStorage.setItem('Culture', '1'); }
    this.setState({ title: resources.getString("Well-Being Check") });
  }

  handleUrlPress(url, matchIndex /*: number*/) {
    Linking.openURL(url);
  }
  handlePhonePress(phone, matchIndex /*: number*/) {
    Linking.openURL('tel:18779499492');
  };

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
            <TouchableOpacity onPress={() => this.toggleLanguage()} style={{ alignSelf: 'flex-end', marginRight: 0 }}
            accessibilityRole='button'
            accessible={true}
            >
              <Text >{resources.getString("Language")}</Text></TouchableOpacity>
          </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
              <Title style={styles.title}>{resources.getString("terms_and_conditions")}</Title>

             
             
             {/* // */}



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
                      {resources.getString("terms_and_conditions_content.Disclaimer.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>

             {/* // */}

      {/* // */}

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
                      {resources.getString("terms_and_conditions_content.T&A.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>

             {/* // */}        
            {/* // */}

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
                      {resources.getString("terms_and_conditions_content.Modif.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>

             {/* // */}                 
       {/* // */}

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
                      {resources.getString("terms_and_conditions_content.privacy.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>

             {/* // */}            

  {/* // */}

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
                      {resources.getString("terms_and_conditions_content.confidentiality.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>

             {/* // */}     

{/* // */}

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
                      {resources.getString("terms_and_conditions_content.language.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>

             {/* // */}  

              {/* // */}

              <Text 
                accessibilityRole='header' 
                accessible={true} 
                accessibilityLabel={resources.getString("terms_and_conditions_content.accessibility")} 
                style={styles.ParagraphHeader}
                >{resources.getString("terms_and_conditions_content.accessibility")} </Text>

                <Paragraph style={styles.paragraph}>
                  <Text>
                    
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
                      {resources.getString("terms_and_conditions_content.accessibility.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>

             {/* // */}  

             {/* // */}

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
                      {resources.getString("terms_and_conditions_content.useofcontent.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>

             {/* // */} 


            {/* // */}

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
                      {resources.getString("terms_and_conditions_content.uniqueIdentifier.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>

             {/* // */} 

           {/* // */}

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
                      {resources.getString("terms_and_conditions_content.Law.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>

             {/* // */} 
   {/* // */}

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
                      {resources.getString("terms_and_conditions_content.Liability.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>

             {/* // */} 


  {/* // */}

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
                      {resources.getString("terms_and_conditions_content.disclosure.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>

             {/* // */} 
 {/* // */}

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
                      {resources.getString("terms_and_conditions_content.copyright.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>

             {/* // */} 

{/* // */}

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
                      {resources.getString("terms_and_conditions_content.trademark.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>

             {/* // */} 

          {/* // */}

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
                      {resources.getString("terms_and_conditions_content.nowarranties.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>

             {/* // */} 

{/* // */}

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
                      {resources.getString("terms_and_conditions_content.indemnity.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>

             {/* // */} 

            {/* // */}

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
                      {resources.getString("terms_and_conditions_content.restrictions.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>

             {/* // */} 

            {/* // */}

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
                      {resources.getString("terms_and_conditions_content.modifications.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>

             {/* // */} 

{/* // */}

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
                      {resources.getString("terms_and_conditions_content.ownership.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>
              {/* // */} 
              {/* // */}
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
                      {resources.getString("terms_and_conditions_content.maintenance.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>

             {/* // */} 

              {/* <Paragraph style={styles.paragraph}>
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
              </Paragraph> */}
            </ScrollView>

        </SafeAreaView>
              <Modal animationType="slide" transparent={true} style={{flex:1,alignItems:'center',justifyContent:'center',borderColor:'blue'}}
                     visible={this.state.displayPopup}
                     onRequestClose={() => {
                         // Alert.alert("Modal has been closed.");
                     }}
               >
                        <View style={[styles.modalView,{marginTop:pheight}]}>

                             <Text style={styles.popupText}>{resources.getString("declinemsg1")}</Text>
                             <TouchableOpacity onPress={() => Linking.openURL('tel:18779499492')}   hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                                     <Text style={styles.highlightText}>1-877-949-9492</Text>
                             </TouchableOpacity>
                             <Text style={styles.popupText}>{resources.getString("declinemsg2")}</Text>

                              <TouchableOpacity onPress={()=>this.setState({displayPopup:false})} style={{ alignSelf:'flex-end',marginRight:40}}>
                               <Text style={styles.popupBtn}>{resources.getString("ok")}</Text>
                              </TouchableOpacity>

                        </View>
              </Modal>

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

  ParagraphHeader:{
    fontWeight: 'bold',
    color: '#66cc99',
    //fontFamily: 'Lato-Bold',
    fontSize: 18
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
    color: '#000',
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
    color: '#000',
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
   centeredView: {
         flex: 1,
         justifyContent: "center",
         alignItems: "center",
         marginTop: 22
      },
   modalView: {
       borderWidth:1,borderColor:'lightgray',
       alignSelf:'center',
       marginTop:200,
       justifyContent:'center',
       width:'80%',
       backgroundColor: "white",
       borderRadius: 5,
       padding: 15,
       alignItems: "center",
       shadowColor: "#000",
       shadowOffset: {
         width: 0,
         height: 2
       },
       shadowOpacity: 0.25,
       shadowRadius: 3.84,
       elevation: 5
     },
     popupText: {
       //  color: '#66cc99',
         fontSize: 18,flexWrap:'wrap',
        // fontWeight:'bold'
        alignSelf:'flex-start'
       },
     highlightText:{
         fontSize:20,
         color: '#000',fontWeight:'bold',
         marginTop:20,marginBottom:20,
         alignSelf:'center'
       },
     popupBtn:{
          fontSize: 18,marginTop:20,
          fontWeight:'bold',color: '#66cc99',
     }
});

export default memo(TermsOfServiceScreen);



//            {(this.state.asgree)?null:<View style={{flex:1,position: 'absolute', top: '3%', left: '3%',width:'100%',height:'100%',borderWidth:1,borderColor:'red',backgroundColor:'lightgray'}}>
//               <View style={{ position: 'absolute', top: '30%', left: '20%', zIndex: 20,backgroundColor:'white',width:240,height:300,opacity:0.9 }}>
//                  <Text style={{fontSize:16,padding:15}}>{resources.getString("terms_and_conditions_disagree")}</Text>
//                  <TouchableOpacity onPress={() => Linking.openURL('tel:18779499492')}>
//                    <Text style={{fontSize:16}}>1-877-949-9492</Text>
//                  </TouchableOpacity>
//            </View></View>}