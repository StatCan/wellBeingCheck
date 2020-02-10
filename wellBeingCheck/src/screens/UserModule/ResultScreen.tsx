import * as React from 'react';
import { Text, View,ScrollView, StyleSheet,TouchableOpacity,Dimensions,Image,ActivityIndicator ,Modal} from 'react-native';
import TabNavigator from './TabPageScreen';
import { Ionicons,EvilIcons,Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,Model,
} from 'react-navigation';
import Loader from './Loader';
interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
type ScreenState={
   loading:boolean
}

export default class App extends React.Component<Props,ScreenState> {
    constructor(props) {
      	    super(props);
      	    this.state={loading:true};
       }

  componentDidMount(){this.setState({loading:false});}
  render() {
    return (
      <View style={styles.container}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')} style={{marginLeft:0}}><EvilIcons name="arrow-left" size={32} color="black" /></TouchableOpacity>

                 <Image source={require('../../assets/ic_logo_loginmdpi.png')} style={{width:34,height:34}} />
                <TouchableOpacity onPress={() => this.props.navigation.navigate('SettingsScreen')} style={{marginRight:0}}><EvilIcons name="gear" size={32} color="black" /></TouchableOpacity>
          </View>
         <Loader loading={this.state.loading} />
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
  modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
      },
  activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
      }
});

//  <Image style={styles.image} source={require('../../assets/arrow_back.png')} />
 //               <Text style={{fontSize:24}}>Your Result</Text>