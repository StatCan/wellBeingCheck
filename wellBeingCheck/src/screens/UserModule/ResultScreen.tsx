import React, { memo } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Image, ImageBackground, InteractionManager, AsyncStorage, PanResponder, Alert,ActivityIndicator,Linking,Modal} from 'react-native';
import { Provider as PaperProvider, Title } from 'react-native-paper';
import Button from '../../components/Button';
import { resources } from '../../../GlobalResources';
import { newTheme } from '../../core/theme';
import { NavigationParams, NavigationScreenProp, NavigationState,NavigationEvents, } from 'react-navigation';
import { FailureType } from '../../api/back-end.service';
import { Updates } from 'expo';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

type ScreenState = {
  loading: boolean
}

const height = Math.floor(Dimensions.get('window').height) - 100;
const width = Math.floor(Dimensions.get('window').width);
let startX = 0; let index = 0;let tryNum=10;
var busyCheck=null;let cc=0;
class UserResultsScreen extends React.Component<Props, ScreenState> {
  constructor(props) {
    super(props);
    this.state = {
      picture1Base64: null,
      images: [], current: 0, title: resources.getString("Your feelings"),
      helpText: resources.getString("Your feeling help"),
      width: 0, height: 0,loaded:false,showPopup:false
    };
    global.currentView = 1;
    this.loadingrepeatcheck=this.loadingrepeatcheck.bind(this);
  }

  _onNextBtnHandle = () => {
    this.props.navigation.navigate('Dashboard');
  }

  loadImage() {
    let imageId = 'image0'; if (resources.culture == 'fr') imageId = 'image1';
    AsyncStorage.getItem(imageId, (error, result) => {
      if (!error && result != null) {
        this.setState({ picture1Base64: result });
        let newArray = [...this.state.images];
        newArray[0] = result;
        this.setState({ images: newArray });
      }
      else {
        Alert.alert('', resources.getString("GraphNotAvailable"));
      }
    })
    imageId = 'image2'; if (resources.culture == 'fr') imageId = 'image3';
    AsyncStorage.getItem(imageId, (error, result) => {
      if (!error && result != null) {
        this.setState({ picture1Base64: result });
        let newArray = [...this.state.images];
        newArray[1] = result;
        this.setState({ images: newArray });
      }
      else {
        // do something else
      }
    })
    imageId = 'image4'; if (resources.culture == 'fr') imageId = 'image5';
    AsyncStorage.getItem(imageId, (error, result) => {
      if (!error && result != null) {
        //    this.setState({ picture2Base64: result });
        let newArray = [...this.state.images];
        newArray[2] = result;
        this.setState({ images: newArray });
      }
      else {
        // do something else
      }
    })
    imageId = 'image6'; if (resources.culture == 'fr') imageId = 'image7';
    AsyncStorage.getItem(imageId, (error, result) => {
      if (!error && result != null) {
        //    this.setState({ picture3Base64: result });
        let newArray = [...this.state.images];
        newArray[3] = result;
        this.setState({ images: newArray });
      }
      else {
        // do something else
      }
    })
  }

  componentDidMount() {
    if(global.fetchCount<8){this.monitorBusy();}
    else {
       this.loadImage();
       this.setState({loaded:true});
    }
  }

  monitorBusy() {
    busyCheck = setInterval(this.loadingrepeatcheck,1000);
  }
  loadingrepeatcheck=()=> {
        if (global.fetchCount==8 || tryNum<0) {
            clearInterval(busyCheck);
            this.loadImage();
            this.setState({loaded:true});
        }
        tryNum--;
    }

  handleScroll(event) {
    let width1 = this.state.width;let oldPage=this.state.current;
    let x = event.nativeEvent.contentOffset.x;
    if (startX > x){
        index = Math.max(0, oldPage-1);
        }
    else if (startX < x){ index = Math.min(oldPage+1, 3);
    }
    // let index = Math.round(x / width1);   //Don't delete it, it is for old way to scroll
    let xd = index * width1;
    this.setState({ current: index,loaded:true });
    if (index == 0) { this.setState({ title: resources.getString("Your feelings") }); }
    else if (index == 1) { this.setState({ title: resources.getString("How you are feeling by location") }); }
    else if (index == 2) { this.setState({ title: resources.getString("How you are feeling by activity") }); }
    else if (index == 3) { this.setState({ title: resources.getString("How you are feeling with others") }); }
    oldPage=index;
    InteractionManager.runAfterInteractions(() => this.sv.scrollTo({ x: xd }))
  }
 handleScrollBack(event) {
    let width1 = this.state.width;let oldPage=this.state.current;
    let x = event.nativeEvent.contentOffset.x;
    if (startX > x){
        index = Math.max(0, --index);
      //  if(oldPage-index>1)index=oldPage-1;
        }
    else if (startX < x){ index = Math.min(++index, 3);
    //if(index-oldPage>1)index=oldPage+1;
    }

    // let index = Math.round(x / width1);   //Don't delete it, it is for old way to scroll
    let xd = index * width1;
    this.setState({ current: index });
    if (index == 0) { this.setState({ title: resources.getString("Your feelings") }); }
    else if (index == 1) { this.setState({ title: resources.getString("How you are feeling by activity") }); }
    else if (index == 2) { this.setState({ title: resources.getString("How you are feeling by location") }); }
    else if (index == 3) { this.setState({ title: resources.getString("How you are feeling with others") }); }
    oldPage=index;
    InteractionManager.runAfterInteractions(() => this.sv.scrollTo({ x: xd }))
  }
  handleScrollB(event) { startX = event.nativeEvent.contentOffset.x; }
  _onLayout(event) {
    const containerWidth = event.nativeEvent.layout.width;
    Image.getSize(this.state.picture1Base64, (w, h) => {
      this.setState({
        width: width,
        height: width * h / w
      });
    });
  }

  helpClick() {
        this.setState({showPopup:!this.state.showPopup});
  }

  render() {
    let indicator = this.state.images.map((item, index) => {
      if (index == this.state.current) {
        return <Text key={index} style={styles.bigDot}>◉</Text>;
      }
      return <Text key={index} style={styles.smallDot}>●</Text>;
    });

    return (
      <PaperProvider theme={newTheme}>
        <ImageBackground
          source={require('../../assets/white.png')}
          style={{ backgroundColor: 'white', flex: 1 }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, height: 50 }}
          {...global.panResponder.panHandlers}
          >
            <TouchableOpacity
            onPress={() => { global.currentView = 0; this.props.navigation.navigate('Dashboard') }}
            style={{ marginLeft: 5, marginTop: 10 }}
            accessible={true}
            accessibilityLabel={resources.getString("Accessibility.ReturnLogoButton")}
            accessibilityRole="button"
            >
              <Image source={require('../../assets/WellnessCheckLogo.png')}
            style={{ width: 38, height: 38 }} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>{indicator}</View>
            {/*   <TouchableOpacity onPress={() => this.props.navigation.navigate('SettingsScreen')}
                                   style={{marginRight:5,marginTop:10}}>
                   <FontAwesome name="gear" size={30} color="black" />
                 </TouchableOpacity> */}
            <TouchableOpacity onPress={() => this.props.navigation.navigate('SettingsScreen', { refresh: this._refresh })}
              style={{ marginRight: 5, marginTop: 10 }}
              accessible={true}
              accessibilityLabel={resources.getString("settings")}
              accessibilityRole="button"
              >
              <Image source={require('../../assets/ic_setting.png')} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}
          // {...global.panResponder.panHandlers}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Title style={[styles.title, { marginLeft: 5 }]}>{this.state.title}</Title>
              {/*<TouchableOpacity onPress={() => this.helpClick()} style={{marginRight:0}}>
                            <AntDesign name="questioncircle" size={30} style={{color:'#918196',marginRight:5}} color="black" />
                          </TouchableOpacity> */}

              <TouchableOpacity onPress={() => this.helpClick()}
                style={{ marginRight: 5, marginTop: 5 }}>
                 <AntDesign name="questioncircle" size={30} style={{color:'#918196',marginRight:5}} color="black" />
              </TouchableOpacity>




            </View>

            <View style={styles.centeredView}>
                                <Modal
                                  animationType="none"
                                  transparent={true}
                                  visible={this.state.showPopup}
                                  onRequestClose={() => {
                                   // Alert.alert('Modal has been closed.');
                                  }}>
                                  <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                      <Text style={styles.modalText}
                                         accessible={true}
                                         accessibilityRole='header'
                                         accessibilityLabel={resources.getString("Your feeling help")}>{resources.getString("Your feeling help")}</Text>
                                       <TouchableOpacity onPress={() => Linking.openURL(resources.getString("wellbeing resource"))}>
                                                          <Text style={styles.text}
                                                            accessible={true}
                                                            accessibilityRole='link'
                                                            accessibilityLabel={resources.getString("faq.c6.q1")}
                                                          >{resources.getString("faq.c6.q1")}</Text>
                                       </TouchableOpacity>
                                      <TouchableOpacity
                                        style={{ ...styles.openButton}}
                                        onPress={() => {
                                          this.helpClick();
                                        }}>
                                        <Text style={styles.textStyle}
                                             accessible={true}
                                             accessibilityRole='button'
                                             accessibilityLabel={resources.getString("ok")}
                                         >
                                        {resources.getString("ok")}</Text>
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                </Modal>
                              </View>


             {(this.state.loaded) ? null : <ActivityIndicator size="large" color="lightblue" style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 20 }} />}
            <View style={{}} >
              <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={ref => { this.sv = ref; }}
                contentContainerStyle={{ paddingVertical: 20, justifyContent: 'center', }}
                onScrollBeginDrag={this.handleScrollB.bind(this)}
                onTouchStart={this.log} onScrollEndDrag={this.handleScroll.bind(this)}
                {...global.panResponder.panHandlers}
           >
                {this.state.images.map((item, index) => (
                  <View onLayout={this._onLayout.bind(this)} style={{ height: this.state.height }} key={index}>
                    <Image source={{ uri: item }} style={{ width: this.state.width, height: this.state.height - 60, resizeMode: 'stretch' }}
                    accessibilityLabel={resources.getString("Accessibility.graphText")} accessibilityRole="link" onPress={() => Linking.openURL("https://www.google.com")}
                    accessible={true}
                    />
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </ImageBackground>
        <NavigationEvents onDidFocus={() =>{this.loadImage();this.setState({ title: resources.getString("Your feelings")});}} />

        <Button style={styles.btnNext}
          mode="contained"
          onPress={() => {
              global.currentView = 0;
              global.resetTimer();//global.globalTick=0;
              this.props.navigation.navigate('Dashboard') }}>
          <Text style={styles.btnText}>{resources.getString("gl.return")}</Text>
        </Button>
         <SafeAreaConsumer>{insets => <View style={{ paddingTop: insets.top }} />}</SafeAreaConsumer>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: 'white',
    // marginTop:Constants.statusBarHeight,
    // backgroundColor: 'white',
  },
  touchable: { width: deviceWidth / 3, height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightgray' },
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
    width: 100, height: 40,
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 4, marginTop: 4
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
    marginLeft: 20, backgroundColor: 'white'
  },
  smallDot: { fontSize: 16, color: 'black', marginLeft: 5, marginRight: 5 },
  bigDot: { fontSize: 34, color: 'lightblue', marginLeft: 5, marginRight: 5 },
  hidden: {
      width: 0,
      height: 0,
    },
   centeredView: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       marginTop: 22,
     },
     modalView: {
       margin: 20,
       backgroundColor: 'white',
       borderRadius: 4,
       padding: 35,
     //  alignItems: 'center',
       shadowColor: '#000',
       shadowOffset: {
         width: 0,
         height: 2,
       },
       shadowOpacity: 0.25,
       shadowRadius: 3.84,
       elevation: 5,
     },
     openButton: {
    //   backgroundColor: 'lightblue',
    //   borderColor:'white',
   //    borderRadius: 2,

       padding: 10,
       elevation: 2,
     },
     textStyle: {
     //  color: 'blue',
        fontSize:14,
     //  fontWeight: 'bold',
       textAlign: 'center',
     },
     modalText: {
       marginBottom: 15,
    //   textAlign: 'center',
     },
     text:{fontSize:15,color:'blue'}

});

export default memo(UserResultsScreen);
//                /*<Image source={require('../../assets/ic_wbc_info.png')} style={{ width: 30, height: 30 }} /> */

// <View style={styles.hidden}>
//           <Text accessible={true} accessibilityRole="link" onPress={() => Linking.openURL("https://www.google.com")}> Here is a link </Text>
//                          <Text style={styles.content_title}
//                          accessible={true}
//                          accessibilityRole='header'
//                          accessibilityLabel={resources.getString("contactus_email")}
//                          >{resources.getString("contactus_email")}</Text>
//                          <TouchableOpacity onPress={() => Linking.openURL('mailto: STATCAN.wellbeingcheck-bilanbien-etre.STATCAN@canada.ca')}>
//                            <Text
//                            style={styles.text}
//                            >STATCAN.wellbeingcheck-bilanbien-etre.STATCAN@canada.ca</Text>
//                            </TouchableOpacity>
//          </View>