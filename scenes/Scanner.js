

import React, {Component} from 'react';
import { BarCodeScanner } from 'expo';
import { connect } from 'react-redux';
import {ActivityIndicator, StyleSheet, View, Text } from 'react-native';

import {
  participantScanned,
  recentlyScannedCode,
  authCheck,
  authenticate
} from '../redux/actions';

import {general} from '../styles';



class Scanner extends Component {

    _handleBarCodeRead = (data) => {

      const {auth, scanned, participantScanned, recentlyScannedCode, authCheck, authenticate} = this.props;
      const code = data.data;

     // console.log("skaner", code)

      if(code && code.indexOf("@") > 0)
      {

        // console.log("authenticating code...")
        // console.log(auth)

        authenticate(code);

        //if(! ("code" in auth) || auth.code != code)
        //{
        //    authenticate(code);
        //}

      }
      else
      {

        if(! /^[a-z]+$/.test(code) || (code in scanned))
        {
          console.log("same or bad code format...skipping");
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


    console.log(this.props);


  const {auth, scanned, runtime} = this.props;
  const username = ("cname2" in auth) ? auth.cname2 : "Unauthenticated";

  if(runtime.cameraVisible)
  {
    return (

      <View style={{flex: 1 }}>
      <BarCodeScanner onBarCodeRead={this._handleBarCodeRead} style={StyleSheet.absoluteFill} />

      <View><Text style={{color: "#ffffff", paddingHorizontal: 10, paddingVertical: 10, backgroundColor: 'rgba(204, 170, 36, 0.8)'}}>
        {username}, you have { Object.keys(scanned).length } scan(s).
      </Text></View>

      </View>


    )
  }

  return (
  <View style={[general.centering, {flex: 1 }]}>
    <ActivityIndicator
          animating={true}
          size="large"
          color="#787878"
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
