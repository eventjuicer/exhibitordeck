

import React, {Component} from 'react';
import { BarCodeScanner } from 'expo';
import { connect } from 'react-redux';
import {participantScanned as participantScannedAction} from '../redux/actions/scanned';

import { StyleSheet, Text, View, Image, Vibration } from 'react-native';
import {Button} from 'react-native-elements';
import Modal from '../components/Modal';
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


    _handleBarCodeRead = (data) => {

      Vibration.vibrate();
      alert(JSON.stringify(data));

    }


  render() {

      const {participantScanned} = this.props;

      return (

        <View style={{flex: 1}}>

           <BarCodeScanner
            //onBarCodeRead={this._handleBarCodeRead}
            onBarCodeRead={() => participantScanned(data)}

            style={StyleSheet.absoluteFill}
          />

        <Button
            onPress={() => this.props.navigation.goBack()}
            title="Go back home"
          />

        <Modal />

        </View>
      );
    }
  }




  const mapStateToProps = state => ({
      nav: state.nav
  });

  export default connect(mapStateToProps, {

    participantScanned : participantScannedAction

  })(Scanner);
