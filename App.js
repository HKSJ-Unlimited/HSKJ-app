import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Feather from 'react-native-vector-icons/Feather';

Feather.loadFont();

import ThemeContext from './src/theme';
import HomeScreen from './src/screens/HomeScreen';
import CustomDrawerScreen from './src/screens/CustomDrawerScreen';
import AppLockScreen from './src/screens/AppLockScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const themeHook = useState('light');
  return (
    <ThemeContext.Provider value={themeHook}>
      <NavigationContainer>
        {/* <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator> */}
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerScreen {...props} />}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AppLock" component={AppLockScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
