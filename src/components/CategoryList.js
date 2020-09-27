import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableHighlight,
} from 'react-native';

import CarouselComponent from './CarouselComponent';
import ThemeContext from '../theme';
import { lightTheme } from '../theme/light-theme';
import { darkTheme } from '../theme/dark-theme';
import { allCategories } from '../api/Data';
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function CategoryList({ onPressItem }) {
  const fakeData = [...allCategories];


  const [themeMode, setThemeMode] = useContext(ThemeContext);
  const styles = StyleSheet.create({
    card: {
      backgroundColor: themeMode === 'light' ? '#F2F6FF' : '#121212',
      flex: 1,
      // flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 8,
      borderRadius: 12
    },
    image: {
      width: '100%',
      height: 200,
      resizeMode: 'contain'
    },
    body: {
      // marginLeft: 10,
      // marginRight: 10,
      // maxWidth: SCREEN_WIDTH - (80 + 10 + 20),
    },
  });

  const list = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(fakeData);

  const layoutProv = new LayoutProvider(
    (i) => {
      return list.getDataForIndex(i).type;
    },
    (type, dim) => {
      switch (type) {
        default:
          dim.width = SCREEN_WIDTH / 2;
          dim.height = 245;
          break;
      }
    },
  );

  const rowRenderer = (type, data) => {
    const { uri, name } = data;
    return (
      <TouchableHighlight style={{ backgroundColor: "#F7F7F7", elevation: 6, height: 237, borderRadius: 20, width: '100%', alignSelf: 'center' }} underlayColor="#878787" onPress={() => onPressItem(data)} key={uri}>
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
                {
                  fontWeight: 'bold',
                  fontSize: 18, top: -5
                },
              ]}>
              {name}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginBottom: 10 }}>
        <CarouselComponent />
      </View>
      <RecyclerListView
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        dataProvider={list}
        layoutProvider={layoutProv}
        rowRenderer={rowRenderer}
      />
    </View>
  );
}
