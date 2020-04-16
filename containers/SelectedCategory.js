import React, {useState, useEffect} from 'react';
import {FlatList, Image} from 'react-native';
import Layout from '../components/Layout';
import {get} from '../utils/APi';
import {InterstitialAd, TestIds} from '@react-native-firebase/admob';
import {AdEventType} from '@react-native-firebase/admob';
import {Text, List, ListItem, Layout as View} from '@ui-kitten/components';
import { GOOGLE_API } from 'react-native-dotenv'

import {ThemeContext} from '../theme-context';
import {INTERSTITIAL} from '../ADS/AD-IDs';
import TopHeader from '../components/Header';
import Loader from './Loader';

const interstitial = InterstitialAd.createForAdRequest(INTERSTITIAL, {
  requestNonPersonalizedAdsOnly: true,
});


const SelectedCategory = ({navigation}) => {
  const themeContext = React.useContext(ThemeContext);
  const [data, setRes] = useState([]);
  const [theme, setTheme] = useState('');
  const [thumbnails,setThumbnails] = useState([])
  
  if (navigation.state.routeName === 'selectedCategory') {
    // interstitial.load();
  }

  useEffect(() => {
    setTheme(themeContext.theme);
    fetchData();
    interstitial.onAdEvent(type => {
      if (type === AdEventType.LOADED) {
        interstitial.show();
      }
    });
  }, []);

  const fetchData = async () => {
    const response = await get(navigation.getParam('name') + '/');
    const folderID = await navigation.getParam('folderID');

    var requestOptions = {
      method: 'GET',
      headers: {},
      redirect: 'follow'
    };
  const responseThumb = await fetch(`https://www.googleapis.com/drive/v3/files?q=%27${folderID}%27+in+parents&fields=files(id,name,thumbnailLink)&key=${GOOGLE_API}`, requestOptions)
  
  if(responseThumb){
  const res = await responseThumb.json()
  //  setThumbnails(res)
   _matchThumbsToCategory(response,res)
  }
  };

  const _matchThumbsToCategory = (response,res) =>{
    let names = [];
    let thumbs = res.files;
    let files = response;


data.forEach(e => {
  const regex = /.mp4|=s220/gi;
  let name = e.name.replace(regex, "");
  names.push(name);
});

thumbs.forEach(e => {
    const regex = /.jpg/gi;
    let name = e.name.replace(regex, "");
    e.name=name
  });

for(let i = 0 ; i < thumbs.length;i++){
    let obj = files.find(e=>e.name===thumbs[i].name+'.mp4')
if(obj!==undefined){
    const regex = /=s220/gi;
    const newThumbLink = obj.size=thumbs[i].thumbnailLink.replace(regex, "=s720");
    files[i].size=newThumbLink
}
else{
  files[i].size = 'https://image.shutterstock.com/image-photo/grunge-black-background-texture-space-260nw-373662322.jpg'
}
}
setRes(files)

  }

  const _renderList = item => {
    const regex = /on SexyPorn|.mp4|Pornhub.com|YesPornPlease|[0-9]/gi;
    let name = item.name.replace(regex, '').slice(0, 100).toLowerCase();
    return (
      <ListItem
        style={{height: 290, marginTop: 5, borderRadius: 6,flex:1,flexDirection:'column'}}
        onPress={() =>
          navigation.navigate('videosLayout', {
            name: navigation.getParam('name') + '/' + item.name,
          })
        }>
        <Text
          style={{
            fontSize: 15,
            textAlign: 'center',
            margin: 5,
            fontFamily: 'Lato-Regular',
          }}>
          {name}
        </Text>
       {/* { thumbnails.length>0 ? ( */}
       <Image style={{height:200,width:'100%',marginTop:10,resizeMode:'cover',alignSelf:'center'}} source={{uri:item.size}}/>
      {/* //  ): ( <Loader />)} */}
      </ListItem>
    );
  };

  const _renderSeperator = () => (
    <View
      style={
        theme === 'light'
          ? {
              height: 4,
              // marginTop:2,
              // backgroundColor: "#121212",
            }
          : {
              height: 2,
              marginTop: 2,
              backgroundColor: '#F0B823',
            }
      }
    />
  );
  return (
    <View style={{flex: 1}}>
      <TopHeader text={navigation.getParam('heading').slice(0, 28)} />
      {data.length>1 ? (
        <List
          style={{backgroundColor: theme === 'light' ? '#F2F6FF' : '#000'}}
          contentContainerStyle={{paddingBottom: 100, marginHorizontal: 10}}
          data={data}
          renderItem={({item}) => _renderList(item)}
          key={item => item.id}
          ItemSeparatorComponent={_renderSeperator}
        />
      ) : (
        <Loader />
      )}
    </View>
  );
};

export default SelectedCategory;
