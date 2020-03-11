import React from 'react';
import { BannerAd, BannerAdSize,TestIds } from '@react-native-firebase/admob';
import { BANNER_ID } from './AD-IDs';
 
function HomeScreen() {
  return (
    <BannerAd
      unitId={BANNER_ID}
      size={BannerAdSize.FULL_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      onAdLoaded={() => {
        console.log('Advert loaded');
      }}
      onAdFailedToLoad={(error) => {
        console.error('Advert failed to load: ', error);
      }}
    />
  );
}

export default HomeScreen