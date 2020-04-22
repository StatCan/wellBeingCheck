import React, { memo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, PanResponder, Alert } from 'react-native';
import Button from '../components/Button';
import { Provider as PaperProvider, Title, Paragraph, List } from 'react-native-paper';
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
  faqA1Expanded: boolean,
  faqA2Expanded: boolean,
  faqA3Expanded: boolean,
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class AboutScreen extends React.Component<Props, AboutState> {
  _panResponder: any;
  timer = 0

  constructor(AboutScreen) {
    super(AboutScreen)
    this.state = {
      faqMainExpanded: false,
      faqA1Expanded: false,
      faqA2Expanded: false,
      faqA3Expanded: false,
    };

    /* --------------------Session Handler--------------------------- */
    //used to handle session
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: () => {
        this._resetTimer()
        return true
      },
      onMoveShouldSetPanResponder: () => {
        this._resetTimer()
        return true
      },
      onStartShouldSetPanResponderCapture: () => {
        this._resetTimer()
        return true
      },
      onMoveShouldSetPanResponderCapture: () => {
        this._resetTimer()
        return true
      },
      onPanResponderTerminationRequest: () => {
        this._resetTimer()
        return true
      },
      onShouldBlockNativeResponder: () => {
        this._resetTimer()
        return true
      },
    });
  }

  _resetTimer() {
    this.timer = setTimeout(() =>
    Alert.alert(
      'Session expired',
      'Your session has expired due to 15 minutes of inactivity',
      [
        { text: 'OK', onPress: () => this._handleSessionTimeOutRedirect() },
      ],
      { cancelable: false }
    )
    ,
    global.sessionTimeOutDuration)
  }

  _handleSessionTimeOutRedirect = () => {
    Updates.reload();
  }
  /* --------------------Session Handler--------------------------- */

  componentDidMount() {
    //Session Handler
    this.timer = setTimeout(() =>
      Alert.alert(
        resources.getString("session.modal.title"),
        resources.getString("session.modal.message"),
        [
          { text:  resources.getString("session.modal.sign_in"), onPress: () => this._handleSessionTimeOutRedirect() },
        ],
        { cancelable: false }
      )
      ,
      global.sessionTimeOutDuration)
  }

  componentWillUnmount() {
    //Session Handler
    clearTimeout(this.timer)
  }

  faqMainExpanded

  _onNextBtnHandle = () => {
    this.props.navigation.navigate('Dashboard');
  }

  _handleFaqMainExpand = () =>
    this.setState({
      faqMainExpanded: !this.state.faqMainExpanded
    });

  _handleFaqA1 = () =>
    this.setState({
      faqA1Expanded: !this.state.faqA1Expanded
    });

  _handleFaqA2 = () =>
    this.setState({
      faqA2Expanded: !this.state.faqA2Expanded
    });

  _handleFaqA3 = () =>
    this.setState({
      faqA3Expanded: !this.state.faqA3Expanded
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
            <ScrollView style={styles.scrollView}>
              <View {...this._panResponder.panHandlers}>
                <List.Section>
                  <View style={styles.faqView}>
                    <List.Accordion
                      title={resources.getString("faq.title")}
                      expanded={this.state.faqMainExpanded}
                      onPress={this._handleFaqMainExpand}
                    >
                      <View style={styles.faqViewAns}>
                        <List.Accordion
                          title={resources.getString("faq.q1")}
                          expanded={this.state.faqA1Expanded}
                          onPress={this._handleFaqA1}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.a1")}</Text>
                          </View>
                        </List.Accordion>
                        <List.Accordion
                          title={resources.getString("faq.q2")}
                          expanded={this.state.faqA2Expanded}
                          onPress={this._handleFaqA2}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.a2")}</Text>
                          </View>
                        </List.Accordion>
                        <List.Accordion
                          title={resources.getString("faq.q3")}
                          expanded={this.state.faqA3Expanded}
                          onPress={this._handleFaqA3}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.a3")}</Text>
                          </View>
                        </List.Accordion>
                      </View>
                    </List.Accordion>
                  </View>
                </List.Section>

                <Title style={styles.title}>{resources.getString("about_title")}</Title>
                <View style={styles.content}>
                  <Text>{resources.getString("about_content")}</Text>
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
