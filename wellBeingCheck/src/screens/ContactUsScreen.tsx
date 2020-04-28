import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, SafeAreaView, ScrollView, PanResponder, Alert } from 'react-native';
import Button from '../components/Button';
import { Provider as PaperProvider, Title } from 'react-native-paper';
import { newTheme } from '../core/theme';
import AppBanner from '../components/AppBanner';
import LogoClearSmall from '../components/LogoClearSmall';
import { resources } from '../../GlobalResources';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import BackgroundWhite from '../components/BackgroundWhite';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { Updates } from 'expo';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class ContactUsScreen extends React.Component<Props, ContactUsScreen> {
  _panResponder: any;
  timer = 0

  constructor(ContactUsScreen) {
    super(ContactUsScreen)

    /* --------------------Session Handler--------------------------- */
    //used to handle session
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: () => {
        this._initSessionTimer()
        return true
      },
      onMoveShouldSetPanResponder: () => {
        this._initSessionTimer()
        return true
      },
      onStartShouldSetPanResponderCapture: () => {
        this._initSessionTimer()
        return true
      },
      onMoveShouldSetPanResponderCapture: () => {
        this._initSessionTimer()
        return true
      },
      onPanResponderTerminationRequest: () => {
        this._initSessionTimer()
        return true
      },
      onShouldBlockNativeResponder: () => {
        this._initSessionTimer()
        return true
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
    clearTimeout(this.timer)
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
    clearTimeout(this.timer)
  }

  _onNextBtnHandle = () => {
    this.props.navigation.navigate('Dashboard');
  }

  render() {
    return (
      <PaperProvider theme={newTheme}>
        <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
        <AppBanner />
        <BackgroundWhite>
          <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}
              {...this._panResponder.panHandlers}
            >
              <View style={styles.logo_container}>
                <LogoClearSmall />
              </View>
              <Title style={styles.title}>{resources.getString("contactus_title")}</Title>
              <View>
                <View style={styles.content}>
                  <Text style={styles.content_title}>{resources.getString("contactus_email")}</Text>
                  <TouchableOpacity onPress={() => Linking.openURL('mailto:infostats@canada.ca')}><Text>infostats@canada.ca</Text></TouchableOpacity>
                </View>
                <View style={styles.content}>
                  <Text style={styles.content_title}>{resources.getString("contactus_telephone")}</Text>
                  <TouchableOpacity onPress={() => Linking.openURL('tel:187779499492')}><Text>1-877-949-9492</Text></TouchableOpacity>
                </View>
                <View style={styles.content}>
                  <Text style={styles.content_title}>{resources.getString("contactus_website")}</Text>
                  <TouchableOpacity onPress={() => Linking.openURL('https://www.statcan.gc.ca')}><Text>www.statcan.gc.ca</Text></TouchableOpacity>
                </View>
                <View style={styles.content}>
                  <Text style={styles.content_title}>{resources.getString("contactus_mail")}</Text>
                  <Text>
                    {resources.getString("contactus_text")}
                  </Text>
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
      </PaperProvider >
    );
  }
}

const styles = StyleSheet.create({
  content: {
    marginLeft: 20,
    marginBottom: 20,
  },
  logo_container: {
    position: 'relative',
    marginTop: 10,
    marginLeft: 10,
  },
  title: {
    marginTop: 10,
    marginLeft: 20,
    fontWeight: '900',
    fontSize: 30,
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
    width: '100%',
    height: '85%'
  },
  scrollView: {
    width: '100%',
  },
});

export default memo(ContactUsScreen);

