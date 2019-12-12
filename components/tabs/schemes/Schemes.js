import React from 'react'
import { View, Text } from 'react-native'
import { Container, ScrollableTab, Tabs, Tab } from 'native-base'

import TopHeader from '../../Header'
import All from '../schemes/All'

const Schemes = () => {
    return (
        <Container>
            <TopHeader text="Schemes"/>
                <Tabs renderTabBar={() => <ScrollableTab />}>
                    <Tab heading="All">
                        <All />
                    </Tab>
                    <Tab heading="Applied ">
                        <All />
                    </Tab>
                    <Tab heading="Vendors">
                        <All />
                    </Tab>
                </Tabs>
            {/* </TopHeader> */}
        </Container>
    )
}

export default Schemes
