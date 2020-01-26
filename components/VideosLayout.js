import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, FlatList, Modal, Dimensions } from 'react-native'
import { Container, Content, List, ListItem, Button } from 'native-base'
import { View, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { BASE_URL } from 'react-native-dotenv'

import TopHeader from './Header';
import { get } from '../utils/APi'


export default function VideosLayout({ navigation }) {
    let name;
    const [data, setRes] = useState([])
    const [modal, setModal] = React.useState(false);
    const [link, setLink] = useState();
    const fetchData = async () => {
        name = await navigation.getParam('name')
        const response = await get(name)
        setRes(response)
        alert(JSON.stringify(data, undefined, 3))
    }
    useEffect(() => {
        fetchData()
    }, [name])

    // const _modal = data => {
    //     setLink(data)
    //     setModal(true)
    // }

    const _renderList = e => {
        let str = BASE_URL + e.name;
        let link = str.split(' ').join('%20')
        return (
            <List>
                <ListItem >
                    < WebView
                        style={{ width: 1, minWidth: '160%', height: 210, }}
                        startInLoadingState={true}
                        javaScriptEnabled={true}
                        source={{
                            html: `<div align="justify"><iframe height=360 width=600 frameBorder='0 'allowFullScreen 
                            src="${link}"
                        >
                        </iframe></div>` }}
                    />
                </ListItem>

            </List >
        )
    }

    return (
        <Container>
            <TopHeader drawer="true" text={navigation.getParam('name')} />
            {/* <Modal onRequestClose={() => setModal(false)} visible={modal}>
                <Text>hello</Text>
                < WebView
                    style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
                    startInLoadingState={true}
                    javaScriptEnabled={true}
                    source={{ html: `<IFRAME SRC="${link}" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=640 HEIGHT=360 allowfullscreen></IFRAME>` }}
                />
            </Modal> */}
            <FlatList
                data={data}
                renderItem={({ item }) => _renderList(item)}
                key={item => item.name}
            />
        </Container>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        padding: 10,
        marginTop: '5%',
        fontFamily: 'roboto'
    },
    backgroundVideo: {
        flex: 1,
        margin: 10
    },
})