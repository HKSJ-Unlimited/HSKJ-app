import React, { useContext, useState, useCallback } from 'react'
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { withNavigation } from 'react-navigation';
import debounce from 'lodash.debounce';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useSearch } from '../api/SearchDataHook';
import ThemeContext from '../theme';
import CommonLayout from '../theme/CommonLayout'
import { lightTheme } from '../theme/light-theme';
import { darkTheme, colors } from '../theme/dark-theme';

function SearchSchreen({ navigation }) {
    const [themeMode, setThemeMode] = useContext(ThemeContext);
    const [query, setQuery] = useState('');
    const [text, setText] = useState('');
    const { data, status } = useSearch(query);

    const debouncedSave = useCallback(
        debounce(nextValue => setQuery(nextValue), 1000),
        []
    );

    const handleChange = (e) => {
        setText(e);
        debouncedSave(e)

    }
    const handleCancel = () => {
        setText('');
        setQuery('')
    }

    const _renderList = item => {
        return (
            <TouchableOpacity
                key={item.key}
                style={themeMode === 'light' ? lightTheme.card : darkTheme.card}
            >
                <Text
                    onPress={() => navigation.navigate('VideoScreen', {
                        name: item.name,
                    })}
                    style={[themeMode === 'light' ? lightTheme.text : { color: colors.PrimaryColor }, {
                        textAlign: 'justify',
                        padding: 10,
                        fontWeight: '600',
                    }]} >{item.name.slice(0, 100)}</Text>

            </TouchableOpacity>
        )
    }
    return (
        <CommonLayout>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <MaterialCommunityIcons
                    name="close-circle-outline"
                    size={15}
                    style={{ padding: 10, position: 'absolute', zIndex: 1, right: 0 }}
                    onPress={handleCancel}
                />
                <TextInput
                    placeholder="Search"
                    autoFocus
                    onChangeText={(text) => handleChange(text)}
                    onEndEditing={() => setQuery(text)}
                    value={text}
                    autoCapitalize="none"
                    autoFocus
                    underlineColorAndroid="transparent"
                    style={{
                        flex: 1,
                        backgroundColor: '#eee',
                        borderRadius: 10,
                        height: 50,
                        color: '#757575',
                        paddingHorizontal: 10,
                        width: '100%'
                    }}
                />
            </View>
            <Text style={themeMode === 'light' ? lightTheme.text : darkTheme.text}>{status}</Text>
            <FlatList
                data={data}
                renderItem={({ item }) => _renderList(item)}
                style={{ marginTop: 20 }}
            />
        </CommonLayout>

    )
}
export default withNavigation(SearchSchreen);