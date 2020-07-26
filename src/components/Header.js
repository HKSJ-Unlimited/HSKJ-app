import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {Switch} from 'react-native-gesture-handler';

import {lightTheme} from '../theme/light-theme';
import ThemeContext from '../theme';
import {darkTheme} from '../theme/dark-theme';

export default function Header({navigation}) {
  const [themeMode, setThemeMode] = useContext(ThemeContext);
  const styles = StyleSheet.create({
    icon: {
      color: themeMode === 'light' ? '#000' : '#fff',
    },
  });
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
      }}>
      <Feather
        name="menu"
        size={30}
        onPress={() => navigation.openDrawer()}
        style={styles.icon}
      />
      <Feather name="search" size={30} style={styles.icon} />
    </View>
  );
}
