
import React from 'react';
import { connect } from 'react-redux';
import {Badge} from 'react-native-elements'
import { GetScannedCount } from '../redux';

const BadgeCounterScanned = ({scanned}) => {
  
    if(scanned){
        return (<Badge 
            value={scanned} 
            containerStyle={{ marginLeft: 5 }}
            badgeStyle={{backgroundColor : '#000000'}}
            /> )
    }
    return null
}
  
export default connect((state, props) => ({
    scanned : GetScannedCount(state, props)
}), {})(BadgeCounterScanned);
  