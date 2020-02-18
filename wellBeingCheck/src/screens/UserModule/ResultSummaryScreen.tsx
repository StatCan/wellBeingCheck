import React from 'react';
import { Text, View,ScrollView, StyleSheet,TouchableOpacity,Dimensions,Image,ActivityIndicator ,AsyncStorage} from 'react-native';
import { Ionicons,EvilIcons,Feather,AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import Button from '../../components/Button';
import { newTheme } from '../../core/theme';

const deviceHeight =Math.floor(Dimensions.get('window').height);
const deviceWidth =Math.floor(Dimensions.get('window').width);
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,Model,
} from 'react-navigation';
interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
export default class App extends React.Component {
      constructor(props) {
      super(props);
      this.state = {pictureBase64: null, width: 0,height: 0};
      }
    loadImage() {
       	    AsyncStorage.getItem('image0', (error, result) => {

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
               if(this.myScroll!=null)this.myScroll.scrollTo({ x: 0, y: 100, animated: true });
          }
    _onLayout(event) {
             const containerWidth = event.nativeEvent.layout.width;
              Image.getSize(this.state.pictureBase64, (w, h) => {
                             this.setState({
                                 width: (deviceHeight-100)*w/h,
                                 height:(deviceHeight-100)
                             });
                         });
         }
  render() {
    return (
       <View style={{ flex: 1,marginTop:10 }}>
         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')} style={{marginLeft:0}}><EvilIcons name="arrow-left" size={32} color="black" /></TouchableOpacity>
                <Image source={require('../../assets/ic_logo_loginmdpi.png')} style={{width:34,height:34}} />
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ResultScreen')} style={{marginRight:0}}><AntDesign name="switcher" size={28} color="black" /></TouchableOpacity>
          </View>
              {this.state.pictureBase64 && (
                       <View onLayout={this._onLayout.bind(this)} style={{height:deviceHeight-100,justifyContent:'center'}}>
                            <ScrollView  maximumZoomScale={4} minimumZoomScale={1}  bouncesZoom={true} contentContainerStyle={{justifyContent:'center'}}>
                                <View>
                                   <Image source={{ uri: this.state.pictureBase64 }}  style={{width: deviceWidth,height: deviceHeight,marginTop:-60 }} />
                               </View>

                            </ScrollView>
                       </View>
               )}
          <View style={{flex:1,width:100,height:30,justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
             <Button mode="contained" onPress={() => this.props.navigation.navigate('ResultScreen')}>
                <Text style={styles.whiteText}>Detail</Text>
             </Button>
          </View>
       </View>
          );
  }
}

const styles = StyleSheet.create({
  whiteText: {
    color: newTheme.colors.whiteText
  }
});

//<TouchableOpacity style={{height:24,width:100,borderColor:'lightblue'}} onPress={() => this.props.navigation.navigate('ResultScreen')}><Text style={{fontSize:12}}>Detail</Text></TouchableOpacity>
