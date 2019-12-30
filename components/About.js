import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import { Container, Content, Button, Icon, Body, Right } from 'native-base'
import { Colors } from './Theme';
import TopHeader from './Header';
import Axios from 'axios';

export default class About extends Component {
    static navigationOptions = {
        drawerLockMode: "unlocked"
    };
    state = {
        result: []
    }
    componentDidMount() {
        fetch('https://gounlimited.to/api/account/info?key',)
            .then((response) => response.json())
            .then((responseData) => {
                alert(responseData)
            })
    }
    render() {
        return (
            <Container>
                <TopHeader drawer="true" text="About" />
                <Content contentContainerStyle={styles.content}>

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
    },
    subText: {
        fontSize: 17,
        fontFamily: 'roboto'
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'roboto'
    },
    p: {
        fontSize: 17,
        textAlign: 'center',
        fontFamily: 'roboto'
    }
})
