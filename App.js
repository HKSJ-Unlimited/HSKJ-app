import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer';

import Login from './components/login'
import register from './components/register';
import ForgotPassword from './components/ForgotPassword';
import CustomDrawer from './CustomDrawer';
import About from './components/About';
import Schemes from './components/tabs/schemes/Schemes';

const MainNavigator = createStackNavigator({
    login: { 
      screen: Login 
    },
    register:{
      screen:register
    },
    forgetPassword:{
      screen:ForgotPassword
    }
  },{
    headerMode:'none'
  })

 const AppDrawerNavigator = createDrawerNavigator({
   about :{screen:About},
   schemes :{screen:Schemes}
 },{
  contentComponent:CustomDrawer,
  drawerLockMode: "locked-closed",
  initialRouteName: "about",
  drawerType :'slide',
  })

 const AppSwitchNavigator = createSwitchNavigator({
  home: { screen: MainNavigator },
  dashboard: { screen: AppDrawerNavigator },
});

export default createAppContainer(AppSwitchNavigator)