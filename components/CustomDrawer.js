import React, { Component } from 'react'
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { Content, List, Left, Right, Body, ListItem, Container} from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const MenuItems = [
    {
        id: 1,
        name: "About",
        navigate: "about",
        icon: "account"
    },
    {
        id: 2,
        name: "Governance",
        navigate: "",
        icon: "chess-king"
    },
    {
        id: 3,
        name: "Schemes ",
        navigate: "schemes",
        icon: "ballot-outline"
    },
    {
        id: 4,
        name: "Business Directory ",
        navigate: "",
        icon: "worker"
    },
    {
        id: 5,
        name: "News",
        navigate: "",
        icon: "hackernews"
    },
    {
        id: 6,
        name: "Events",
        navigate: "",
        icon: "walk"
    },
    {
        id: 7,
        name: "Donate Now ",
        navigate: "",
        icon: "alpha-m-circle"
    },
    {
        id: 8,
        name: "Vastipatra",
        navigate: "",
        icon: "human-greeting"
    },
    {
        id: 9,
        name: "Search ",
        navigate: "",
        icon: "database-search"
    },
    {
        id: 10,
        name: "Contact",
        navigate: "contact",
        icon: "contacts"
    },
    {
        id:11,
        name:"Edit profile",
        navigate: "",
        icon: "database-edit"
    },
];


export default class CustomDrawer extends Component {

    _renderItem = (e) =>
        <List style={{ marginTop: '5%' }}>
            <ListItem icon onPress={() => this.props.navigation.navigate(e.navigate)}>
                <Left>
                    <Icon name={e.icon} color="#000" size={20} />
                </Left>
                <Body>
                    <Text style={{ fontSize: 15, color: "#000" }}>{e.name}</Text>
                </Body>
                <Right>
                    <Icon name="arrow-right" />
                </Right>
            </ListItem>
        </List>
    render() {
        return (
            <Container   
            style={{
                flex: 1,
              }}>
                <Content 
                contentContainerStyle={{
                    flexGrow: 1,
                }} >
                    <View style={{ flex: 1, marginTop: '15%' }}>
                        <FlatList
                            data={MenuItems}
                            renderItem={({ item }) => this._renderItem(item)}
                        />
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                Alert.alert(
                                    "Encore Stores",
                                    "Are you sure you want to logout ?",
                                    [
                                        {
                                            text: "NO",
                                            onPress: () => console.log("cancelled"),
                                            style: "cancel"
                                        },
                                        {
                                            text: "YES",
                                            onPress: () => {
                                                this.logout();
                                                this.props.navigation.navigate("register");
                                            }
                                        }
                                    ]
                                );
                            }}
                        >
                            <View style={styles.iconText}>
                                <Icon name="exit-to-app" size={20} style={styles.iconStyle} />
                                <Text style={styles.navTxtStyle}>Logout</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    iconText: {
        flexDirection: "row",
        paddingVertical: 10,
        borderBottomWidth: 1,
        marginTop:10,
        justifyContent: 'center'
    },
    iconStyle: {
        color: "#000"
    },
    navTxtStyle: {
        color: "#000",
        fontFamily: "open-sans-semi-bold",
        fontSize: 16,
    },
    activeNavBg: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: "#d2232a"
    },
});