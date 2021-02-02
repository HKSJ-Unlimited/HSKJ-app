import React, { useContext, useState } from 'react';
import { Text, View } from 'react-native'
import { BottomNavigation } from 'react-native-paper';
import { withNavigation } from 'react-navigation';

import { lightTheme } from '../theme/light-theme';
import { colors, darkTheme } from '../theme/dark-theme';
import CategoryList from '../components/CategoryList';
import PhotosScreen from '../screens/PhotosScreen';
import ThemeContext from '../theme';
import CommonLayout from '../theme/CommonLayout';
import SearchSchreen from '../screens/SearchSchreen';

const BottomNavigationBar = ({ navigation }) => {
    const Home = () => {
        return (
            <CommonLayout>
                <Text
                    style={
                        [themeMode === 'light' ? lightTheme.textHeading : darkTheme.textHeading, { marginHorizontal: '2%' }]
                    }>
                    Categories
      </Text>
                <CategoryList onPressItem={_onCatergorySelected} />

            </CommonLayout>
        )
    }

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'videos', title: 'Video', icon: 'video' },
        { key: 'photos', title: 'Photos', icon: 'camera-burst' },
        { key: 'search', title: 'Search', icon: 'magnify' },
    ]);
    const [themeMode, setThemeMode] = useContext(ThemeContext);

    const renderScene = BottomNavigation.SceneMap({
        videos: Home,
        photos: PhotosScreen,
        search: SearchSchreen
    });
    const _onCatergorySelected = (args) => {

        navigation.navigate('SelectedCategory', {
            name: args.id,
            heading: args.name,
            folderID: args.folder,
        })
    }


    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            shifting={true}
            inactiveColor='#9e9e9e'
            activeColor={themeMode === 'light' ? '#000' : darkTheme.icon.color}
            barStyle={{ backgroundColor: themeMode === 'light' ? lightTheme.color.color : '#000' }}
        />
    );
};


export default withNavigation(BottomNavigationBar)