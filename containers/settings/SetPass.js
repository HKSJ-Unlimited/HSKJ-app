import React from 'react'
import { Text, List, ListItem, Layout as View, } from '@ui-kitten/components';
import { deleteUserPinCode } from '@haskkor/react-native-pincode'
import PINCode from '@haskkor/react-native-pincode'

const SetPass = (props) => {
    const removePIN = async () => {
        if(props.mode.length>0){
            await deleteUserPinCode()
           props.toggle()
        }
        else{
            props.toggle(true)
        }
    }
    const enterPIN = () => {
        props.toggle()
    }
    return (
        <View>
            <PINCode status={props.status}
                endProcessFunction={removePIN}
                finishProcess={enterPIN}
                disableLockScreen={true}
            />
        </View>
    )
}

export default SetPass
