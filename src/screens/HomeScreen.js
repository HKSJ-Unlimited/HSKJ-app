import React, { useContext } from 'react';
import { Text } from 'react-native';

import Header from '../components/Header';
import { lightTheme } from '../theme/light-theme';
import ThemeContext from '../theme';
import { darkTheme } from '../theme/dark-theme';
import CommonLayout from '../theme/CommonLayout';
import CategoryList from '../components/CategoryList';
import CarouselComponent from '../components/CarouselComponent';

export default function HomeScreen({ navigation }) {
  const [themeMode, setThemeMode] = useContext(ThemeContext);
  const _onCatergorySelected = (args) => {

    navigation.navigate('SelectedCategory', {
      name: args.id,
      heading: args.name,
      folderID: args.folder,
    })
  }
  return (
    <CommonLayout>
      <Header navigation={navigation} />
      <Text
        style={
          themeMode === 'light' ? lightTheme.textHeading : darkTheme.textHeading
        }>
        HOT PICKS 🔥🔥
      </Text>
      <CategoryList onPressItem={_onCatergorySelected} />
    </CommonLayout>
  );
}
