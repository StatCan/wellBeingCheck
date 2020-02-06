import React, { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { white } from 'react-native-paper/lib/typescript/src/styles/colors';
import Constants from 'expo-constants';

const AppBanner = () => (
  <View>
    <View style={styles.statusBar}>
      <Image source={require('../assets/statscan_banner.png')} style={styles.image} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  image: {
    backgroundColor: "#ffffff",
    maxWidth: 300,
    minWidth: 250,
    height: 50,
  },
  statusBar: {
    backgroundColor: "#ffffff",
    height: 50,
  },
});

export default memo(AppBanner);
