import React from 'react'
import {Layout as View, Text,Spinner} from '@ui-kitten/components';

const Loader = () => {
    return (
        <View style={{
            flex:1,
            justifyContent:'space-around',
            alignSelf:'center'

        }}>
            <Spinner status='warning' size='giant' />
        </View>
    )
}

export default Loader
