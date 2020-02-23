import React, { memo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView,AsyncStorage,Dimensions,Image,TouchableOpacity } from 'react-native';
import Button from '../../components/Button';
import { Provider as PaperProvider, Title, Paragraph } from 'react-native-paper';
import { newTheme } from '../../core/theme';
import AppBanner from '../../components/AppBanner';
import LogoClearSmall from '../../components/LogoClearSmall';
import { resources } from '../../../GlobalResources';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import BackgroundWhite from '../../components/BackgroundWhite';
import { Ionicons,EvilIcons,Feather } from '@expo/vector-icons';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
const deviceHeight =Math.floor(Dimensions.get('window').height);
const deviceWidth =Math.floor(Dimensions.get('window').width);

export default class ResultSummaryScreen extends React.Component<Props, AboutScreen> {
    constructor(props) {
       super(props);
       this.state = {pictureBase64: null, width: 0,height: 0};
       }
     loadImage() {
         let imageId='image0';if(global.culture=='fr')imageId='image1';
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
                     let d=new Date();
                     timeStamp=d.getFullYear().toString()+d.getMonth()+d.getDay()+d.getHours()+d.getMinutes()+d.getSeconds();
                     global.needReload1=false;
                     this.setState({timeStamp:timeStamp});
                }

           });
                this.loadImage();
                if(this.myScroll!=null)this.myScroll.scrollTo({ x: 0, y: 0, animated: true });
           }
     _onLayout(event) {
              const containerWidth = event.nativeEvent.layout.width;
               Image.getSize(this.state.pictureBase64, (w, h) => {
                              this.setState({
                                  width: w,
                                  height:h
                              });
                          });
          }



  _onNextBtnHandle = () => {
    this.props.navigation.navigate('Dashboard');
  }

  render() {
    return (

      <PaperProvider theme={newTheme}>
        <BackgroundWhite>
                   <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')} style={{marginLeft:0}}><Image source={require('../../assets/ic_logo_loginmdpi.png')} style={{width:38,height:38}} /></TouchableOpacity>
                         <TouchableOpacity onPress={() => this.props.navigation.navigate('SettingsScreen')} style={{marginRight:0}}><EvilIcons name="gear" size={32} color="black" /></TouchableOpacity>
                   </View>
          <SafeAreaView style={styles.container}>
              <Title style={styles.title}>{resources.getString("Your feeling this week")}</Title>

              <View style={styles.content}>
                     {this.state.pictureBase64 && (
                       <View onLayout={this._onLayout.bind(this)} style={{height:this.state.height,justifyContent:'center'}}>
                            <ScrollView  maximumZoomScale={4} minimumZoomScale={1}  bouncesZoom={true} contentContainerStyle={{justifyContent:'center'}} showsHorizontalScrollIndicator={false}>
                                <View style={{width:this.state.width,height:this.state.height}}>
                                   <Image source={{ uri: this.state.pictureBase64 }}  style={{width:this.state.width,height:this.state.height,resizeMode:'stretch' }} />
                               </View>
                            </ScrollView>
                       </View>
               )}
              </View>


          </SafeAreaView>

        </BackgroundWhite>

        <Button style={styles.btnDetail}  onPress={() => this.props.navigation.navigate('ResultScreen')}  mode="contained"   >
                <Text style={styles.btnText}>{resources.getString("Detail")}</Text>
                </Button>
        <Button style={styles.btnNext}
          mode="contained"
          onPress={this._onNextBtnHandle}>
          <Text style={styles.btnText}>{resources.getString("gl.return")}</Text>
        </Button>

      </PaperProvider>
    );
  }
}

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

//export default memo(AboutScreen);
