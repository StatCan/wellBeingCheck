
import React, { memo } from 'react';
import Background from '../components/Background';
import { View, Text, TextInput, Image, StyleSheet,ImageBackground,Dimensions,TouchableOpacity,AsyncStorage } from 'react-native';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { Navigation } from '../types';
import { EvilIcons, Feather} from '@expo/vector-icons';
import LogoClearSmall from '../components/LogoClearSmall';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import {fetchJwToken,checkConnection} from '../utils/fetchJwToken';
interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
let hasImage='0';
class Dashboard extends React.Component<Props> {
    constructor(props) {
   	    super(props);

   	    this.hasImage();
    }
    async hasImage(){
        try {
           let value = await AsyncStorage.getItem('hasImage');console.log(value);
           if (value != null){
              hasImage='1';
           }
           else {
              // do something else
          }
        } catch (error) {
          // Error retrieving data
        }
    }
    async sendRequest(){
        let token=await fetchJwToken();console.log('send:'+token);
        let url=global.webApiBaseUrl+'api/Values';let cul=global.culture;console.log(cul);
        console.log(url);
        fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token,
             'Accept-language':cul
          }
        })
        .then(res =>{
           console.log(res.status);
           if(res.status==200){
                     res.json().then(data => { console.log(data);alert('Received data successfully'); })
                     }
             else {   //401
                    throw new Error("Access denied, Try again later, if same thing would happen again contact StatCan");

                                   }
            })
        .catch(err => { console.log(err) })
    }
    async conductSurvey(){
        let isConnected=await checkConnection();
        if(!isConnected){alert('You are offline, try it later');return;}
        global.needReload1=true;global.needReload2=true;global.needReload3=true;global.needReload4=true;global.needReload5=true;global.needReload6=true;global.needReload7=true;
        this.props.navigation.navigate('EQSurveyScreen');
    }
    render() {
       return (
      <Background>
        <View style={styles.homeContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SettingsScreen')} style={{alignSelf:'flex-end',marginRight:8}}><EvilIcons name="gear" size={32} color="black" /></TouchableOpacity>
          <TouchableOpacity onPress={() =>this.conductSurvey()} style={{flex:2,justifyContent:'center'}}>
            <View style={styles.outer}>
              <View style={styles.inner}>
                <Text style={styles.startButtonText}>START MY SURVEY</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={[styles.homeButtonContainer, { marginBottom: 0,marginTop:50 }, { flexDirection: 'row'}]}>
            <TouchableOpacity onPress={() =>{if(hasImage=='1')this.props.navigation.navigate('ResultSummaryScreen');else alert('No data found,you have to complete the survey at least once.');}} style={styles.smallButton}><EvilIcons name="chart" size={40} color="white" /><Text style={styles.smallButtonText}>Dashboard</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutScreen')} style={styles.smallButton}><EvilIcons name="question" size={40} color="white" /><Text style={styles.smallButtonText}>About</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ContactUsScreen')} style={styles.smallButton}><Feather name="phone" size={40} color="white" /><Text style={styles.smallButtonText}>Contact</Text></TouchableOpacity>
           <TouchableOpacity onPress={() => this.sendRequest()} style={{width:40,height:20,marginLeft:-20}}><Text style={styles.smallButtonText}>Test</Text></TouchableOpacity>
          </View>

        </View>

      </Background>
    );
  }
}


const styles = StyleSheet.create({
  startButtonText: { fontSize: 25, color: '#fff', textAlign: 'center', fontWeight: '700' },
  background: { flex: 1, width: deviceWidth, height: null, },
  homeContainer: { flex: 1, alignItems: 'center', justifyContent: 'space-between', marginTop: 0 },
  logo: { width: 300, height: 100 },
  homeButtonContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between' },
  homeButtonColumn: { width: 150, height: 150, justifyContent: 'space-between', alignContent: 'space-between' },
  homeButton: { width: 100 },
  homeSeperator: { width: 20, height: 150 },
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 95,
    width: 190, height: 190,
    alignSelf: 'center',
    backgroundColor: '#66cc99'
  },
  outer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'lightgray',
    borderRadius: 110,
    borderWidth: 1,
    width: 220, height: 220,
    alignSelf: 'center',

    shadowColor: "gray",
    shadowOffset: {
      width: 10,
      height: 8,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 16,

    // boxShadow:15px 5px 10px grey;
    backgroundColor: 'lightgray'
  },
  smallButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#66cc99',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  smallButtonText: {
    color: '#fff',
    fontSize: 15
  }
});

export default memo(Dashboard);

// //         <TouchableOpacity onPress={() =>{
//                    console.log("asdfgasdfasdfasdfasd");
//                    var snt = ["2020/02/01 08:10:00", "2020/02/01 12:10:00", "2020/02/01 18:10:00"];
//                    let paraData = {
//                                            "PlatFormVersion": "1.2",
//                                            "DeviceName": "Andoird",
//                                            "NativeAppVersion": "2.2",
//                                            "NativeBuildVersion": "3.2",
//                                            "DeviceYearClass": "4.2",
//                                            "SessionID": "5.2",
//                                            "WakeTime": "07:12",
//                                            "SleepTime": "21.2",
//                                            "NotificationCount": "2",
//                                            "NotificationEnable":true,
//                                            "ScheduledNotificationTimes": snt
//                                        };
//                         fetch('http://barabasy.eastus.cloudapp.azure.com/WebApiForEsm/SaveParaData/aaa', {
//                             method: 'POST',
//                                            headers: {
//                                              Accept: 'application/json',
//                                              'Content-Type': 'application/json',
//                                            },
//                                            body:JSON.stringify(paraData),

//                             }).then((response) => {
//                                    return response.json();
//                                  })
//                                  .then((myJson) => {
//                                    console.log(myJson);
//                                  }).catch((error)=>{
//                                    console.log(error.message);
//                                 });

//                    }
//                     }
//               style={styles.smallButton}><Text style={{fontSize:20}}>Test</Text></TouchableOpacity>


// <TouchableOpacity onPress={() => this.sendRequest()} style={styles.smallButton}><Text style={styles.smallButtonText}>Test</Text></TouchableOpacity>
