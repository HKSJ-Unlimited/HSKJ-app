import React, { useState, useEffect } from 'react'
import { Text, View, FlatList } from 'react-native'

import Layout from '../components/Layout';
import { get } from '../utils/APi'
import { List, ListItem } from 'native-base';

export default function Categories({navigation}) {

    const [data, setRes] = useState([])
    useEffect(() => {
        fetchData()
    })

    const fetchData = async () => {
        const response = await get()
        setRes(response)
    }

   const _renderList = item => <List>
        <ListItem onPress={()=>navigation.navigate('videosLayout',{name:item.name})}>
        <Text>{item.name}</Text>
        </ListItem>
    </List>
    return (
        <Layout name="Categories">
            <FlatList
                data={data}
                renderItem={({ item }) => _renderList(item)}
                key= {item =>item.id}
            />
        </Layout>
    )
}

