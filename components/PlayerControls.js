import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import {
  VideoSkipBack,
  VideoPrevious,
  VideoPause,
  VideoPlay,
  VideoNext,
  VideoSkipForward,
} from '../assets/icons';

const PlayerControls = ({
  playing,
  showSkip,
  onPlay,
  onPause,
  skipForwards,
  skipBackwards,
}) => {
  return (
    <View style={styles.wrapper}>
      {showSkip && (
        <TouchableOpacity style={styles.touchable} onPress={skipBackwards}>
          <VideoSkipBack />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.touchable}
        onPress={playing ? onPause : onPlay}>
        {playing ? <VideoPlay /> : <VideoPause />}
      </TouchableOpacity>

      {showSkip && (
        <TouchableOpacity style={styles.touchable} onPress={skipForwards}>
          <VideoSkipForward />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PlayerControls;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    flex: 1.2,
  },
  touchable: {
    padding: 5,
  },
  touchableDisabled: {
    opacity: 0.3,
  },
});
