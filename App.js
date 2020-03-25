import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { ApplicationProvider} from '@ui-kitten/components';
import { mapping, light,dark } from '@eva-design/eva';

import settings from './containers/settings';
import Categories from './containers/Categories';
import VideosLayout from './components/VideosLayout';
import SelectedCategory from './containers/SelectedCategory';
import Home from './containers/Home';
import { ThemeContext } from './theme-context';
import Splash from './components/splash/Splash';

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
    splash : {screen:Splash},
    dashboard: {screen: AppNavigator},
  }),
);

const App = () => {
const themes = { light,dark };
const [theme, setTheme] = React.useState('light');
const currentTheme = themes[theme];

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