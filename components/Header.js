import React from 'react'
import { View, Text } from 'react-native'
import { Container, Content, Header } from 'native-base'

import { Colors } from './Theme';

const TopHeader = (props) => {
    return (
        <Container>
            <Content>
                <Header androidStatusBarColor={Colors.stastubarColor} style={{ backgroundColor: Colors.stastubarColor }}>
                    {props.children}
                </Header>
            </Content>
        </Container>
    )
}

export default TopHeader
