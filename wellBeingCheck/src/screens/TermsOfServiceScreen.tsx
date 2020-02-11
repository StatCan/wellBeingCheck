import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AsyncStorage } from 'react-native';
import Button from '../components/Button';
import { newTheme } from '../core/theme';
import { Provider as PaperProvider, Title, Paragraph } from 'react-native-paper';
import * as Permissions from 'expo-permissions';
import BackgroundWide from '../components/BackgroundWide';
import LogoClearSmall from '../components/LogoClearSmall';
import { resources } from '../../GlobalResources';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  SafeAreaView,
  ScrollView,
} from 'react-navigation';

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
      return false;
    }
    if (global.debugMode) console.log("Notifications Permission Granted");
    return true;
  };

  _onTermsAgree = () => {
    console.log("_onTermsAgree");
    let userTermsAndConditionsObj = {
      termsOfService: true,
    };

    AsyncStorage.setItem('user_terms_and_conditions', JSON.stringify(userTermsAndConditionsObj), () => {
      this.props.navigation.navigate('LaunchScreen');
    });
  }

  _onTermsDisagree = () => {
    console.log("_onTermsDisagree");
    let userTermsAndConditionsObj = {
      termsOfService: false,
    };

    AsyncStorage.setItem('user_terms_and_conditions', JSON.stringify(userTermsAndConditionsObj), () => {
      //handle disagree
      alert("We need to handle disagree as user cannot use application");
    });
  }

  render() {
    return (
      <PaperProvider theme={newTheme}>
        <BackgroundWide>

          <LogoClearSmall />

          <Title style={styles.title}>{resources.getString("terms_and_conditions")}</Title>

          <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
              <Paragraph style={styles.paragraph}>
                {resources.getString("terms_and_conditions_content")}
              </Paragraph>
            </ScrollView>
          </SafeAreaView>

        </BackgroundWide>

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
    alignSelf: 'baseline',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  label: {
    color: newTheme.colors.secondary,
  },
  whiteText: {
    color: newTheme.colors.whiteText
  },
  container: {
    flex: 1,
    width: '100%',
  },
  paragraph: {
    alignSelf: 'baseline',
    fontSize: 15,
    width: '100%',
    end: 0,
    direction: "ltr"
  },
  scrollView: {
    width: '100%',
    marginHorizontal: 20,
  },
  text: {
  },
});

export default memo(TermsOfServiceScreen);