

import React, {Component} from 'react';
import { BarCodeScanner, Permissions } from 'expo';
import { StyleSheet, Text, View, Image, Vibration } from 'react-native';
import {Button} from 'react-native-elements';

import styles from '../styles'

const tintColor = '#ffcc00'

class Scanner extends Component {

  static navigationOptions = {
    tabBar: {
      label: 'Scanner',
      icon: ({ tintColor }) => (
        <Image
          source={require('../icons/test.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    },
  }


  state = {
    hasCameraPermission: null,
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  render() {

    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <View><Text>No access to camera :/</Text></View>;
    } else {
      return (
        <View style={{flex: 1}}>

           <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />

          {/* <Button
            onPress={() => this.props.navigation.goBack()}
            title="Go back home"
          /> */}


        </View>
      );
    }
  }

  _handleBarCodeRead = (data) => {
    Vibration.vibrate();
    alert(JSON.stringify(data));
  }
}



export default Scanner;
