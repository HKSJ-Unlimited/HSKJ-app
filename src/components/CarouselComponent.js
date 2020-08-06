import React, {useRef, useContext} from 'react';
import {
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
} from 'react-native';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';

import ThemeContext from '../theme';
import {lightTheme} from '../theme/light-theme';
import {darkTheme, colors} from '../theme/dark-theme';
import {HotPicks} from '../api/Data';

const {width: screenWidth} = Dimensions.get('window');

export default function CarouselComponent({onPress}) {
  console.log(HotPicks);
  const carouselRef = useRef(null);
  const [themeMode, setThemeMode] = useContext(ThemeContext);

  const styles = StyleSheet.create({
    imageContainer: {
      flex: 1,
      marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
      backgroundColor: 'white',
      borderRadius: 8,
    },
    image: {
      width: 200,
      height: 200,
      resizeMode: 'contain',
    },
    item: {
      width: screenWidth - 60,
      height: screenWidth - 160,
    },
    title: {
      textAlign: 'center',
      marginTop: 5,
      fontSize: 20,
      color:
        themeMode === 'light' ? lightTheme.text.color : colors.PrimaryColor,
    },
  });

  const _onCarouselPress = (...args) => {
    console.log(args);
  };

  const _renderItem = ({item, index}, parallaxProps) => {
    return (
      <TouchableOpacity
        key={item.name}
        style={styles.item}
        onPress={() => _onCarouselPress(item.id, item.name, item.folder)}>
        <ParallaxImage
          source={{uri: item.uri}}
          containerStyle={[styles.imageContainer, {elevation: 10}]}
          style={styles.image}
          parallaxFactor={0.4}
          showSpinner={true}
          {...parallaxProps}
        />

        <Text style={styles.title} numberOfLines={2}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <Carousel
      ref={carouselRef}
      sliderWidth={screenWidth}
      sliderHeight={screenWidth}
      itemWidth={screenWidth - 60}
      data={HotPicks}
      renderItem={_renderItem}
      hasParallaxImages={true}
      loop={true}
      loopClonesPerSide={10}
      autoplay={true}
      autoplayDelay={2000}
      autoplayInterval={5000}
    />
  );
}
