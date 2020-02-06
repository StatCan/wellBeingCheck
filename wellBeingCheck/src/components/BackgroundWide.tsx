import React, { memo } from 'react';
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

type Props = {
  children: React.ReactNode;
};

const BackgroundWide = ({ children }: Props) => (
  <ImageBackground
    source={require('../assets/splash.png')}
    // resizeMode="repeat"
    style={styles.background}
  >
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {children}
    </KeyboardAvoidingView>
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 0,
    paddingRight: 30,
    width: '100%',
    maxWidth: 380,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(BackgroundWide);
