import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import settings from './containers/settings';
import Categories from './containers/Categories';
import VideosLayout from './components/VideosLayout';
import SelectedCategory from './containers/SelectedCategory';
import Home from './containers/Home';

const AppNavigator = createStackNavigator(
  {
    home:{screen:Home},
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

const AppSwitchNavigator = createSwitchNavigator({
  dashboard: {screen: AppNavigator},
});

export default createAppContainer(AppSwitchNavigator);
