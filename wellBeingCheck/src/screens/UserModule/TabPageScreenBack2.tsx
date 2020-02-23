//This is an example of React Native Tab
import React from 'react';
import { Image,View,Button,Text,ScrollView,Dimensions,AsyncStorage} from 'react-native';
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import { Ionicons,EvilIcons,Feather } from '@expo/vector-icons';
import FullWidthImage from './FullWidthScreen';

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
   	    AsyncStorage.getItem('image1', (error, result) => {
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
   	      <View style={{ flex: 1,marginTop:10 }}>
   	        {this.state.pictureBase64 && (
                <View onLayout={this._onLayout.bind(this)}>
                   <View>
                     <Text>AAAA</Text><Button title="?" onPress={()=>alert("dddddd")} />
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
   	    AsyncStorage.getItem('image2', (error, result) => {
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
   	      <View style={{ flex: 1,marginTop:10 }}>
   	        {this.state.pictureBase64 && (
                <View onLayout={this._onLayout.bind(this)}>
                <ScrollView  maximumZoomScale={4} minimumZoomScale={1}  bouncesZoom={true}>
                   <Image source={{ uri: this.state.pictureBase64 }} style={{width: this.state.width,height: this.state.height }} />
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
   	    AsyncStorage.getItem('image3', (error, result) => {
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
   	      <View style={{ flex: 1,marginTop:10 }}>
   	        {this.state.pictureBase64 && (
                <View onLayout={this._onLayout.bind(this)}>
                 <ScrollView  maximumZoomScale={4} minimumZoomScale={1}  bouncesZoom={true}>
                   <Image source={{ uri: this.state.pictureBase64 }} style={{width: this.state.width,height: this.state.height }} />
                  </ScrollView>
                 </View>
   	        )}
   	      </View>
   	    );
   	  }
   	}
class ThirdAPage extends React.Component {
   constructor(props) {
   	    super(props);
   	    this.state = {pictureBase64: null, width: 0,height: 0};
    }
   loadImage() {
   	    AsyncStorage.getItem('image4', (error, result) => {
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
   _onLayout(event) {
           const containerWidth = event.nativeEvent.layout.width;
            Image.getSize(this.state.pictureBase64, (w, h) => {
                           this.setState({
                               width: height*w/h,
                               height: height
                           });
                       });
       }
   render() {
   	    return (
   	      <View style={{ flex: 1,marginTop:10 }}>
   	        {this.state.pictureBase64 && (
                <View onLayout={this._onLayout.bind(this)}>
                   <ScrollView horizontal   style={{height:height,padding:10}}  maximumZoomScale={2} minimumZoomScale={1}  bouncesZoom={true}>
                   <Image source={{ uri: this.state.pictureBase64 }} style={{width: this.state.width,height: this.state.height }} />
                   </ScrollView>
                  </View>
   	        )}
   	      </View>
   	    );
   	  }
   	}
class ThirdBPage extends React.Component {
   constructor(props) {
   	    super(props);
   	    this.state = {pictureBase64: null, width: 0,height: 0};
    }
   loadImage() {
   	    AsyncStorage.getItem('image5', (error, result) => {
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
   	      <View style={{ flex: 1,marginTop:10 }}>
   	        {this.state.pictureBase64 && (
                <View onLayout={this._onLayout.bind(this)}>
                 <ScrollView  maximumZoomScale={4} minimumZoomScale={1}  bouncesZoom={true}>
                   <Image source={{ uri: this.state.pictureBase64 }} style={{width: this.state.width,height: this.state.height }} />
                  </ScrollView>
                 </View>
   	        )}
   	      </View>
   	    );
   	  }
   	}
class ForthPage extends React.Component {
   constructor(props) {
   	    super(props);
   	    this.state = {pictureBase64: null, width: 0,height: 0};
    }
   loadImage() {
   	    AsyncStorage.getItem('image6', (error, result) => {
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
   	      <View style={{ flex: 1,marginTop:10 }}>
   	        {this.state.pictureBase64 && (
                <View onLayout={this._onLayout.bind(this)}>
                   <ScrollView  maximumZoomScale={4} minimumZoomScale={1}  bouncesZoom={true}>
                   <Image source={{ uri: this.state.pictureBase64 }}  style={{width: this.state.width,height: this.state.height }} />
                   </ScrollView>
                  </View>
   	        )}
   	      </View>
   	    );
   	  }
   	}
class FifthPage extends React.Component {
   constructor(props) {
   	    super(props);
   	    this.state = {pictureBase64: null, width: 0,height: 0};
    }
   loadImage() {
   	    AsyncStorage.getItem('image7', (error, result) => {
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
   	      <View style={{ flex: 1,marginTop:10 }}>
   	        {this.state.pictureBase64 && (
                <View onLayout={this._onLayout.bind(this)}>
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
        Home: {
            screen: FirstPage,
            navigationOptions: {
                    tabBarLabel:"☹",
                    tabBarIcon: ({ tintColor }) => (
                      <Feather name="airplay" size={20} color="black" />
                     // <AntDesign name="meh" size={25} color="green" />
                    ),
                    tabBarOnPress:({navigation,defaultHandler})=>{
                       //alert(navigation)
                    }

                  },

             },
        Settings: {
             screen: SecondPage,
             navigationOptions: {
                                               tabBarLabel:"◻",
                                               tabBarIcon: ({ tintColor }) => (
                                               //  <Icon name="users" size={30} color="black" />
                                               // <EvilIcons name="gear" size={32} color="green" />
                                               <Feather name="bar-chart" size={20} color="black" />
                                               )
                                             } },
        Mood: {
                 screen: ThirdPage,
                 navigationOptions: {
                                                   tabBarLabel:"☈",
                                                   tabBarIcon: ({ tintColor }) => (
                                                   //  <Icon name="users" size={30} color="black" />
                                                   // <EvilIcons name="gear" size={32} color="green" />
                                                   <Feather name="crosshair" size={20} color="black" />
                                                   )
                                                 } },
        MoodA: {
                                                                  screen: ThirdAPage,
                                                                  navigationOptions: {
                                                                                                    tabBarLabel:"⇉",
                                                                                                    tabBarIcon: ({ tintColor }) => (
                                                                                                    //  <Icon name="users" size={30} color="black" />
                                                                                                    // <EvilIcons name="gear" size={32} color="green" />
                                                                                                    <Feather name="crosshair" size={20} color="black" />
                                                                                                    )
                                                                                                  } },
        MoodB: {
                         screen: ThirdBPage,
                         navigationOptions: {
                                                           tabBarLabel:"↯",
                                                           tabBarIcon: ({ tintColor }) => (
                                                           //  <Icon name="users" size={30} color="black" />
                                                           // <EvilIcons name="gear" size={32} color="green" />
                                                           <Feather name="crosshair" size={20} color="black" />
                                                           )
                                                         } },
        Activity: {
                                                              screen: ForthPage,
                                                              navigationOptions: {
                                                                                                tabBarLabel:"⛯",
                                                                                                tabBarIcon: ({ tintColor }) => (
                                                                                                //  <Icon name="users" size={30} color="black" />
                                                                                                // <EvilIcons name="gear" size={32} color="green" />
                                                                                                <Feather name="activity" size={20} color="black" />
                                                                                                )
                                                                                              } },
        Table: {
                                                              screen: FifthPage,
                                                              navigationOptions: {
                                                                                                tabBarLabel:"☶",
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

export default createAppContainer(App);



//<Image source={{uri:'http://barabasy.eastus.cloudapp.azure.com/WebApiForEsm/Table/aaa/en'}}  style={{width: this.state.width,height: this.state.height }}/>


//  <View style={{flexDirection:'row'}}><Button title='Fetch' onPress={() => this.fetchImage()} /><Button title='Display' onPress={() => this.loadImage()} /></View>






