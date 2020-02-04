import * as React from 'react';
import { Text, View,ScrollView, StyleSheet,TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { createAppContainer } from 'react-navigation';
import {
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';



class Tab1 extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      tabBarLabel: 'tab1'
    }
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff'}}>
        <ScrollView>
          <View style={{flex: 1, height: 300, backgroundColor: 'red'}}>
            <Text>tab 1 ! - ScrollView</Text>
            </View>
          </ScrollView>
      </View>
    );
  }
}

class Tab2 extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      tabBarLabel: 'tab2'
    }
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff'}}>
        <Text>tab2!</Text>
      </View>
    );
  }
}

const TabNavigator = createMaterialTopTabNavigator({
  TabOne: Tab1,
  TabTwo: Tab2,
}, {
  tabBarOptions: {
    activeTintColor: '#5B71F9',
    inactiveTintColor: '#888888',
    showIcon: false,
    labelStyle: {
      fontSize: 14
    },
    tabBarPosition:'bottom',
    style: {
      backgroundColor: '#fff',
      shadowColor: '#fff',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
      height: 47,
      borderBottomWidth: 1,
      borderBottomColor: '#E8E8E8'
    },
    indicatorStyle: {
      height: 2,
      backgroundColor: 'red'
    },
  }
})

const App = createAppContainer(TabNavigator);

export default App;

