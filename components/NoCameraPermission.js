import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text, Platform } from 'react-native'; 
import { connect } from 'react-redux';

const styles = StyleSheet.create({
    container : {
        backgroundColor: '#ffffff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection : 'column',
        marginHorizontal: 40
    },
    alert : {
        color: '#000000', 
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 50,
    },
    help : {
        color: '#000000', 
        fontSize: 20,
    }
})
class NoCameraPermission extends React.Component {

    render(){

        return (

            <View style={styles.container}>
                
                <Text style={styles.alert}>You must enable Camera Permission in order to scan QR codes</Text>
                
                {Platform.OS === "android" ? null : <Text style={styles.help}>Go to Settings > E-commerce Berlin Exhibitor > Camera (Enable)</Text> }

            </View>
        )
    }

}

export default connect(null, {})(NoCameraPermission)
