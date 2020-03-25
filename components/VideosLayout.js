import React from 'react';
import {
  Dimensions,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import {Container, Button} from 'native-base';
import {BASE_URL} from 'react-native-dotenv';
import {WebView} from 'react-native-webview';
import {BannerAdSize} from '@react-native-firebase/admob';
import RNFetchBlob from 'rn-fetch-blob';
import {Text,Layout as View} from '@ui-kitten/components';

import {ThemeContext} from '../theme-context';
import TopHeader from './Header';
import GoogleADBanner from '../ADS/GoogleADBanner';

const {width: screenWidth} = Dimensions.get('window');

export default function VideosLayout({navigation}) {
  const name = BASE_URL + navigation.getParam('name');
  const themeContext = React.useContext(ThemeContext);
  const theme = themeContext.theme
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
  return (
    <View style={{flex:1}}>
      <TopHeader text="HKSJ" />
      <View style={styles.banner,{marginTop:20}}>
        <GoogleADBanner type={BannerAdSize.SMART_BANNER} name="VIDEO_TOP"/>
      </View>
      <WebView
        style={{...styles.Video,backgroundColor:theme==='light'?"#fff":'#171B20'}}
        allowsFullscreenVideo={true}
        startInLoadingState={true}
        javaScriptEnabled={true}
        mediaPlaybackRequiresUserAction={false}
        source={{
          html: `
          <video class="mdui-video-fluid mdui-center" preload="" controls="" controlsList="nodownload" height=400 width=600 >
          <source src="${name}" type="video/mp4">
        </video>
          `,
        }}
      />
      <Button full style={styles.button} onPress={() => download()}>
        <Text style={{color:'#eee'}}>Download</Text>
      </Button>
      <View style={styles.banner}>
        <GoogleADBanner type={BannerAdSize.MEDIUM_RECTANGLE} name="VIDEO_BOTTOM"/>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  Video: {
    width: Dimensions.get('window').width * 1.6,
    marginTop: 50,
  },
  banner: {
    width: screenWidth - 90,
    flex: 0,
    alignContent: 'flex-end',
    alignSelf: 'center',
  },
  button: {
    marginHorizontal: '10%',
    marginBottom:30,
    backgroundColor:'#C2913F'
  },
});
