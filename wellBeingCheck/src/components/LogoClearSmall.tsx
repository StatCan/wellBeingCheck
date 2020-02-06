import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const LogoClear = () => (
  <Image source={require('../assets/logo_clear.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    alignSelf: "flex-start",
    end: 0,
  },
});

export default memo(LogoClear);
