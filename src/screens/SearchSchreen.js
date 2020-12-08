import React, { useContext, useState, useCallback } from 'react'
import { Text, TextInput, View } from 'react-native'
import { withNavigation } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import debounce from 'lodash.debounce';

import { useSearch } from '../api/SearchDataHook';
import ThemeContext from '../theme';
import CommonLayout from '../theme/CommonLayout'

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
    return (
        <CommonLayout>
            <TextInput
                placeholder="Search"
                autoFocus
                onChangeText={(text) => handleChange(text)}
                onEndEditing={() => setQuery(text)}
                autoCapitalize="none"
                autoFocus
                style={{
                    backgroundColor: '#eee',
                    borderRadius: 10,
                    height: 50,
                    color: '#757575',
                    paddingHorizontal: 10,
                    width: '100%'
                }}
            />
            <Text>{status}</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                {data.length > 0 && data.map(item => (
                    <Text
                        onPress={() => navigation.navigate('VideoScreen', {
                            name: item.name,
                        })}
                        style={{ margin: 10 }}
                        key={item.key}
                    >{item.name}</Text>
                ))}
            </ScrollView>
        </CommonLayout>

    )
}
export default withNavigation(SearchSchreen);