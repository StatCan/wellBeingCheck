//This is an example of React Native Tab
import React from 'react';
import { Image,View,Button,Text,ScrollView,Dimensions,AsyncStorage,StyleSheet,TouchableOpacity} from 'react-native';
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import { Ionicons,EvilIcons,Feather } from '@expo/vector-icons';
import { Provider as PaperProvider, Title, Paragraph } from 'react-native-paper';
import FullWidthImage from './FullWidthScreen';
import { newTheme } from '../../core/theme';
import { resources } from '../../../GlobalResources';

import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

interface props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
  source: { uri: string }
}


const height=Math.floor(Dimensions.get('window').height)-100;
const width=Math.floor(Dimensions.get('window').width);
type ScreenState={
  width: number,height:number,timeStamp:string
}
let timeStamp='';
let d=new Date();
timeStamp=d.getFullYear().toString()+d.getMonth()+d.getDay()+d.getHours()+d.getMinutes()+d.getSeconds();
console.log('timeOld:'+timeStamp);
class FirstPage extends React.Component {
   constructor(props) {
   	    super(props);
   	    this.state = {pictureBase64: null, width: 0,height: 0};
    }
   loadImage() {
        let imageId='image2';if(global.culture=='fr')imageId='image3';
   	    AsyncStorage.getItem(imageId, (error, result) => {
   	      if (!error && result != null){
                   this.setState({ pictureBase64: result });
              }
              else {
                  // do something else
              }
   	    })
   	  }
    componentDidMount() {
             this.props.navigation.addListener('didFocus', () => {
             if(global.needReload1){
                  d=new Date();
                  timeStamp=d.getFullYear().toString()+d.getMonth()+d.getDay()+d.getHours()+d.getMinutes()+d.getSeconds();
                  global.needReload1=false;
                  this.setState({timeStamp:timeStamp});
             }

        });
             this.loadImage();
        }
    helpClick(){alert("asdfasdfasdf");}
   _onLayout(event) {
           const containerWidth = event.nativeEvent.layout.width;
            Image.getSize(this.state.pictureBase64, (w, h) => {
                           this.setState({
                               width: width,
                               height: width * h / w
                           });
                       });
       }
   render() {
   	    return (
   	      <View style={{ flex: 1,backgroundColor:'white' }}>
   	        {this.state.pictureBase64 && (
                <View onLayout={this._onLayout.bind(this)}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                             <Title style={styles.title}>{resources.getString("How you are feeling by location")}</Title>
                             <TouchableOpacity onPress={() => this.helpClick()} style={{marginRight:0}}><EvilIcons name="question" size={34} color="black" /></TouchableOpacity>
                    </View>
                   <View>
                   </View>
                   <ScrollView  maximumZoomScale={4} minimumZoomScale={1}  bouncesZoom={true}>
                   <Image source={{ uri: this.state.pictureBase64 }}  style={{width: this.state.width,height: this.state.height }} />
                   </ScrollView>
                  </View>
   	        )}
   	      </View>
   	    );
   	  }
   	}
class SecondPage extends React.Component {
   constructor(props) {
   	    super(props);
   	    this.state = {pictureBase64: null, width: 0,height: 0};
    }
   loadImage() {
        let imageId='image4';if(global.culture=='fr')imageId='image5';
   	    AsyncStorage.getItem(imageId, (error, result) => {
   	      if (!error && result != null){
                   this.setState({ pictureBase64: result });
              }
              else {
                  // do something else
              }
   	    })
   	  }
    componentDidMount() {
             this.props.navigation.addListener('didFocus', () => {
             if(global.needReload1){
                  d=new Date();
                  timeStamp=d.getFullYear().toString()+d.getMonth()+d.getDay()+d.getHours()+d.getMinutes()+d.getSeconds();
                  global.needReload1=false;
                  this.setState({timeStamp:timeStamp});
             }

        });
             this.loadImage();
        }
    helpClick(){alert("asdfasdfasdf");}
   _onLayout(event) {
           const containerWidth = event.nativeEvent.layout.width;
            Image.getSize(this.state.pictureBase64, (w, h) => {
                           this.setState({
                               width: width,
                               height: width * h / w
                           });
                       });
       }
   render() {
   	    return (
   	      <View style={{ flex: 1,backgroundColor:'white' }}>
   	        {this.state.pictureBase64 && (
                <View onLayout={this._onLayout.bind(this)}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                             <Title style={styles.title}>{resources.getString("How you are feeling with others")}</Title>
                             <TouchableOpacity onPress={() => this.helpClick()} style={{marginRight:0}}><EvilIcons name="question" size={34} color="black" /></TouchableOpacity>
                    </View>
                   <View>
                   </View>
                   <ScrollView  maximumZoomScale={4} minimumZoomScale={1}  bouncesZoom={true}>
                   <Image source={{ uri: this.state.pictureBase64 }}  style={{width: this.state.width,height: this.state.height }} />
                   </ScrollView>
                  </View>
   	        )}
   	      </View>
   	    );
   	  }
   	}
class ThirdPage extends React.Component {
   constructor(props) {
   	    super(props);
   	    this.state = {pictureBase64: null, width: 0,height: 0};
    }
   loadImage() {
        let imageId='image6';if(global.culture=='fr')imageId='image7';
   	    AsyncStorage.getItem(imageId, (error, result) => {
   	      if (!error && result != null){
                   this.setState({ pictureBase64: result });
              }
              else {
                  // do something else
              }
   	    })
   	  }
    componentDidMount() {
             this.props.navigation.addListener('didFocus', () => {
             if(global.needReload1){
                  d=new Date();
                  timeStamp=d.getFullYear().toString()+d.getMonth()+d.getDay()+d.getHours()+d.getMinutes()+d.getSeconds();
                  global.needReload1=false;
                  this.setState({timeStamp:timeStamp});
             }

        });
             this.loadImage();
        }
    helpClick(){alert("asdfasdfasdf");}
   _onLayout(event) {
           const containerWidth = event.nativeEvent.layout.width;
            Image.getSize(this.state.pictureBase64, (w, h) => {
                           this.setState({
                               width: width,
                               height: width * h / w
                           });
                       });
       }
   render() {
   	    return (
   	      <View style={{ flex: 1,backgroundColor:'white' }}>
   	        {this.state.pictureBase64 && (
                <View onLayout={this._onLayout.bind(this)}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                             <Title style={styles.title}>{resources.getString("How you are feeling by activity")}</Title>
                             <TouchableOpacity onPress={() => this.helpClick()} style={{marginRight:0}}><EvilIcons name="question" size={34} color="black" /></TouchableOpacity>
                    </View>
                   <View>
                   </View>
                   <ScrollView  maximumZoomScale={4} minimumZoomScale={1}  bouncesZoom={true}>
                   <Image source={{ uri: this.state.pictureBase64 }}  style={{width: this.state.width,height: this.state.height }} />
                   </ScrollView>
                  </View>
   	        )}
   	      </View>
   	    );
   	  }
   	}

let TabScreen = createMaterialTopTabNavigator(
  {
        Location: {
            screen: FirstPage,
            navigationOptions: {
                    tabBarLabel:"□",
                    tabBarIcon: ({ tintColor }) => (
                      <Feather name="airplay" size={20} color="black" />
                     // <AntDesign name="meh" size={25} color="green" />
                    ),

                  },

             },
        People: {
             screen: SecondPage,
             navigationOptions: {
                                               tabBarLabel:"△",
                                               tabBarIcon: ({ tintColor }) => (
                                               //  <Icon name="users" size={30} color="black" />
                                               // <EvilIcons name="gear" size={32} color="green" />
                                               <Feather name="bar-chart" size={20} color="black" />
                                               )
                                             } },
        Activity: {
                 screen: ThirdPage,
                 navigationOptions: {
                                                   tabBarLabel:"◯",
                                                   tabBarIcon: ({ tintColor }) => (
                                                   //  <Icon name="users" size={30} color="black" />
                                                   // <EvilIcons name="gear" size={32} color="green" />
                                                   <Feather name="crosshair" size={20} color="black" />
                                                   )
                                                 } },
  },
  {
  // pagerComponent: ViewPagerAdapter,
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
        iconStyle: {
                width: 30,
                height:30
            },
            tabStyle: {
                height: 60
            },
        showIcon: false,
       //  activeTintColor: '#e91e63',
         upperCaseLabel:false,
      activeTintColor: 'red',
      inactiveTintColor: 'black',
      style: {
        backgroundColor: 'lightblue',
      },
      labelStyle: {
        textAlign: 'center',fontSize:26,
      },
      indicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 2,
      },
    },
  }
);

//making a StackNavigator to export as default
const App = createStackNavigator({
  TabScreen: {
    screen: TabScreen,
    navigationOptions: {
     //  header:<View style={{marginTop:30,flexDirection:'row',}}><Text>Person</Text><Text>Popultion</Text></View>,
     //   header:  <Image source={require('./StatCanLogo.png')} style={{ width: null, height: 100 }} />,
      headerShown: false,
    //  headerStyle: {
     //   backgroundColor: '#633689',
     // },
    //  headerTintColor: '#FFFFFF',
    //  title: 'TabExample',
    },
  },
});

const styles = StyleSheet.create({
  content: {
    marginLeft: 20,
    marginBottom: 20,
  },
  logo_container: {
    position: 'relative',
    marginTop: 20,
    marginLeft: 20,
  },
  title: {
    marginTop: 20,
    marginLeft: 20,
    color: '#707070',
    marginBottom: 20,
    fontFamily: 'sans-serif-medium',
  },
  content_title: {
    color: '#50bfa6'
  },
  btnNext: {
    color: newTheme.colors.whiteText,
    width: 100,
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 10,
  },
  btnDetail: {
      color: 'white',
      width: 100,
      alignSelf: "center",
      marginLeft: 20,
      marginBottom: 10,
    },
  btnText: {
    color: newTheme.colors.whiteText,
  },
  container: {
    // flex: 1,
    width: '100%',
    height: '85%'
  },
  scrollView: {
    width: '100%',
    // marginHorizontal: 20,
  },
  paragraph: {
    alignSelf: 'baseline',
    fontSize: 15,
    width: '100%',
    end: 0,
    direction: "ltr"
  },
});
export default createAppContainer(App);



//<Image source={{uri:'http://barabasy.eastus.cloudapp.azure.com/WebApiForEsm/Table/aaa/en'}}  style={{width: this.state.width,height: this.state.height }}/>


//  <View style={{flexDirection:'row'}}><Button title='Fetch' onPress={() => this.fetchImage()} /><Button title='Display' onPress={() => this.loadImage()} /></View>






