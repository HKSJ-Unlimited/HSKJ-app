import React, { useState, useEffect } from 'react';
import {
  Alert,
  BackHandler,
  ToastAndroid,
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { RewardedAd, TestIds, RewardedAdEventType } from '@react-native-firebase/admob';
import PINCode from '@haskkor/react-native-pincode'
import { hasUserSetPinCode } from '@haskkor/react-native-pincode'

import { REWARDS } from './src/api/Data';
import ThemeContext from './src/theme';
import HomeScreen from './src/screens/HomeScreen';
import CustomDrawerScreen from './src/screens/CustomDrawerScreen';
import AppLockScreen from './src/screens/AppLockScreen';
import { createDrawerNavigator } from 'react-navigation-drawer';
import SelectedCategory from './src/screens/SelectedCategory';
import VideoPlayer from './src/components/VideoPlayer';
import { Appearance } from 'react-native';
import DownloadChangelog from './src/screens/DownloadChangelog';

MaterialCommunityIcons.loadFont();
Feather.loadFont();

const MainNavigator = createStackNavigator({
  HomeScreen,
  SelectedCategory,
  VideoScreen: VideoPlayer
}, {
  initialRouteName: 'HomeScreen',
  headerMode: 'none',
  mode: 'modal',
  keyboardHandlingEnabled: true
})

const Dashboard = createDrawerNavigator(
  {
    MainNavigator,
    appLock: AppLockScreen,
    download: DownloadChangelog
  },
  {
    contentOptions: {
      activeTintColor: '#fd6d24',
      backgroundTintColor: '#fdbf83',
    },
    initialRouteName: 'MainNavigator',
    drawerType: 'slide',
    contentComponent: (props) => <CustomDrawerScreen {...props} />,
  },
);

const AppNavigator = createSwitchNavigator(
  {
    Dashboard
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default App = () => {
  const [auth, setAuth] = useState(false);

  const checkUserPIN = async () => {
    try {
      const auth = await hasUserSetPinCode()
      setAuth(auth)
    } catch {
      console.log('here')
      ToastAndroid.showWithGravity('Who dis?', ToastAndroid.LONG, ToastAndroid.CENTER)
      BackHandler.exitApp()
    }

  }
  const giveAuth = () => {
    setAuth(false)
  }
  useEffect(() => {
    checkUserPIN();

    const rewarded = RewardedAd.createForAdRequest(REWARDS, {
      requestNonPersonalizedAdsOnly: false,
    });
    rewarded.onAdEvent((type, error, reward) => {
      if (type === RewardedAdEventType.LOADED) {
        rewarded.show();
      }
      if (type === RewardedAdEventType.EARNED_REWARD) {
        console.log('User earned reward of ', reward);
      }

    });

    setTimeout(() => {
      // rewarded.load();
    }, 5000);


  }, []);

  const themeHook = useState(Appearance.getColorScheme());
  return (
    !auth ?
      <ThemeContext.Provider value={themeHook}>
        <AppContainer />

      </ThemeContext.Provider> :
      <PINCode status={'enter'}
        finishProcess={giveAuth}
        disableLockScreen={true}
      />
  );
};
