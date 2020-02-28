import React, { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { resources } from '../../GlobalResources';

const bannerPathEnglish = require('../assets/statscan_banner.png');
const bannerPathFrench = require('../assets/statscan_banner_fr.png');

const AppBanner = () => (
  <View>
    <View style={styles.statusBar}>
      <Image source={resources.culture == 'fr' ? bannerPathFrench : bannerPathEnglish} style={styles.image} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  image: {
    maxWidth: 300,
    minWidth: 250,
    height: 50,
  },
  statusBar: {
    backgroundColor: "#f7f8f9",
    height: 50,
  },
});

export default memo(AppBanner);
