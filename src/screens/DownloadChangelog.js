import React, { useState, useEffect, useContext } from 'react';
import { Linking, ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { lightTheme } from '../theme/light-theme';
import { colors, darkTheme } from '../theme/dark-theme';
import Header from '../components/Header';
import CommonLayout from '../theme/CommonLayout';
import { gihubAPI } from '../api/githubApi';
import ThemeContext from '../theme';
import Loader from '../components/Loading'

const DownloadChangelog = ({ navigation }) => {

    const [state, setState] = useState({
        data: null,
    });

    const [showLoader, setLoading] = useState(true);
    const [themeMode, setThemeMode] = useContext(ThemeContext);
    const [arch, setArch] = useState('');
    const regex = /app|-release.apk|-/gi;
    const installedVersion = DeviceInfo.getVersion();

    const _getData = async () => {
        try {
            const response = await gihubAPI();
            setState({ data: response });
        } catch (e) {
            console.log(e)
        }
        setLoading(false);
    };

    const _getCpuArch = async () => {
        const cpuArch = await DeviceInfo.supportedAbis();

        if (cpuArch.includes('arm64-v8a'))
            setArch('64 bit');
        else
            setArch('only 32 bit');

    };
    useEffect(() => {
        _getCpuArch();
        _getData();
    }, []);

    const styles = StyleSheet.create({
        heading: {
            fontSize: 22,
            color: themeMode === 'light' ? lightTheme.text.color : darkTheme.text.color,

        },
        bodyText: {
            fontSize: 16,
            marginBottom: '5%',
            color: themeMode === 'light' ? lightTheme.text.color : darkTheme.text.color,

        }
    })

    return (
        <CommonLayout>
            <Header navigation={navigation} />
            <Loader loading={showLoader} />
            {state.data &&
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.heading}>
                        Latest Version</Text>

                    <Text style={styles.bodyText}>
                        {state.data.name}
                    </Text>

                    <Text style={styles.heading}>
                        Version Installed
                        </Text>

                    <Text style={styles.bodyText}>
                        {installedVersion}
                    </Text>

                    <Text style={styles.heading}>
                        Author
                        </Text>

                    <Text style={styles.bodyText}>
                        {state.data.author.login}
                    </Text>

                    <Text style={styles.heading}>
                        Latest Changelog
                        </Text>

                    <Text style={styles.bodyText}>
                        {state.data.body}
                    </Text>
                    <Text style={styles.heading}>
                        Source Code
                    </Text>

                    <Pressable
                        style={{ marginBottom: '5%' }}
                        onPress={() => Linking.openURL('https://github.com/HKSJ-Unlimited/HSKJ-app')}>
                        <Text style={{
                            color: themeMode === 'light' ? lightTheme.text.color : darkTheme.text.color,
                            fontSize: 16, textDecorationLine: 'underline'
                        }}>Github</Text>
                    </Pressable>

                    <Text style={styles.heading}>
                        Download Latest Version from below
                        </Text>

                    <Text style={[styles.bodyText, { fontSize: 12 }]}>
                        *({'You phone supports ' + arch})
                    </Text>

                    <Pressable
                        style={themeMode === 'light' ? lightTheme.button : darkTheme.button}
                        onPress={() =>
                            Linking.openURL(state.data.assets[0].browser_download_url)
                        }>
                        <Text
                            style={themeMode === 'light' ? lightTheme.text : darkTheme.buttonText}
                        >{'Download ' +
                            state.data.assets[0].name.replace(regex, '') +
                            ' App'}</Text>
                    </Pressable>
                    <Pressable
                        style={themeMode === 'light' ? lightTheme.button : darkTheme.button}
                        onPress={() =>
                            Linking.openURL(state.data.assets[1].browser_download_url)
                        }>
                        <Text
                            style={themeMode === 'light' ? lightTheme.text : darkTheme.buttonText}
                        >{'Download ' +
                            state.data.assets[1].name.replace(regex, '') +
                            ' App'}</Text>
                    </Pressable>

                </ScrollView>
            }

        </CommonLayout>
    );
};

export default DownloadChangelog;
