import React from 'react'
import { Text, List, ListItem, Layout as View, } from '@ui-kitten/components';
import { deleteUserPinCode } from '@haskkor/react-native-pincode'
import PINCode from '@haskkor/react-native-pincode'
import * as Keychain from 'react-native-keychain';
import { ToastAndroid } from 'react-native';

const SetPass = (props) => {
    const removePIN = async (pin) => {
        if(props.mode.length>0){
             const pass = await Keychain.getGenericPassword()
             if(pass.password===pin)
            await deleteUserPinCode()
            else 
            ToastAndroid.showWithGravity('Nice Try :D . Next time enter the correct PIN',ToastAndroid.LONG,ToastAndroid.BOTTOM)
           props.toggle()
        }
        else{
            ToastAndroid.showWithGravity('Removed PIN',ToastAndroid.LONG,ToastAndroid.BOTTOM)
            props.toggle(true)
        }
    }
    const enterPIN = async(pin) => {
        await Keychain.setGenericPassword('username', pin);
        props.toggle()
    }

    return (
        <View>
            <PINCode status={props.status}
                endProcessFunction={removePIN}
                finishProcess={enterPIN}
                touchIDDisabled={true}
            />
        </View>
    )
}

export default SetPass
