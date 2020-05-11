import React, { memo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, PanResponder, Alert } from 'react-native';
import Button from '../components/Button';
import { Provider as PaperProvider, Title, List } from 'react-native-paper';
import { newTheme } from '../core/theme';
import AppBanner from '../components/AppBanner';
import LogoClearSmall from '../components/LogoClearSmall';
import { resources } from '../../GlobalResources';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import BackgroundWhite from '../components/BackgroundWhite';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { Updates } from 'expo';

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
  }

  _handleSessionTimeOutRedirect = () => {
    Updates.reload();
  }

  _initSessionTimer() {
    clearInterval(this.timer)
    this.timer = setTimeout(() =>
      this._expireSession()
      ,
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

  componentWillUnmount() {
    //Session Handler
    clearInterval(this.timer)
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
                      </List.Accordion>
                    </View>

                  </List.Accordion>
                </View>
              </List.Section>
              <Title style={styles.title}>{resources.getString("about_title")}</Title>
              <View style={styles.content}>
                <Text>{resources.getString("about_content")}</Text>
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
    marginBottom: 4, marginTop: 4
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
});

export default memo(AboutScreen);