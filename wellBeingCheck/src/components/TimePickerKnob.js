import React, { Component } from "react";
import { Image, Dimensions,View,ScrollView,Text,InteractionManager,Button,TouchableOpacity } from 'react-native';
let startHourY = 0;
let startMinuteY=0;
let startApmY=0;
let height=40;

export class TimePickerKnob extends React.Component {
   constructor(props) {
        super(props);
        let h=1,m=0,apm=0;
                        let vs=props.initialValue.split(':');  // console.log(props.initialValue);console.log(vs);
                        if(vs.length=2){
                        h=parseInt(vs[0]);m=parseInt(vs[1]);
                        if(h>12){h-=12;apm=1;}
                        }
                        this.state = {
                           currentHour:h,
                           currentMinute:m,
                           currentApm:apm
                    };
    }
   confirm(){
     let h=this.state.currentHour,m=parseInt(this.state.currentMinute),apm=this.state.currentApm;
     if(h==12){
            if(apm==0){
                h=0;
            }
         }
       let ut=this.apmToTime(h,m,apm);
       this.props.onConfirm({Hour:this.state.currentHour,Minute:this.state.currentMinute,Apm:this.state.currentApm,Time:ut});
   }
   cancel(){this.props.onCancel();}
   componentDidMount() {
    setTimeout(()=>{
        this.svHour.scrollTo({y:height*6, animated:false });
        this.svMinute.scrollTo({y:height*6, animated:false });
        this.svApm.scrollTo({y:height*1, animated:false });
        },500);
  }
   handleScrollHourBegin(event) { startHourY = event.nativeEvent.contentOffset.y; }
   handleScrollHourEnd(event) {
          let currentHour=this.state.currentHour;
          let y = event.nativeEvent.contentOffset.y;
          let dy=Math.round((startHourY-y)/height);
          currentHour-=dy;
          if(currentHour>12)currentHour-=12;
          else if(currentHour<0)currentHour+=12;

          let yd = 6* height;
          this.setState({ currentHour: currentHour });
          this.svHour.scrollTo({ y: yd });
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
          if(currentMinute>60)currentMinute-=60;
          else if(currentMinute<=0)currentMinute+=60;

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

    render() {
            let dialers=[];
            for(let j=0;j <120; j++) {
                dialers.push(
                    <Text key={j} style={{height:5,borderWidth:1,borderColor:'gray'}}></Text>
                )
            }   ////96=12*40/5   should use 96

            let hourViews=[];
            let mid=this.state.currentHour;
            for(let j=6;j>0;j--){
               let h=mid-j;if(h<1)h+=12;
               hourViews.push(<View key={h} style={{height:height,justifyContent:'center'}}><Text key={h} style={{fontSize:24}}>{h}</Text></View>);
            }
            for(let j=0;j <6; j++) {
                 let h=mid+j;if(h>12)h-=12;
                 hourViews.push(<View key={h} style={{height:height,justifyContent:'center'}}><Text key={h} style={{fontSize:24}}>{h}</Text></View>
               )
            }

            let minuteViews=[];
            mid=this.state.currentMinute;
            for(let j=6;j>0;j--){
                 let m=mid-j;if(m<0)m+=60;
                 minuteViews.push(<View key={m} style={{height:height,justifyContent:'center'}}><Text key={m} style={{fontSize:24}}>{m}</Text></View>);
                        }
            for(let j=0;j <6; j++) {
                 let m=mid+j;if(m>=60)m-=60;
                 minuteViews.push(<View key={m} style={{height:height,justifyContent:'center'}}><Text key={m} style={{fontSize:24}}>{m}</Text></View>);
                 }

            let apmViews=[];
            mid=this.state.currentApm;
            if(mid==0){
               apmViews.push(<View key={1} style={{height:height,justifyContent:'center'}}><Text key={1} style={{fontSize:24}}>PM</Text></View>);
               apmViews.push(<View key={2} style={{height:height,justifyContent:'center'}}><Text key={2} style={{fontSize:24}}>AM</Text></View>);
               apmViews.push(<View key={3} style={{height:height,justifyContent:'center'}}><Text key={3} style={{fontSize:24}}>PM</Text></View>);
            }
            else{
               apmViews.push(<View key={1} style={{height:height,justifyContent:'center'}}><Text key={1} style={{fontSize:24}}>AM</Text></View>);
               apmViews.push(<View key={2} style={{height:height,justifyContent:'center'}}><Text key={2} style={{fontSize:24}}>PM</Text></View>);
               apmViews.push(<View key={3} style={{height:height,justifyContent:'center'}}><Text key={3} style={{fontSize:24}}>AM</Text></View>);

            }
           let dialersApm=[];
            for(let j=0;j <24; j++) {   //24=3*40/5
                dialersApm.push(
                    <Text key={j} style={{height:5,borderWidth:1,borderColor:'gray'}}></Text>
                )
            }
        return (
         <View style={{padding:10,width:300,height:200,borderWidth:1,borderColor:'gray',marginTop:120,marginLeft:40,justifyContent:'space-between',backgroundColor: "white"}}>
            <Text style={{fontSize:20}}>{this.props.title}</Text>
            <View style={{flexDirection:'row', width:160,height:height,marginLeft:20}}>
              <View style={{width:75,borderColor:'gray',borderWidth:1}}>
                   <ScrollView style={{height:height, }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} ref={ref => { this.svHour = ref; }}
                            onScroll={this.handleScrollHour.bind(this)}
                                      onScrollBeginDrag={this.handleScrollHourBegin.bind(this)}
                                      onTouchStart={this.log}
                                      onScrollEndDrag={this.handleScrollHourEnd.bind(this)}>
                             <View style={{flexDirection:'row'}}>
                                 <View style={{width:50,height:height,left:0,alignItems:'center'}}>
                                  { hourViews }
                                  </View>
                                <View style={{width:25,}}>
                                   {dialers }
                                </View>
                             </View>
              </ScrollView>
              </View>



              <View style={{width:75,borderColor:'gray',borderWidth:1}}>
                   <ScrollView style={{height:height, }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} ref={ref => { this.svMinute = ref; }}
                            onScroll={this.handleScrollMinute.bind(this)}
                                      onScrollBeginDrag={this.handleScrollMinuteBegin.bind(this)}
                                      onTouchStart={this.log}
                                      onScrollEndDrag={this.handleScrollMinuteEnd.bind(this)}>
                             <View style={{flexDirection:'row'}}>
                                 <View style={{width:50,height:height,left:0,alignItems:'center'}}>
                                  { minuteViews }
                                  </View>
                                <View style={{width:25,}}>
                                   {dialers }
                                </View>
                             </View>
              </ScrollView>
              </View>


              <View style={{width:75,borderColor:'gray',borderWidth:1}}>
                   <ScrollView style={{height:height, }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} ref={ref => { this.svApm = ref; }}
                            onScroll={this.handleScrollApm.bind(this)}
                                      onScrollBeginDrag={this.handleScrollApmBegin.bind(this)}
                                      onTouchStart={this.log}
                                      onScrollEndDrag={this.handleScrollApmEnd.bind(this)}>
                             <View style={{flexDirection:'row'}}>
                                 <View style={{width:50,height:height,left:0,alignItems:'center'}}>
                                  { apmViews }
                                  </View>
                                <View style={{width:25,}}>
                                   {dialersApm }
                                </View>
                             </View>
              </ScrollView>
              </View>
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