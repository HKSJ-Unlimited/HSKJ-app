import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Container, Content, Left, Button,Icon, Body, Right } from 'native-base'
import { Colors } from './Theme';
import TopHeader from './Header';

export default class About extends Component {
static navigationOptions = {
    drawerLockMode: "unlocked"
  };
    render() {
        return (
            <Container>
                <TopHeader drawer="true" text="About"/>
                <Content>

                </Content>
            </Container>
        )
    }
}
