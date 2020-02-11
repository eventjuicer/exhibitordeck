

import React from 'react';
import { View, StyleSheet } from 'react-native'
import {Header, Icon } from 'react-native-elements'
import HeaderCompany from './HeaderCompany'
import {withNavigation} from 'react-navigation'

const MyHeader = ({navigation}) => {

        return (
          
            <Header
                leftComponent={<Icon name="menu" onPress={() => navigation.openDrawer()} />}
                centerComponent={<HeaderCompany />}
                rightComponent={<Icon name="person" onPress={() => navigation.navigate("UserPage")} />}
                backgroundColor="#ffd700"
                containerStyle={{zIndex: 1000}}
            /> 
           
        )

}


export default withNavigation(MyHeader);