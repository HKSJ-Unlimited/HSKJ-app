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
  StatusBar,
  Text as T,
} from 'react-native';
import {Card, CardItem, Footer, FooterTab, Header, Icon} from 'native-base';
import {BannerAdSize} from '@react-native-firebase/admob';
import {Layout, Text, Toggle} from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';

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
        onPress={() =>
          navigation.navigate('selectedCategory', {
            name: item.id,
            heading: item.name,
            folderID: item.folder,
          })
        }
        key={item.folder}>
        <Image
          key={item.uri}
          source={{
            uri: item.uri,
          }}
          style={{height: 200, width: '100%', flex: 1, resizeMode: 'cover'}}
        />
      </CardItem>
      <Layout>
        <Text style={{fontSize: 20, margin: 10, fontFamily: 'Lato-Regular'}}>
          {item.name}
        </Text>
      </Layout>
    </Card>
  );

  const _renderItem = ({item, index}, parallaxProps) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate('selectedCategory', {
            name: item.id,
            heading: item.name,
            folderID: item.folder,
          })
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
  const [checked, setChecked] = React.useState(true);
  const [checkedText, setCheckedText] = React.useState('dark');

  const _checkData = async () => {
    try {
      const value = await AsyncStorage.getItem('theme');
      if (value !== null) {
        if (value === 'Light') setChecked(false);
        else {
          setChecked(true);
          themeContext.toggleTheme();
        }
        setCheckedText(value);
        setTimeout(() => {
          SplashScreen.hide();
        }, 500);
      } else {
        themeContext.toggleTheme();
        SplashScreen.hide();
      }
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    _checkData();
  }, []);

  useEffect(() => {
    _storeData();
  }, [checkedText]);

  const onCheckedChange = isChecked => {
    setChecked(isChecked);
    themeContext.toggleTheme();
    if (isChecked) setCheckedText('Dark');
    else setCheckedText('Light');
  };

  const _storeData = async () => {
    try {
      await AsyncStorage.setItem('theme', checkedText);
    } catch (e) {
      alert(e);
    }
  };

  const headerComponent = () => (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <Text style={styles.text}>HOT PICKS 🔥🔥</Text>
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
      <Text
        style={{
          fontSize: 20,
          marginLeft: 40,
          marginTop: 10,
          fontFamily: 'Lato-Regular',
        }}>
        All Categories
      </Text>
    </>
  );
  return (
    <Layout style={styles.container}>
      {/* <ScrollView nestedScrollEnabled={true}> */}
      <Header transparent androidStatusBarColor={checked ? '#000' : '#8F9BB3'}>
        <Icon
          name="settings-outline"
          type="MaterialCommunityIcons"
          style={!checked ? styles.iconLight : styles.iconDark}
          onPress={() => navigation.navigate('settings')}
        />
        <T style={!checked ? styles.headerLight : styles.headerDark}>HKSJ</T>
        <Toggle
          style={{flex: 1, justifyContent: 'flex-end'}}
          text={`${checkedText}`}
          checked={checked}
          onChange={onCheckedChange}
        />
      </Header>
      <FlatList
        style={{marginTop: 10}}
        data={allCategories}
        renderItem={({item}) => _renderList(item)}
        key={({item}) => item.folder}
        removeClippedSubviews={true} // Unmount components when outside of window
        initialNumToRender={5} // Reduce initial render amount
        maxToRenderPerBatch={1} // Reduce number in each render batch
        maxToRenderPerBatch={100} // Increase time between renders
        windowSize={7} // Reduce the window size
        nestedScrollEnabled={true}
        ListHeaderComponent={headerComponent}
      />
      {/* </ScrollView> */}
      <Footer
        style={checked ? {backgroundColor: '#000'} : {backgroundColor: '#fff'}}>
        <FooterTab style={checked ? styles.footerDark : styles.footerLight}>
          <GoogleADBanner type={BannerAdSize.BANNER} name="FIXED_BOTTOM" />
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
    fontFamily: 'Lato-Regular',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
    fontFamily: 'Lato-Regular',
  },
  card: {
    width: screenWidth - 40,
    alignSelf: 'center',
  },
  banner: {
    width: screenWidth,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  footerLight: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  footerDark: {
    backgroundColor: '#121212',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  headerLight: {
    color: '#000',
    fontSize: 30,
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    paddingRight: '5%',
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
  },
  headerDark: {
    color: '#C2913F',
    fontSize: 30,
    fontWeight: 'bold',
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    paddingRight: '5%',
    fontFamily: 'Raleway-Regular',
  },
  iconLight: {
    color: '#000',
    fontSize: 30,
    flex: 1,
    alignSelf: 'center',
    textAlign: 'justify',
  },
  iconDark: {
    color: '#C2913F',
    fontSize: 30,
    flex: 1,
    alignSelf: 'center',
    textAlign: 'justify',
  },
});
