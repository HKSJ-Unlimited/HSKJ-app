import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Container } from 'native-base'
import TopHeader from './Header';

export default class Layout extends Component {
    render() {
        return (
            <Container>
                <TopHeader drawer="true" text={this.props.name} />
                <View contentContainerStyle={styles.content}>
                    {this.props.children}
                </View>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 10,
        marginTop: '5%',
        fontFamily: 'roboto'
    }
})