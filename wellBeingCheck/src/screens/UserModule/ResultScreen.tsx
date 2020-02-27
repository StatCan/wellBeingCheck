import * as React from 'react';
import { Text, View,ScrollView, StyleSheet,TouchableOpacity,Dimensions,Image,ActivityIndicator ,Modal,ImageBackground,NativeEventEmitter, Animated,InteractionManager,AsyncStorage} from 'react-native';
import TabNavigator from './TabPageScreen';
import { Provider as PaperProvider, Title, Paragraph } from 'react-native-paper';
import Button from '../../components/Button';
import { resources } from '../../../GlobalResources';
import { AntDesign,FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
//import Slideshow from 'react-native-image-slider-show';
//import Slideshow from 'react-native-image-slider-show-razzium';
import { SliderBox } from "react-native-image-slider-box";
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
const height=Math.floor(Dimensions.get('window').height)-100;
const width=Math.floor(Dimensions.get('window').width);
export default class App extends React.Component<Props,ScreenState> {
    constructor(props) {
      	    super(props);
      	    this.state = {picture1Base64:null,
               images: [],current:0,title:resources.getString("How you are feeling by location"),helpText:resources.getString("Your feeling help"),
      	     width: 0,height: 0};
       }
     _onNextBtnHandle = () => {
       this.props.navigation.navigate('Dashboard');
     }
    loadImage() {
            let imageId='image2';if(global.culture=='fr')imageId='image3';
    	    AsyncStorage.getItem(imageId, (error, result) => {
    	      if (!error && result != null){
                    this.setState({ picture1Base64: result });
                    let newArray = [...this.state.images];
                    newArray[0] = result;
                    this.setState({images: newArray});
               }
               else {
                   // do something else
               }
    	    })
    	    imageId='image4';if(global.culture=='fr')imageId='image5';
            AsyncStorage.getItem(imageId, (error, result) => {
             	      if (!error && result != null){
                         //    this.setState({ picture2Base64: result });
                              let newArray = [...this.state.images];
                                                 newArray[1] = result;
                                                 this.setState({images: newArray});
                        }
                        else {
                            // do something else
                        }
             	    })
            imageId='image6';if(global.culture=='fr')imageId='image7';
            AsyncStorage.getItem(imageId, (error, result) => {
                       	      if (!error && result != null){
                                   //    this.setState({ picture3Base64: result });
                                        let newArray = [...this.state.images];
                                                           newArray[2] = result;
                                                           this.setState({images: newArray});
                                  }
                                  else {
                                      // do something else
                                  }
                       	    })
    	  }
    componentDidMount() {
              this.loadImage();
         }
  handleScroll(event){
      let width1=this.state.width;
      let x=event.nativeEvent.contentOffset.x;
      let index=Math.round(x/width1);
      let xd=index*width1;
      this.setState({current:index});
      if(index==0){this.setState({title:resources.getString("How you are feeling by location")});}
      else if(index==1){this.setState({title:resources.getString("How you are feeling with others")});}
      else if(index==2){this.setState({title:resources.getString("How you are feeling by activity")});}
      InteractionManager.runAfterInteractions(()=>this.sv.scrollTo({x:xd}))
      }
   _onLayout(event) {
             const containerWidth = event.nativeEvent.layout.width;
              Image.getSize(this.state.picture1Base64, (w, h) => {
                             this.setState({
                                 width: width,
                                 height: width * h / w
                             });
                         });
         }
   helpClick(){
        alert(this.state.helpText);
   }
  render() {
      let indicator = this.state.images.map((item, index) => {

          if (index ==this.state.current) {
            return <Text key={index} style={styles.bigDot}>◉</Text>;
          }
          return <Text key={index} style={styles.smallDot}>●</Text>;
        });
    return (
          <PaperProvider theme={newTheme}>
          <ImageBackground
                   source={require('../../assets/white.png')}
                    style={{ backgroundColor: 'white',flex:1}}
                 >
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')} style={{marginLeft:5,marginTop:10}}><Image source={require('../../assets/ic_logo_loginmdpi.png')} style={{width:38,height:38}} /></TouchableOpacity>
                                   <TouchableOpacity onPress={() => this.props.navigation.navigate('SettingsScreen')} style={{marginRight:5,marginTop:10}}><FontAwesome name="gear" size={30} color="black" /></TouchableOpacity>
                             </View>
            <View style={{ flex: 1 }}>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                          {indicator}
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                          <Title style={[styles.title,{marginLeft:5}]}>{this.state.title}</Title>
                          <TouchableOpacity onPress={() => this.helpClick()} style={{marginRight:0}}><AntDesign name="questioncircle" size={30} style={{color:'#918196',marginRight:5}} color="black" /></TouchableOpacity>
                    </View>
                            <View style={{height:this.state.height}}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={ref => {this.sv = ref;}} contentContainerStyle={{ paddingVertical: 20,justifyContent:'center', }} onTouchStart={this.log} onScrollEndDrag={this.handleScroll.bind(this)}>
                                {this.state.images.map((item, index) => (
                                  <View onLayout={this._onLayout.bind(this)} style={{height:this.state.height}} key={index}>
                                            <Image source={{ uri: item }}  style={{width: this.state.width,height: this.state.height-60,resizeMode:'stretch'}} />
                                   </View>
                                          ))}

                            </ScrollView>
                            </View>
                          </View>
                 </ImageBackground>
                                <Button style={styles.btnNext}
                                  mode="contained"
                                   onPress={() => this.props.navigation.navigate('ResultSummaryScreen')}>
                                  <Text style={styles.btnText}>{resources.getString("gl.return")}</Text>
                                </Button>
          </PaperProvider>
       );
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,backgroundColor: 'white',
   // marginTop:Constants.statusBarHeight,
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
        marginLeft: 20,backgroundColor: 'white'
      },
    smallDot:{fontSize:16,color:'black',marginLeft:5,marginRight:5},
    bigDot:{fontSize:34,color:'lightblue',marginLeft:5,marginRight:5}
});


// <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')} style={{marginLeft:0}}><EvilIcons name="arrow-left" size={32} color="black" /></TouchableOpacity>
// <Image source={require('../../assets/ic_logo_loginmdpi.png')} style={{width:34,height:34}} />
//  <Image style={styles.image} source={require('../../assets/arrow_back.png')} />
 //               <Text style={{fontSize:24}}>Your Result</Text>