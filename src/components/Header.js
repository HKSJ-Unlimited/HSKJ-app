import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

import ThemeContext from '../theme';
import { colors, lightTheme } from '../theme/light-theme';
import { darkTheme } from '../theme/dark-theme';
import {
  Settings,
  VideoPlay
} from '../assets/icons';

export default function Header({ navigation }) {
  const [themeMode, setThemeMode] = useContext(ThemeContext);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-evenly',
        paddingHorizontal: 10,
        backgroundColor: themeMode === 'light' ? colors.PrimaryColor : lightTheme.icon.color,
        height: 50
      }}>

      <Icon
        name="menu"
        size={35}
        onPress={() => navigation.openDrawer()}
        style={[themeMode === 'light' ? lightTheme.icon : darkTheme.icon, { flex: 0 }]}
      />
      <Image
        source={themeMode === 'light' ? require('../assets/images/HKSJ.png') : require('../assets/images/HKSJ-white.png')}
      />
    </View>
  );
}
