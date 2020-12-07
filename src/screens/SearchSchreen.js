import React, { useContext, useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { useSearch } from '../api/SearchDataHook';
import ThemeContext from '../theme';
import CommonLayout from '../theme/CommonLayout'
import { withNavigation } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';

function SearchSchreen({ navigation }) {
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