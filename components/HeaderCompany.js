import React from 'react';
import { Text , View } from 'react-native';
import { connect } from 'react-redux';
import {Badge} from 'react-native-elements'

import {
    participantScanned,
    recentlyScannedCode,
    authCheck,
    authenticate,
    AuthenticatedRepSelector
  } from '../redux';

import {getFullname} from '../helpers'

class Company extends React.Component {

    render(){
        const {current} = this.props;
       
        return (
            <View style={{display: 'flex', flexDirection : 'row'}}>
                  <Text>{current ? getFullname(current) : `Unathenticated`}</Text> 
                  <Badge 
                    value="100" 
                    containerStyle={{ marginLeft: 5 }}
                    badgeStyle={{backgroundColor : '#000000'}}
                    />
            </View>
          
        )
    }

}

Company.defaultProps = {
 
}

export default connect((state, props) => ({
    current : AuthenticatedRepSelector(state, props),
    runtime : state.runtime,
    scanned : state.scanned
  }), {
    authCheck,
    authenticate,
    participantScanned,
    recentlyScannedCode
  })(Company);
  