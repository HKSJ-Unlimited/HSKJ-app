import React, { useContext } from 'react';
import { View, Text, FlatList, Switch, StyleSheet, Linking } from 'react-native';

import ThemeContext from '../theme';
import { lightTheme } from '../theme/light-theme';
import { darkTheme, colors } from '../theme/dark-theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonLayout from '../theme/CommonLayout';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function CustomDrawerScreen({ navigation }) {
  const [themeMode, setThemeMode] = useContext(ThemeContext);

  const getTheme = (prop) => {
    switch (prop) {
      case 'icon':
        return themeMode === 'light' ? '#000' : '#fff';
      case 'text':
        return themeMode === 'light' ? lightTheme.text : darkTheme.text;
      case 'bgTint':
        return themeMode === 'light' ? '#eee' : '#1a8a98';
      default:
        return null;
    }
  };

  const styles = StyleSheet.create({
    switch: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5,
      alignItems: 'center',
      marginBottom: '80%',
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
      link: 'HomeScreen',
      icon: 'home',
    },
    {
      name: 'About',
      id: 1,
      link: 'https://github.com/HKSJ-Unlimited/HSKJ-app/blob/master/README.md',
      icon: 'information',
    },
    {
      name: 'Donwload and Changelog',
      id: 2,
      route: 'download',
      icon: 'download',
    },
    {
      name: 'Join the support group',
      id: 3,
      link: 'https://t.me/hksjapp',
      icon: 'telegram',
    },
    {
      name: 'Privacy Policy',
      id: 4,
      link: 'https://gist.github.com/rocknegi/9199c91305b12ee48ee924c9794914d5',
      icon: 'file-document-outline',
    },
    {
      name: 'Set App lock',
      id: 5,
      route: 'lock',
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
      <FlatList data={list} renderItem={({ item }) => renderList(item)} />
      <View style={styles.switch}>
        <Text style={themeMode === 'light' ? lightTheme.text : darkTheme.text}>
          Black AF Theme
        </Text>
        <Switch thumbColor="#1a8a98" trackColor={{ false: '#e4e4e4', true: '#1a8a98' }} value={themeMode === 'dark'} onValueChange={toggleTheme} />
      </View>
    </CommonLayout>
  );
}
