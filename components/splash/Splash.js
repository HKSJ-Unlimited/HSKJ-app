import React, {Component} from 'react';
import {
  Animated,
  Easing,
  Dimensions,
  StatusBar,
  Text,
  ImageBackground,
} from 'react-native';
import Animation from 'lottie-react-native';
import {Layout as View} from '@ui-kitten/components';

const {width, height} = Dimensions.get('screen');

export default class App extends Component {
  state = {
    progress: new Animated.Value(0),
  };

  componentDidMount() {
    setTimeout(this.animate, 0);
    setTimeout(() => {
        this.props.navigation.navigate('dashboard');
    }, 3000);
  }

  animate = () => {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 25000, // higher the value slower the animation and vice versa
      easing: Easing.linear,
    }).start(() => {
      // Reset progress to zero after animation is done
      this.state.progress.setValue(0);
    });
  };

  render() {
    return (
      <View>
        <StatusBar backgroundColor="#171B20" />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 100,
            fontFamily:'serif',
            color: '#F0B823',
            backgroundColor: '#171B20',
          }}
        >
          HSKJ
          <Animation
            style={{
              backgroundColor: '#171B20',
              width: width,
              height: height,
              alignSelf: 'center',
            }}
            source={require('./Ball.json')}
            progress={this.state.progress}
          />
        </Text>
      </View>
    );
  }
}
