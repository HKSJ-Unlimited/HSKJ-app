import React, { useContext, useEffect } from 'react'

import ThemeContext from '../theme';
import VideoLayout from './VideoLayout';
import CommonLayout from '../theme/CommonLayout';

export default function VideoPlayer({ navigation }) {
    const [themeMode, setThemeMode] = useContext(ThemeContext);
    const name = navigation.getParam('name');
    const videoHeading = navigation.getParam('heading');

    return (
        <CommonLayout>
            <VideoLayout themeMode={themeMode} name={name} navigation={navigation} heading={videoHeading} />
        </CommonLayout>
    )
}
