import React, {useContext} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';

import Header from '../components/Header';
import {lightTheme} from '../theme/light-theme';
import ThemeContext from '../theme';
import {darkTheme} from '../theme/dark-theme';
import CommonLayout from '../theme/CommonLayout';
import Carousel from '../components/Carousel';

export default function HomeScreen({navigation}) {
  const [themeMode, setThemeMode] = useContext(ThemeContext);

  const _onCarouselPress = (...args) => {
    console.log(args);
  };

  return (
    <CommonLayout>
      <Header navigation={navigation} />
      <Carousel onPress={_onCarouselPress} />
    </CommonLayout>
  );
}
