import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, SafeAreaView, ScrollView, PanResponder, Alert, BackHandler, Image } from 'react-native';
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
import { sendDelayedNotification} from '../utils/schedule';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class ContactUsScreen extends React.Component<Props> {

  backHandler: any;

  constructor(Props) {
    super(Props)
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
  _onNextBtnHandle = () => {
   global.resetTimer();//  global.globalTick=0;
    this.props.navigation.navigate('Dashboard');
  }
printLogo=()=>{
        alert('Scheduled:\r\n'+global.sendouts);
 }
 printLog=()=>{
         alert('Sys Log:\r\n'+global.syslog);
  }
 printTest=()=>{
        sendDelayedNotification(new Date(),'Test Notification','When you see it, your setting is good');
  }
  render() {
    return (
      <PaperProvider theme={newTheme}>
        <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
        <AppBanner />
        <BackgroundWhite>
          <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}
               {...global.panResponder.panHandlers}
            >
              <View style={styles.logo_container} 
                {...global.panResponder.panHandlers}
               >
                {/* <LogoClearSmall /> */}
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')}
                            style={{ marginLeft: 5, marginTop: 10,marginBottom:5 }}>
                <Image source={require('../assets/WellnessCheckLogo.png')}
                       style={{ width: 38, height: 38 }} />
            </TouchableOpacity>
              </View>
              <Title style={styles.title}  
              {...global.panResponder.panHandlers}
              >
                {resources.getString("contactus_title")}</Title>
              <View>
                <View style={styles.content}>
                  <Text style={styles.content_title}
                  accessible={true}
                  accessibilityRole='header'
                  accessibilityLabel={resources.getString("contactus_email")}
                  >{resources.getString("contactus_email")}</Text>
                  <TouchableOpacity onPress={() => Linking.openURL('mailto:infostats@canada.ca')}>
                    <Text 
                    style={styles.text}
                    >infostats@canada.ca</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                  <Text style={styles.content_title}
                  accessible={true}
                  accessibilityRole='header'
                  accessibilityLabel={resources.getString("contactus_telephone")}
                  >{resources.getString("contactus_telephone")}</Text>
                  <TouchableOpacity onPress={() => Linking.openURL('tel:18779499492')}>
                    <Text style={styles.text}>1-877-949-9492</Text></TouchableOpacity>
                </View>
                <View style={styles.content}>
                  <Text style={styles.content_title}
                   accessible={true}
                   accessibilityRole='header'
                   accessibilityLabel={resources.getString("contactus_website")}
                  >{resources.getString("contactus_website")}</Text>
                  <TouchableOpacity onPress={() => Linking.openURL('https://www.statcan.gc.ca')}
                 
                  >
                    <Text style={styles.text}
                      accessible={true}
                      accessibilityRole='link'
                      accessibilityLabel='https://www.statcan.gc.ca'
                    >https://www.statcan.gc.ca</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.content}>
                  <Text style={styles.content_title}
                  accessible={true}
                  accessibilityRole='header'
                  accessibilityLabel={resources.getString("contactus_mail")}
                  >{resources.getString("contactus_mail")}</Text>
                  <Text style={styles.text}>{resources.getString("contactus_text")}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </BackgroundWhite>

    <View style={{flexDirection:'row',justifyContent:'space-around'}}>
        <Button style={styles.btnNext}
          mode="contained"
          onPress={this._onNextBtnHandle}>
          <Text style={styles.btnText}>{resources.getString("gl.return")}</Text>
        </Button>
         <Button style={styles.btnNext}
                     mode="contained"
                      onPress={this.printLogo}>
                      <Text style={styles.btnText}>Info</Text>
         </Button>
     </View>
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
    color: '#66cc99',
    fontSize: 18,
    fontWeight:'bold'
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
    height: '90%'
  },
  scrollView: {
    width: '100%',
  },
  text:{
    fontSize:15,
    color: '#000',
  }
});

export default memo(ContactUsScreen);



//printLog=()=>{
//      let list=global.schedules;let str='Calculated:\r\n';
//               for(let i=0;i<list.length;i++){
//                 str+=new Date(list[i].Datetime)+'\r\n';
//               }
//      alert(str);
// }
// printLogo=()=>{
//        alert('Scheduled:\r\n'+global.sendouts);
//  }
//  printLog1=()=>{
//       alert('Received:\r\n'+global.received);
//  }


//  <Button style={styles.btnNext}
//                  mode="contained"
//                  onPress={this.printLog}>
//                  <Text style={styles.btnText}>LogC</Text>
//                </Button>
//                 <Button style={styles.btnNext}
//                                  mode="contained"
//                                  onPress={this.printLogo}>
//                                  <Text style={styles.btnText}>LogS</Text>
//                                </Button>
//                 <Button style={styles.btnNext}
//                                  mode="contained"
//                                  onPress={this.printLog1}>
//                                  <Text style={styles.btnText}>LogR</Text>
//                                </Button>

//  <Button style={styles.btnNext}
//                      mode="contained"
//                      onPress={this.printTest}>
//                      <Text style={styles.btnText}>Test</Text>
//                </Button>

//<View style={{flexDirection:'row',justifyContent:'space-around'}}>
//
//        <Button style={styles.btnNext}
//          mode="contained"
//          onPress={this._onNextBtnHandle}>
//          <Text style={styles.btnText}>{resources.getString("gl.return")}</Text>
//        </Button>
//        </View>


// <Button style={styles.btnNext}
//              mode="contained"
//              onPress={this.printLogo}>
//              <Text style={styles.btnText}>Info</Text>
//        </Button>