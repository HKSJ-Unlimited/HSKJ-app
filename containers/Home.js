import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Card, CardItem, Left, Footer, FooterTab, Container} from 'native-base';
import {BannerAdSize} from '@react-native-firebase/admob';
import {Layout, Text, Toggle} from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';

import GoogleADBanner from '../ADS/GoogleADBanner';
import {HotPicks, allCategories} from '../utils/Data';
import {ThemeContext} from '../theme-context';

const {width: screenWidth} = Dimensions.get('window');
const {height: screenHeight} = Dimensions.get('window');

const MyCarousel = ({navigation}) => {
  const carouselRef = useRef(null);
  const themeContext = React.useContext(ThemeContext);
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
      <Layout>
        <Text style={{fontSize: 20, marginTop: 15}}>{item.name}</Text>
      </Layout>
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
  const [checked, setChecked] = React.useState(false);
  const [checkedText, setCheckedText] = React.useState(' ');

  const _checkData = async () => {
    try {
      const value = await AsyncStorage.getItem('theme');
      if (value !== null) {
        if(value==='Light') setChecked(false)
        else {setChecked(true); themeContext.toggleTheme();}
        setCheckedText(value);
      }
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    _checkData();
  },[]);

  useEffect(()=>{
    _storeData();
  },[checkedText])

  const onCheckedChange = isChecked => {
    setChecked(isChecked);
    themeContext.toggleTheme();
    if (isChecked) setCheckedText('Dark')
    else setCheckedText('Light')
  };

  const _storeData = async () => {
    try {
      await AsyncStorage.setItem('theme', checkedText);
    } catch (e) {
      alert(e)
    }
  };

  return (
    <Layout style={styles.container}>
      <ScrollView nestedScrollEnabled={true}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <Text style={styles.text}>HOT PICKS 🔥🔥</Text>
          <Toggle
            text={`${checkedText}`}
            checked={checked}
            onChange={onCheckedChange}
          />
        </View>
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
        <Text style={{fontSize: 20, marginLeft: 40, marginTop: 10}}>
          All Categories
        </Text>
        <FlatList
          style={{marginTop: 10}}
          data={allCategories}
          renderItem={({item}) => _renderList(item)}
          key={({item, index}) => index}
          removeClippedSubviews={true} // Unmount components when outside of window
          initialNumToRender={5} // Reduce initial render amount
          maxToRenderPerBatch={1} // Reduce number in each render batch
          maxToRenderPerBatch={100} // Increase time between renders
          windowSize={7} // Reduce the window size
          nestedScrollEnabled={true}
        />
      </ScrollView>
      <Footer style={checked ? styles.footerDark : styles.footerLight}>
        <FooterTab style={styles.banner}>
          <GoogleADBanner style={styles.banner} type={BannerAdSize.BANNER} name="FIXED_BOTTOM"/>
        </FooterTab>
      </Footer>
    </Layout>
  );
};
export default MyCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding:5,
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 160,
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
    marginTop: 5,
    fontSize: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  card: {
    width: screenWidth - 80,
    alignSelf: 'center',
  },
  banner: {
    width: screenWidth - 80,
    flex: 0,
    alignContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  footerLight:{
    backgroundColor: '#fff'
  },
  footerDark:{
    backgroundColor: '#121212'
  }
});
