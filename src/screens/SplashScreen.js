import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Dashboard');
    }, 1500);
  }, []);
  return (
    <View>
      <Text>Welcome to hksj</Text>
    </View>
  );
}
