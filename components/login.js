import React, { Component } from 'react';
import {
  StyleSheet, View, TextInput, Alert, ToastAndroid, BackHandler
} from 'react-native';
import { Container, Text, Button, Content, Form, Footer, FooterTab, Icon } from 'native-base';
// import AsyncStorage from '@react-native-community/async-storage';

// import API_endpoints from '../API/API_endpoints';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    if (this.props.navigation.isFocused()) {
      Alert.alert(
        'Confirm exit',
        'Do you want to exit App?',
        [
          { text: 'CANCEL', style: 'cancel' },
          {
            text: 'OK', onPress: () => {
              BackHandler.exitApp()
            }
          }
        ]
      );
      return true
    }
    else {
      return false;
    }
  }
  _validate = () => {
    const { email, password } = this.state;
    if (!email) {
      ToastAndroid.show('Email is empty', ToastAndroid.SHORT)
      return false;
    }
    else if (!password) {
      ToastAndroid.show('Password is empty', ToastAndroid.SHORT)
      return false;
    }

    return true;
  }

  _goToHome = async (res) => {
    ToastAndroid.show('Welcome Back ' + res, ToastAndroid.SHORT);
    // AsyncStorage.setItem('username', res)
    // this.props.navigation.navigate('Profile', {
    //   res
    // });
  }

  _emailSignIn = async () => {
    if (this._validate()) {
    //   fetch(API_endpoints.LOGIN, {
    //     method: "POST",
    //     body: JSON.stringify({
    //       email: this.state.email,
    //       password: this.state.password,
    //     }),
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //   }).then(response => {
    //     response.json()
    //       .then(res => {
    //         res.message ? ToastAndroid.show(res.message, ToastAndroid.SHORT)
    //           :
    //           this._goToHome(res.username)
    //       })
    //   })
    }
  }




  render() {
    return (
      <Container style={styles.container}>
        <View style={{ marginTop: '15%' }}></View>
        <Content>
          <Text style={{ fontSize: 23, textAlign: 'center', fontFamily: 'Cocon-Regular', color: '#000' }}>
            Welcome to SVDM
          </Text>
          <Text style={{ fontSize: 14, textAlign: 'center', color: '#999999' }}>
            {"\n"}Enter your email & password to{"\n"} continue your journey with Us {"\n"}
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
                onChangeText={textInput => this.setState({ email: textInput })}

              />
            </View>
            <View style={styles.email}>
              <Icon style={{ color: '#999999', paddingLeft: 10, fontSize: 20 }} name="key" type="FontAwesome5" size={10} color="#B0BEC5" />
              <TextInput style={styles.input}
                placeholder="Enter password"
                placeholderTextColor='#999999'
                returnKeyType='go'
                secureTextEntry
                autoCorrect={false}
                ref={"txtPassword"}
                onChangeText={textInput => this.setState({ password: textInput })}
              />

            </View>
            <Text onPress={()=>this.props.navigation.navigate('forgetPassword')} style={{ color: '#1976d2', right: "-70%",fontSize:12 }}>Forgot Password?</Text>
            <Button full large style={styles.buttonContainer}
              onPress={this._emailSignIn}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </Button>
          </Form>
        </Content>
        <Footer >
          <FooterTab>
            <Button style={{ backgroundColor: '#fff', width: "100%" }} onPress={() => this.props.navigation.navigate('register')}>
              <Text style={{ color: '#757575', fontSize: 12 }}>
                Don't have an account ?  <Text style={{ color: '#1976d2', fontSize: 12 }}>Sign Up</Text>
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
  infoContainer: {
    padding: 20,
    marginTop: '8%'
  },
  input: {
    height: 50,
    color: '#757575',
    paddingHorizontal: 20,
    width: '100%'
  },
  buttonContainer: {
    backgroundColor: '#1976d2',
    borderRadius: 100,
    marginHorizontal: '30%',
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