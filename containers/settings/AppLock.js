import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Text, List, ListItem, Layout as View, } from '@ui-kitten/components';
import { hasUserSetPinCode } from '@haskkor/react-native-pincode'
import { Button } from 'native-base';
import SetPass from './SetPass';

const AppLock = () => {
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
        alert("Who's this Nibba")
       }

    }
    useEffect(() => {
        checkUserPIN()
    }, [showPIN])

    const onRemove = (props) => {
        let status = 'enter'
        setProps(prevState => ({
            ...prevState,
            status: status,
            mode: props
        }));
        PINToggler()
    }

    const onSet = () => {
        if(auth)
            alert('Remove Previous Password First')
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {!showPIN ? <View>
                <Button full style={styles.button} onPress={onSet}>
                    <Text>Set Pass</Text>
                </Button> 
                <Button full style={styles.button} onPress={() => onRemove('delete')}>
                    <Text>Remove Pass</Text>
                </Button>

            </View> : <SetPass status={props.status} mode={props.mode} toggle={PINToggler} />}
        </View>
    )
}

export default AppLock
const styles = StyleSheet.create({
    button: {
        marginHorizontal: '20%',
        marginBottom: 5,
        marginTop: 15,
        backgroundColor: '#C2913F',
        borderRadius: 10
    }
})