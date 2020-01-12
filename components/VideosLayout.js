import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, FlatList, Modal, Dimensions } from 'react-native'
import { Container, Content, List, ListItem, Button } from 'native-base'
import { View, Linking } from 'react-native';
import { WebView } from 'react-native-webview';

import TopHeader from './Header';
import { get } from '../utils/APi'


export default function VideosLayout({ navigation }) {
    let ID;
    const [data, setRes] = useState([])
    const [modal, setModal] = React.useState(false);
    const [link, setLink] = useState();
    const fetchData = async () => {
        ID = await navigation.getParam('id')
        const response = await get('folder', ID)
        setRes(response.files)
    }
    useEffect(() => {
        fetchData(data)
    }, [data])

    const _modal = data => {
        setLink(data)
        setModal(true)
    }

    const _renderList = e => <List>
        <ListItem >
            < WebView
                style={{ width: 1, minWidth: '160%', height: 210, }}
                startInLoadingState={true}
                javaScriptEnabled={true}
                source={{ html: `<div align="justify"><iframe height=360 width=600 frameBorder='0 'allowFullScreen src="${e.link.slice(0, 22) + '/embed-' + e.link.slice(23)}"></iframe></div>` }}
            />
        </ListItem>

    </List >

    return (
        <Container>
            <TopHeader drawer="true" text={navigation.getParam('name')} />
            <Modal onRequestClose={() => setModal(false)} visible={modal}>
                <Text>hello</Text>
                   < WebView
                   style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}
                        startInLoadingState={true}
                        javaScriptEnabled={true}
                        source={{ html: `<IFRAME SRC="${link}" FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=640 HEIGHT=360 allowfullscreen></IFRAME>` }}
                    />
            </Modal>
            <FlatList
                data={data}
                renderItem={({ item }) => _renderList(item)}
                keyExtractor={item => item.link}
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