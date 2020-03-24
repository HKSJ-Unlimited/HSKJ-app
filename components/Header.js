import React, {Component} from 'react';
import { Text} from 'react-native';
import {Header, Left, Button, Icon, Body, Right} from 'native-base';
import {withNavigation} from 'react-navigation';
import {Layout as View} from '@ui-kitten/components';

import {ThemeContext} from '../theme-context';
import {Colors} from './Theme';

export const TopHeader = (props) => {
    const themeContext = React.useContext(ThemeContext);
    const themeToggle = themeContext.theme;
    const {drawer, icon, text} = props;
    return (
      <View >
          <Header
        androidStatusBarColor={themeToggle === 'light' ? '#8F9BB3' : '#000'}
        style={{
          borderRadius: 8,
          backgroundColor: Colors.stastubarColor,
          marginTop: '10%',
          marginHorizontal: '3%',
          height: 40,
        }}>
        {drawer ? (
          <Left style={{position: 'absolute', left: 0}}>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.navigate('settings');
              }}>
              <Icon size={25} color="#eee" name="md-settings" type="Ionicons" />
            </Button>
          </Left>
        ) : (
          <Left style={{position: 'absolute', left: 0}}>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Icon
                size={25}
                color="#eee"
                name="arrow-back"
                type="MaterialIcons"
              />
            </Button>
          </Left>
        )}
        <Body style={{position: 'absolute'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: '#eee'}}>
            {text}
          </Text>
        </Body>
        <Right />
      </Header>
      </View>
    );
  }

export default withNavigation(TopHeader);
