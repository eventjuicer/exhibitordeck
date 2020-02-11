import React from 'react';
import { Text , View } from 'react-native';
import { connect } from 'react-redux';
import {AuthenticatedRepSelector} from '../redux';
import {getFullname} from '../helpers'
import BadgeCounterScanned from './BadgeCounterScanned'

class HeaderCompany extends React.Component {

    render(){
        const {current} = this.props;
        return (
            <View style={{display: 'flex', flexDirection : 'row'}}>
                  <Text>{current ? getFullname(current) : `Unauthenticated`}</Text> 
                  <BadgeCounterScanned />
            </View>
        )
    }

}

HeaderCompany.defaultProps = {
 
}

export default connect((state, props) => ({
    current : AuthenticatedRepSelector(state, props)
}), {})(HeaderCompany);
  