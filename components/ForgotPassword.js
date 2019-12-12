import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Container, Content, Form, Icon, Footer, FooterTab, Button } from 'native-base';
// import firebase from 'react-native-firebase'

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forgotPasswordEmail: ''
        };
    }

    _sendResetPasswordEmail = () => {
        if (this.state.forgotPasswordEmail === '') {
          return;
        }
        // firebase.auth().sendPasswordResetEmail(this.state.forgotPasswordEmail).then(() => {
        //   this.props.navigation.goBack();
        //   Alert.alert('check your email');
        // }).catch((reason) => {
        //   Alert.alert('Error: ' + reason);
        // })
    }
    
    render() {
        return (
            <Container style={styles.container}>
                <View style={{ marginTop: '15%' }}></View>
                <Content>
                    <Text style={{ fontSize: 24, textAlign: 'center', fontFamily: 'Cocon-Regular', color: '#000' }}>
                        Forgot Password ?
                    </Text>
                    <Text style={{ fontSize: 12, textAlign: 'center', color: '#999999' }}>
                        {"\n"}Enter your registered email to recieve a link{"\n"} to reset your password
                    </Text>
                    <Form style={styles.infoContainer}>
                        <View style={styles.email}>
                            <Icon style={{ color: '#999999', paddingLeft: 10, fontSize: 20 }} name="user" type="AntDesign" size={10} color="#B0BEC5" />
                            <TextInput style={styles.input}
                                placeholder="Enter email"
                                placeholderTextColor='#999999'
                                keyboardType='email-address'
                                returnKeyType='next'
                                autoCorrect={false}
                                onSubmitEditing={() => this.refs.txtPassword.focus()}
                                underlineColorAndroid='transparent'
                                onChangeText={textInput => this.setState({ forgotPasswordEmail: textInput })}
                            />
                        </View>
                        <TouchableOpacity style={styles.buttonContainer}
                            onPress={this._sendResetPasswordEmail}
                        >
                            <Text style={styles.buttonText}>Send</Text>
                        </TouchableOpacity>
                    </Form>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button style={{ backgroundColor: '#fff', width: "100%" }} onPress={() => this.props.navigation.goBack()}>
                            <Text style={{ color: '#757575', fontSize: 12 }}>
                                Remember Password?  <Text style={{ color: '#1976d2', fontSize: 12 }}>SignIn</Text>
                            </Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fafafa',
    },
    icons: {
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        top: 5,
        left: 80
    },
    infoContainer: {
        // left: 0,
        // right: 0,
        // bottom: 0,
        // // height: 230,
        padding: 20,
        // justifyContent: 'center',
    },
    input: {
        height: 50,
        color: '#757575',
        paddingHorizontal: 20,
        width:'100%'
    },
    buttonContainer: {
        backgroundColor: '#1976d2',
        paddingVertical: 15,
        marginTop: 15,
        borderRadius: 100,
        width: 150,
        left: '30%'
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
    },
    create: {
        justifyContent: 'center',
        fontSize: 20,
        marginTop: 50,
        marginLeft: 97,
        fontWeight: 'bold'
    },
    socialIconsContainer: {
        justifyContent: "center",
        top: 5,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        marginRight: 10,
        borderColor: "#fff",
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 2, width: 2 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        // backgroundColor: '#fff',
        elevation: 3, // Android
        marginLeft: 10,
    },

})