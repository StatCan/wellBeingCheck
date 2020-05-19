import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

let customFonts = {
  'Lato-Black': require('../assets/fonts/Lato/Lato-Black.ttf'),
  'Lato-BoldItalic': require('../assets/fonts/Lato/Lato-BoldItalic.ttf'),
  'Lato-LightItalic': require('../assets/fonts/Lato/Lato-LightItalic.ttf'),
  'Lato-BlackItalic': require('../assets/fonts/Lato/Lato-BlackItalic.ttf'),
  'Lato-Italic': require('../assets/fonts/Lato/Lato-Italic.ttf'),
  'Lato-Regular': require('../assets/fonts/Lato/Lato-Regular.ttf'),
  'Lato-Bold': require('../assets/fonts/Lato/Lato-Bold.ttf'),
  'Lato-Light': require('../assets/fonts/Lato/Lato-Light.ttf'),
  'Lato-Thin': require('../assets/fonts/Lato/Lato-Thin.ttf'),	
};

export default class CustomFont extends React.Component {
  state = {
    fontsLoaded: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Platform Default</Text>
          <Text style={{ fontFamily: 'Inter-Black' }}>Inter Black</Text>
          <Text style={{ fontFamily: 'Inter-SemiBoldItalic' }}>
            Inter SemiBoldItalic
          </Text>
        </View>
      );
    } else {
      return <AppLoading />;
    }
  }
}
