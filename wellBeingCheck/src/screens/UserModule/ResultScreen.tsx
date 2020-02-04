import * as React from 'react';
import { Text, View,ScrollView, StyleSheet,TouchableOpacity,Dimensions } from 'react-native';
import TabNavigator from './TabPageScreen';
import BackButton from '../../components/BackButton';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
export default class App extends React.Component {
   constructor(props) {
        super(props);
        this.state = {
          categes: [
            { cat_id: '1', cat_name: 'Person', backgroundcolor: 'lightblue' },
            { cat_id: '2', cat_name: 'Population', backgroundcolor: 'lightgray' },
          ],
          change: false,
          isPopulation:false,loading: false,
        };
      }
      changeBackground = item => {
          let categes = JSON.parse(JSON.stringify(this.state.categes));
          for (let x = 0; x < this.state.categes.length; x++) {
            if (this.state.categes[x].cat_id == item.cat_id) {
              categes[x].backgroundcolor = 'lightblue';

            //  this.setState({categes: categes,});
            } else {
              categes[x].backgroundcolor = 'lightgray';

              //this.setState({categes: categes,});
            }
          }
             this.setState({categes: categes,});
             this.setState({isPopulation:item.cat_id=='2'});
             console.log(this.state.isPopulation);

        };
        displayTab() {
              //  this.setState({loading: true});

                if (this.state.isPopulation) {
                    return <Text> The survey is not done yet,please check resule after 6 months! </Text>;
                } else {
                      console.log('isPopulation:'+this.state.isPopulation);
                    return <TabNavigator />;

                }
            }
  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row',justifyContent: 'space-around'}}>
                             {this.state.categes.map((item, key) => (
                                       <TouchableOpacity key={key}
                                         style={{
                                           width: deviceWidth/2,
                                           height: 50,
                                           alignItems: 'center',
                                           justifyContent: 'center',
                                           backgroundColor: item.backgroundcolor,
                                         }}
                                         onPress={() => this.changeBackground(item)}>
                                         <Text style={{ color: 'black',fontSize:13 }}>

                                           {item.cat_name.toUpperCase()}
                                         </Text>
                                       </TouchableOpacity>
                                     ))}
        </View>
         {this.displayTab()}
</View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop:24,// Constants.statusBarHeight,
    backgroundColor: 'white',
  },
});
