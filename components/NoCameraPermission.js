import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native'; 
import { connect } from 'react-redux';

class NoCameraPermission extends React.Component {

    render(){
        return (

            <View style={{flex:1}}>
                
            <Text>no permission</Text>

            <ActivityIndicator
                    animating={true}
                    size="large"
                    color="#787878"
            />

            </View>
        )
    }

}

export default NoCameraPermission