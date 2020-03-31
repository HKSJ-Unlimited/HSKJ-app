import React, {useEffect, useState} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation';

const ReactNativeVideo = props => {
  const {width} = Dimensions.get('window');
  const height = width * 0.5625;
  const [fullscreen, setFullscreen] = useState(true);

  const _handleOrientation = (orientation) => {
      alert(orientation)
    // orientation === 'LANDSCAPE' || orientation === 'LANDSCAPE-RIGHT'?
    // setFullscreen(true):setFullscreen(false)
  };
  useEffect(() => {
    Orientation.addOrientationListener(_handleOrientation);
    return () => {
      Orientation.removeOrientationListener(_handleOrientation);
    };
  }, []);

  const _HandleFullscreen = () => {
    // fullscreen
    // ? Orientation.unlockAllOrientations()
    // : Orientation.lockToLandscapeLeft();
  };

  return (
    <VideoPlayer
      repeat
      style={fullscreen ? styles.fullscreenVideo : styles.video}
      source={{uri: props.name}}
      paused={true}
      onEnterFullscreen={_HandleFullscreen}
    />
  );
};

export default ReactNativeVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  video: {
    height: Dimensions.get('window').width * (9 / 16),
    width: Dimensions.get('window').width,
    backgroundColor: 'black',
  },
  fullscreenVideo: {
    height: Dimensions.get('window').width+1000,
    width: Dimensions.get('window').height,
    backgroundColor: 'black',
  },
});
