import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer';

import Login from './containers/login'
import register from './containers/register';
import ForgotPassword from './containers/ForgotPassword';
import CustomDrawer from './containers/CustomDrawer';
import About from './containers/About';
import Categories from './containers/Categories';
import VideosLayout from './components/VideosLayout';
import SelectedCategory from './containers/SelectedCategory';


 const AppDrawerNavigator = createDrawerNavigator({
   about :{screen:About},
   categories:{screen:Categories},
   selectedCategory:{screen:SelectedCategory},
   videosLayout:{screen:VideosLayout}
 },{
  contentComponent:CustomDrawer,
  drawerLockMode: "locked-closed",
  initialRouteName: "about",
  drawerType :'slide',
  })

 const AppSwitchNavigator = createSwitchNavigator({
  dashboard: { screen: AppDrawerNavigator },
});

export default createAppContainer(AppSwitchNavigator)