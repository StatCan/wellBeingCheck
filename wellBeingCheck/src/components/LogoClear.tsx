import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const LogoClear = () => (
  <Image source={require('../assets/logo_clear.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 128,
    height: 128,
    marginBottom: 12,
  },
});

export default memo(LogoClear);
