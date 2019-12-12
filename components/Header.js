import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Header, Left, Button, Icon, Body, Right } from 'native-base'
import { withNavigation } from 'react-navigation';

import { Colors } from './Theme';

class TopHeader extends Component {
    render() {
        const { drawer, icon, text } = this.props;
        return (
            <Header
                androidStatusBarColor={Colors.stastubarColor}
                style={{ borderRadius: 8, backgroundColor: Colors.stastubarColor, marginVertical: '2%', marginHorizontal: '3%', height: 40 }}
            >
                {drawer ?
                    <Left style={{ position: "absolute", left: 0 }}>
                        <Button
                            transparent
                            onPress={() => {
                                this.props.navigation.openDrawer()
                            }}
                        >
                            <Icon size={25} color="#eee" name="menu" type="MaterialIcons" />
                        </Button>
                    </Left> :
                    <Left style={{ position: "absolute", left: 0 }}>
                        <Button
                            transparent
                            onPress={() => {
                                this.props.navigation.openDrawer()
                            }}
                        >
                            <Icon size={25} color="#eee" name="arrow-back" type="MaterialIcons" />
                        </Button>
                    </Left>
                }
                <Body style={{position: "absolute"}}>
                    <Text style={{fontWeight:'bold',fontSize:15,color:'#eee'}}>{text}</Text>
                </Body>
                <Right />


            </Header>
        )
    }
}

export default withNavigation(TopHeader)
