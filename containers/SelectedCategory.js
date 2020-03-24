import React, {useState, useEffect} from 'react';
import { FlatList,BackHandler} from 'react-native';
import Layout from '../components/Layout';
import {get} from '../utils/APi';
// import { List, ListItem } from 'native-base';
import { InterstitialAd, TestIds } from '@react-native-firebase/admob';
import { AdEventType } from '@react-native-firebase/admob';
import {Text,List,ListItem,Layout as View} from '@ui-kitten/components';

import {ThemeContext} from '../theme-context';
import { INTERSTITIAL } from '../ADS/AD-IDs';
import TopHeader from '../components/Header';

const interstitial = InterstitialAd.createForAdRequest(INTERSTITIAL, {
    requestNonPersonalizedAdsOnly: true,
});

interstitial.onAdEvent((type) => {
    if (type === AdEventType.LOADED) {
      interstitial.show();
    }
  });  

const SelectedCategory = ({navigation}) => {
  const themeContext = React.useContext(ThemeContext);
  const [data, setRes] = useState([]);
  const [theme,setTheme] = useState('')
if(navigation.state.routeName==='selectedCategory'){
  // interstitial.load();
}
  useEffect(() => {
    setTheme(themeContext.theme)
    fetchData();
    return(()=>setRes(0))
  },[navigation]);

  const fetchData = async () => {
    const response = await get(navigation.getParam('name')+'/');
    setRes(response);
  };

  const _renderList = item => {
      const regex = /on SexyPorn|.mp4|Pornhub.com|YesPornPlease|[0-9]/gi;
      let name = item.name.replace(regex,"").slice(0,120)
      return(
        <ListItem
        style={{height:90,marginTop:5,borderRadius:6}}
          onPress={() =>
            navigation.navigate('videosLayout', {name: navigation.getParam('name')+'/'+item.name})
          }>
          <Text style={{fontSize:15,textAlign:'center',flex:1,margin:5}}>{name}</Text>
        </ListItem>
      )
  }

  const _renderSeperator = () => 
  <View
  style={
    theme==='light'?
    {
    height: 4,
    // marginTop:2,
    // backgroundColor: "#121212",
  }
  :{
    height: 4,
    marginTop:2,
    backgroundColor: "#C2913F",
  }
  }
/>
  return (
    <View style={{flex:1}}>
      <TopHeader drawer="true"  text={navigation.getParam('name').slice(0,28)}/>
     <List
     style={{backgroundColor:theme==='light'?'#F2F6FF':'#000'}}
        contentContainerStyle={{paddingBottom: 100,marginHorizontal:10,}}
        data={data}
        renderItem={({item}) => _renderList(item)}
        key={item => item.id}
        ItemSeparatorComponent={_renderSeperator}
      />
    </View>

  );
};

export default SelectedCategory;
