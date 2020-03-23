import React, {useState, useEffect} from 'react';
import { FlatList,BackHandler} from 'react-native';
import Layout from '../components/Layout';
import {get} from '../utils/APi';
import { List, ListItem } from 'native-base';
import { InterstitialAd, TestIds } from '@react-native-firebase/admob';
import { AdEventType } from '@react-native-firebase/admob';
 import {Text} from '@ui-kitten/components';

import { INTERSTITIAL } from '../ADS/AD-IDs';

const interstitial = InterstitialAd.createForAdRequest(INTERSTITIAL, {
    requestNonPersonalizedAdsOnly: true,
});

interstitial.onAdEvent((type) => {
    if (type === AdEventType.LOADED) {
      interstitial.show();
    }
  });  

const SelectedCategory = ({navigation}) => {
  const [data, setRes] = useState([]);
if(navigation.state.routeName==='selectedCategory'){
  interstitial.load();
}
  useEffect(() => {
    fetchData();
    return(()=>setRes(0))
  },[navigation]);

  const fetchData = async () => {
    const response = await get(navigation.getParam('name')+'/');
    setRes(response);
  };

  const _renderList = item => {
      const regex = /on SexyPorn|.mp4|Pornhub.com|YesPornPlease|[0-9]/gi;
      let name = item.name.replace(regex,"").slice(0,100)
      return(
        <List>
        <ListItem
          onPress={() =>
            navigation.navigate('videosLayout', {name: navigation.getParam('name')+'/'+item.name})
          }>
          <Text>{name}</Text>
        </ListItem>
      </List>
      )
  }

  return (
    <Layout name={navigation.getParam('name').slice(0,28)}>
      <FlatList
        data={data}
        renderItem={({item}) => _renderList(item)}
        key={item => item.id}
      />
    </Layout>
  );
};

export default SelectedCategory;
