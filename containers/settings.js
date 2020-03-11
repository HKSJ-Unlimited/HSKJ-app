import React, { Component } from 'react'
import { Text } from 'react-native'

import Layout from '../components/Layout';

export default class settings extends Component {
    static navigationOptions = {
        drawerLockMode: "unlocked"
    };

    render() {
        return (
           <Layout name="Settings">
               <Text>KEK</Text>
           </Layout>
        )
    }
}

