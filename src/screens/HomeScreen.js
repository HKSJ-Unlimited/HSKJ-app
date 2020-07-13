import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text>hello</Text>
        <MaterialCommunityIcons name="arrow-collapse" />
      </View>
    </SafeAreaView>
  );
}
