import React, {Component} from 'react';
import {Image, View} from 'react-native';

interface props {
    source: { uri: string }
  }
  type ScreenState={
    width: number,height:number
  }
export default class FullWidthImage extends Component<props,ScreenState> {
    constructor(props) {
        super(props);
     
        this.state = {
            width: 0,
            height: 0
        };
    }

    _onLayout(event) {
        const containerWidth = event.nativeEvent.layout.width;

       if (typeof this.props.source === 'object') {
            Image.getSize(this.props.source.uri, (width, height) => {
                this.setState({
                    width: containerWidth,
                    height: containerWidth * height / width
                });
            },null);
        }
    }

    render() {
        return (
            <View onLayout={this._onLayout.bind(this)}>
                <Image
                    source={this.props.source}
                    style={{
                        width: this.state.width,
                        height: this.state.height
                    }} />
            </View>
        );
    }
}
