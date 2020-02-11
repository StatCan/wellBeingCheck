import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Title, Paragraph } from 'react-native-paper';
import { newTheme } from '../core/theme';
import AppBanner from '../components/AppBanner';
import LogoClearSmall from '../components/LogoClearSmall';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class ContactUsScreen extends React.Component<Props> {

  render() {
    return (

      <PaperProvider theme={newTheme}>

          <AppBanner />

          <View style={styles.logo_container}>
            <LogoClearSmall />
          </View>

          <View>

            <View>
              <Text style={styles.title}>Contact Us:</Text>
            </View>

            <View style={styles.content}>
              <Text style={styles.content_title}>Email</Text>
              <Text>infostats@canada.ca</Text>
            </View>

            <View style={styles.content}>
              <Text style={styles.content_title}>Telephone:</Text>
              <Text>1-877-949-9492</Text>
            </View>

            <View style={styles.content}>
              <Text style={styles.content_title}>Mail:</Text>
              <Text>Chief Statistician of Canada</Text>
              <Text>Statistics Canada</Text>
              <Text>Attention of Director Jean Labbe, Collection</Text>
              <Text>Planning andd Research Division</Text>
              <Text>150 Tunney's Pasture Driveway</Text>
              <Text>Ottawa, Ontario</Text>
              <Text>K1A 0T6</Text>
            </View>
          </View>

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
    fontFamily: 'sans-serif-medium',
  },
  content_title: {
    color: '#50bfa6'
  }
});

export default memo(ContactUsScreen);
