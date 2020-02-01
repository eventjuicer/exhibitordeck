

import React from 'react';
import { View } from 'react-native'
import {Header, Icon } from 'react-native-elements'
import Company from './Company'

const MyHeader = ({navigation}) => {

        return (

            <View>
            <Header
                leftComponent={<Icon name="menu" onPress={() => navigation.openDrawer()} />}
                centerComponent={<Company />}
                rightComponent={<Icon name="person" onPress={() => navigation.navigate("UserPage")} />}
                backgroundColor="#ffd700"
            />
   
            </View>
             
        )

}


export default MyHeader;