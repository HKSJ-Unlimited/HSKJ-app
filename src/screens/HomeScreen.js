import React, {useContext} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {Animated, FlatList} from 'react-native';

import Header from '../components/Header';
import {lightTheme} from '../theme/light-theme';
import ThemeContext from '../theme';
import {darkTheme} from '../theme/dark-theme';
import CommonLayout from '../theme/CommonLayout';
import CategoryList from '../components/CategoryList';
import CarouselComponent from '../components/CarouselComponent';

export default function HomeScreen({navigation}) {
  const [themeMode, setThemeMode] = useContext(ThemeContext);

  return (
    <CommonLayout>
      <Header navigation={navigation} />
      <Text
        style={
          themeMode === 'light' ? lightTheme.textHeading : darkTheme.textHeading
        }>
        HOT PICKS 🔥🔥
      </Text>
      <CategoryList />
    </CommonLayout>
  );
}
