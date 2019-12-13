import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import { Container, Content, Button, Icon, Body, Right } from 'native-base'
import { Colors } from './Theme';
import TopHeader from './Header';

export default class About extends Component {
    static navigationOptions = {
        drawerLockMode: "unlocked"
    };
    render() {
        return (
            <Container>
                <TopHeader drawer="true" text="About" />
                <Content contentContainerStyle={styles.content}>
                    <Text style={styles.subText}>
                        We need your active participation and support to achieve the mission
                        and vision of our CHARITABLE TRUST. Your involvement will be your
                        investment for a better society.{"\n"}
                    </Text>
                   <Text style={styles.heading}>MISSION </Text>
                    <Text style={styles.p}>
                        To ensure social, economical, medical and educational enhancement to
                         the Gnatizens, focusing the women, youth and seniors, through
                        developing mechanism aiming at service delivery and capacity building.{"\n"}
                    </Text>
                    <Text style={styles.heading}>VISION </Text>
                    <Text style={styles.p}>
                        To create a society where all our Gnatizens are placed at the center
                        of all development initiatives ensuring social, cultural and economical
                        growth.{"\n"}
                    </Text>
                    <Text style={styles.heading}>OBJECTIVES </Text>
                    <Text style={styles.p}>
                        The objectives for which TRUST fund is established are educational,
                        social, cultural, economical and medical relief to the Gnatizens and
                        advancement of any other charitable and developmental objects of all
                        Gnatizens and community welfare.
                        </Text>

                </Content>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 10,
        marginTop:'10%',
        fontFamily:'roboto'
    },
    subText: {
        fontSize: 17,
        fontFamily:'roboto'
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign:'center',
        fontFamily:'roboto'
    },
    p:{
        fontSize: 17,
        textAlign:'center',
        fontFamily:'roboto'
    }
})
