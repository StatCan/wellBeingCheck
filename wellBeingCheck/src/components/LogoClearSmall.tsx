import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const LogoClearSmall = () => (
  <Image source={require('../assets/WellnessCheckLogo.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    position: 'relative',
  },
});

export default memo(LogoClearSmall);
