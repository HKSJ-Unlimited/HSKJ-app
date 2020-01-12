import React, { useState, useEffect } from 'react'
import { Text, View, FlatList } from 'react-native'

import Layout from '../components/Layout';
import { get } from '../utils/APi'
import { List, ListItem } from 'native-base';

export default function Categories({navigation}) {

    const [data, setRes] = useState([])
    const fetchData = async () => {
        const response = await get('folder')
        let filter = response.folders.filter(e => e.fld_id != "43517")
        setRes(filter)
    }
    useEffect(() => {
        fetchData('response')
    }, ['response'])

   const _renderList = item => <List>
        <ListItem onPress={()=>navigation.navigate('videosLayout',{name:item.name,id:item.fld_id})}>
        <Text>{item.name}</Text>
        </ListItem>
    </List>
    return (
        <Layout name="Categories">
            <FlatList
                data={data}
                renderItem={({ item }) => _renderList(item)}
                keyExtractor= {item =>item.fld_id}
            />
        </Layout>
    )
}

