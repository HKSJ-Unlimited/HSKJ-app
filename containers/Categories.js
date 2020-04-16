import React, {useState, useEffect} from 'react';
import {Text, FlatList} from 'react-native';

import Layout from '../components/Layout';
import {get} from '../utils/APi';
import {List, ListItem} from 'native-base';
import {CategoriesStyles} from './Styles';

export default function Categories({navigation}) {
  const [data, setRes] = useState([]);
  useEffect(() => {
    fetchData();
  }, [navigation]);

  const fetchData = async () => {
    const response = await get();
    setRes(response);
    console.log(data);
  };

  const _renderList = item => (
    <List>
      <ListItem
        onPress={() =>
          navigation.navigate('selectedCategory', {name: item.name})
        }>
        <Text style={CategoriesStyles.text}>{item.name}</Text>
      </ListItem>
    </List>
  );
  return (
    <Layout name="Categories">
      <FlatList
        data={data}
        renderItem={({item}) => _renderList(item)}
        key={item => item.id}
      />
    </Layout>
  );
}
