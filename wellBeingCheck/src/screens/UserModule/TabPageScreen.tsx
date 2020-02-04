//This is an example of React Native Tab
import React from 'react';
import { Image,View,Button,Text,ScrollView,Dimensions} from 'react-native';
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
//import Ionicons from 'react-native-vector-icons/Ionicons';
//import FirstPage from './SurveyResultScreen';
//import CarouselPage from './CarouselScreen';
//import SecondPage from './SliderScreen';
import { Ionicons,EvilIcons,Feather } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
//import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter';
import FullWidthImage from './FullWidthScreen';
const height=Dimensions.get('window').height-100;

class FirstPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(global.surveyACode);
  }
 // componentWillReceiveProps() {
   //       console.log('rerender here')
          //this.yourFunction()
          //this.setState({})
     // }
  componentDidMount() {
              //    this.props.onFinish();
    }
  render() {
    return (
      <View style={{ flex: 1 }}>
             <Text style={{ fontSize: 30, marginBottom: 20 }}>Your Feeling:</Text>
             <ScrollView  style={{height:height,padding:10}}  maximumZoomScale={3} minimumZoomScale={1}  bouncesZoom={true}>
                    <Image source={{uri:'http://barabasy.eastus.cloudapp.azure.com/WebApiForEsm/Macaroni/aaa/en'}} style={{ aspectRatio: 1,resizeMode:'stretch'}}/>
             </ScrollView>
      </View>
    );
  }
}
class SecondPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(global.surveyACode);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
             <Text style={{ fontSize: 30, marginBottom: 20 }}>Your Feeling:</Text>
             <ScrollView  style={{height:height,padding:10}}  maximumZoomScale={3} minimumZoomScale={1}  bouncesZoom={true}>
                    <Image source={{uri:'http://barabasy.eastus.cloudapp.azure.com/WebApiForEsm/ScalableBar/aaa/en'}} style={{width:400, aspectRatio: 1,resizeMode:'stretch',marginBottom:40}}/>
             </ScrollView>
      </View>
    );
  }
}

class ThirdPage extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
             <Text style={{ fontSize: 30, marginBottom: 20 }}>Where Result:</Text>
             <ScrollView horizontal  style={{height:height,padding:10}}  maximumZoomScale={2} minimumZoomScale={1}  bouncesZoom={true}>
                    <Image source={{uri:'http://barabasy.eastus.cloudapp.azure.com/WebApiForEsm/ScalableLine/aaa/en'}} style={{width:600,height:300, resizeMode: 'stretch' }} />
             </ScrollView>
      </View>
    );
  }
}
class ForthPage extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
             <Text style={{ fontSize: 30, marginBottom: 20 }}>When Result:</Text>
             <ScrollView  style={{height:height,padding:10}}  maximumZoomScale={2} minimumZoomScale={1}  bouncesZoom={true}>
                    <Image source={{uri:'http://barabasy.eastus.cloudapp.azure.com/WebApiForEsm/Bulletin/aaa/en'}} style={{ aspectRatio: 1,resizeMode:'stretch'}}/>
             </ScrollView>
      </View>
    );
  }
}
class FifthPage extends React.Component {
   constructor() {
          super();

          this.state = {
              width: 0,
              height: 0
          };
      }
      _onLayout(event) {
                  Image.getSize(this.props.source.uri, (width, height) => {
                      this.setState({
                          width: width,
                          height: height
                      });
                  });
              }
  render() {
    return (
      <View style={{ flex: 1 }}>
             <Text style={{ fontSize: 30, marginBottom: 20 }}>Activity Result:</Text>
             <ScrollView  maximumZoomScale={4} minimumZoomScale={1}  bouncesZoom={true}>
                <FullWidthImage source={{uri: 'http://barabasy.eastus.cloudapp.azure.com/WebApiForEsm/Table/aaa/en'}} />
             </ScrollView>
      </View>
    );
  }
}

const TabScreen = createMaterialTopTabNavigator(
  {
    Home: {
        screen: FirstPage,
        navigationOptions: {
                tabBarLabel:"Mood",
                tabBarIcon: ({ tintColor }) => (
                  <Feather name="airplay" size={20} color="black" />
                 // <AntDesign name="meh" size={25} color="green" />
                ),
                tabBarOnPress:({navigation,defaultHandler})=>{

                }

              },

         },
    Settings: {
         screen: SecondPage,
         navigationOptions: {
                                           tabBarLabel:"Population",
                                           tabBarIcon: ({ tintColor }) => (
                                           //  <Icon name="users" size={30} color="black" />
                                           // <EvilIcons name="gear" size={32} color="green" />
                                           <Feather name="bar-chart" size={20} color="black" />
                                           )
                                         } },
    Mood: {
             screen: ThirdPage,
             navigationOptions: {
                                               tabBarLabel:"Mood",
                                               tabBarIcon: ({ tintColor }) => (
                                               //  <Icon name="users" size={30} color="black" />
                                               // <EvilIcons name="gear" size={32} color="green" />
                                               <Feather name="crosshair" size={20} color="black" />
                                               )
                                             } },
    Activity: {
                                                          screen: ForthPage,
                                                          navigationOptions: {
                                                                                            tabBarLabel:"Activity",
                                                                                            tabBarIcon: ({ tintColor }) => (
                                                                                            //  <Icon name="users" size={30} color="black" />
                                                                                            // <EvilIcons name="gear" size={32} color="green" />
                                                                                            <Feather name="activity" size={20} color="black" />
                                                                                            )
                                                                                          } },
    Table: {
                                                              screen: FifthPage,
                                                              navigationOptions: {
                                                                                                tabBarLabel:"table",
                                                                                                tabBarIcon: ({ tintColor }) => (
                                                                                                //  <Icon name="users" size={30} color="black" />
                                                                                                // <EvilIcons name="gear" size={32} color="green" />
                                                                                                <Feather name="grid" size={20} color="black" />
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
        showIcon: true,
       //  activeTintColor: '#e91e63',
         upperCaseLabel:false,
      activeTintColor: 'red',
      inactiveTintColor: 'black',
      style: {
        backgroundColor: 'lightblue',
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        height: 2,
        backgroundColor: 'red',
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

export default createAppContainer(App);



//<Image source={{uri:'http://barabasy.eastus.cloudapp.azure.com/WebApiForEsm/Table/aaa/en'}}  style={{width: this.state.width,height: this.state.height }}/>