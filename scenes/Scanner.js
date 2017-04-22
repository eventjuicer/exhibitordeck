

import React, {Component} from 'react';
import { BarCodeScanner } from 'expo';
import { connect } from 'react-redux';
import {Alert, StyleSheet, View, Text } from 'react-native';

import {
  participantScanned,
  recentlyScannedCode,
  authCheck,
  authenticate

} from '../redux/actions';


class Scanner extends Component {

    _handleBarCodeRead = (data) => {

      const {auth, options, participantScanned, recentlyScannedCode, authCheck, authenticate} = this.props;
      const code = data.data;

      if(code && code.indexOf("@") != -1)
      {
        authenticate(code);
      }
      else
      {

        if(code == options.lastCode)
        {
          console.log("same code...skipping");
        }
        else
        {
          const ts = + new Date();
          recentlyScannedCode(code);
          authCheck(("participant_id" in auth));
          participantScanned(code,  ts);
        }
      }
    }

  render() {

  const {auth, scanned} = this.props;
  const username = "cname2" in auth ? auth.cname2 : "Unauthenticated.";

  return (
    <View style={{flex: 1 }}>
      <BarCodeScanner onBarCodeRead={this._handleBarCodeRead} style={StyleSheet.absoluteFill} />
      <Text style={{color: "#ffffff", paddingHorizontal: 10, paddingVertical: 10, backgroundColor: 'rgba(52, 52, 52, 0.8)'}}>
        {username} You have {scanned.length} scans.
      </Text>
    </View>
  );

}

}

Scanner.defaultProps = {
  auth : {}
}

const mapStateToProps = state => ({
  auth : state.auth,
  options : state.options,
  scanned : state.scanned,
});

export default connect(mapStateToProps, {
  authCheck,
  authenticate,
  participantScanned,
  recentlyScannedCode
})(Scanner);
