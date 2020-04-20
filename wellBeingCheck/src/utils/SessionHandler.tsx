import React, { memo } from 'react';
import { View, Text, StyleSheet, PanResponder, Alert } from 'react-native';
import { Updates } from 'expo';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

type SessionHandlerState = {
}

class SessionHandler extends React.Component<SessionHandlerState> {
  sessionTimeOutDuration = 300000;
  _panResponder = {};
  timer = 0;

  constructor(SessionHandler) {
    super(SessionHandler)
    this.state = {
      show: false
    };
  }

  _handleSessionTimeOutRedirect = () => {
    Updates.reload();
  }

  componentDidMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => {
        console.log("onStartShouldSetPanResponder");
        clearTimeout(this.timer)
        return true
      },
      onMoveShouldSetPanResponder: () => {
        console.log("onMoveShouldSetPanResponder");
        clearTimeout(this.timer)
        return true
      },
      onStartShouldSetPanResponderCapture: () => {
        console.log("onStartShouldSetPanResponderCapture");
        clearTimeout(this.timer)
        return false
      },
      onMoveShouldSetPanResponderCapture: () => {
        console.log("onMoveShouldSetPanResponderCapture");
        clearTimeout(this.timer)
        return false
      },
      onPanResponderTerminationRequest: () => {
        console.log("onMoveShouldSetPanResponderCapture");
        clearTimeout(this.timer)
        return true
      },
      onShouldBlockNativeResponder: () => {
        console.log("onMoveShouldSetPanResponderCapture");
        clearTimeout(this.timer)
        return false
      },
    });
    this.timer = setTimeout(() =>
      Alert.alert(
        'Session expired',
        'Your session has expired due to 15 minutes of inactivity',
        [
          { text: 'OK', onPress: () => this._handleSessionTimeOutRedirect() },
        ],
        { cancelable: false }
      )
      ,
      this.sessionTimeOutDuration)
  }

  _handleSessionTimeOut() {

  }

  render() {
    return (
      <View>
        {/* {
          this.state.show ? <Text style={{fontSize:30}}>Timer Expired : 10sec</Text> : null
        } */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
});

export default memo(SessionHandler);
