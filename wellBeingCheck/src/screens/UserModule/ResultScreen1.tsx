import React, { memo, useState, useCallback } from 'react';
import { Picker, View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { AsyncStorage } from 'react-native';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import { newTheme } from '../../core/theme';
import { List, Divider } from 'react-native-paper';

import { Image,Dimensions,ActivityIndicator } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import TabPage from './TabPageScreen';

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

class ResultScreen extends React.Component<Props> {
    constructor(props) {
      super(props);
      this.state = {
        categes: [
          { cat_id: '1', cat_name: 'Person', backgroundcolor: 'lightblue' },
          { cat_id: '2', cat_name: 'Population', backgroundcolor: 'lightgray' },
        ],
        change: false,
        isPopulation:false,loading: false,
      };
    }
    changeBackground = item => {
        let categes = JSON.parse(JSON.stringify(this.state.categes));
        for (let x = 0; x < this.state.categes.length; x++) {
          if (this.state.categes[x].cat_id == item.cat_id) {
            categes[x].backgroundcolor = 'lightblue';

          //  this.setState({categes: categes,});
          } else {
            categes[x].backgroundcolor = 'lightgray';

            //this.setState({categes: categes,});
          }
        }
           this.setState({categes: categes,});
           this.setState({isPopulation:item.cat_id=='2'});
           console.log(this.state.isPopulation);

      };
      displayTab() {
            //  this.setState({loading: true});

              if (this.state.isPopulation) {
                  return <Text> The survey is not done yet,please check resule after 6 months! </Text>;
              } else {
                    console.log('isPopulation:'+this.state.isPopulation);
                  return <TabPage param={this.state.isPopulation} />;

              }
          }
  render() {
    return (
      <View>
        <BackButton goBack={() => this.props.navigation.navigate('Dashboard')} />
        <View style={styles.container}>
                      {this.state.categes.map((item, key) => (
                                <TouchableOpacity key={key}
                                  style={{
                                    width: deviceWidth/2,
                                    height: 50,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: item.backgroundcolor,
                                  }}
                                  onPress={() => this.changeBackground(item)}>
                                  <Text style={{ color: 'black',fontSize:13 }}>

                                    {item.cat_name.toUpperCase()}
                                  </Text>
                                </TouchableOpacity>
                              ))}
        </View>
        <View style={{flex:1}}>
             {this.displayTab()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
   content: {
      alignItems: 'center',
      marginTop: 100
    },
  container: {
    flexDirection:'row', marginTop: 100,
    justifyContent: 'space-between',
    backgroundColor: '#ecf0f1',
    height:100,
    alignItems: 'center',
  },
});


export default ResultScreen;
