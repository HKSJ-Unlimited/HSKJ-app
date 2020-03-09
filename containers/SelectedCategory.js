import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import Layout from '../components/Layout';
import {get} from '../utils/APi';
import { List, ListItem } from 'native-base';

const SelectedCategory = ({navigation}) => {
  const [data, setRes] = useState([]);
  useEffect(() => {
    fetchData();
  });

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
