import React, { memo } from 'react';
import { Text, StyleSheet, Dimensions, View,TouchableOpacity } from 'react-native';
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

type GettingStartedState = {
  gettingStarted: boolean,
  bannerVisibility: boolean,
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class GettingStartedScreen extends React.Component<Props, GettingStartedState> {

  constructor(GettingStartedState) {
    super(GettingStartedState)
    this.state = {
      gettingStarted: false,
      bannerVisibility: true,
      title:resources.getString("Well-Being Check"),
    };
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
   toggleLanguage(){
       if(resources.culture=='en')resources.culture='fr';else resources.culture='en';
       this.setState({title:resources.getString("Well-Being Check")});
   }
  render() {
    return (
      <PaperProvider theme={newTheme}>
        <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
        <AppBanner />
        <BackgroundWide>
          <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
              <LogoClearSmall />
              <TouchableOpacity onPress={() => this.toggleLanguage()} style={{alignSelf:'flex-end',marginRight:0}}><Text>{resources.getString("Language")}</Text></TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
              <Title style={styles.title}>{resources.getString("getting_started")}</Title>
              <View style={{}}>
                <Paragraph style={styles.paragraph}>
                  {resources.getString("getting_started_content")}
                </Paragraph>
              </View>
            </ScrollView>
          </SafeAreaView>
        </BackgroundWide>
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
    flexDirection:'row', 
    width: '100%', 
    height: 24, 
    marginLeft: 20, 
    marginTop: 10, 
    justifyContent:'space-between',
    marginBottom: 25
  },
  title: {
    alignSelf: 'baseline',
    fontSize: 22,
    fontWeight: 'bold'
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
    width: 100,
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
  },
});

export default memo(GettingStartedScreen);
