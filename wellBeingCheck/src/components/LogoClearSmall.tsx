import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const LogoClearSmall = () => (
  <Image source={require('../assets/logo_clear.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: 40,
    left: 0,
  },
});

export default memo(LogoClearSmall);
