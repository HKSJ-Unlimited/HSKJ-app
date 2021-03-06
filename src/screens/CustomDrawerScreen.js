import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, Switch, StyleSheet, Linking } from 'react-native';
import { Appearance } from 'react-native';

import ThemeContext from '../theme';
import { lightTheme } from '../theme/light-theme';
import { darkTheme, colors } from '../theme/dark-theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonLayout from '../theme/CommonLayout';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function CustomDrawerScreen({ navigation }) {
  const [themeMode, setThemeMode] = useContext(ThemeContext);

  useEffect(() => {
    Appearance.addChangeListener(onThemeChange);

    return () => Appearance.removeChangeListener(onThemeChange);
  }, [])

  const onThemeChange = () => {
    setThemeMode(Appearance.getColorScheme());
  }

  const getTheme = (prop) => {
    switch (prop) {
      case 'icon':
        return themeMode === 'light' ? '#000' : '#fff';
      case 'text':
        return themeMode === 'light' ? lightTheme.text : darkTheme.text;
      case 'bgTint':
        return themeMode === 'light' ? '#eee' : '#424242';
      default:
        return null;
    }
  };

  const styles = StyleSheet.create({
    switch: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5,
      alignItems: 'center',
      // marginBottom: '80%',
    },
    text: {
      justifyContent: 'center',
      marginLeft: 10
    },
  });

  const list = [
    {
      name: 'Home',
      id: 0,
      route: 'MainNavigator',
      icon: 'home',
    },
    {
      name: 'About',
      id: 2,
      link: 'https://github.com/HKSJ-Unlimited/HSKJ-app/blob/master/README.md',
      icon: 'information',
    },
    {
      name: 'Download and Changelog',
      id: 3,
      route: 'download',
      icon: 'download',
    },
    {
      name: 'Join the support group',
      id: 4,
      link: 'https://t.me/hksjapp',
      icon: 'telegram',
    },
    {
      name: 'Privacy Policy',
      id: 5,
      link: 'https://gist.github.com/rocknegi/9199c91305b12ee48ee924c9794914d5',
      icon: 'file-document-outline',
    },
    {
      name: 'Set App lock',
      id: 1,
      route: 'appLock',
      icon: 'shield-lock',
    },
  ];

  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  const renderList = (item) => (
    <View style={lightTheme.flatlist} key={item.id}>
      <TouchableOpacity
        onPress={
          item.route
            ? () => navigation.navigate(item.route)
            : () => Linking.openURL(item.link)
        }
        style={{
          flexDirection: 'row',
          backgroundColor:
            navigation.state.index === item.id ? getTheme('bgTint') : null,
          height: 50,
          alignItems: 'center',
        }}>
        <Icon
          style={{
            fontSize: 25,
            flex: 0.5,
            marginLeft: 5,
            color: getTheme('icon'),
          }}
          name={item.icon}
        />
        <Text style={[getTheme('text'), styles.text]}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <CommonLayout>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <FlatList keyExtractor={(item, index) => index.toString()} data={list} renderItem={({ item }) => renderList(item)} />
        <View style={styles.switch}>
          <Text style={themeMode === 'light' ? lightTheme.text : darkTheme.text}>
            Black AF Theme
        </Text>
          <Switch thumbColor="#00E676" trackColor={{ false: '#e4e4e4', true: '#424242' }} value={themeMode === 'dark'} onValueChange={toggleTheme} />
        </View>
      </View>
    </CommonLayout>
  );
}
