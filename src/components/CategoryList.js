import React, {useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

import CarouselComponent from './CarouselComponent';
import ThemeContext from '../theme';
import {lightTheme} from '../theme/light-theme';
import {darkTheme} from '../theme/dark-theme';
import {allCategories} from '../api/Data';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function CategoryList() {
  const fakeData = [...allCategories];

  fakeData.forEach((e) => {
    e['type'] = 'NORMAL';
  });

  const [themeMode, setThemeMode] = useContext(ThemeContext);
  const styles = StyleSheet.create({
    card: {
      backgroundColor: themeMode === 'light' ? '#F2F6FF' : '#000',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    image: {
      height: 120,
      width: 180,
      resizeMode: 'contain',
    },
    body: {
      flex: 1,
      marginLeft: 10,
      marginRight: 10,
      maxWidth: SCREEN_WIDTH - (80 + 10 + 20),
    },
  });

  const list = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(fakeData);

  const layoutProv = new LayoutProvider(
    (i) => {
      return list.getDataForIndex(i).type;
    },
    (type, dim) => {
      switch (type) {
        case 'NORMAL':
          dim.width = SCREEN_WIDTH;
          dim.height = 100;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
          break;
      }
    },
  );

  const rowRenderer = (type, data) => {
    const {uri, name} = data;
    return (
      <View style={styles.card}>
        <Image
          source={{
            uri: uri,
          }}
          style={styles.image}
        />
        <View style={styles.body}>
          <Text
            style={[
              themeMode === 'light'
                ? lightTheme.textHeading
                : darkTheme.textHeading,
              {fontSize: 16, flexWrap: 'wrap', flex: 0},
            ]}>
            {name}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={{marginBottom: 10}}>
        <CarouselComponent />
      </View>
      <RecyclerListView
        scrollViewProps={{showsVerticalScrollIndicator: false}}
        dataProvider={list}
        layoutProvider={layoutProv}
        rowRenderer={rowRenderer}
      />
    </View>
  );
}
