import React, {useContext} from 'react';
import {View, Text, SafeAreaView, Linking, StyleSheet} from 'react-native';

import ThemeContext from '../theme';
import {lightTheme} from '../theme/light-theme';
import {darkTheme} from '../theme/dark-theme';
import {Switch} from 'react-native-gesture-handler';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';

export default function CustomDrawerScreen(props) {
  const [themeMode, setThemeMode] = useContext(ThemeContext);

  const styles = StyleSheet.create({
    icon: {
      color: themeMode === 'light' ? '#000' : '#fff',
    },
  });

  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
    // props.navigation.closeDrawer();
  };

  return (
    <SafeAreaView
      style={
        themeMode === 'light' ? lightTheme.container : darkTheme.container
      }>
      <View style={{flex: 1}}>
        <DrawerContentScrollView {...props}>
          <View
            style={
              themeMode === 'light'
                ? lightTheme.customDrawerContent
                : darkTheme.container
            }>
            <DrawerItem
              icon={({size}) => (
                <Icon name="home" style={styles.icon} size={size} />
              )}
              label={() => (
                <Text
                  style={
                    themeMode === 'light' ? lightTheme.text : darkTheme.text
                  }>
                  Home
                </Text>
              )}
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home" style={styles.icon} size={size} />
              )}
              label={() => (
                <Text
                  style={
                    themeMode === 'light' ? lightTheme.text : darkTheme.text
                  }>
                  About
                </Text>
              )}
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home" style={styles.icon} size={size} />
              )}
              label={() => (
                <Text
                  style={
                    themeMode === 'light' ? lightTheme.text : darkTheme.text
                  }>
                  Download and changelog
                </Text>
              )}
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home" style={styles.icon} size={size} />
              )}
              label={() => (
                <Text
                  style={
                    themeMode === 'light' ? lightTheme.text : darkTheme.text
                  }>
                  Join the support group
                </Text>
              )}
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home" style={styles.icon} size={size} />
              )}
              label={() => (
                <Text
                  style={
                    themeMode === 'light' ? lightTheme.text : darkTheme.text
                  }>
                  Privacy policy
                </Text>
              )}
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home" style={styles.icon} size={size} />
              )}
              label={() => (
                <Text
                  style={
                    themeMode === 'light' ? lightTheme.text : darkTheme.text
                  }>
                  Set app lock
                </Text>
              )}
              onPress={() => {
                props.navigation.navigate('AppLock');
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
                padding: 5,
              }}>
              <Text
                style={
                  themeMode === 'light' ? lightTheme.text : darkTheme.text
                }>
                Dark Theme
              </Text>
              <Switch
                value={themeMode === 'dark'}
                onValueChange={toggleTheme}
              />
            </View>
          </View>
        </DrawerContentScrollView>
      </View>
    </SafeAreaView>
  );
}
