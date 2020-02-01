

import React from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { connect } from 'react-redux';
import {ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';

import {
  participantScanned,
  recentlyScannedCode,
  authCheck,
  authenticate
} from '../redux/actions';

import {general} from '../styles';

class Scanner extends React.Component {

    constructor(){
      super();
      this.state = {
        hasPermission : null,
        scanned : false
      }
    }

    async componentDidMount(){
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      this.setState({ hasPermission : status })
    }

    setScanned = (val) => {
      this.setState({scanned : val});
    }

    handleBarCodeScanned = ({type, data}) => {

      this.setScanned(true);
      const {auth, scanned, participantScanned, recentlyScannedCode, authCheck, authenticate} = this.props;
      const code = data;

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

   // return   (<View style={{flex: 1 }}><Text>asd</Text></View>)

    console.log(this.props);

  const {hasPermission, scanned} = this.state;

  const {auth, XscannedX, runtime} = this.props;

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  // if(hasPermission)
  // {
    return (

      <View style={{flex: 1,
       //flexDirection : 'column', justifyContent : 'flex-end' 
       }}>
      <BarCodeScanner 
        onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned} 
      //  style={StyleSheet.absoluteFill} 
      />
       {scanned && <Button title={'Tap to Scan Again'} onPress={() => this.setScanned(false)} />}
      </View>


    )
  // }

  return null

//   return (
//   <View style={[general.centering, {flex: 1 }]}>
//     <ActivityIndicator
//           animating={true}
//           size="large"
//           color="#787878"
//         />
//   </View>

// )


}

}

Scanner.defaultProps = {
 
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
