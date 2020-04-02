import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  PermissionsAndroid,
  StatusBar,
  BackHandler
} from 'react-native';
import {Button} from 'native-base';
import {BASE_URL} from 'react-native-dotenv';
import {BannerAdSize} from '@react-native-firebase/admob';
import RNFetchBlob from 'rn-fetch-blob';
import {Text, Layout as View} from '@ui-kitten/components';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation';

import {ThemeContext} from '../theme-context';
import TopHeader from './Header';
import GoogleADBanner from '../ADS/GoogleADBanner';

const {width: screenWidth} = Dimensions.get('window');

export default function VideosLayout({navigation}) {
  const name = BASE_URL + navigation.getParam('name');
  const {width} = Dimensions.get('window');
  const height = width * 0.5625;
  const [fullscreen, setFullscreen] = useState(false);
  const themeContext = React.useContext(ThemeContext);
  const videoRef = React.createRef();
  const [state,setState] = useState({
    currentTime:0,
    duration:0
  })

  const _handleOrientation = orientation => {
    orientation === 'LANDSCAPE' ? setFullscreen(true) : setFullscreen(false);
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress",_backHandler)
    Orientation.addOrientationListener(_handleOrientation);
    return () => {
      Orientation.removeOrientationListener(_handleOrientation);
      BackHandler.removeEventListener("hardwareBackPress",_backHandler)
    };
  }, []);
  const _backHandler = ()=>{
    Orientation.unlockAllOrientations();
    Orientation.lockToPortrait()
  }
  const _HandleFullscreen = () => {
    Orientation.unlockAllOrientations();
    fullscreen
      ? Orientation.lockToPortrait()
      : Orientation.lockToLandscapeLeft();
  };
  async function requestStoragePermission() {
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
        const fileName = name.replace(BASE_URL, '');
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
          .fetch('GET', name)
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
  const download = () => {
    requestStoragePermission();
  };
const _onLoadHandler = (data)=>{
  setState(s => ({
    ...s,
    duration: data.duration,
    currentTime: data.currentTime,
  }));
}
const _HandleProgress = (data)=>{
  setState(s => ({
    ...s,
    currentTime: data.currentTime,
  }));
}

  const VideoView = () => (
    <VideoPlayer
      controls={false}
      // onLoad={_onLoadHandler}
      // ref={videoRef}
      style={fullscreen ? styles.fullscreenVideo : styles.video}
      source={{uri: name}}
      paused={true}
      onEnterFullscreen={_HandleFullscreen}
      onExitFullscreen={_HandleFullscreen}
      // onProgress={_HandleProgress}
      disableBack
      disableVolume
      // onEnd={()=>videoRef.current.seek(0)}
    />
  );

  return (
    <View style={{flex: 1}}>
      <StatusBar hidden={fullscreen}/>
      {!fullscreen && <TopHeader text="HKSJ" />}
      <VideoView />
      {!fullscreen && (
        <>
          {/* <View style={(styles.banner, { marginLeft:'5%',marginTop: 5})}>
            <GoogleADBanner type={BannerAdSize.BANNER} name="VIDEO_TOP" />
          </View> */}
          <Button full style={styles.button} onPress={() => download()}>
            <Text style={{color: '#eee'}}>Download</Text>
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

const styles = StyleSheet.create({
  Video: {
    width: Dimensions.get('window').width * 1.6,
    // height:350
  },
  banner: {
    flex: 1,
    marginLeft:'10%',
    flexDirection:'column',
    justifyContent:'space-between'
  },
  button: {
    marginHorizontal: '10%',
    marginBottom: 5,
    marginTop:5,
    backgroundColor: '#C2913F',
  },
  video: {
    flex:1,
    height: Dimensions.get('window').width * (9 / 16),
    width: Dimensions.get('window').width,
    backgroundColor: 'black',
    marginTop:10,
    // backgroundColor:'black'
  },
  fullscreenVideo: {
    flex:1,
    height: Dimensions.get('window').width,
    width: Dimensions.get('screen').height,
    backgroundColor: 'black',
  },
});
