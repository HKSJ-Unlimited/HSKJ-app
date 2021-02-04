import React, { useContext } from 'react'
import { View, Text } from 'react-native';

import ThemeContext from '../theme';
import CommonLayout from '../theme/CommonLayout'
import { lightTheme } from '../theme/light-theme';
import { darkTheme, colors } from '../theme/dark-theme';

export default function PhotosScreen() {
    const [themeMode, setThemeMode] = useContext(ThemeContext);
    return (
        <CommonLayout>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[{ fontSize: 40, }, { color: themeMode === 'light' ? lightTheme.text.color : colors.PrimaryColor }]}>
                    Coming Soon</Text>
            </View>
        </CommonLayout>
    )
}
