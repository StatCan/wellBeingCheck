import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { Provider as PaperProvider, Title } from 'react-native-paper';
import { newTheme } from '../core/theme';
import AppBanner from '../components/AppBanner';
import LogoClearSmall from '../components/LogoClearSmall';
import { resources } from '../../GlobalResources';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import BackgroundWhite from '../components/BackgroundWhite';
import { SafeAreaConsumer } from 'react-native-safe-area-context';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class ContactUsScreen extends React.Component<Props, ContactUsScreen> {

  _onNextBtnHandle = () => {
    this.props.navigation.navigate('Dashboard');
  }

  render() {
    return (
      <PaperProvider theme={newTheme}>
        <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
        <AppBanner />
        <BackgroundWhite>
          <View style={styles.logo_container}>
            <LogoClearSmall />
          </View>
          <Title style={styles.title}>{resources.getString("contactus_title")}</Title>
          <View>
            <View style={styles.content}>
              <Text style={styles.content_title}>{resources.getString("contactus_email")}</Text>
              <Text>infostats@canada.ca</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.content_title}>{resources.getString("contactus_telephone")}</Text>
              <Text>1-877-949-9492</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.content_title}>{resources.getString("contactus_mail")}</Text>
              <Text>
              {resources.getString("contactus_text")}
                </Text>
            </View>
          </View>
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
  content: {
    marginLeft: 20,
    marginBottom: 20,
  },
  logo_container: {
    position: 'relative',
    marginTop: 20,
    marginLeft: 20,
  },
  title: {
    marginTop: 20,
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
    width: 100,
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 10,
  },
  btnText: {
    color: newTheme.colors.whiteText,
  },
});

export default memo(ContactUsScreen);
