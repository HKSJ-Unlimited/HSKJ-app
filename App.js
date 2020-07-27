import React, {useState} from 'react';
import {Text, SafeAreaView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import ThemeContext from './src/theme';
import HomeScreen from './src/screens/HomeScreen';
// import CustomDrawerScreen from './src/screens/CustomDrawerScreen';
import AppLockScreen from './src/screens/AppLockScreen';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

Feather.loadFont();

// const Dashboard = createStackNavigator({});

const AppNavigator = createSwitchNavigator(
  {
    HomeScreen,
  },
  {
    initialRouteName: 'HomeScreen',
  },
);

const App = () => {
  const themeHook = useState('light');
  return <ThemeContext.Provider value={themeHook}></ThemeContext.Provider>;
};
export default createAppContainer(AppNavigator);
