import React, {useContext} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';

import Header from '../components/Header';
import {lightTheme} from '../theme/light-theme';
import ThemeContext from '../theme';
import {darkTheme} from '../theme/dark-theme';
import CommonLayout from '../theme/CommonLayout';

export default function HomeScreen({navigation}) {
  const [themeMode, setThemeMode] = useContext(ThemeContext);
  return (
    <CommonLayout>
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
    </CommonLayout>
  );
}
