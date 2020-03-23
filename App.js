import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { mapping, dark as darkTheme } from '@eva-design/eva';

import { default as appTheme } from './custom-theme.json';
import settings from './containers/settings';
import Categories from './containers/Categories';
import VideosLayout from './components/VideosLayout';
import SelectedCategory from './containers/SelectedCategory';
import Home from './containers/Home';

const AppNavigator = createStackNavigator(
  {
    home: {screen: Home},
    categories: {screen: Categories},
    selectedCategory: {screen: SelectedCategory},
    videosLayout: {screen: VideosLayout},
    settings: {screen: settings},
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

const theme = { ...darkTheme, ...appTheme };

const App = () => {
  return (
    <ApplicationProvider mapping={mapping} theme={theme}>
      <AppSwitchNavigator />
    </ApplicationProvider>
  );
};
export default App