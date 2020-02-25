import React, { memo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Button from '../components/Button';
import { Provider as PaperProvider, Title, Paragraph } from 'react-native-paper';
import { newTheme } from '../core/theme';
import AppBanner from '../components/AppBanner';
import LogoClearSmall from '../components/LogoClearSmall';
import { resources } from '../../GlobalResources';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import BackgroundWhite from '../components/BackgroundWhite';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class AboutScreen extends React.Component<Props, AboutScreen> {

  _onNextBtnHandle = () => {
    this.props.navigation.navigate('Dashboard');
  }

  render() {
    return (

      <PaperProvider theme={newTheme}>

        <AppBanner />

        <BackgroundWhite>

          <View style={styles.logo_container}>
            <LogoClearSmall />
          </View>

          <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
              <Title style={styles.title}>{resources.getString("about_title")}</Title>

              <View style={styles.content}>
                <Text>{resources.getString("about_content")}</Text>
              </View>

              <Title style={styles.title}>{resources.getString("about_title_two")}</Title>

              <View style={styles.content}>
                <Text>{resources.getString("about_content_two")}</Text>
              </View>
            </ScrollView>
          </SafeAreaView>

        </BackgroundWhite>

        <Button style={styles.btnNext}
          mode="contained"
          onPress={this._onNextBtnHandle}>
          <Text style={styles.btnText}>{resources.getString("gl.return")}</Text>
        </Button>

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
    marginTop: 120,
    marginLeft: 20,
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
