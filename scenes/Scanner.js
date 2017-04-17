

import React, {Component} from 'react';
import { BarCodeScanner } from 'expo';
import { connect } from 'react-redux';
import {participantScanned as participantScannedAction} from '../redux/actions/scanned';

import { StyleSheet, Text, View, Image, Vibration } from 'react-native';
import {Button} from 'react-native-elements';
import Modal from '../components/Modal';
import {styles} from '../styles';
const tintColor = '#ffcc00';


/*icon: ({ tintColor }) => (
  <Image
    source={require('../icons/test.png')}
    // style={[styles.icon, {tintColor: tintColor}]}
  />
),
*/
class Scanner extends Component {


    _handleBarCodeRead = (data) => {

      Vibration.vibrate();
      alert(JSON.stringify(data));

    }


  render() {

      const {participantScanned} = this.props;
      return (

<View style={{flex: 1}}>

<BarCodeScanner onBarCodeRead={() => this.props.participantScanned(data)}

style={StyleSheet.absoluteFill}
/>


</View>
      );
    }
  }




  const mapStateToProps = state => ({
    bigListOfParticipants : state.bigListOfParticipants
  });

  export default connect(mapStateToProps, {

    participantScanned : participantScannedAction

  })(Scanner);
