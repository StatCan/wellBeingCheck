import React, { memo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Button from '../components/Button';
import { Provider as PaperProvider, Title, Paragraph, List } from 'react-native-paper';
import { newTheme } from '../core/theme';
import AppBanner from '../components/AppBanner';
import LogoClearSmall from '../components/LogoClearSmall';
import { resources } from '../../GlobalResources';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import BackgroundWhite from '../components/BackgroundWhite';
import { SafeAreaConsumer } from 'react-native-safe-area-context';

type AboutState = {
  faqMainExpanded: boolean,
  faqA1Expanded: boolean,
  faqA2Expanded: boolean,
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class AboutScreen extends React.Component<Props, AboutState> {

  constructor(AboutScreen) {
    super(AboutScreen)
    this.state = {
      faqMainExpanded: false,
      faqA1Expanded: false,
      faqA2Expanded: false,
    };
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

  render() {
    return (
      <PaperProvider theme={newTheme}>
        <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
        <AppBanner />
        <BackgroundWhite>
          <View style={styles.logo_container}>
            <LogoClearSmall />
          </View>

          <List.Section>
            <View style={styles.faqView}>
              <List.Accordion
                title="FAQ"
                expanded={this.state.faqMainExpanded}
                onPress={this._handleFaqMainExpand}
              >
                <View style={styles.faqViewAns}>
                  <List.Accordion
                    title="Why should I use this?"
                    expanded={this.state.faqA1Expanded}
                    onPress={this._handleFaqA1}
                  >
                    <View
                      style={styles.faqListItem}
                    ><Text>"Good question, the answer is also very important to us"</Text></View>
                  </List.Accordion>
                  <List.Accordion
                    title="Is this only for canadians?"
                    expanded={this.state.faqA2Expanded}
                    onPress={this._handleFaqA2}
                  >
                    <List.Item
                      style={styles.faqListItem}
                      title="Yes, statistics canada is only intrested Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release "
                    />
                  </List.Accordion>
                </View>
              </List.Accordion>
            </View>
          </List.Section>

          <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
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
    //  marginTop: 20,
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
    width: 100,height:40,
    alignSelf: "flex-end",
    marginRight: 20,
     marginBottom: 4,marginTop:4
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
