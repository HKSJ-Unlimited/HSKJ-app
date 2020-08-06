import React, {useContext} from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';

import {allCategories} from '../api/Data';
import CarouselComponent from './CarouselComponent';
import ThemeContext from '../theme';
import {lightTheme} from '../theme/light-theme';
import {darkTheme} from '../theme/dark-theme';

export default function CategoryList() {
  const [themeMode, setThemeMode] = useContext(ThemeContext);
  const styles = StyleSheet.create({
    card: {
      width: '100%',
      alignSelf: 'center',
      borderRadius: 6,
      marginBottom: 10,
      backgroundColor: themeMode === 'light' ? '#F2F6FF' : '#000',
    },
  });
  const _renderList = (item) => (
    <View style={styles.card}>
      <Image
        key={item.uri}
        source={{
          uri: item.uri,
        }}
        style={{
          height: 220,
          resizeMode: 'contain',
          width: '100%',
          alignSelf: 'center',
          borderRadius: 6,
          marginBottom: -25,
        }}
      />
      <Text
        style={[
          themeMode === 'light'
            ? lightTheme.textHeading
            : darkTheme.textHeading,
          {
            paddingTop: 30,
            padding: 5,
          },
        ]}>
        {item.name}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={allCategories}
      renderItem={({item}) => _renderList(item)}
      key={({item}) => item.name}
      removeClippedSubviews={true} // Unmount components when outside of window
      initialNumToRender={5} // Reduce initial render amount
      maxToRenderPerBatch={1} // Reduce number in each render batch
      maxToRenderPerBatch={100} // Increase time between renders
      windowSize={7} // Reduce the window size
      nestedScrollEnabled={true}
      ListHeaderComponent={CarouselComponent}
      ListHeaderComponentStyle={{marginBottom: 10}}
      showsVerticalScrollIndicator={false}
    />
  );
}
