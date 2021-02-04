import React, { useState, useEffect, useContext } from 'react'
import { ToastAndroid, Alert, Text, View, TouchableOpacity, Image } from 'react-native'
import { hasUserSetPinCode } from '@haskkor/react-native-pincode';

import SetPass from '../components/SetPass';
import Header from '../components/Header';
import CommonLayout from '../theme/CommonLayout';
import ThemeContext from '../theme';
import { lightTheme } from '../theme/light-theme';
import { darkTheme } from '../theme/dark-theme';

const AppLockScreen = ({ navigation }) => {
  const [showPIN, showPINToggler] = useState(false);
  const [auth, setAuth] = useState(false);
  const [themeMode, setThemeMode] = useContext(ThemeContext);
  const [props, setProps] = useState({
    status: '',
    mode: ''
  })

  const checkUserPIN = async () => {
    try {
      const auth = await hasUserSetPinCode()
      setAuth(auth)
    } catch {
      Alert.alert("Who's this Nibba")
      navigation.goBack()
    }

  }
  useEffect(() => {
    checkUserPIN()
  }, [showPIN])

  const onRemove = (props) => {
    if (!auth)
      // alert('Set a password first')
      ToastAndroid.showWithGravity('Set a password first', ToastAndroid.LONG, ToastAndroid.BOTTOM)
    else {
      let status = 'enter'
      setProps(prevState => ({
        ...prevState,
        status: status,
        mode: props
      }));
      PINToggler()
    }
  }

  const onSet = () => {
    if (auth)
      ToastAndroid.showWithGravity('Remove the Previous Password First', ToastAndroid.LONG, ToastAndroid.BOTTOM)
    else {
      let status = 'choose'
      setProps(prevState => ({
        ...prevState,
        status: status,
      }));
      PINToggler()
    }
  }

  const PINToggler = () => {
    showPINToggler(!showPIN)
  }

  return (
    <CommonLayout>
      <Header navigation={navigation} />

      <View style={{ flex: 1, justifyContent: 'space-around' }}>
        <Image
          source={require('../assets/images/shield.png')}
          style={{ height: 200, width: 200, alignSelf: 'center', marginTop: 50 }}
        />
        {!showPIN ? <View>
          <TouchableOpacity style={themeMode === 'light' ? lightTheme.button : darkTheme.button} onPress={onSet}>
            <Text style={themeMode === 'light' ? lightTheme.text : darkTheme.buttonText}>Set Pass</Text>
          </TouchableOpacity>
          <TouchableOpacity style={themeMode === 'light' ? lightTheme.button : darkTheme.button} onPress={() => onRemove('delete')}>
            <Text style={themeMode === 'light' ? lightTheme.text : darkTheme.buttonText}>Remove Pass</Text>
          </TouchableOpacity>

        </View> : <SetPass status={props.status} mode={props.mode} toggle={PINToggler} />}
      </View>
    </CommonLayout>

  )
}

export default AppLockScreen
