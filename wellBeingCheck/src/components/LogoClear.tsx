import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const LogoClear = () => (
  <Image source={require('../assets/WellnessCheckLogo.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginBottom: 1,
  },
});

export default memo(LogoClear);
