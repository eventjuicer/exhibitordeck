import React from 'react';
import { Text , View } from 'react-native';
import { connect } from 'react-redux';

import {
    participantScanned,
    recentlyScannedCode,
    authCheck,
    authenticate
  } from '../redux/actions';

class Company extends React.Component {

    render(){
        const {auth} = this.props;
       
        return (
          
            <Text>E-commerce Berlin Expo</Text> 
        )
    }

}

Company.defaultProps = {
 
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
  })(Company);
  