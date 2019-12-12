import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Container, Content, Header, Left, Button,Icon, Body, Right } from 'native-base'

export default class About extends Component {
static navigationOptions = {
    drawerLockMode: "unlocked"
  };
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                        onPress={() => {
                            this.props.navigation.openDrawer()
                          }}
                        >
                        <Icon size={25} color="#eee" name="menu" type="MaterialIcons" />
                        </Button>
                    </Left>
                    <Body />
                    <Right />
                </Header>
                <Content>

                </Content>
            </Container>
        )
    }
}
