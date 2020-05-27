import React, { memo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, PanResponder, Alert, BackHandler, } from 'react-native';
import Button from '../components/Button';
import { Provider as PaperProvider, Title, List, Paragraph } from 'react-native-paper';
import { newTheme } from '../core/theme';
import AppBanner from '../components/AppBanner';
import LogoClearSmall from '../components/LogoClearSmall';
import { resources } from '../../GlobalResources';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import BackgroundWhite from '../components/BackgroundWhite';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import ParsedText from 'react-native-parsed-text';
// import DeviceInfo from 'react-native-device-info';
import { Updates } from 'expo';
import { expo } from '../../app.json';

type AboutState = {
  faqMainExpanded: boolean,
  faqC1Expanded: boolean,
  faqC1Q1Expanded: boolean,
  faqC1Q2Expanded: boolean,
  faqC2Expanded: boolean,
  faqC2Q1Expanded: boolean,
  faqC2Q2Expanded: boolean,
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class AboutScreen extends React.Component<Props, AboutState> {
  _panResponder: any;
  timer = null
  backHandler: any;

  constructor(AboutScreen) {
    super(AboutScreen)
    this.state = {
      faqMainExpanded: false,
      faqC1Expanded: false,
      faqC1Q1Expanded: false,
      faqC1Q2Expanded: false,
      faqC2Expanded: false,
      faqC2Q1Expanded: false,
      faqC2Q2Expanded: false,
    };

    /* --------------------Session Handler--------------------------- */
    //used to handle session
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => {
        this._initSessionTimer()
        return false;
      },
      onStartShouldSetPanResponderCapture: (evt, gestureState) => {
        this._initSessionTimer()
        return false;
      },

      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Listen for your events and show UI feedback here
        this._initSessionTimer()
        return false;
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        this._initSessionTimer()
        return false;
      },
      onPanResponderGrant: (evt, gestureState) => {
        this._initSessionTimer()
        return false;
      },
      onPanResponderMove: (evt, gestureState) => {
        this._initSessionTimer()
        return false;
      },
      onPanResponderTerminationRequest: (evt, gestureState) => {
        this._initSessionTimer()
        return false
      },
      onPanResponderRelease: (evt, gestureState) => {
        // This wont get called
        this._initSessionTimer()
        return true;
      },
      onPanResponderTerminate: (evt, gestureState) => {
        this._initSessionTimer()
        return false;
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        this._initSessionTimer()
        return false;
      },
    });
  }

  componentDidMount() {
    //Session Handler
    this._initSessionTimer()
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    //Session Handler
    clearInterval(this.timer)
    this.backHandler.remove()
  }

  handleBackPress = () => {
    return true;
  }

  _handleSessionTimeOutRedirect = () => {
    Updates.reload();
  }

  _initSessionTimer() {
    clearInterval(this.timer)
    this.timer = setTimeout(() =>
      this._expireSession(),
      global.sessionTimeOutDuration)
  }

  _expireSession() {
    Alert.alert(
      resources.getString("session.modal.title"),
      resources.getString("session.modal.message"),
      [
        { text: resources.getString("session.modal.sign_in"), onPress: () => this._handleSessionTimeOutRedirect() },
      ],
      { cancelable: false }
    )
  }

  _onNextBtnHandle = () => {
    this.props.navigation.navigate('Dashboard');
  }

  _handleFaqMainExpand = () =>
    this.setState({
      faqMainExpanded: !this.state.faqMainExpanded
    });

  _handleFaqC1Expand = () =>
    this.setState({
      faqC1Expanded: !this.state.faqC1Expanded
    });

  _handleFaqC1Q1Expand = () =>
    this.setState({
      faqC1Q1Expanded: !this.state.faqC1Q1Expanded
    });

  _handleFaqC1Q2Expand = () =>
    this.setState({
      faqC1Q2Expanded: !this.state.faqC1Q2Expanded
    });

  _handleFaqC2Expand = () =>
    this.setState({
      faqC2Expanded: !this.state.faqC2Expanded
    });

  _handleFaqC2Q1Expand = () =>
    this.setState({
      faqC2Q1Expanded: !this.state.faqC2Q1Expanded
    });

  _handleFaqC2Q2Expand = () =>
    this.setState({
      faqC2Q2Expanded: !this.state.faqC2Q2Expanded
    });

  render() {
    return (
      <PaperProvider theme={newTheme}>
        <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
        <AppBanner />
        <BackgroundWhite>
          <View style={styles.logo_container}>
            <LogoClearSmall />
          </View>
          <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}
              {...this._panResponder.panHandlers}
            >
              <List.Section>
                <View style={styles.faqView}>
                  <List.Accordion
                    title={resources.getString("faq.title")}
                    expanded={this.state.faqMainExpanded}
                    onPress={this._handleFaqMainExpand}
                  >

                    {/* Category 1 */}
                    <View style={styles.faqViewAns}>
                      <List.Accordion
                        style={styles.faqCategories}
                        title={resources.getString("faq.category1")}
                        expanded={this.state.faqC1Expanded}
                        onPress={this._handleFaqC1Expand}
                      >
                        <List.Accordion
                          title={resources.getString("faq.c1.q1")}
                          expanded={this.state.faqC1Q1Expanded}
                          onPress={this._handleFaqC1Q1Expand}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c1.q1.a")}</Text>
                          </View>
                        </List.Accordion>
                        <List.Accordion
                          title={resources.getString("faq.c1.q2")}
                          expanded={this.state.faqC1Q2Expanded}
                          onPress={this._handleFaqC1Q2Expand}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c1.q2.a")}</Text>
                          </View>
                        </List.Accordion>

                        <List.Accordion
                          title={resources.getString("faq.c1.q3")}
                          expanded={this.state.faqC1Q2Expanded}
                          onPress={this._handleFaqC1Q2Expand}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c1.q3.a")}</Text>
                          </View>
                        </List.Accordion>
                      </List.Accordion>

                      <List.Accordion
                          title={resources.getString("faq.c1.q4")}
                          expanded={this.state.faqC1Q2Expanded}
                          onPress={this._handleFaqC1Q2Expand}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c1.q4.a")}</Text>
                          </View>
                        </List.Accordion>

                        <List.Accordion
                          title={resources.getString("faq.c1.q5")}
                          expanded={this.state.faqC1Q2Expanded}
                          onPress={this._handleFaqC1Q2Expand}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c1.q5.a")}</Text>
                          </View>
                        </List.Accordion>
                    </View>

                    {/* Category 2 */}
                    <View style={styles.faqViewAns}>
                      <List.Accordion
                        style={styles.faqCategories}
                        title={resources.getString("faq.category2")}
                        expanded={this.state.faqC2Expanded}
                        onPress={this._handleFaqC2Expand}
                      >
                        <List.Accordion
                          title={resources.getString("faq.c2.q1")}
                          expanded={this.state.faqC2Q1Expanded}
                          onPress={this._handleFaqC2Q1Expand}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c2.q1.a")}</Text>
                          </View>
                        </List.Accordion>
                        <List.Accordion
                          title={resources.getString("faq.c2.q2")}
                          expanded={this.state.faqC2Q2Expanded}
                          onPress={this._handleFaqC2Q2Expand}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c2.q2.a")}</Text>
                          </View>
                        </List.Accordion>

                        <List.Accordion
                          title={resources.getString("faq.c2.q3")}
                          expanded={this.state.faqC2Q2Expanded}
                          onPress={this._handleFaqC2Q2Expand}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c2.q3.a")}</Text>
                          </View>
                        </List.Accordion>


                        <List.Accordion
                          title={resources.getString("faq.c2.q4")}
                          expanded={this.state.faqC2Q2Expanded}
                          onPress={this._handleFaqC2Q2Expand}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c2.q4.a")}</Text>
                          </View>
                        </List.Accordion>


                        <List.Accordion
                          title={resources.getString("faq.c2.q5")}
                          expanded={this.state.faqC2Q2Expanded}
                          onPress={this._handleFaqC2Q2Expand}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c2.q5.a")}</Text>
                          </View>
                        </List.Accordion>


                        <List.Accordion
                          title={resources.getString("faq.c2.q6")}
                          expanded={this.state.faqC2Q2Expanded}
                          onPress={this._handleFaqC2Q2Expand}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c2.q6.a")}</Text>
                          </View>
                        </List.Accordion>

                        <List.Accordion
                          title={resources.getString("faq.c2.q7")}
                          expanded={this.state.faqC2Q2Expanded}
                          onPress={this._handleFaqC2Q2Expand}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c2.q7.a")}</Text>
                          </View>
                        </List.Accordion>
                        
                      </List.Accordion>
                    </View>

                    {/* Category 3 */}
                    <View style={styles.faqViewAns}>
                      <List.Accordion
                        style={styles.faqCategories}
                        title={resources.getString("faq.category3")}
                        expanded={this.state.faqC2Expanded}
                        onPress={this._handleFaqC2Expand}
                      >
                        <List.Accordion
                          title={resources.getString("faq.c2.q1")}
                          expanded={this.state.faqC2Q1Expanded}
                          onPress={this._handleFaqC2Q1Expand}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c2.q1.a")}</Text>
                          </View>
                        </List.Accordion>
                        <List.Accordion
                          title={resources.getString("faq.c2.q2")}
                          expanded={this.state.faqC2Q2Expanded}
                          onPress={this._handleFaqC2Q2Expand}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c2.q2.a")}</Text>
                          </View>
                        </List.Accordion>
                      </List.Accordion>
                    </View>
                  
                    {/* Category 4 */}
                    <View style={styles.faqViewAns}>
                      <List.Accordion
                        style={styles.faqCategories}
                        title={resources.getString("faq.category4")}
                        expanded={this.state.faqC2Expanded}
                        onPress={this._handleFaqC2Expand}
                      >
                        <List.Accordion
                          title={resources.getString("faq.c2.q1")}
                          expanded={this.state.faqC2Q1Expanded}
                          onPress={this._handleFaqC2Q1Expand}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c2.q1.a")}</Text>
                          </View>
                        </List.Accordion>
                        <List.Accordion
                          title={resources.getString("faq.c2.q2")}
                          expanded={this.state.faqC2Q2Expanded}
                          onPress={this._handleFaqC2Q2Expand}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c2.q2.a")}</Text>
                          </View>
                        </List.Accordion>
                      </List.Accordion>
                    </View>

                    {/* Category 5 */}
                    <View style={styles.faqViewAns}>
                      <List.Accordion
                        style={styles.faqCategories}
                        title={resources.getString("faq.category5")}
                        expanded={this.state.faqC2Expanded}
                        onPress={this._handleFaqC2Expand}
                      >
                        <List.Accordion
                          title={resources.getString("faq.c2.q1")}
                          expanded={this.state.faqC2Q1Expanded}
                          onPress={this._handleFaqC2Q1Expand}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c2.q1.a")}</Text>
                          </View>
                        </List.Accordion>
                        <List.Accordion
                          title={resources.getString("faq.c2.q2")}
                          expanded={this.state.faqC2Q2Expanded}
                          onPress={this._handleFaqC2Q2Expand}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c2.q2.a")}</Text>
                          </View>
                        </List.Accordion>
                      </List.Accordion>
                    </View>

                  </List.Accordion>
                </View>
              </List.Section>
              <Title style={styles.title}>{resources.getString("about_title")}</Title>
              <View style={styles.content}>
                <Paragraph style={styles.paragraph}>
                  <Text>
                    <ParsedText
                      style={styles.text}
                      parse={
                        [
                          { pattern: /Why we are conducting this study\?|Notifications|Authorization and confidentiality|Record linkages/, style: styles.bold },
                          { pattern: /Time required to complete this questionnaire|To navigate the questionnaire|Session timeout|Definitions and explanations|Version/, style: styles.bold },

                          { pattern: /Pourquoi nous menons cette étude\?|Notifications|Autorisation et confidentialité|Couplages d’enregistrements/, style: styles.bold },
                          { pattern: /Temps requis pour remplir ce questionnaire|Pour parcourir le questionnaire|Délai d’inactivité d’une session|Définitions et explications|Version/, style: styles.bold },


                          { pattern: /Statistics Act, Revised Statutes of Canada, 1985, Chapter S-19/, style: styles.italic },
                          { pattern: /Loi sur la statistique, Lois revisees du Canada \(1985\), chapitre S-19/, style: styles.italic },
                        ]
                      }
                      childrenProps={{ allowFontScaling: false }}
                    >
                      {resources.getString("about_content")}
                    </ParsedText>
                  </Text>
                </Paragraph>
                <View >
                  <Text style={styles.appVersion}>{expo.version}</Text>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </BackgroundWhite>
        <Button style={styles.btnNext}
          mode="contained"
          onPress={this._onNextBtnHandle}>
          <Text style={styles.btnText}>{resources.getString("gl.return")}</Text>
        </Button>
        <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  faqListItem: {
    borderStyle: 'solid',
    borderColor: '#f8f8f8',
    borderWidth: 2,
    padding: 10,
    backgroundColor: '#f8f8f8'
  },
  faqView: {
    borderStyle: 'solid',
    borderColor: '#f8f8f8',
    borderWidth: 2,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#f8f8f8'
  },
  faqCategories: {
    borderStyle: 'solid',
    borderColor: 'gray',
    borderBottomWidth: 0,
    backgroundColor: '#e8e8e8',
  },
  faqViewAns: {
    borderStyle: 'solid',
    borderColor: 'gray',
    borderBottomWidth: 2,
    backgroundColor: 'white',
  },
  content: {
    marginLeft: 20,
    marginBottom: 20,

  },
  logo_container: {
    position: 'relative',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
  },
  title: {
    marginTop: 20,
    marginLeft: 20,
    color: '#707070',
    marginBottom: 20,
  },
  content_title: {
    color: '#50bfa6'
  },
  btnNext: {
    color: newTheme.colors.whiteText,
    width: 100, height: 40,
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 4,
    marginTop: 4
  },
  btnText: {
    color: newTheme.colors.whiteText,
  },
  container: {
    // flex: 1,
    width: '100%',
    height: '85%'
  },
  scrollView: {
    width: '100%',
    // marginHorizontal: 20,
  },
  paragraph: {
    alignSelf: 'baseline',
    fontSize: 15,
    width: '100%',
    end: 0,
    direction: "ltr"
  },
  appVersion:
  {
    color: '#656262',
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
});

export default memo(AboutScreen);