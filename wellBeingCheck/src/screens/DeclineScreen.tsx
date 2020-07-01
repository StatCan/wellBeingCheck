import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, SafeAreaView, ScrollView, PanResponder, Alert, BackHandler } from 'react-native';
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

class DeclineScreen extends React.Component<Props> {
     constructor(Props) {
       super(Props)}

  _onNextBtnHandle = () => {
   global.resetTimer();//  global.globalTick=0;
    this.props.navigation.navigate('TermsOfServiceScreen');
  }

  render() {
    return (
      <PaperProvider theme={newTheme}>
        <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
        <AppBanner />
        <BackgroundWhite>
          <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
              <View style={styles.logo_container}>
                <LogoClearSmall />
              </View>
              <View style={{justifyContent:'center',alignItems:'center'}}>
                <Title style={styles.title}>{resources.getString("message")}</Title>
                <View style={styles.content}>
                  <Text style={styles.content_title}>{resources.getString("declinemsg1")}</Text>
                  <TouchableOpacity onPress={() => Linking.openURL('tel:18779499492')}>
                    <Text style={styles.text}>1-877-949-9492</Text></TouchableOpacity>
                    <Text style={styles.content_title}>{resources.getString("declinemsg2")}</Text>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </BackgroundWhite>
        <Button style={styles.btnNext}
          mode="contained"
          onPress={this._onNextBtnHandle}>
          <Text style={styles.btnText}>{resources.getString("ok")}</Text>
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
  //  color: '#66cc99',
    fontSize: 18,
   // fontWeight:'bold'
  },
  btnNext: {
    color: newTheme.colors.whiteText,
    width: 120, height: 40,
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 4, marginTop: 4
  },
  btnText: {
    color: newTheme.colors.whiteText,
  },
  container: {
    width: '100%',
    height: '90%'
  },
  scrollView: {
    width: '100%',
  },
  text:{
    fontSize:20,
    color: '#000',fontWeight:'bold',
    marginTop:20,marginBottom:20,
    alignSelf:'center'
  }
});

export default memo(DeclineScreen);

