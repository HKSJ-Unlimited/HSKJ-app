import React, { useContext } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';

import CommonLayout from '../theme/CommonLayout'
import Header from '../components/Header'
import ThemeContext from '../theme';
import { lightTheme } from '../theme/light-theme';
import { darkTheme, colors } from '../theme/dark-theme';

export default function SelectedCategory({ navigation }) {

    const name = navigation.getParam('name');
    const heading = navigation.getParam('heading');
    const folderID = navigation.getParam('folderID');
    const SCREEN_WIDTH = Dimensions.get('window').width;

    const [themeMode, setThemeMode] = useContext(ThemeContext);

    const styles = StyleSheet.create({
        header: {
            flexDirection: 'row',
            backgroundColor: themeMode === 'light' ? '#F2F6FF' : '#2C3335',
            alignItems: 'center',
            height: 40,
            width: SCREEN_WIDTH - 30,
            margin: 5,
            borderRadius: 6,
            elevation: 3
        },
        heading: {
            fontSize: 18,
            alignSelf: 'center',
            justifyContent: 'center',
            flex: 1,
            textAlign: 'center',
        }
    })

    return (
        <CommonLayout>
            <View style={styles.header}>
                <Feather
                    name="arrow-left"
                    size={25}
                    onPress={() => navigation.goBack()}
                    style={themeMode === 'light' ? lightTheme.icon : darkTheme.icon}
                />
                <Text style={[styles.heading, { color: themeMode === 'light' ? lightTheme.text.color : colors.PrimaryColor }]}>{heading}</Text>
            </View>
        </CommonLayout>
    )
}
