

import React, {Component} from 'react';
import { BarCodeScanner } from 'expo';
import { connect } from 'react-redux';
import {Alert, StyleSheet, View } from 'react-native';

import {participantScanned as participantScannedAction} from '../redux/actions/scanned';
import {authenticate as authenticateAction} from '../redux/actions/authenticate';
import {unauthenticated as unauthenticatedAction} from '../redux/actions/unauthenticated';

class Scanner extends Component {

    componentDidMount()
    {
      this._checkAuth();
    }

    _checkAuth = () => {

      const {auth, unauthenticated} = this.props;
      if(typeof auth.participant_id == "undefined")
      {
        unauthenticated();
      }
    }

    _handleBarCodeRead = (data) => {

      const ts = + new Date();
      const {participantScanned, authenticate} = this.props;

      //check if authcode or participant code

      if(data.data.indexOf("@") > -1)
      {
        authenticate(data.data);
      }
      else
      {
        this._checkAuth();

        participantScanned(data.data,  ts);
      }
    }

  render() {

  return (
    <View style={{flex: 1}}>
      <BarCodeScanner onBarCodeRead={this._handleBarCodeRead} style={StyleSheet.absoluteFill} />
    </View>
  );

}

}

Scanner.defaultProps = {
  auth : {}
}

const mapStateToProps = state => ({
  auth : state.auth
});

export default connect(mapStateToProps, {

  unauthenticated : unauthenticatedAction,
  authenticate : authenticateAction,
  participantScanned : participantScannedAction

})(Scanner);
