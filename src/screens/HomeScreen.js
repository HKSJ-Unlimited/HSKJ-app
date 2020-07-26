import React, {useContext} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';

import Header from '../components/Header';
import {lightTheme} from '../theme/light-theme';
import ThemeContext from '../theme';
import {darkTheme} from '../theme/dark-theme';

export default function HomeScreen({navigation}) {
  const [themeMode, setThemeMode] = useContext(ThemeContext);
  return (
    <SafeAreaView
      style={
        themeMode === 'light' ? lightTheme.container : darkTheme.container
      }>
      <Header navigation={navigation} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 130,
            color: themeMode === 'light' ? '#000' : '#fff',
          }}>
          HKSJ
        </Text>
      </View>
    </SafeAreaView>
  );
}
