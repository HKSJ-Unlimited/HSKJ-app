import React, { useContext, useState } from 'react'
import { Text, TextInput, } from 'react-native'
import { useSearch } from '../api/SearchDataHook';
import ThemeContext from '../theme';
import CommonLayout from '../theme/CommonLayout'

export default function SearchSchreen() {
    const [themeMode, setThemeMode] = useContext(ThemeContext);
    const [query, setQuery] = useState('');
    const { data, status } = useSearch(query);

    return (
        <CommonLayout>
            <TextInput
                placeholder="Search"
                autoFocus
                onChangeText={(text) => setQuery(text)}
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
        </CommonLayout>

    )
}
