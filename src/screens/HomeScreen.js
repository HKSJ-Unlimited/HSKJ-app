import React from 'react';

import Header from '../components/Header';
import CommonLayout from '../theme/CommonLayout';
import BottomNavigationBar from '../components/BottomNavigationBar';

export default function HomeScreen({ navigation }) {

  return (
    <>
      <Header navigation={navigation} />
      <BottomNavigationBar />

    </>
  );
}
