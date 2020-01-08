import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import { Container, Content, Button, Icon, Body, Right } from 'native-base'
import TopHeader from '../components/Header';

export default class About extends Component {
    static navigationOptions = {
        drawerLockMode: "unlocked"
    };

    render() {
        return (
            <Container>
                <TopHeader drawer="true" text="About" />
                <Content contentContainerStyle={styles.content}>
                <Text>KEK</Text>
                </Content>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 10,
        marginTop: '10%',
        fontFamily: 'roboto'
    }
})
