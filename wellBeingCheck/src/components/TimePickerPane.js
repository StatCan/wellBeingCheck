import React, { Component } from "react";
import { Image, Dimensions,View,ScrollView,Text,InteractionManager,Button,TouchableOpacity } from 'react-native';
let startHourY = 0;
let startMinuteY=0;
let startApmY=0;
let height=40;

export class TimePickerPane extends React.Component {
   constructor(props) {
        super(props);
        console.log(props.is24);
        if(props.is24){
           let ut=this.timeTo24(props.initialValue);
           console.log('ut.Hour:'+ut.Hour);
            let h=ut.Hour;
            let m=ut.Minute-1; if(m<0)m=59;
           this.state = {
              currentHour:h,
              currentMinute:m,
              currentApm:0
              };
               console.log('state.Hour:'+this.state.currentHour);
        }
        else{
            let ut=this.timeToApm(props.initialValue);
                    let h=ut.Hour;if(h==0)h=12;
                    h-=1;if(h<1)h=12;
                    let m=ut.Minute-1; if(m<0)m=59;
                    let apm=ut.Apm;if(apm==0)apm=1;else apm=0;
                            this.state = {
                               currentHour:h,
                               currentMinute:m,
                               currentApm:apm
                        };
        }

    }
   confirm(){
      let h=this.state.currentHour,m=parseInt(this.state.currentMinute),apm=this.state.currentApm;
       m+=1;if(m>59)m=0;
      let ut=h+':'+m;
      if(!this.props.is24)
      {
            h+=1;if(h>12)h=1;

            apm+=1;if(apm>1)apm=0;
            if(h==12){
               if(apm==0){
                   h=0;
               }
            }
            ut=this.apmToTime(h,m,apm);
      }

   this.props.onConfirm({Hour:h,Minute:m,Apm:apm,Time:ut})
   }
   cancel(){this.props.onCancel();}
   componentDidMount() {
        if(this.props.is24){
           setTimeout(()=>{
                   this.svHour.scrollTo({y:height*6, animated:false });
                   this.svMinute.scrollTo({y:height*6, animated:false });
                  // this.svApm.scrollTo({y:height*1, animated:false });
                   },500);
        }
        else{
           setTimeout(()=>{
                   this.svHour.scrollTo({y:height*6, animated:false });
                   this.svMinute.scrollTo({y:height*6, animated:false });
                   this.svApm.scrollTo({y:height*1, animated:false });
                   },500);
        }

  }
   handleScrollHourBegin(event) { startHourY = event.nativeEvent.contentOffset.y; }
   handleScrollHourEnd(event) {
   if(this.props.is24){
          let currentHour=this.state.currentHour;
          let y = event.nativeEvent.contentOffset.y;
          let dy=Math.round((startHourY-y)/height);
          currentHour-=dy;
          if(currentHour>=24)currentHour-=24;
          else if(currentHour<0)currentHour+=24;

          let yd = 6* height;
          this.setState({ currentHour: currentHour });
          this.svHour.scrollTo({ y: yd });
   }
   else{
       let currentHour=this.state.currentHour;
       let y = event.nativeEvent.contentOffset.y;
       let dy=Math.round((startHourY-y)/height);
       currentHour-=dy;
       if(currentHour>12)currentHour-=12;
       else if(currentHour<0)currentHour+=12;

       let yd = 6* height;
       this.setState({ currentHour: currentHour });
       this.svHour.scrollTo({ y: yd });
   }

        //  InteractionManager.runAfterInteractions(() => this.svHour.scrollTo({ y: yd }))
        }
   handleScrollHour(event) {
              //  InteractionManager.runAfterInteractions(() => console.log('scrolling'));
             //   InteractionManager.runAfterInteractions(() => this.sv.scrollTo({ y: index1*40 }))
   }

   handleScrollMinuteBegin(event) { startMinuteY = event.nativeEvent.contentOffset.y; }
   handleScrollMinuteEnd(event) {
          let currentMinute=this.state.currentMinute;
          let y = event.nativeEvent.contentOffset.y;
          let dy=Math.round((startMinuteY-y)/height);
          currentMinute-=dy;
          if(currentMinute>59)currentMinute=0;
          else if(currentMinute<0)currentMinute=59;

          let yd = 6* height;
          this.setState({ currentMinute: currentMinute });
          this.svMinute.scrollTo({ y: yd });
        //  InteractionManager.runAfterInteractions(() => this.svMinute.scrollTo({ y: yd }))
        }
   handleScrollMinute(event) {
              //  InteractionManager.runAfterInteractions(() => console.log('scrolling'));
             //   InteractionManager.runAfterInteractions(() => this.sv.scrollTo({ y: index1*40 }))
   }

   handleScrollApmBegin(event) { startApmY = event.nativeEvent.contentOffset.y; }
   handleScrollApmEnd(event) {
          let currentApm=this.state.currentApm;
          if(currentApm==0)currentApm=1;
          else currentApm=0;

          let yd = 1* height;
          this.setState({ currentApm: currentApm });
          this.svApm.scrollTo({ y: yd });
        //  InteractionManager.runAfterInteractions(() => this.svMinute.scrollTo({ y: yd }))
        }
   handleScrollApm(event) {
              //  InteractionManager.runAfterInteractions(() => console.log('scrolling'));
             //   InteractionManager.runAfterInteractions(() => this.sv.scrollTo({ y: index1*40 }))
   }
   apmToTime(h,m,apm){
      let hh=h;
      if(h==12){
          if(apm==0)hh=0;
      }
      else {
         if(apm==1)hh=h+12;
      }
      return hh+":"+(m < 10 ? '0' : '') + m;
   }
   timeToApm(t){
       let vs=t.split(':');
       let h=1,m=0,apm=0;
       if(vs.length=2){
           let h=vs[0];let m=vs[1];
           if(h>=12){h-=12;apm=1;}
           return {Hour:h,Minute:m,Apm:apm}
       }
   }
   timeTo24(t){
          let vs=t.split(':');
          let h=1,m=0;console.log('Hour:'+vs[0]+'  Minutes:'+vs[1]);
          if(vs.length=2){
              h=parseInt(vs[0]);
              m=parseInt(vs[1]);
               console.log('Hour111:'+h+'  Minutes111:'+m);
            }
          return {Hour:h,Minute:m}
      }
    render() {
            let hourViews=[];
            let mid=this.state.currentHour;console.log('current--------->:'+mid);
            if(this.props.is24){
                 for(let j=7;j>=0;j--){
                       let h=mid-j; console.log(h);
                       if(h<0)h+=24;
                       hourViews.push(<View key={h} style={{height:height,justifyContent:'center',alignItems:'center'}}><Text key={h} style={{fontSize:24}}>{h}</Text></View>);
                 }
                 for(let j=1;j <6; j++) {
                       let h=mid+j;if(h>=24)h-=24;

console.log(h);
                       hourViews.push(<View key={h} style={{height:height,justifyContent:'center',alignItems:'center'}}><Text key={h} style={{fontSize:24}}>{h}</Text></View>);
                 }
            }
            else{
                          for(let j=6;j>0;j--){
                             let h=mid-j;if(h<1)h+=12;
                             hourViews.push(<View key={h} style={{height:height,justifyContent:'center',alignItems:'center'}}><Text key={h} style={{fontSize:24}}>{h}</Text></View>);
                          }
                          for(let j=0;j <6; j++) {
                               let h=mid+j;if(h>12)h-=12;


                               if(h!=0)
                               hourViews.push(<View key={h} style={{height:height,justifyContent:'center',alignItems:'center'}}><Text key={h} style={{fontSize:24}}>{h}</Text></View>
                             )
                          }
            }


            let minuteViews=[];
            mid=this.state.currentMinute;
            for(let j=6;j>0;j--){
                 let m=mid-j;if(m<0)m+=60;     //console.log(m);
                 minuteViews.push(<View key={m} style={{height:height,justifyContent:'center'}}><Text key={m} style={{fontSize:24,marginLeft:14}}>{(m < 10 ? '0' : '') + m}</Text></View>);
                        }
            for(let j=0;j <6; j++) {
                 let m=mid+j;if(m>59)m-=60;    //console.log(m);
                 minuteViews.push(<View key={m} style={{height:height,justifyContent:'center'}}><Text key={m} style={{fontSize:24,marginLeft:14}}>{(m < 10 ? '0' : '') + m}</Text></View>);
                 }

            let apmViews=[];
            mid=this.state.currentApm;
            if(mid==0){
               apmViews.push(<View key={1} style={{height:height,justifyContent:'center'}}><Text key={1} style={{fontSize:24,marginLeft:10}}>PM</Text></View>);
               apmViews.push(<View key={2} style={{height:height,justifyContent:'center'}}><Text key={2} style={{fontSize:24,marginLeft:10}}>AM</Text></View>);
               apmViews.push(<View key={3} style={{height:height,justifyContent:'center'}}><Text key={3} style={{fontSize:24,marginLeft:10}}>PM</Text></View>);
               apmViews.push(<View key={4} style={{height:height,justifyContent:'center'}}><Text key={4} style={{fontSize:24,marginLeft:10}}>AM</Text></View>);
            }
            else{
               apmViews.push(<View key={1} style={{height:height,justifyContent:'center'}}><Text key={1} style={{fontSize:24,marginLeft:10}}>AM</Text></View>);
               apmViews.push(<View key={2} style={{height:height,justifyContent:'center'}}><Text key={2} style={{fontSize:24,marginLeft:10}}>PM</Text></View>);
               apmViews.push(<View key={3} style={{height:height,justifyContent:'center'}}><Text key={3} style={{fontSize:24,marginLeft:10}}>AM</Text></View>);
               apmViews.push(<View key={4} style={{height:height,justifyContent:'center'}}><Text key={4} style={{fontSize:24,marginLeft:10}}>PM</Text></View>);
            }

        return (
         <View style={{padding:16,width:300,height:300,marginTop:120,marginLeft:40,justifyContent:'space-between',backgroundColor: "white",}}>
            <Text style={{fontSize:20}}>{this.props.title}</Text>
            <View style={{flexDirection:'row', width:160,height:height*3,marginLeft:10}}>
              <Text style={{marginTop:height,fontSize:24}}>▶</Text>
              <View style={{width:75,borderColor:'gray',borderWidth:1}}>
                   <ScrollView style={{height:height, }} scrollEventThrottle='1' showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} ref={ref => { this.svHour = ref; } }
                            onScroll={this.handleScrollHour.bind(this)}
                                      onScrollBeginDrag={this.handleScrollHourBegin.bind(this)}
                                      onTouchStart={this.log}
                                      onScrollEndDrag={this.handleScrollHourEnd.bind(this)}>
                                  { hourViews }
              </ScrollView>
              </View>



              <View style={{width:75,borderColor:'gray',borderWidth:1}}>
                   <ScrollView style={{height:height, }} scrollEventThrottle='1' showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} ref={ref => { this.svMinute = ref; }}
                            onScroll={this.handleScrollMinute.bind(this)}
                                      onScrollBeginDrag={this.handleScrollMinuteBegin.bind(this)}
                                      onTouchStart={this.log}
                                      onScrollEndDrag={this.handleScrollMinuteEnd.bind(this)}>
                                  { minuteViews }
              </ScrollView>
              </View>
              {!this.props.is24 &&(

              <View style={{width:75,borderColor:'gray',borderWidth:1,height:height*2}}>
                   <ScrollView style={{height:height, }} scrollEventThrottle='1' showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} ref={ref => { this.svApm = ref; }}
                            onScroll={this.handleScrollApm.bind(this)}
                                      onScrollBeginDrag={this.handleScrollApmBegin.bind(this)}
                                      onTouchStart={this.log}
                                      onScrollEndDrag={this.handleScrollApmEnd.bind(this)}>
                                  { apmViews }
              </ScrollView>
              </View>
              )}
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                <TouchableOpacity onPress={() => {this.cancel()}}>
                   <Text style={{fontSize:20}}>{this.props.cancelLabel}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.confirm()}}>
                                   <Text style={{fontSize:20}}>{this.props.confirmLabel}</Text>
                </TouchableOpacity>
              </View>
              </View>
        )
    }
}