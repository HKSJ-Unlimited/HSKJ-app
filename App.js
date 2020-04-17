import React, { useEffect } from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { ApplicationProvider} from '@ui-kitten/components';
import { mapping, light,dark } from '@eva-design/eva';
import Settings from './containers/settings/settings';
import Categories from './containers/Categories';
import VideosLayout from './components/VideosLayout';
import SelectedCategory from './containers/SelectedCategory';
import Home from './containers/Home';
import { ThemeContext } from './theme-context';
import Download_Changelog from './containers/settings/Download_Changelog';
import { RewardedAd, TestIds,RewardedAdEventType  } from '@react-native-firebase/admob';
import {REWARDS} from './ADS/AD-IDs';

const AppNavigator = createStackNavigator(
  {
    home: {screen: Home},
    categories: {screen: Categories},
    selectedCategory: {screen: SelectedCategory},
    videosLayout: {screen: VideosLayout},
    settings: {screen: Settings},
    download: {screen:Download_Changelog}
  },
  {
    initialRouteName: 'home',
    headerMode: 'none',
  },
);

const AppSwitchNavigator = createAppContainer(
  createSwitchNavigator({
    dashboard: {screen: AppNavigator},
  }),
);

const App = () => {
const themes = { light,dark };
const [theme, setTheme] = React.useState('light');
const currentTheme = themes[theme];
useEffect(()=>{
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
   
  setTimeout(()=>{
    rewarded.load();
  },15000)
},[])
const toggleTheme = () => {
  const nextTheme = theme === 'light' ? 'dark' : 'light';
  setTheme(nextTheme);
 
};
 return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
    <ApplicationProvider mapping={mapping} theme={currentTheme}>
      <AppSwitchNavigator/>
    </ApplicationProvider>
  </ThemeContext.Provider>
  );
};
export default App