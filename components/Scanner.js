import React from 'react';
import  {BarCodeScanner } from 'expo-barcode-scanner';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
//import { Button } from 'react-native-elements';
import { withNavigationFocus } from 'react-navigation';
import compose from 'recompose/compose'
import WarningUnauthenticated from './WarningUnauthenticated'
import {
  participantScanned
} from '../redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection : 'column',
    width : '100%',
    margin: 0,
    padding: 0
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

const Scanner = ({participantScanned, isFocused}) => {

    if(isFocused){
      
      return (<BarCodeScanner 
        onBarCodeScanned={({data}) => participantScanned(data)} 
        style={[styles.container]}>
        <View style={styles.subcontainer}>
        <Text style={styles.description}>Scan Visitor Badge</Text>
        </View>
        <WarningUnauthenticated inverted={true} />
        </BarCodeScanner>
      )
    }
    return null
}

Scanner.defaultProps = {
 
}

const enhance = compose(
  connect(null, {participantScanned}),
  withNavigationFocus
)
export default enhance(Scanner);
