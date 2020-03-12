import React from 'react';
import {Text,Dimensions,StyleSheet,View,PermissionsAndroid} from 'react-native';
import {Container, Button} from 'native-base';
import {BASE_URL} from 'react-native-dotenv';
import {WebView} from 'react-native-webview';
import {BannerAdSize} from '@react-native-firebase/admob';
import RNFetchBlob from 'rn-fetch-blob'
import TopHeader from './Header';
import GoogleADBanner from '../ADS/GoogleADBanner'

const {width: screenWidth} = Dimensions.get('window');

export default function VideosLayout({navigation}) {
  const name = BASE_URL + navigation.getParam('name');

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
        let dirs = RNFetchBlob.fs.dirs.DownloadDir+"/HKSJ";
        const android = RNFetchBlob.android;
        const fileName = name.replace(BASE_URL,'');
        RNFetchBlob
        .config({
            addAndroidDownloads : {
                useDownloadManager : true, 
                notification : true,
                description : 'File downloaded.',
                path: dirs + `/${fileName}` ,
                mediaScannable : true,
                title:fileName
            }
        })
        .fetch('GET', name)
        .then((res) => {
          android.actionViewIntent(res.path(), 'image/png')
        })  .catch((err) => {
          alert('Deer you canceled the download')
        })
       
      } else {
        Alert("Cum on Nibba you want to download or not?");
      }
    } catch (err) {
      console.log(err);
    }
  }
  const onPress = () => {
    requestStoragePermission()
  };
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
      {/* <Button onPress={()=>onPress()}>
        <Text>p</Text>
      </Button> */}
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
