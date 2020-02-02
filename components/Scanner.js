import React from 'react';
import  {BarCodeScanner } from 'expo-barcode-scanner';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
//import { Button } from 'react-native-elements';

import {
  participantScanned
} from '../redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection : 'column'
  },
  subcontainer : {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection : 'row'
  },
  description: {
    fontSize: 25,
    flex : 0.8,
    textAlign: 'center',
    color: 'white',
  }
})

 /**
     * Note: Passing undefined to the onBarCodeScanned prop will result in no scanning. This can be used to effectively "pause" the scanner so that it doesn't continually scan even after data has been retrieved.
  */

const Scanner = ({participantScanned}) => (
  
  <BarCodeScanner 
    onBarCodeScanned={({data}) => participantScanned(data)} 
    style={[StyleSheet.absoluteFill, styles.container]}>
    <View style={styles.subcontainer}>
      <Text style={styles.description}>Scan Visitor Badge</Text>
    </View>
  </BarCodeScanner>
)

Scanner.defaultProps = {
 
}

export default connect(null, {participantScanned})(Scanner);
