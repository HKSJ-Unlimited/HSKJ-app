import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableHighlight, ActivityIndicator } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import { InterstitialAd, TestIds } from '@react-native-firebase/admob';
import { AdEventType } from '@react-native-firebase/admob';

import { INTERSTITIAL } from '../api/Data';
import { useFetch } from '../api/fetchHook'
import CommonLayout from '../theme/CommonLayout'
import ThemeContext from '../theme';
import { lightTheme } from '../theme/light-theme';
import { darkTheme, colors } from '../theme/dark-theme';
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';

const interstitial = InterstitialAd.createForAdRequest(INTERSTITIAL, {
    requestNonPersonalizedAdsOnly: false,
});

export default function SelectedCategory({ navigation }) {

    const heading = navigation.getParam('heading');
    const folderID = navigation.getParam('folderID');
    const SCREEN_WIDTH = Dimensions.get('window').width;

    const [themeMode, setThemeMode] = useContext(ThemeContext);
    const { data } = useFetch(folderID);

    const styles = StyleSheet.create({
        header: {
            flexDirection: 'row',
            backgroundColor: themeMode === 'light' ? '#F2F6FF' : '#2C3335',
            alignItems: 'center',
            height: '6%',
            width: SCREEN_WIDTH - 30,
            margin: 5,
            borderRadius: 6,
            elevation: 3,
            marginBottom: 10
        },
        heading: {
            fontSize: 18,
            alignSelf: 'center',
            justifyContent: 'center',
            flex: 1,
            textAlign: 'center',
            marginLeft: -10
        },
        card: {
            // backgroundColor: themeMode === 'light' ? '#F2F6FF' : '#121212',
            flex: 1,
            borderRadius: 12
        },
        image: {
            height: 200,
            width: '100%',
            marginTop: 10,
            resizeMode: 'contain',
            alignSelf: 'center',
            marginBottom: 5
        },
        body: {
            // flex: 1,
            // marginLeft: 10,
            // marginRight: 10,
            // maxWidth: SCREEN_WIDTH - (80 + 10 + 20),
            // borderTopWidth: 2
        },
    });
    useEffect(() => {
        interstitial.load();
        interstitial.onAdEvent(type => {
            if (type === AdEventType.LOADED) {
                interstitial.show();
            }
        });
    }, []);

    const list = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data);
    const layoutProv = new LayoutProvider(
        (i) => {
            return list.getDataForIndex(i).type;
        },
        (type, dim) => {
            switch (type) {
                case 'NORMAL':
                    dim.width = SCREEN_WIDTH;
                    dim.height = 260;
                    break;
                default:
                    dim.width = SCREEN_WIDTH;
                    dim.height = 0;
                    break;
            }
        },
    );

    const rowRenderer = (type, data) => {

        const { thumbnailLink, name, webContentLink, webViewLink } = data;
        const regex = /on SexyPorn|.mp4|Pornhub.com|YesPornPlease|Jetload.NET|.md|[()]|[.]|-|[0-9]/gi;

        let trimmedName = name
            .replace(regex, '.')
            .slice(0, 120)
            .toLowerCase();

        return (
            <TouchableHighlight
                style={{ height: 215, marginBottom: 30 }}
                // style={{ backgroundColor: "#F7F7F7", elevation: 6, height: 235, borderRadius: 17, width: '100%', alignSelf: 'center' }}
                // underlayColor="#878787"
                onPress={() => navigation.navigate('VideoScreen', {
                    name: navigation.getParam('name') + '/' + encodeURIComponent(name),
                    heading: trimmedName.slice(0, 40)
                })}

                key={thumbnailLink}>
                <View style={styles.card}>
                    <Image
                        source={{
                            uri: thumbnailLink,
                        }}
                        style={styles.image}
                    />
                    <View style={styles.body}>
                        <Text
                            style={[
                                themeMode === 'light'
                                    ? lightTheme.textHeading
                                    : darkTheme.textHeading,
                                {
                                    fontWeight: 'bold',
                                    // textAlign: 'center',
                                    fontSize: 13, marginBottom: 10,
                                },
                            ]}>
                            {trimmedName}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };

    return (
        <CommonLayout>
            <View style={styles.header}>
                <Feather
                    name="arrow-left"
                    size={25}
                    onPress={() => navigation.goBack()}
                    style={[themeMode === 'light' ? lightTheme.icon : darkTheme.icon, { paddingLeft: 5 }]}
                />
                <Text style={[styles.heading, { color: themeMode === 'light' ? lightTheme.text.color : colors.PrimaryColor }]}>{heading}</Text>
            </View>
            {data.length === 1 && <ActivityIndicator size="large" color="#00E676" style={{ flex: 0.8 }} />}
            {data.length > 1 && <RecyclerListView
                scrollViewProps={{ showsVerticalScrollIndicator: false }}
                dataProvider={list}
                layoutProvider={layoutProv}
                rowRenderer={rowRenderer}
            />}
        </CommonLayout>
    )
}
