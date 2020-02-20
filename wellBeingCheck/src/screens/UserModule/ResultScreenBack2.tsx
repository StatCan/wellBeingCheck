import * as React from 'react';
import { Text, View,ScrollView, StyleSheet,TouchableOpacity,Dimensions,Image,ActivityIndicator ,Modal} from 'react-native';
import TabNavigator from './TabPageScreen';
import { Provider as PaperProvider, Title, Paragraph } from 'react-native-paper';
import Button from '../../components/Button';
import { resources } from '../../../GlobalResources';
import { Ionicons,EvilIcons,Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import LogoClearSmall from '../../components/LogoClearSmall';
import { newTheme } from '../../core/theme';
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
     _onNextBtnHandle = () => {
       this.props.navigation.navigate('Dashboard');
     }
  componentDidMount(){this.setState({loading:false});}
  render() {
    return (
     <PaperProvider theme={newTheme}>
      <View style={styles.logo_container}>
                   <LogoClearSmall />
                 </View>

      <View style={styles.container}>
         <TabNavigator />

      </View>

      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                       <Button style={styles.btnSummary}  onPress={() => this.props.navigation.navigate('ResultSummaryScreen')}  mode="contained"   >
                               <Text style={styles.btnText}>{resources.getString("Summary")}</Text>
                               </Button>
                       <Button style={styles.btnNext}
                         mode="contained"
                         onPress={this._onNextBtnHandle}>
                         <Text style={styles.btnText}>{resources.getString("gl.return")}</Text>
                       </Button>
               </View>
       </PaperProvider>
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
      },
  btnNext: {
      color: newTheme.colors.whiteText,
      width: 100,
      alignSelf: "flex-end",
      marginRight: 20,
      marginBottom: 10,
    },
    btnSummary: {
        color: 'white',
        width: 140,
        alignSelf: "center",
        marginLeft: 20,
        marginBottom: 10,
      },
    btnText: {
      color: newTheme.colors.whiteText,
    },
    logo_container: {
        position: 'relative',
        marginTop: 20,
        marginLeft: 20,
      },
});


// <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')} style={{marginLeft:0}}><EvilIcons name="arrow-left" size={32} color="black" /></TouchableOpacity>
// <Image source={require('../../assets/ic_logo_loginmdpi.png')} style={{width:34,height:34}} />
//  <Image style={styles.image} source={require('../../assets/arrow_back.png')} />
 //               <Text style={{fontSize:24}}>Your Result</Text>