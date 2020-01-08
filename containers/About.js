import React, { Component } from 'react'
import { Text } from 'react-native'

import Layout from '../components/Layout';

export default class About extends Component {
    static navigationOptions = {
        drawerLockMode: "unlocked"
    };

    render() {
        return (
           <Layout name="About">
               <Text>KEK</Text>
           </Layout>
        )
    }
}

