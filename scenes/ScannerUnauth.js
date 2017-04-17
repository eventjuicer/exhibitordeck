

import React, {Component} from 'react';
import { BarCodeScanner } from 'expo';
import { StyleSheet, Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import {authenticate as authenticateAction} from '../redux/actions/authenticate';

import {Button} from 'react-native-elements';
import Modal from '../components/Modal';
import styles from '../styles'

const tintColor = '#ffcc00'


class ScannerUnauth extends Component {



  _handleBarCodeRead = (data) => {

    //http://api.eventjuicer.com.local/firebase/94051b42be60ff718ca86a4d8c86f0f4bd37399b
    if(data.data.indexOf("@")!= - 1)
    {

      this.authenticate(data.data);
    }

  }

  authenticate = (code) =>
  {

      const {authenticate} = this.props;

      return fetch('https://api.eventjuicer.com/services/v1/barcode-scanner/auth/'+code)
        .then((response) => response.json())
        .then((responseJson) => {

            if('data' in responseJson && 'participant_id' in responseJson.data)
            {
              console.log(JSON.stringify(responseJson.data));
              authenticate(responseJson.data);
            }
            else
            {

              alert("Could not authenticate...");
            }
        })
        .catch((error) => {
          console.error(error);
        });
  }

  render() {

      return (
        <View style={{flex: 1}}>
           <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
        <Button
            onPress={() => this.props.navigation.goBack()}
            title="Go back home"
          />



        </View>
      );
    }
  }


const mapStateToProps = state => ({
    authenticated: "participant_id" in state.user
});

export default connect(mapStateToProps, {

  authenticate : authenticateAction

})(ScannerUnauth);
