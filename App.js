import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ThemeContext from './src/theme';
import HomeScreen from './src/screens/HomeScreen';
import CustomDrawerScreen from './src/screens/CustomDrawerScreen';
import AppLockScreen from './src/screens/AppLockScreen';
import SplashScreen from './src/screens/SplashScreen';
import { createDrawerNavigator } from 'react-navigation-drawer';
import SelectedCategory from './src/screens/SelectedCategory';
import VideoPlayer from './src/components/VideoPlayer';

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
    MainNavigator
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
    SplashScreen,
    Dashboard,
  },
  {
    initialRouteName: 'SplashScreen',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default App = () => {
  const themeHook = useState('light');
  return (
    <ThemeContext.Provider value={themeHook}>
      <AppContainer />
    </ThemeContext.Provider>
  );
};
