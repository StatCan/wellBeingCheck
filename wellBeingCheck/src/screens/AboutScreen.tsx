import React, { memo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, PanResponder, Alert, BackHandler, Linking, TouchableOpacity,Image } from 'react-native';
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
  //-------Category 1-------//

  faqMainExpanded: boolean,
  faqC1Expanded: boolean,
  faqC1Q1Expanded: boolean,
  faqC1Q2Expanded: boolean,
  faqC1Q3Expanded: boolean,
  faqC1Q4Expanded: boolean,
  faqC1Q5Expanded: boolean,

  //-------Category 2-------//
  faqC2Expanded: boolean,
  faqC2Q1Expanded: boolean,
  faqC2Q2Expanded: boolean,
  faqC2Q3Expanded: boolean,
  faqC2Q4Expanded: boolean,
  faqC2Q5Expanded: boolean,
  faqC2Q6Expanded: boolean,
  faqC2Q7Expanded: boolean,

  //-------Category 3-------//
  faqC3Expanded: boolean,
  faqC3Q1Expanded: boolean,
  faqC3Q2Expanded: boolean,
  faqC3Q3Expanded: boolean,
  faqC3Q4Expanded: boolean,
  faqC3Q5Expanded: boolean,
  faqC3Q6Expanded: boolean,

  //-------Category 4-------//
  faqC4Expanded: boolean,
  faqC4Q1Expanded: boolean,
  faqC4Q2Expanded: boolean,

  //-------Category 5-------//
  faqC5Expanded: boolean,
  faqC5Q1Expanded: boolean,
  faqC5Q2Expanded: boolean,
  faqC5Q3Expanded: boolean,
  faqC5Q4Expanded: boolean,
  faqC5Q5Expanded: boolean,

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
      //-------Category 1-------//
      faqC1Expanded: false,
      faqC1Q1Expanded: false,
      faqC1Q2Expanded: false,
      faqC1Q3Expanded: false,
      faqC1Q4Expanded: false,
      faqC1Q5Expanded: false,

      //-------Category 2-------//
      faqC2Expanded: false,
      faqC2Q1Expanded: false,
      faqC2Q2Expanded: false,
      faqC2Q3Expanded: false,
      faqC2Q4Expanded: false,
      faqC2Q5Expanded: false,
      faqC2Q6Expanded: false,
      faqC2Q7Expanded: false,

      //-------Category 3-------//
      faqC3Expanded: false,
      faqC3Q1Expanded: false,
      faqC3Q2Expanded: false,
      faqC3Q3Expanded: false,
      faqC3Q4Expanded: false,
      faqC3Q5Expanded: false,
      faqC3Q6Expanded: false,

      //-------Category 4-------//
      faqC4Expanded: false,
      faqC4Q1Expanded: false,
      faqC4Q2Expanded: false,

      //-------Category 5-------//
      faqC5Expanded: false,
      faqC5Q1Expanded: false,
      faqC5Q2Expanded: false,
      faqC5Q3Expanded: false,
      faqC5Q4Expanded: false,
      faqC5Q5Expanded: false,

       //-------Category 6-------//
       faqC6Expanded: false,
       faqC6Q1Expanded: false,
       faqC6Q2Expanded: false,
    };
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackPress = () => {
    return true;
  }
  _onNextBtnHandle = () => {
    global.resetTimer();// global.globalTick=0;
    this.props.navigation.navigate('Dashboard');
  }

  //   _handleAccordian=()=>
  //   this.setState({
  // switch (key) {
  //   case value:

  //     break;

  //   default:
  //     break;
  // }



  //   });

  _handleFaqMainExpand = () =>
    this.setState({
      faqMainExpanded: !this.state.faqMainExpanded
    });
  //-------Category 1-------//

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

  _handleFaqC1Q3Expand = () =>
    this.setState({
      faqC1Q3Expanded: !this.state.faqC1Q3Expanded
    });

  _handleFaqC1Q4Expand = () =>
    this.setState({
      faqC1Q4Expanded: !this.state.faqC1Q4Expanded
    });

  _handleFaqC1Q5Expand = () =>
    this.setState({
      faqC1Q5Expanded: !this.state.faqC1Q5Expanded
    });
  //-------Category 2-------//

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

  _handleFaqC2Q3Expand = () =>
    this.setState({
      faqC2Q3Expanded: !this.state.faqC2Q3Expanded
    });

  _handleFaqC2Q4Expand = () =>
    this.setState({
      faqC2Q4Expanded: !this.state.faqC2Q4Expanded
    });
  _handleFaqC2Q5Expand = () =>
    this.setState({
      faqC2Q5Expanded: !this.state.faqC2Q5Expanded
    });

  _handleFaqC2Q6Expand = () =>
    this.setState({
      faqC2Q6Expanded: !this.state.faqC2Q6Expanded
    });

  _handleFaqC2Q7Expand = () =>
    this.setState({
      faqC2Q7Expanded: !this.state.faqC2Q7Expanded
    });

  //-------Category 3-------//
  _handleFaqC3Expand = () =>
    this.setState({
      faqC3Expanded: !this.state.faqC3Expanded
    });

  _handleFaqC3Q1Expand = () =>
    this.setState({
      faqC3Q1Expanded: !this.state.faqC3Q1Expanded
    });

  _handleFaqC3Q2Expand = () =>
    this.setState({
      faqC3Q2Expanded: !this.state.faqC3Q2Expanded
    });

  _handleFaqC3Q3Expand = () =>
    this.setState({
      faqC3Q3Expanded: !this.state.faqC3Q3Expanded
    });

  _handleFaqC3Q4Expand = () =>
    this.setState({
      faqC3Q4Expanded: !this.state.faqC3Q4Expanded
    });
  _handleFaqC3Q5Expand = () =>
    this.setState({
      faqC3Q5Expanded: !this.state.faqC3Q5Expanded
    });

  _handleFaqC3Q6Expand = () =>
    this.setState({
      faqC3Q6Expanded: !this.state.faqC3Q6Expanded
    });

  //-------Category 4-------//
  _handleFaqC4Expand = () =>
    this.setState({
      faqC4Expanded: !this.state.faqC4Expanded
    });

  _handleFaqC4Q1Expand = () =>
    this.setState({
      faqC4Q1Expanded: !this.state.faqC4Q1Expanded
    });

  //-------Category 5-------//

  _handleFaqC5Expand = () =>
    this.setState({
      faqC5Expanded: !this.state.faqC5Expanded
    });

  _handleFaqC5Q1Expand = () =>
    this.setState({
      faqC5Q1Expanded: !this.state.faqC5Q1Expanded
    });

  _handleFaqC5Q2Expand = () =>
    this.setState({
      faqC5Q2Expanded: !this.state.faqC5Q2Expanded
    });

  _handleFaqC5Q3Expand = () =>
    this.setState({
      faqC5Q3Expanded: !this.state.faqC5Q3Expanded
    });

  _handleFaqC5Q4Expand = () =>
    this.setState({
      faqC5Q4Expanded: !this.state.faqC5Q4Expanded
    });
  _handleFaqC5Q5Expand = () =>
    this.setState({
      faqC5Q5Expanded: !this.state.faqC5Q5Expanded
    });

//-------Category 6-------//
  _handleFaqC6Expand = () =>
    this.setState({
      faqC6Expanded: !this.state.faqC6Expanded
    });

  _handleFaqC6Q1Expand = () =>
    this.setState({
      faqC6Q1Expanded: !this.state.faqC6Q1Expanded
    });


  handleUrlPress(url, matchIndex /*: number*/) {
    Linking.openURL(url);
  }
  handleNamePress(name, matchIndex /*: number*/) {
 //   Alert.alert(`Hello ${name}`);
    if(name=="Mental Health and Wellness"){
        Linking.openURL('https://www.canada.ca/en/public-health/topics/mental-health-wellness.html');
    }else if(name=="Santé mentale et bien-être"){
        Linking.openURL('https://www.canada.ca/fr/sante-publique/sujets/sante-mentale-et-bien-etre.html');
    }
    else  if(name=="Wellness Together Canada"){
        Linking.openURL('https://ca.portal.gs/');
    } else  if(name=="Espace mieux-être Canada"){
             Linking.openURL('https://ca.portal.gs/?lang=fr-ca');
         }
     global.resetTimer();
  }
  handlePhonePress(phone, matchIndex /*: number*/) {
    Linking.openURL('tel:1-877-949-9492');
    //  ('tel:555-867-5309')
  };
  displayNotificationInfo() {
    global.resetTimer();//global.globalTick=0;
    let msg1 = 'PingNum:' + global.pingNum + '\n';
    msg1 += 'Awake:' + global.awakeHour + '\n';
    msg1 += 'Sleep:' + global.sleepHour + '\n';
    msg1 += 'LastDay:' + global.lastDate.toDateString() + '\n';
    let msg2 = '';
    let list = global.schedules;
    for (let i = 0; i < list.length; i++) {
      msg2 += list[i].Datetime.toString() + '\n';
    }
    let msg = msg1 + msg2;
    alert(msg);
  }
  render() {
    return (
      <PaperProvider theme={newTheme} >
        <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
        <AppBanner />
        <BackgroundWhite>
          <View style={styles.logo_container}
            {...global.panResponder.panHandlers}>
            {/* <LogoClearSmall/> */}
            <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Dashboard')}
            style={{ marginLeft: 5, marginTop: 10,marginBottom:5 }}
            accessible={false}        
                            >
                <Image source={require('../assets/WellnessCheckLogo.png')}
                       style={{ width: 38, height: 38 }} />
            </TouchableOpacity>
          </View>
          <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}
              {...global.panResponder.panHandlers}
            >
              <List.Section>
                <View style={styles.faqView}
                  {...global.panResponder.panHandlers}
                >
                  <List.Accordion
                    title={resources.getString("faq.title")}
                    expanded={this.state.faqMainExpanded}
                    onPress={this._handleFaqMainExpand}
                  //numberOfLines={titleNumberOfLines}
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
                          titleNumberOfLines={3}
                        >
                          <View>
                            <ParsedText
                              style={styles.faqListItem}
                              parse={
                                [
                                  { type: 'url', style: styles.url, onPress: this.handleUrlPress },
                                ]
                              }
                              childrenProps={{ allowFontScaling: false }}
                            >
                              {resources.getString("faq.c1.q1.a")}
                            </ParsedText>
                          </View>
                        </List.Accordion>
                        <List.Accordion
                          title={resources.getString("faq.c1.q2")}
                          expanded={this.state.faqC1Q2Expanded}
                          onPress={this._handleFaqC1Q2Expand}
                          titleNumberOfLines={3}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c1.q2.a")}</Text>
                          </View>

                        </List.Accordion>

                        <List.Accordion
                          title={resources.getString("faq.c1.q3")}
                          expanded={this.state.faqC1Q3Expanded}
                          onPress={this._handleFaqC1Q3Expand}
                          titleNumberOfLines={3}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c1.q3.a")}</Text>
                          </View>
                        </List.Accordion>

                        <List.Accordion
                          title={resources.getString("faq.c1.q4")}
                          expanded={this.state.faqC1Q4Expanded}
                          onPress={this._handleFaqC1Q4Expand}
                          titleNumberOfLines={3}
                        >

                          <View>
                            <ParsedText
                              style={styles.faqListItem}
                              parse={
                                [
                                  { type: 'url', style: styles.url, onPress: this.handleUrlPress },
                                ]
                              }
                              childrenProps={{ allowFontScaling: false }}
                            >
                              {resources.getString("faq.c1.q4.a")}
                            </ParsedText>
                          </View>
                        </List.Accordion>

                        <List.Accordion
                          title={resources.getString("faq.c1.q5")}
                          expanded={this.state.faqC1Q5Expanded}
                          onPress={this._handleFaqC1Q5Expand}
                          titleNumberOfLines={3}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c1.q5.a")}</Text>
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
                          titleNumberOfLines={3}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c2.q1.a")}</Text>
                          </View>
                        </List.Accordion>
                        <List.Accordion
                          title={resources.getString("faq.c2.q2")}
                          expanded={this.state.faqC2Q2Expanded}
                          onPress={this._handleFaqC2Q2Expand}
                          titleNumberOfLines={3}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c2.q2.a")}</Text>
                          </View>
                        </List.Accordion>

                        <List.Accordion
                          title={resources.getString("faq.c2.q3")}
                          expanded={this.state.faqC2Q3Expanded}
                          onPress={this._handleFaqC2Q3Expand}
                          titleNumberOfLines={3}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c2.q3.a")}</Text>
                          </View>
                        </List.Accordion>


                        <List.Accordion
                          title={resources.getString("faq.c2.q4")}
                          expanded={this.state.faqC2Q4Expanded}
                          onPress={this._handleFaqC2Q4Expand}
                          titleNumberOfLines={3}
                        >
                          <ParsedText
                            style={styles.faqListItem}
                            parse={
                              [
                                { pattern: /Statistics Act/, style: styles.italic },
                                { pattern: /Loi sur la statistique/, style: styles.italic },
                              ]
                            }
                            childrenProps={{ allowFontScaling: false }}
                          >

                            {resources.getString("faq.c2.q4.a")}

                          </ParsedText>

                        </List.Accordion>
                        <List.Accordion
                          title={resources.getString("faq.c2.q5")}
                          expanded={this.state.faqC2Q5Expanded}
                          onPress={this._handleFaqC2Q5Expand}
                          titleNumberOfLines={3}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c2.q5.a")}</Text>
                          </View>
                        </List.Accordion>
                        <List.Accordion
                          title={resources.getString("faq.c2.q6")}
                          expanded={this.state.faqC2Q6Expanded}
                          onPress={this._handleFaqC2Q6Expand}
                          titleNumberOfLines={3}
                        >
                          <View>
                            <ParsedText
                              style={styles.faqListItem}
                              parse={
                                [
                                  { type: 'url', style: styles.url, onPress: this.handleUrlPress },
                                ]
                              }
                              childrenProps={{ allowFontScaling: false }}
                            >
                              {resources.getString("faq.c2.q6.a")}
                            </ParsedText>
                          </View>
                        </List.Accordion>
                        <List.Accordion
                          title={resources.getString("faq.c2.q7")}
                          expanded={this.state.faqC2Q7Expanded}
                          onPress={this._handleFaqC2Q7Expand}
                          titleNumberOfLines={3}
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
                        expanded={this.state.faqC3Expanded}
                        onPress={this._handleFaqC3Expand}
                      >
                        <List.Accordion
                          title={resources.getString("faq.c3.q1")}
                          expanded={this.state.faqC3Q1Expanded}
                          onPress={this._handleFaqC3Q1Expand}
                          titleNumberOfLines={3}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c3.q1.a")}</Text>
                          </View>
                        </List.Accordion>
                        <List.Accordion
                          title={resources.getString("faq.c3.q2")}
                          expanded={this.state.faqC3Q2Expanded}
                          onPress={this._handleFaqC3Q2Expand}
                          titleNumberOfLines={3}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c3.q2.a")}</Text>
                          </View>
                        </List.Accordion>
                        <List.Accordion
                          title={resources.getString("faq.c3.q3")}
                          expanded={this.state.faqC3Q3Expanded}
                          onPress={this._handleFaqC3Q3Expand}
                          titleNumberOfLines={3}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c3.q3.a")}</Text>
                          </View>
                        </List.Accordion>
                        <List.Accordion
                          title={resources.getString("faq.c3.q4")}
                          expanded={this.state.faqC3Q4Expanded}
                          onPress={this._handleFaqC3Q4Expand}
                          titleNumberOfLines={3}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c3.q4.a")}</Text>
                          </View>
                        </List.Accordion>
                        <List.Accordion
                          title={resources.getString("faq.c3.q5")}
                          expanded={this.state.faqC3Q5Expanded}
                          onPress={this._handleFaqC3Q5Expand}
                          titleNumberOfLines={3}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c3.q5.a")}</Text>
                          </View>
                        </List.Accordion>
                        <List.Accordion
                          title={resources.getString("faq.c3.q6")}
                          expanded={this.state.faqC3Q6Expanded}
                          onPress={this._handleFaqC3Q6Expand}
                          titleNumberOfLines={3}
                        >
                          <View>

                            <Text style={styles.faqListItem}>
                              <Text>{resources.getString("faq.c3.q6.a")}
                              </Text>
                              <Text style={styles.faqPhone} 
                                onPress={() => Linking.openURL('tel:18779499492')}>
                                1-877-949-9492.
                            </Text>
                            </Text>
                          </View>
                        </List.Accordion>
                      </List.Accordion>
                    </View>

                    {/* Category 4 */}
                    <View style={styles.faqViewAns}>
                      <List.Accordion
                        style={styles.faqCategories}
                        title={resources.getString("faq.category4")}
                        expanded={this.state.faqC4Expanded}
                        onPress={this._handleFaqC4Expand}
                      >
                        <List.Accordion
                          title={resources.getString("faq.c4.q1")}
                          expanded={this.state.faqC4Q1Expanded}
                          onPress={this._handleFaqC4Q1Expand}
                          titleNumberOfLines={3}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c4.q1.a")}</Text>
                          </View>
                        </List.Accordion>
                      </List.Accordion>
                    </View>

                    {/* Category 5 */}
                    <View style={styles.faqViewAns}>
                      <List.Accordion
                        style={styles.faqCategories}
                        title={resources.getString("faq.category5")}
                        expanded={this.state.faqC5Expanded}
                        onPress={this._handleFaqC5Expand}
                      >
                        <List.Accordion
                          title={resources.getString("faq.c5.q1")}
                          expanded={this.state.faqC5Q1Expanded}
                          onPress={this._handleFaqC5Q1Expand}
                          titleNumberOfLines={3}
                        >
                          <View>
                            <Text style={styles.faqListItem}>
                              <Text > {resources.getString("faq.c5.q1.a")}</Text>
                              <Text style={styles.faqPhone}
                                onPress={() => Linking.openURL('tel:18779499492')}>
                                1-877-949-9492</Text>
                            </Text>
                          </View>
                        </List.Accordion>
                        <List.Accordion
                          title={resources.getString("faq.c5.q2")}
                          expanded={this.state.faqC5Q2Expanded}
                          onPress={this._handleFaqC5Q2Expand}
                          titleNumberOfLines={3}
                        >
                          <View>
                            <Text style={styles.faqListItem}>
                              <Text> {resources.getString("faq.c5.q2.a")}
                              </Text>
                              <Text style={styles.faqPhone}
                                onPress={() => Linking.openURL('tel:18779499492')}>
                                1-877-949-9492</Text>
                            </Text>
                          </View>
                        </List.Accordion>
                        <List.Accordion
                          title={resources.getString("faq.c5.q3")}
                          expanded={this.state.faqC5Q3Expanded}
                          onPress={this._handleFaqC5Q3Expand}
                          titleNumberOfLines={3}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c5.q3.a")}</Text>
                          </View>
                        </List.Accordion>
                        <List.Accordion
                          title={resources.getString("faq.c5.q4")}
                          expanded={this.state.faqC5Q4Expanded}
                          onPress={this._handleFaqC5Q4Expand}
                          titleNumberOfLines={3}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c5.q4.a")}</Text>
                          </View>
                        </List.Accordion>
                        <List.Accordion
                          title={resources.getString("faq.c5.q5")}
                          expanded={this.state.faqC5Q5Expanded}
                          onPress={this._handleFaqC5Q5Expand}
                          titleNumberOfLines={3}
                        >
                          <View style={styles.faqListItem}>
                            <Text>{resources.getString("faq.c5.q5.a")}</Text>
                          </View>
                        </List.Accordion>
                      </List.Accordion>
                    </View>
                    {/* Category 6 */}
                                                                          <View style={styles.faqViewAns}>
                                                                            <List.Accordion
                                                                              style={styles.faqCategories}
                                                                              title={resources.getString("faq.category6")}
                                                                              expanded={this.state.faqC6Expanded}
                                                                              onPress={this._handleFaqC6Expand}
                                                                            >
                                                                              <List.Accordion
                                                                                title={resources.getString("faq.c6.q1")}
                                                                                expanded={this.state.faqC6Q1Expanded}
                                                                                onPress={this._handleFaqC6Q1Expand}
                                                                                titleNumberOfLines={3}
                                                                              >
                                                                                <View>
                                                                                                           <ParsedText
                                                                                                             style={styles.faqListItem}
                                                                                                             parse={
                                                                                                               [
                                                                                                                 {pattern: /Mental Health and Wellness|Wellness Together Canada/, style: styles.url, onPress: this.handleNamePress},
                                                                                                                 {pattern: /Santé mentale et bien-être|Espace mieux-être Canada/, style: styles.url, onPress: this.handleNamePress},
                                                                                                               ]
                                                                                                             }
                                                                                                             childrenProps={{ allowFontScaling: false }}
                                                                                                           >
                                                                                                             {resources.getString("faq.c6.q1.a")}
                                                                                                           </ParsedText>
                                                                                                         </View>
                                                                              </List.Accordion>
                                                                            </List.Accordion>
                                                                          </View>
                  </List.Accordion>

                </View>

              </List.Section>
              <Title style={styles.title}>{resources.getString("about_title")}</Title>
              <View style={styles.content}

              >
                <Text 
                accessibilityRole='header' 
                accessible={true} 
                accessibilityLabel={resources.getString("about_content.Study")} 
                style={styles.ParagraphHeader}
                >{resources.getString("about_content.Study")} </Text>

                <Paragraph style={styles.paragraph}>
                  <Text>
                    
                 <ParsedText 
                      style={styles.text}
                      parse={
                        [
                          { pattern: /Why we are conducting this study|Notifications|Authorization and confidentiality|Record linkages/, style: styles.bold },
                          { pattern: /Time required to complete this questionnaire|To navigate the questionnaire|Session timeout|Definitions and explanations|Version/, style: styles.bold },

                          { pattern: /Pourquoi nous menons cette étude|Notifications|Autorisation et confidentialité|Couplages d’enregistrements/, style: styles.bold },
                          { pattern: /Temps requis pour remplir ce questionnaire|Pour parcourir le questionnaire|Délai d’inactivité d’une session|Définitions et explications|Version/, style: styles.bold },

                          { pattern: /Statistics Act/, style: styles.italic },
                          { pattern: /Loi sur la statistique/, style: styles.italic },
                        ]
                      }
                      childrenProps={{ allowFontScaling: false }}
                    >
                     
                       
                      {resources.getString("about_content.Study.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>
               

                <Text 
                accessibilityRole='header' 
                accessible={true} 
                accessibilityLabel={resources.getString("about_content.Notification")} 
                style={styles.ParagraphHeader}
                >{resources.getString("about_content.Notification")} </Text>

                <Paragraph style={styles.paragraph}>
                  <Text>
                    
                 <ParsedText 
                      style={styles.text}
                      parse={
                        [
                          { pattern: /Why we are conducting this study|Notifications|Authorization and confidentiality|Record linkages/, style: styles.bold },
                          { pattern: /Time required to complete this questionnaire|To navigate the questionnaire|Session timeout|Definitions and explanations|Version/, style: styles.bold },

                          { pattern: /Pourquoi nous menons cette étude|Notifications|Autorisation et confidentialité|Couplages d’enregistrements/, style: styles.bold },
                          { pattern: /Temps requis pour remplir ce questionnaire|Pour parcourir le questionnaire|Délai d’inactivité d’une session|Définitions et explications|Version/, style: styles.bold },

                          { pattern: /Statistics Act/, style: styles.italic },
                          { pattern: /Loi sur la statistique/, style: styles.italic },
                        ]
                      }
                      childrenProps={{ allowFontScaling: false }}
                    >
                     
                       
                      {resources.getString("about_content.Notification.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>


                <Text 
                accessibilityRole='header' 
                accessible={true} 
                accessibilityLabel={resources.getString("about_content.Authorization")} 
                style={styles.ParagraphHeader}
                >{resources.getString("about_content.Authorization")} </Text>

                <Paragraph style={styles.paragraph}>
                  <Text>
                    
                 <ParsedText 
                      style={styles.text}
                      parse={
                        [
                          { pattern: /Why we are conducting this study|Notifications|Authorization and confidentiality|Record linkages/, style: styles.bold },
                          { pattern: /Time required to complete this questionnaire|To navigate the questionnaire|Session timeout|Definitions and explanations|Version/, style: styles.bold },

                          { pattern: /Pourquoi nous menons cette étude|Notifications|Autorisation et confidentialité|Couplages d’enregistrements/, style: styles.bold },
                          { pattern: /Temps requis pour remplir ce questionnaire|Pour parcourir le questionnaire|Délai d’inactivité d’une session|Définitions et explications|Version/, style: styles.bold },

                          { pattern: /Statistics Act/, style: styles.italic },
                          { pattern: /Loi sur la statistique/, style: styles.italic },
                        ]
                      }
                      childrenProps={{ allowFontScaling: false }}
                    >
                     
                       
                      {resources.getString("about_content.Authorization.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>


                <Text 
                accessibilityRole='header' 
                accessible={true} 
                accessibilityLabel={resources.getString("about_content.linkages")} 
                style={styles.ParagraphHeader}
                >{resources.getString("about_content.linkages")} </Text>

                <Paragraph style={styles.paragraph}>
                  <Text>
                    
                 <ParsedText 
                      style={styles.text}
                      parse={
                        [
                          { pattern: /Why we are conducting this study|Notifications|Authorization and confidentiality|Record linkages/, style: styles.bold },
                          { pattern: /Time required to complete this questionnaire|To navigate the questionnaire|Session timeout|Definitions and explanations|Version/, style: styles.bold },

                          { pattern: /Pourquoi nous menons cette étude|Notifications|Autorisation et confidentialité|Couplages d’enregistrements/, style: styles.bold },
                          { pattern: /Temps requis pour remplir ce questionnaire|Pour parcourir le questionnaire|Délai d’inactivité d’une session|Définitions et explications|Version/, style: styles.bold },

                          { pattern: /Statistics Act/, style: styles.italic },
                          { pattern: /Loi sur la statistique/, style: styles.italic },
                        ]
                      }
                      childrenProps={{ allowFontScaling: false }}
                    >
                     
                       
                      {resources.getString("about_content.linkages.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>


                <Text 
                accessibilityRole='header' 
                accessible={true} 
                accessibilityLabel={resources.getString("about_content.time")} 
                style={styles.ParagraphHeader}
                >{resources.getString("about_content.time")} </Text>

                <Paragraph style={styles.paragraph}>
                  <Text>
                    
                 <ParsedText 
                      style={styles.text}
                      parse={
                        [
                          { pattern: /Why we are conducting this study|Notifications|Authorization and confidentiality|Record linkages/, style: styles.bold },
                          { pattern: /Time required to complete this questionnaire|To navigate the questionnaire|Session timeout|Definitions and explanations|Version/, style: styles.bold },

                          { pattern: /Pourquoi nous menons cette étude|Notifications|Autorisation et confidentialité|Couplages d’enregistrements/, style: styles.bold },
                          { pattern: /Temps requis pour remplir ce questionnaire|Pour parcourir le questionnaire|Délai d’inactivité d’une session|Définitions et explications|Version/, style: styles.bold },

                          { pattern: /Statistics Act/, style: styles.italic },
                          { pattern: /Loi sur la statistique/, style: styles.italic },
                        ]
                      }
                      childrenProps={{ allowFontScaling: false }}
                    >
                     
                       
                      {resources.getString("about_content.time.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>

                <Text 
                accessibilityRole='header' 
                accessible={true} 
                accessibilityLabel={resources.getString("about_content.navigate")} 
                style={styles.ParagraphHeader}
                >{resources.getString("about_content.navigate")} </Text>

                <Paragraph style={styles.paragraph}>
                  <Text>
                    
                 <ParsedText 
                      style={styles.text}
                      parse={
                        [
                          { pattern: /Why we are conducting this study|Notifications|Authorization and confidentiality|Record linkages/, style: styles.bold },
                          { pattern: /Time required to complete this questionnaire|To navigate the questionnaire|Session timeout|Definitions and explanations|Version/, style: styles.bold },

                          { pattern: /Pourquoi nous menons cette étude|Notifications|Autorisation et confidentialité|Couplages d’enregistrements/, style: styles.bold },
                          { pattern: /Temps requis pour remplir ce questionnaire|Pour parcourir le questionnaire|Délai d’inactivité d’une session|Définitions et explications|Version/, style: styles.bold },

                          { pattern: /Statistics Act/, style: styles.italic },
                          { pattern: /Loi sur la statistique/, style: styles.italic },
                        ]
                      }
                      childrenProps={{ allowFontScaling: false }}
                    >
                    
                      {resources.getString("about_content.navigate.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>

                <Text 
                accessibilityRole='header' 
                accessible={true} 
                accessibilityLabel={resources.getString("about_content.timeout")} 
                style={styles.ParagraphHeader}
                >{resources.getString("about_content.timeout")} </Text>

                <Paragraph style={styles.paragraph}>
                  <Text>
                    
                 <ParsedText 
                      style={styles.text}
                      parse={
                        [
                          { pattern: /Why we are conducting this study|Notifications|Authorization and confidentiality|Record linkages/, style: styles.bold },
                          { pattern: /Time required to complete this questionnaire|To navigate the questionnaire|Session timeout|Definitions and explanations|Version/, style: styles.bold },

                          { pattern: /Pourquoi nous menons cette étude|Notifications|Autorisation et confidentialité|Couplages d’enregistrements/, style: styles.bold },
                          { pattern: /Temps requis pour remplir ce questionnaire|Pour parcourir le questionnaire|Délai d’inactivité d’une session|Définitions et explications|Version/, style: styles.bold },

                          { pattern: /Statistics Act/, style: styles.italic },
                          { pattern: /Loi sur la statistique/, style: styles.italic },
                        ]
                      }
                      childrenProps={{ allowFontScaling: false }}
                    >
   
                      {resources.getString("about_content.timeout.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>


                <Text 
                accessibilityRole='header' 
                accessible={true} 
                accessibilityLabel={resources.getString("about_content.def")} 
                style={styles.ParagraphHeader}
                >{resources.getString("about_content.def")} </Text>

                <Paragraph style={styles.paragraph}>
                  <Text>
                    
                 <ParsedText 
                      style={styles.text}
                      parse={
                        [
                          { pattern: /Why we are conducting this study|Notifications|Authorization and confidentiality|Record linkages/, style: styles.bold },
                          { pattern: /Time required to complete this questionnaire|To navigate the questionnaire|Session timeout|Definitions and explanations|Version/, style: styles.bold },

                          { pattern: /Pourquoi nous menons cette étude|Notifications|Autorisation et confidentialité|Couplages d’enregistrements/, style: styles.bold },
                          { pattern: /Temps requis pour remplir ce questionnaire|Pour parcourir le questionnaire|Délai d’inactivité d’une session|Définitions et explications|Version/, style: styles.bold },

                          { pattern: /Statistics Act/, style: styles.italic },
                          { pattern: /Loi sur la statistique/, style: styles.italic },
                        ]
                      }
                      childrenProps={{ allowFontScaling: false }}
                    >
   
                      {resources.getString("about_content.def.a")}

                    </ParsedText>
                  </Text>
                </Paragraph>

                
                {/* <Paragraph style={styles.paragraph}>
                  <Text>
                    
                 <ParsedText 
                      style={styles.text}
                      parse={
                        [
                          { pattern: /Why we are conducting this study|Notifications|Authorization and confidentiality|Record linkages/, style: styles.bold },
                          { pattern: /Time required to complete this questionnaire|To navigate the questionnaire|Session timeout|Definitions and explanations|Version/, style: styles.bold },

                          { pattern: /Pourquoi nous menons cette étude|Notifications|Autorisation et confidentialité|Couplages d’enregistrements/, style: styles.bold },
                          { pattern: /Temps requis pour remplir ce questionnaire|Pour parcourir le questionnaire|Délai d’inactivité d’une session|Définitions et explications|Version/, style: styles.bold },

                          { pattern: /Statistics Act/, style: styles.italic },
                          { pattern: /Loi sur la statistique/, style: styles.italic },
                        ]
                      }
                      childrenProps={{ allowFontScaling: false }}
                    >
                     
                       
                      {resources.getString("about_content")}

                    </ParsedText>
                  </Text>
                </Paragraph> */}
                 <View >
                 <Text style={styles.bold}
                  accessible={true}
                  accessibilityRole="header"
                  accessibilityLabel='Version'
                  > Version
                  </Text>
                </View>
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

        {/* <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <Button onPress={()=>this.displayNotificationInfo()} 
          style={styles.btnNext}>Info</Button>
        <Button style={styles.btnNext}
          mode="contained"
          onPress={this._onNextBtnHandle}>
          <Text style={styles.btnText}>{resources.getString("gl.return")}</Text>
        </Button>

        </View> */}
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
    marginLeft: 10,
    //padding: 10,
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
  faqPhone: {
    borderStyle: 'solid',
    borderColor: '#f8f8f8',
    borderWidth: 2,
    marginLeft: 10,
    backgroundColor: '#f8f8f8'
  },
  title: {
    //marginTop: 10,
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

  ParagraphHeader:{
    fontWeight: 'bold',
    color: '#66cc99',
    //fontFamily: 'Lato-Bold',
    fontSize: 18
  },

  appVersion:
  {
    color: 'black',
  },
  text: {
    color: 'black',
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
  url: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  phone: {
    color: 'black',
    textDecorationLine: 'underline',
  },
});

export default memo(AboutScreen);