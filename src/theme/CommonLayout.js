import React, { useContext } from 'react';
import { SafeAreaView, View, StatusBar, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { lightTheme } from './light-theme';
import ThemeContext from './';
import { darkTheme } from './dark-theme';

export default function CommonLayout({ children }) {
  const [themeMode, setThemeMode] = useContext(ThemeContext);

  const getTheme = (prop) => {
    switch (prop) {
      case 'ios':
        return themeMode === 'light' ? '#fafafa' : '#424242';
      case 'android':
        return themeMode === 'light' ? 'light-content' : 'dark-content';
      default:
        return themeMode === 'light'
          ? lightTheme.container
          : darkTheme.container;
    }
  };

  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor: getTheme('ios'),
        }}
      />
      {Platform.OS === 'android' && (
        <StatusBar barStyle={getTheme('android')} />
      )}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[getTheme(), { paddingTop: 5, flex: 1 }]}>{children}</View>

      </TouchableWithoutFeedback>
    </>
  );
}
