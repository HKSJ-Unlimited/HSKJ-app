import React from 'react';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';
import {BANNER_ID, VIDEO_TOP, VIDEO_BOTTOM} from './AD-IDs';

function HomeScreen(props) {
  let adUnit = '';
  if (props.name == 'FIXED_BOTTOM') adUnit = BANNER_ID;
  else if (props.name == 'VIDEO_TOP') adUnit = VIDEO_TOP;
  else if (props.name == 'VIDEO_BOTTOM') adUnit = VIDEO_BOTTOM;

  return (
    <BannerAd
      unitId={adUnit}
      size={props.type}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      onAdLoaded={() => {
        console.log('Advert loaded');
      }}
      onAdFailedToLoad={error => {
        console.log('Advert failed to load: ', error);
      }}
    />
  );
}

export default HomeScreen;
