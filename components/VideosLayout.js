import React from 'react';
import {
  Dimensions,
  StyleSheet,
  PermissionsAndroid,
  StatusBar,
  BackHandler,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {Button, Fab} from 'native-base';
import {BASE_URL} from 'react-native-dotenv';
import {BannerAdSize} from '@react-native-firebase/admob';
import RNFetchBlob from 'rn-fetch-blob';
import {Text, Layout as View} from '@ui-kitten/components';
import Orientation from 'react-native-orientation';
import Video from 'react-native-video';
import Icon from "react-native-vector-icons/FontAwesome";

import {FullscreenClose, FullscreenOpen} from '../assets/icons';
import TopHeader from './Header';
import GoogleADBanner from '../ADS/GoogleADBanner';
import PlayerControls from './PlayerControls';
import ProgressBar from './ProgressBar';
import Loader from '../containers/Loader';

export default class VideosLayout extends React.Component {
  state = {
    fullscreen: false,
    duration: 0,
    currentTime: 0,
    isLoading: true,
    paused: false,
    play: false,
    name: null,
    showControls: false,
    buffering: true,
    animated: new Animated.Value(0),
  };
  _onLoadHandler = data => {
    this.triggerBufferAnimation();
    this.setState(s => ({
      ...s,
      duration: data.duration,
    }));
  };

  _HandleProgress = data => {
    this.setState(s => ({
      ...s,
      currentTime: data.currentTime,
    }));
  };

  _handleOrientation = orientation => {
    orientation === 'LANDSCAPE'
      ? this.setState({fullscreen: true})
      : this.setState({fullscreen: false});
  };

  _HandleFullscreen = () => {
    Orientation.unlockAllOrientations();
    this.state.fullscreen
      ? Orientation.lockToPortrait()
      : Orientation.lockToLandscapeLeft();
  };
  _backHandler = () => {
    Orientation.unlockAllOrientations();
    Orientation.lockToPortrait();
  };
  componentDidMount() {
    const name = BASE_URL + this.props.navigation.getParam('name');
    this.setState({name},()=>console.log(this.state.name));
    BackHandler.addEventListener('hardwareBackPress', this._backHandler);
    Orientation.addOrientationListener(this._handleOrientation);
  }
  componentWillUnmount() {
    Orientation.removeOrientationListener(this._handleOrientation);
    BackHandler.removeEventListener('hardwareBackPress', this._backHandler);
  }

  renderToolbar = () => (
    <View>
      <Text> {this.props.navigation.getParam('name')} </Text>
    </View>
  );

  onPaused = playerState => {
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
  };

  onSeek = seek => {
    // alert(JSON.stringify(seek))
    this.player.seek(seek.seekTime);
  };

  onSeeking = currentTime => this.setState({currentTime});

  _showControls = () => {
    this.state.showControls
      ? this.setState({showControls: false})
      : this.setState({showControls: true}, () =>
          setTimeout(
            () => this.setState(s => ({...s, showControls: false})),
            1000,
          ),
        );
  };

  handlePlayPause = () => {
    if (this.state.play) {
      this.setState({play: false, showControls: true});
      return;
    }
    this.setState({play: true});
    setTimeout(() => this.setState(s => ({...s, showControls: false})), 2000);
  };
  skipBackward = () => {
    this.player.seek(this.state.currentTime - 15);
    this.setState({currentTime: this.state.currentTime - 15});
  };

  skipForward = () => {
    this.player.seek(this.state.currentTime + 15);
    this.setState({currentTime: this.state.currentTime + 15});
  };

  triggerBufferAnimation = () => {
    this.loopingAnimation && this.loopingAnimation.stopAnimation();
    this.loopingAnimation = Animated.loop(
      Animated.timing(this.state.animated, {
        toValue: 1,
        duration: 350,
      }),
    ).start();
  };

  _handleBuffer = meta => {
    meta.isBuffering && this.triggerBufferAnimation();

    if (this.loopingAnimation && !meta.isBuffering) {
      this.loopingAnimation.stopAnimation();
    }

    this.setState({
      buffering: meta.isBuffering,
    });
  };
  download = () => {
    this.requestStoragePermission();
  };
    requestStoragePermission =async()=> {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'HKSJ needs Storage Permission',
          message:
            'HKSJ needs access to your Device Storage uwu ' +
            'so you can fap when offline.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        let dirs = RNFetchBlob.fs.dirs.DownloadDir + '/HKSJ';
        const android = RNFetchBlob.android;
        const fileName = this.state.name.replace(BASE_URL, '');
        RNFetchBlob.config({
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            description: 'File downloaded.',
            path: dirs + `/${fileName}`,
            mediaScannable: true,
            title: fileName,
          },
        })
          .fetch('GET', this.state.name)
          .then(res => {
            android.actionViewIntent(res.path(), 'image/png');
          })
          .catch(err => {
            alert('Deer you canceled the download');
          });
      } else {
        Alert('Cum on Nibba you want to download or not?');
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const {buffering} = this.state;
    const interpolatedAnimation = this.state.animated.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    const rotateStyle = {
      transform: [{rotate: interpolatedAnimation}],
    };
    return (
      <View style={{flex: 1}}>
        <StatusBar hidden={this.state.fullscreen} />
        {!this.state.fullscreen && <TopHeader text="HKSJ" />}
        <TouchableWithoutFeedback onPress={this._showControls}>
          <View style={buffering ? styles.buffering : {flex: 1}}>
            <Video
              controls={false}
              ref={ref => {
                this.player = ref;
              }}
              onBuffer={this._handleBuffer}
              onLoad={this._onLoadHandler}
              style={
                this.state.fullscreen ? styles.fullscreenVideo : styles.video
              }
              source={{
                uri: this.state.name,
              }}
              onEnterFullscreen={this._HandleFullscreen}
              onExitFullscreen={this._HandleFullscreen}
              onProgress={this._HandleProgress}
              paused={this.state.play}
            />
            <View style={styles.videoCover}>
              {buffering && (
                <Animated.View style={rotateStyle}>
                  <Icon name="circle-o-notch" size={50} color="white" />
                </Animated.View>
              )}
            </View>
            {this.state.showControls && (
              <View style={styles.controlOverlay}>
                <TouchableOpacity
                  onPress={this._HandleFullscreen}
                  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                  style={styles.fullscreenButton}>
                  {this.state.fullscreen ? (
                    <FullscreenClose />
                  ) : (
                    <FullscreenOpen />
                  )}
                </TouchableOpacity>
                <PlayerControls
                  onPlay={this.handlePlayPause}
                  onPause={this.handlePlayPause}
                  playing={this.state.play}
                  showPreviousAndNext={false}
                  showSkip={true}
                  skipBackwards={this.skipBackward}
                  skipForwards={this.skipForward}
                  onB
                />
                <ProgressBar
                  currentTime={this.state.currentTime}
                  duration={this.state.duration > 0 ? this.state.duration : 0}
                  onSlideStart={this.handlePlayPause}
                  onSlideComplete={this.handlePlayPause}
                  onSlideCapture={this.onSeek}
                />
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>

        {!this.state.fullscreen && (
          <>
            <Button full style={styles.button} onPress={() => this.download()}>
              <Text style={{color: '#eee',fontSize:18}}>Download</Text>
            </Button>
            <View style={styles.banner}>
              <GoogleADBanner
                type={BannerAdSize.MEDIUM_RECTANGLE}
                name="VIDEO_BOTTOM"
              />
              <GoogleADBanner type={BannerAdSize.BANNER} name="VIDEO_TOP" />
            </View>
          </>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Video: {
    width: Dimensions.get('window').width * 1.6,
    // height:350
  },
  banner: {
    flex: 1,
    marginLeft: '10%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    marginHorizontal: '20%',
    marginBottom: 5,
    marginTop: 15,
    backgroundColor: '#C2913F',
    borderRadius:10
  },
  video: {
    flex: 1,
    height: Dimensions.get('window').width * (9 / 16),
    width: Dimensions.get('window').width,
    backgroundColor: 'black',
    marginTop: 10,
    borderRadius:10
  },
  fullscreenVideo: {
    flex: 1,
    height: Dimensions.get('window').width,
    width: Dimensions.get('screen').height,
    backgroundColor: 'black',
  },
  fullscreenButton: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    paddingRight: 10,
  },
  controlOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000c4',
    justifyContent: 'space-between',
  },
  videoCover: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },
  buffering: {
    backgroundColor: '#000',
    flex: 1,
  },
});
