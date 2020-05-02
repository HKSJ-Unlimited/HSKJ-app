import React, {useState, useEffect} from 'react';
import {FlatList, Image} from 'react-native';
import Layout from '../components/Layout';
import {get} from '../utils/APi';
import {InterstitialAd, TestIds} from '@react-native-firebase/admob';
import {AdEventType} from '@react-native-firebase/admob';
import {Text, List, ListItem, Layout as View} from '@ui-kitten/components';
import {GOOGLE_API} from 'react-native-dotenv';
 
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
 const [thumbnails, setThumbnails] = useState([]);
 
 if (navigation.state.routeName === 'selectedCategory') {
   interstitial.load();
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
     redirect: 'follow',
   };
   const responseThumb = await fetch(
     `https://www.googleapis.com/drive/v3/files?q=%27${folderID}%27+in+parents&fields=files(id,name,thumbnailLink)&key=${GOOGLE_API}`,
     requestOptions,
   );
 
   if (responseThumb) {
     const res = await responseThumb.json();
     _regex(response, res);
   }
 };
 
 
 const _regex=(response,res)=>{
 
   let newList = response;
   let newthumbnais = res.files;
   const regexExp = /.mp4|.jpg|=s220/gi;
 
   for(let i = 0 ; i < newList.length ; i++){
       newList[i].name = newList[i].name.replace(regexExp,'')
   }
   for(let i = 0 ; i < newthumbnais.length ; i++){
       newthumbnais[i].name = newthumbnais[i].name.replace(regexExp,'')
   }
   _matchThumbsToCategory(newList,newthumbnais)
}
 const _matchThumbsToCategory = (list,thumbnails) => {
   for(let i = 0 ; i < list.length ; i++){
     let obj =  thumbnails.find(e=>e.name===list[i].name);
     if(obj){
      list[i].link = obj.thumbnailLink.replace('=s220','=s720')
     }
     else{
       list[i].link = 'https://image.shutterstock.com/image-photo/grunge-black-background-texture-space-260nw-373662322.jpg'
     }
  }
  alert(JSON.stringify(list,undefined,3))
   setRes(list);
 };
 
 const _renderList = item => {
   const regex = /on SexyPorn|.mp4|Pornhub.com|YesPornPlease|Jetload.NET|[0-9]/gi;
   let name = item.name
     .replace(regex, '')
     .slice(0, 100)
     .toLowerCase();
   return (
     <ListItem
       style={{
         height: 290,
         marginTop: 5,
         borderRadius: 6,
         flex: 1,
         flexDirection: 'column',
       }}
       onPress={() =>
         navigation.navigate('videosLayout', {
           name: navigation.getParam('name') + '/' + item.name + '.mp4',
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
       <Image
         style={{
           height: 200,
           width: '100%',
           marginTop: 10,
           resizeMode: 'cover',
           alignSelf: 'center',
         }}
         source={{uri: item.link}}
       />
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
     {data.length > 1 ? (
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
 
