//This is an example of React Native Tab
import React from 'react';
import { Image,View,Button,Text,ScrollView,Dimensions} from 'react-native';
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
class FirstPage extends React.Component<props,ScreenState> {
     constructor(props) {
         super(props);
        this.state = {
               width: 0,
               height: 0, timeStamp:timeStamp
           };
        }
   componentDidMount() {
             this.props.navigation.addListener('didFocus', () => {
             console.log('check need reload aaaaaaa:'+global.needReload1);
             if(global.needReload1){
                  d=new Date();
                  timeStamp=d.getFullYear().toString()+d.getMonth()+d.getDay()+d.getHours()+d.getMinutes()+d.getSeconds();
                  console.log('inside:'+timeStamp);console.log('global:'+global.needReload);
                  global.needReload1=false;
                  this.setState({timeStamp:timeStamp});
             }

        });
        }
    render() {
          global.needReload1=false;
         let uri='http://barabasy.eastus.cloudapp.azure.com/WebApiForEsm/MacaroniFW/aaa/'+this.state.timeStamp+'/en/'+width;
        //   let uri='http://localhost:49159/MacaroniFW/aaa/'+this.state.timeStamp+'/en/'+width; console.log(uri);
       console.log(uri);
       console.log(timeStamp);
      return (
        <View style={{ flex: 1,marginTop:10 }}>
               <ScrollView  maximumZoomScale={4} minimumZoomScale={1}  bouncesZoom={true}>
                  <FullWidthImage source={{uri: uri}} />
               </ScrollView>
        </View>
      );
    }
  }
class SecondPage extends React.Component<props,ScreenState> {
    constructor(props) {
                                                 super(props);
                                                this.state = {
                                                       width: 0,
                                                       height: 0, timeStamp:timeStamp
                                                   };
                                                }
    componentDidMount() {
                 this._navListener = this.props.navigation.addListener('didFocus', () => {
                 // console.log('check need reload:'+global.needReload);
                  if(global.needReload2){
                       d=new Date();
                       timeStamp=d.getFullYear().toString()+d.getMonth()+d.getDay()+d.getHours()+d.getMinutes()+d.getSeconds();
                       console.log('inside:'+timeStamp);console.log('global:'+global.needReload);
                       global.needReload2=false;
                       this.setState({timeStamp:timeStamp});
                  }

             });
             }
       render() {
         let uri='http://barabasy.eastus.cloudapp.azure.com/WebApiForEsm/ScalableBarFW/aaa/'+this.state.timeStamp+'/en/'+width;
           //  let uri='http://localhost:49159/ScalableBarFW/aaa/'+this.state.timeStamp+'/en/'+width;
         console.log(uri);
             global.needReload2=false;
        return (
          <View style={{ flex: 1,marginTop:10 }}>
                 <ScrollView  maximumZoomScale={4} minimumZoomScale={1}  bouncesZoom={true}>
                    <FullWidthImage source={{uri: uri}} />
                 </ScrollView>
          </View>
        );
      }
    }

class ThirdPage extends React.Component<props,ScreenState> {
    constructor(props) {
              super(props);

              this.state = {
                  width: 0,
                  height: 0, timeStamp:timeStamp
              };
          }
    componentDidMount() {
             this._navListener = this.props.navigation.addListener('didFocus', () => {
             // console.log('check need reload:'+global.needReload);
              if(global.needReload3){
                   d=new Date();
                   timeStamp=d.getFullYear().toString()+d.getMonth()+d.getDay()+d.getHours()+d.getMinutes()+d.getSeconds();
                   console.log('inside:'+timeStamp);console.log('global:'+global.needReload);
                   global.needReload3=false;
                   this.setState({timeStamp:timeStamp});
              }

         });
         }
    render() {
      let uri='http://barabasy.eastus.cloudapp.azure.com/WebApiForEsm/ScalableLineFW/aaa/'+this.state.timeStamp+'/en/'+width;
    //    let uri='http://localhost:49159/ScalableLineFW/aaa/'+this.state.timeStamp+'/en/'+width;
     console.log(uri);
         global.needReload3=false;
    return (
      <View style={{ flex: 1,marginTop:10 }}>
             <ScrollView  maximumZoomScale={4} minimumZoomScale={1}  bouncesZoom={true}>
                <FullWidthImage source={{uri: uri}} />
             </ScrollView>
      </View>
    );
  }
}
class ThirdAPage extends React.Component<props,ScreenState> {
   constructor(props) {
          super(props);

          this.state = {
              width: 0,
              height: 0, timeStamp:timeStamp
          };
      }
   componentDidMount() {
             this._navListener = this.props.navigation.addListener('didFocus', () => {
             // console.log('check need reload:'+global.needReload);
              if(global.needReload4){
                   d=new Date();
                   timeStamp=d.getFullYear().toString()+d.getMonth()+d.getDay()+d.getHours()+d.getMinutes()+d.getSeconds();
                   console.log('inside:'+timeStamp);console.log('global:'+global.needReload);
                   global.needReload4=false;
                   this.setState({timeStamp:timeStamp});
              }

         });
         }
  render() {
      let uri='http://barabasy.eastus.cloudapp.azure.com/WebApiForEsm/ScalableLine/aaa/'+this.state.timeStamp+'/en/';
    //     let uri='http://localhost:49159/ScalableLine/aaa/'+this.state.timeStamp+'/en/';
     console.log(uri); global.needReload4=false;
     console.log('width:'+this.state.width); console.log('height:'+this.state.height);
    return (
      <View style={{ flex: 1,marginTop:10 }}>
              <ScrollView horizontal   style={{height:height,padding:10}}  maximumZoomScale={2} minimumZoomScale={1}  bouncesZoom={true}>
                <Image source={{uri: uri}} style={{width:600,height:400, resizeMode: 'stretch' }}  />
             </ScrollView>
      </View>
    );
  }
}
class ThirdBPage extends React.Component<props,ScreenState> {
   constructor(props) {
          super(props);

          this.state = {
              width: 0,
              height: 0, timeStamp:timeStamp
          };
      }

   componentDidMount() {
             this._navListener = this.props.navigation.addListener('didFocus', () => {
             // console.log('check need reload:'+global.needReload);
              if(global.needReload7){
                   d=new Date();
                   timeStamp=d.getFullYear().toString()+d.getMonth()+d.getDay()+d.getHours()+d.getMinutes()+d.getSeconds();
                   console.log('inside:'+timeStamp);console.log('global:'+global.needReload);
                   global.needReload7=false;
                   this.setState({timeStamp:timeStamp});
              }

         });
         }
  render() {
      let uri='http://barabasy.eastus.cloudapp.azure.com/WebApiForEsm/ScalableCBarFW/aaa/'+this.state.timeStamp+'/en/'+width;
    //     let uri='http://localhost:49159/ScalableCBarFW/aaa/'+this.state.timeStamp+'/en/'+width;
     console.log(uri); global.needReload7=false;

    return (
      <View style={{ flex: 1,marginTop:10 }}>
             <ScrollView  maximumZoomScale={4} minimumZoomScale={1}  bouncesZoom={true}>
                <FullWidthImage source={{uri: uri}} />
             </ScrollView>
      </View>
    );
  }
}



class ForthPage extends React.Component<props,ScreenState> {
   constructor(props) {
             super(props);

             let timeStamp='12345';
             let d=new Date();
             timeStamp=d.getFullYear().toString()+d.getMonth()+d.getDay()+d.getHours()+d.getMinutes()+d.getSeconds(); console.log('timeOld aaa:'+timeStamp);
             this.state = {
                 width: 0,
                 height: 0,timeStamp:timeStamp
             };
         }
    componentDidMount() {
               this._navListener = this.props.navigation.addListener('didFocus', () => {
               // console.log('check need reload:'+global.needReload);
                if(global.needReload5){
                     d=new Date();
                     timeStamp=d.getFullYear().toString()+d.getMonth()+d.getDay()+d.getHours()+d.getMinutes()+d.getSeconds();
                     console.log('inside:'+timeStamp);console.log('global:'+global.needReload);
                     global.needReload5=false;
                     this.setState({timeStamp:timeStamp});
                }

           });
           }
    render() {
        let uri='http://barabasy.eastus.cloudapp.azure.com/WebApiForEsm/BulletinFW/aaa/'+this.state.timeStamp+'/en/'+width;
      //     let uri='http://localhost:49159/BulletinFW/aaa/'+this.state.timeStamp+'/en/'+width;
       console.log(uri); global.needReload5=false;

      return (
        <View style={{ flex: 1,marginTop:10 }}>
               <ScrollView  maximumZoomScale={4} minimumZoomScale={1}  bouncesZoom={true}>
                  <FullWidthImage source={{uri: uri}} />
               </ScrollView>
        </View>
      );
    }
  }

class FifthPage extends React.Component<props,ScreenState> {
   constructor(props) {
          super(props);

          let timeStamp='12345';
          let d=new Date();
          timeStamp=d.getFullYear().toString()+d.getMonth()+d.getDay()+d.getHours()+d.getMinutes()+d.getSeconds(); console.log('timeOld aaa:'+timeStamp);
          this.state = {
              width: 0,
              height: 0,timeStamp:timeStamp
          };
      }
         componentDidMount() {
                   this._navListener = this.props.navigation.addListener('didFocus', () => {
                    console.log('check need reload:'+global.needReload6);
                    if(global.needReload6){
                         d=new Date();
                         timeStamp=d.getFullYear().toString()+d.getMonth()+d.getDay()+d.getHours()+d.getMinutes()+d.getSeconds();
                         console.log('inside:'+timeStamp);console.log('global:'+global.needReload6);
                         global.needReload6=false;
                         this.setState({timeStamp:timeStamp});
                    }

               });
               }
  render() {
      let uri='http://barabasy.eastus.cloudapp.azure.com/WebApiForEsm/TableFW/aaa/'+this.state.timeStamp+'/en/'+width;
     // let uri='http://localhost:49159/TableFW/aaa/'+this.state.timeStamp+'/en/'+width;
       console.log(uri); global.needReload6=false;

      return (
        <View style={{ flex: 1,marginTop:10 }}>
               <ScrollView  maximumZoomScale={4} minimumZoomScale={1}  bouncesZoom={true}>
                  <FullWidthImage source={{uri: uri}} />
               </ScrollView>
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