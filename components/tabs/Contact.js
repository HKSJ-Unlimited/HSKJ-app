import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput } from 'react-native'
import { Container, Content, Form, Icon, Button, Textarea } from 'native-base'

import TopHeader from '../Header';
import { Colors } from '../Theme';

export default class Contact extends Component {
    state ={
        
    }
    render() {
        return (
            <Container style={styles.container}>
                <TopHeader text="Contact Us" />
                <Content contentContainerStyle={styles.content}>
                    <Text style={styles.heading}>Address</Text>
                    <Text style={styles.infoText}>
                        214/215, Accord Classic Complex,{"\n"}
                        Arey Road, Near Station Road,{"\n"}
                        Goregaon (east){"\n"}
                        Mumbai – 400063
                    </Text>
                    <Text style={styles.heading}>Email id </Text>
                    <Text style={styles.infoText}>svdmmandal@gmail.com</Text>
                    <Text style={styles.heading}>Mobile No</Text>
                    <Text style={styles.infoText}>+91 9820135566</Text>
                    <Text style={styles.heading}>Website</Text>
                    <Text style={styles.infoText} >svdmmandal.com</Text>

                    <Form style={styles.infoContainer}>
                        <View style={styles.email}>
                            <Icon style={{ color: '#999999', paddingLeft: 10, fontSize: 20 }} name="user" type="AntDesign" size={10} color="#B0BEC5" />
                            <TextInput style={styles.input}
                                placeholder="Enter your name"
                                placeholderTextColor='#999999'
                                keyboardType='email-address'
                                returnKeyType='next'
                                autoCorrect={false}
                                onSubmitEditing={() => this.refs.email.focus()}
                                underlineColorAndroid='transparent'
                                onChangeText={textInput => this.setState({ email: textInput })}

                            />
                        </View>
                        <View style={styles.email}>
                            <Icon style={{ color: '#999999', paddingLeft: 10, fontSize: 20 }} name="email" type="MaterialCommunityIcons" size={10} color="#B0BEC5" />
                            <TextInput style={styles.input}
                                placeholder="Enter your email"
                                placeholderTextColor='#999999'
                                returnKeyType='go'
                                autoCorrect={false}
                                ref={"email"}
                                onSubmitEditing={() => this.refs.mobile.focus()}
                                onChangeText={textInput => this.setState({ password: textInput })}
                            />

                        </View>
                        <View style={styles.email}>
                            <Icon style={{ color: '#999999', paddingLeft: 10, fontSize: 20 }} name="mobile1" type="AntDesign" size={10} color="#B0BEC5" />
                            <TextInput style={styles.input}
                                placeholder="Enter your mobile no"
                                keyboardType="number-pad"
                                placeholderTextColor='#999999'
                                returnKeyType='go'
                                autoCorrect={false}
                                ref={"mobile"}
                                onChangeText={textInput => this.setState({ password: textInput })}
                            />

                        </View>
                        <View style={styles.email}>
                            <Textarea style={styles.messageInput}
                                placeholder="Enter your message"
                                placeholderTextColor='#999999'
                                returnKeyType='go'
                                secureTextEntry
                                autoCorrect={false}
                                onChangeText={textInput => this.setState({ password: textInput })}
                            />

                        </View>
                        <Button full style={styles.buttonContainer}
                            // onPress={this._emailSignIn}
                        >
                            <Text style={styles.buttonText}>Submit</Text>
                        </Button>
                    </Form>
                </Content>
            </Container >
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 10,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    infoText: {
        marginBottom: 4
    },
    infoContainer: {
        padding: 10,
        marginTop: '3%'
    },
    input: {
        height: 50,
        color: '#757575',
        paddingHorizontal: 20,
        width: '100%'
    },
    messageInput: {
        height: 100,
        color: '#757575',
        paddingHorizontal: 20,
        width: '100%'
    },
    buttonContainer: {
        backgroundColor: Colors.stastubarColor,
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    email: {
        flexDirection: 'row',
        borderColor: '#cccccc',
        borderWidth: 1,
        flex: 1,
        borderRadius: 6,
        alignItems: "center",
        backgroundColor: '#fafafa',
        marginBottom: 20
    }
})