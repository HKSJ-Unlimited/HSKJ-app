import React, {Component} from 'react';
import { Text} from 'react-native';
import {Header, Left, Button, Icon, Body, Right} from 'native-base';
import {withNavigation} from 'react-navigation';
import {Layout as View} from '@ui-kitten/components';

import {ThemeContext} from '../theme-context';
import {Colors} from './Theme';

  const TopHeader = (props,{navigation}) => {
    const themeContext = React.useContext(ThemeContext);
    const themeToggle = themeContext.theme;
    const {drawer, icon, text} = props;

    return (
      <View >
          <Header
        androidStatusBarColor={themeToggle === 'light' ? '#8F9BB3' : '#000'}
        style={{
          borderRadius: 8,
          backgroundColor: themeToggle === 'light' ? '#fff' : Colors.stastubarColor,
          marginTop: '10%',
          marginHorizontal: '3%',
          padding:5,
          height: themeToggle === 'light' ?  40: 55,
          fontFamily:'Raleway-Regular',
        }}>
        {/* {drawer ? (
          <Left style={{position: 'absolute', left: 0}}>
            <Button
              transparent
              onPress={() => {
                navigation.navigate('settings');
              }}>
              <Icon size={25} color="#eee" name="md-settings" type="Ionicons" />
            </Button>
          </Left>
        ) : ( */}
          {/* <Left style={{position: 'absolute', left: 0}}> */}
            {/* <Button
              transparent
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon
                size={25}
                color="#eee"
                name="arrow-back"
                type="MaterialIcons"
              />
            </Button> */}
          {/* </Left> */}
        {/* // )} */}
        <Body style={{position: 'absolute'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: '#f79817',fontFamily:'serif',}}>
            {text}
          </Text>
        </Body>
        <Right />
      </Header>
      </View>
    );
  }

export default withNavigation(TopHeader);
