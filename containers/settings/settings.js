import React from 'react';
import {StyleSheet, Text, Linking} from 'react-native';
import {
  Layout as View,
  Text as T,
  ListItem,
  Card,
  List,
} from '@ui-kitten/components';

const Listata = [
  {
    name: 'About',
    id: 1,
    link:'https://github.com/HKSJ-Unlimited/HSKJ-app/blob/master/README.md'
  },
  {
    name: 'Donwload and Changelog',
    id: 2,
    route: 'download',
  },
  {
    name: 'Join the support group',
    id: 3,
    link:'https://t.me/hksjapp'
  },
  {
    name: 'Privacy Policy',
    id: 4,
    link:'https://gist.github.com/rocknegi/9199c91305b12ee48ee924c9794914d5'
  },
];
const _renderItem = (item, navigation) => (
  <ListItem
    style={style.listItem}
    onPress={item.route?() => navigation.navigate(item.route):()=>Linking.openURL(item.link)}>
    <T style={style.text}>{item.name}</T>
  </ListItem>
);
const _renderSeperator = () => <View style={style.seperator}></View>;

const Settings = ({navigation}) => {
  return (
    <View style={style.container}>
      <Text style={style.title}>HSKJ</Text>
      <List
        style={style.list}
        data={Listata}
        renderItem={({item}) => _renderItem(item, navigation)}
        ItemSeparatorComponent={_renderSeperator}
      />
    </View>
  );
};

export default Settings;

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    justifyContent:'space-evenly'
  },
  seperator: {
    margin: 10,
  },
  list: {
    paddingTop: '5%',
  },
  listItem: {
    marginHorizontal: '5%',
    height: 60,
  },
  text: {
    flex: 1,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    flex: 4,
    textAlign: 'center',
    fontSize: 100,
    fontFamily: 'Raleway-Regular',
    color: '#F0B823',
    marginTop: '30%',
  },
});
