import React, { useContext } from 'react'
import { TextInput, } from 'react-native'
import ThemeContext from '../theme';
import CommonLayout from '../theme/CommonLayout'

export default function SearchSchreen() {
    const [themeMode, setThemeMode] = useContext(ThemeContext);

    return (
        <CommonLayout>
            <TextInput
                placeholder="Search"
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
        </CommonLayout>

    )
}
