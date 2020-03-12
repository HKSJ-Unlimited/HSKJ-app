import React from 'react';
import { BannerAd, BannerAdSize,TestIds } from '@react-native-firebase/admob';
import { BANNER_ID } from './AD-IDs';
 
function HomeScreen(props) {
  return (
    <BannerAd
      unitId={BANNER_ID}
      size={props.type}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      onAdLoaded={() => {
        console.log('Advert loaded');
      }}
      onAdFailedToLoad={(error) => {
        console.log('Advert failed to load: ', error);
      }}
    />
  );
}

export default HomeScreen