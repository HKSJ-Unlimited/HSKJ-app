import React, { useState, useEffect } from 'react'
import { StyleSheet, ToastAndroid, Alert } from 'react-native'
import { Text, List, ListItem, Layout as View, } from '@ui-kitten/components';
import { hasUserSetPinCode } from '@haskkor/react-native-pincode'
import { Button } from 'native-base';
import SetPass from './SetPass';

const AppLock = ({navigation}) => {
    const [showPIN, showPINToggler] = useState(false)
    const [auth, setAuth] = useState(false)
    const [props, setProps] = useState({
        status: '',
        mode: ''
    })

    const checkUserPIN = async () => {
       try {
        const auth = await hasUserSetPinCode()
        setAuth(auth)
       }catch{
        Alert.alert("Who's this Nibba")
        navigation.goBack()
       }

    }
    useEffect(() => {
        checkUserPIN()
    }, [showPIN])

    const onRemove = (props) => {
        if(!auth)
        // alert('Set a password first')
        ToastAndroid.showWithGravity('Set a password first',ToastAndroid.LONG,ToastAndroid.BOTTOM)
        else{
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
        if(auth)
            ToastAndroid.showWithGravity('Remove the Previous Password First',ToastAndroid.LONG,ToastAndroid.BOTTOM)
        else
{        let status = 'choose'
        setProps(prevState => ({
            ...prevState,
            status: status,
        }));
        PINToggler()}
    }

    const PINToggler = () => {
        showPINToggler(!showPIN)
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            {!showPIN ? <View>
                <Button danger full style={styles.button} onPress={onSet}>
                    <Text style={{color:'#fafafa'}}>Set Pass</Text>
                </Button> 
                <Button danger full style={styles.button} onPress={() => onRemove('delete')}>
                    <Text style={{color:'#fafafa'}}>Remove Pass</Text>
                </Button>

            </View> : <View style={{alignItems:'center'}}>
            <SetPass status={props.status} mode={props.mode} toggle={PINToggler} />
                </View>}
        </View>
    )
}

export default AppLock
const styles = StyleSheet.create({
    button: {
        marginHorizontal: '10%',
        marginBottom: 5,
        marginTop: 15,
        // backgroundColor: '#C2913F',
        borderRadius: 10
    }
})