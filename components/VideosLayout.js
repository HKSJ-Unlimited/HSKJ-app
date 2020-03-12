import React from 'react';
import {Dimensions,StyleSheet,View} from 'react-native';
import {Container} from 'native-base';
import {BASE_URL} from 'react-native-dotenv';
import {WebView} from 'react-native-webview';
import {BannerAdSize} from '@react-native-firebase/admob';

import TopHeader from './Header';
import GoogleADBanner from '../ADS/GoogleADBanner'

const {width: screenWidth} = Dimensions.get('window');

export default function VideosLayout({navigation}) {
  const name = BASE_URL + navigation.getParam('name');

  return (
    <Container>
      <TopHeader drawer="true" text="HKSJ" />
      <WebView
        style={styles.Video}
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
      <View style={styles.banner}>
      <GoogleADBanner type={BannerAdSize.MEDIUM_RECTANGLE}/>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  Video: {
    width: 1,
    width:  Dimensions.get('window').width * 1.6,
    height: (Dimensions.get('window').height * 9) / 25,
  },
  banner:{
    width:screenWidth-90,
    flex:0.5,
    alignContent:'center',
    alignSelf:'center'
  }
});
