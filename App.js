import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import ThemeContext from './src/theme';
import HomeScreen from './src/screens/HomeScreen';
import CustomDrawerScreen from './src/screens/CustomDrawerScreen';
import AppLockScreen from './src/screens/AppLockScreen';
import SplashScreen from './src/screens/SplashScreen';
import {createDrawerNavigator} from 'react-navigation-drawer';

MaterialCommunityIcons.loadFont();

const Dashboard = createDrawerNavigator(
  {
    HomeScreen,
  },
  {
    contentOptions: {
      activeTintColor: '#fd6d24',
      backgroundTintColor: '#fdbf83',
    },
    initialRouteName: 'HomeScreen',
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
