import React from 'react';
import {
  createAppContainer
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'

import Login from './components/login'
import register from './components/register';
import ForgotPassword from './components/ForgotPassword';

const App = createStackNavigator({
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

export default createAppContainer(App)