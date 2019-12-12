import React from 'react'
import { View, Text } from 'react-native'
import { Container, ScrollableTab, Tabs, Tab, StyleProvider } from 'native-base'

import TopHeader from '../../Header'
import All from '../schemes/All'
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';

const Schemes = () => {
    return (
        <StyleProvider style={getTheme(material)}>
            <Container>
                <TopHeader text="Schemes" />
                <Tabs renderTabBar={() => <ScrollableTab style={{ backgroundColor: "#fff" }} />}>
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
        </StyleProvider>
    )
}

export default Schemes
