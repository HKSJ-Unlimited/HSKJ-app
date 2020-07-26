import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Header from '../components/Header';

export default function AppLockScreen({navigation}) {
  return (
    <SafeAreaView>
      <Header navigation={navigation} />
      <Text>AppLockScreen</Text>
    </SafeAreaView>
  );
}
