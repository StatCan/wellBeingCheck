import * as React from 'react';
import { Text, View,ScrollView, StyleSheet,TouchableOpacity,Dimensions,Image,ActivityIndicator } from 'react-native';
import TabNavigator from './TabPageScreen';
import { Ionicons,EvilIcons,Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
type ScreenState={
   loading:boolean
}

export default class App extends React.Component<Props,ScreenState> {
  render() {
    return (
      <View style={styles.container}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')} style={{marginLeft:0}}><EvilIcons name="arrow-left" size={32} color="black" /></TouchableOpacity>
                <Text style={{fontSize:24}}>Your Result</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('SettingsScreen')} style={{marginRight:0}}><EvilIcons name="gear" size={32} color="black" /></TouchableOpacity>
          </View>
         <TabNavigator />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop:Constants.statusBarHeight,
   // backgroundColor: 'white',
  },
  touchable:{ width: deviceWidth/3, height: 50,  alignItems: 'center', justifyContent: 'center',backgroundColor: 'lightgray'},
  image: {
      width: 40,
      height: 40,
    },
});

//  <Image style={styles.image} source={require('../../assets/arrow_back.png')} />