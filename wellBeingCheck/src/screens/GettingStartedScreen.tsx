import React, { memo } from 'react';
import { Text, StyleSheet, Dimensions, View, TouchableOpacity, BackHandler } from 'react-native';
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
import { SafeAreaConsumer } from 'react-native-safe-area-context';
// import StyleText from 'react-native-styled-text';
import ParsedText from 'react-native-parsed-text';
import { expo } from '../../app.json';
type GettingStartedState = {
  gettingStarted: boolean,
  bannerVisibility: boolean,
  title: string,
  tr: string
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class GettingStartedScreen extends React.Component<Props, GettingStartedState> {
  backHandler: any;

  constructor(GettingStartedState) {
    super(GettingStartedState)
    this.state = {
      gettingStarted: false,
      bannerVisibility: true,
      title: resources.getString("Well-Being Check"),
      tr: resources.getString("getting_started_content"),
    };
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    return true;
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

  toggleLanguage() {
    if (resources.culture == 'en') { resources.culture = 'fr'; AsyncStorage.setItem('Culture', '2'); } else { resources.culture = 'en'; AsyncStorage.setItem('Culture', '1'); }
    this.setState({ title: resources.getString("Well-Being Check") });
    this.setState({tr: resources.getString("getting_started_content")});
  }

  render() {
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
              <Text>{resources.getString("Language")}</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <Title style={styles.title}>{resources.getString("getting_started")}</Title>
            <View style={{}}>
              <Paragraph style={styles.paragraph}>

                <ParsedText
                  style={styles.text}
                  parse={
                    [
                      { pattern: /Why we are conducting this study|Notifications|Authorization and confidentiality|Record linkages/, style: styles.bold },
                      { pattern: /Time required to complete this questionnaire|To navigate the questionnaire|Session timeout|Definitions and explanations/, style: styles.bold },

                      { pattern: /Pourquoi nous menons cette étude|Notifications|Autorisation et confidentialité|Couplages d’enregistrements/, style: styles.bold },
                      { pattern: /Temps requis pour remplir ce questionnaire|Pour parcourir le questionnaire|Délai d’inactivité d’une session|Définitions et explications/, style: styles.bold },

                      { pattern: /Statistics Act/, style: styles.italic },
                      { pattern: /Loi sur la statistique/, style: styles.italic},
                    ]
                  }
                  childrenProps={{ allowFontScaling: false }}
                >
                  {resources.getString("getting_started_content")}
                </ParsedText>
              </Paragraph>
               <View >
                  <Text style={styles.bold}
                     accessible={true}
                     accessibilityRole="header"
                     accessibilityLabel='Version'
                       > Version
                   </Text>
               </View>
               <View >
                   <Text style={styles.appVersion}>{expo.version}</Text>
               </View>
            </View>
          </ScrollView>
        </SafeAreaView>
        <Button style={styles.btnNext}
          mode="contained"
          onPress={this._onGettingStartedNext}>
          <Text style={styles.btnText}>{resources.getString("gl.next")}</Text>
        </Button>
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
    marginTop: 10,
    justifyContent: 'space-between',
    marginBottom: 25
  },
  title: {
    alignSelf: 'baseline',
    fontSize: 22,
    fontWeight: 'bold',
    color:'#000',
  },
  paragraph: {
    alignSelf: 'baseline',
    fontSize: 15,
    width: '100%',
    direction: "ltr"
  },
  label: {
    color: newTheme.colors.secondary,
  },
  btnNext: {
    color: newTheme.colors.whiteText,
    width: 120,
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 10,
  },
  btnText: {
    color: newTheme.colors.whiteText,
  },
  container: {
    flex: 1,
    width: (Dimensions.get('window').width) - 50,
  },
  scrollView: {
    width: (Dimensions.get('window').width) - 50,
    marginHorizontal: 20,
  },
  text: {
    color: '#000',
    fontSize: 15,

  },
  italic: {
    fontStyle: 'italic',
  },
  bold:{
    fontWeight: 'bold',
    color:'#66cc99',
   //fontFamily:'Lato-Bold',
    fontSize:18
  },
});

export default memo(GettingStartedScreen);
