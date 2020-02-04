import * as React from 'react';
import { Text, View,ScrollView, StyleSheet,TouchableOpacity } from 'react-native';
import TabNavigator from './TabPageScreen';
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row',justifyContent: 'space-around'}}>
        <TouchableOpacity><Text>AAA</Text></TouchableOpacity>
        <TouchableOpacity><Text>BBB</Text></TouchableOpacity>
        </View>
        <TabNavigator />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:40,// Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
