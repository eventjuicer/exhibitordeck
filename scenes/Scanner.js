

import React, {Component} from 'react';
import { BarCodeScanner } from 'expo';
import { connect } from 'react-redux';
import {ActivityIndicator, Alert, StyleSheet, View, Text } from 'react-native';

import {
  participantScanned,
  recentlyScannedCode,
  authCheck,
  authenticate

} from '../redux/actions';


const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

});

class Scanner extends Component {

    _handleBarCodeRead = (data) => {

      const {auth, runtime, participantScanned, recentlyScannedCode, authCheck, authenticate} = this.props;
      const code = data.data;

      if(code && code.indexOf("@") != -1)
      {
        authenticate(code);
      }
      else
      {

        if(! /^[a-z]+$/.test(code) || code == runtime.lastCode)
        {
          console.log("same or bad code...skipping");
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

  const {auth, scanned, runtime} = this.props;
  const username = ("cname2" in auth) ? auth.cname2 : "Unauthenticated";

  if(runtime.cameraVisible)
  {
    return (

      <View style={{flex: 1 }}>
      <BarCodeScanner onBarCodeRead={this._handleBarCodeRead} style={StyleSheet.absoluteFill} />
      <Text style={{color: "#ffffff", paddingHorizontal: 10, paddingVertical: 10, backgroundColor: 'rgba(52, 52, 52, 0.8)'}}>
        {username}, you have {scanned.length} scan(s).
      </Text>
        </View>


    )
  }

  return (
  <View style={[styles.centering, {flex: 1 }]}>
    <ActivityIndicator
          animating={true}
          size={100}
          color="#c3cc24"
        />
  </View>


)


}

}

Scanner.defaultProps = {
  auth : {},
  runtime : {cameraVisible: true}
}

const mapStateToProps = state => ({
  auth : state.auth,
  runtime : state.runtime,
  scanned : state.scanned
});

export default connect(mapStateToProps, {
  authCheck,
  authenticate,
  participantScanned,
  recentlyScannedCode
})(Scanner);
