import React, {useRef} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Card, CardItem, Left} from 'native-base';

import GoogleADBanner from '../ADS/GoogleADBanner';
import {HotPicks, allCategories} from '../utils/Data';

const {width: screenWidth} = Dimensions.get('window');

const MyCarousel = ({navigation}) => {
  const carouselRef = useRef(null);

  // setInterval(()=>{
  //         carouselRef.current.snapToNext()

  // },2500)

  const _renderList = item => (
    <Card style={styles.card}>
      <CardItem
        cardBody
        button
        onPress={() => navigation.navigate('selectedCategory', {name: item.id})}
        key={item.name}>
        <Image
          source={{
            uri:
              'https://static.v2.paysites.czechcash.com/media/czechav.com/images/opengraph.jpg?190912',
          }}
          style={{height: 150, width: null, flex: 1}}
        />
      </CardItem>
      <CardItem>
        <Left>
          <Text style={{fontSize: 20}}>{item.name}</Text>
        </Left>
      </CardItem>
    </Card>
  );

  const _renderItem = ({item, index}, parallaxProps) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate('selectedCategory', {name: item.id})
        }>
        <ParallaxImage
          source={{uri: item.uri}}
          containerStyle={styles.imageContainer}
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
    <View style={styles.container}>
      <Text style={styles.text}>🔥🔥 HOT PICKS 🔥🔥</Text>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={HotPicks}
        renderItem={_renderItem}
        hasParallaxImages={true}
        loop={true}
        loopClonesPerSide={5}
        autoplay={true}
        lockScrollWhileSnapping={true}
        autoplayDelay={2000}
        autoplayInterval={5000}
      />
      <Text style={{fontSize: 20, margin: 5}}>All Categories</Text>
      <FlatList
        style={{marginTop: 10, height: '50%'}}
        data={allCategories}
        renderItem={({item}) => _renderList(item)}
        key={({item, index}) => index}
        removeClippedSubviews={true} // Unmount components when outside of window
        initialNumToRender={5} // Reduce initial render amount
        maxToRenderPerBatch={1} // Reduce number in each render batch
        maxToRenderPerBatch={100} // Increase time between renders
        windowSize={7} // Reduce the window size
      />
        <GoogleADBanner />
    </View>
  );
};
export default MyCarousel;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 130,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 10,
  },
  card: {
    width: screenWidth - 80,
    alignSelf: 'center',
  },
});
