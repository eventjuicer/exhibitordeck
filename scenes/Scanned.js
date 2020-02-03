
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  Text, 
  View, 
} from 'react-native';

import {
  syncRequest, 
  participantsFetch,
  GetRecentScannedParticipantsSelector
} from '../redux'

import SyncingScrollView from '../components/SyncingScrollView'
import Header from '../components/MyHeader'
import ScannedParticipant from '../components/ScannedParticipant'

class Scanned extends Component {

  componentDidMount()
  {
    this.syncAllData();
  }

  syncAllData = () => {

    const {auth, scanned, comments, syncRequest, participantsFetch}   = this.props;
    const lastSync = + new Date();

    syncRequest({scanned, comments, auth, lastSync});
    participantsFetch();

  }


render () {

    const {scans, auth, scanned, comments, syncRequest, runtime}   = this.props;
    const lastSync = + new Date();

    return (
      <View>
        
        <Header navigation={this.props.navigation} />
        <SyncingScrollView>
        {scans.map(item => <ScannedParticipant {...item} /> )}
        </SyncingScrollView>
      </View>
    )


// <View style={{marginTop: 50, paddingHorizontal: 30}}>
// <Text style={{fontSize: 16, textAlign: "center"}}>
//   No data at the moment. Pull down to sync.
// </Text>
// <Text style={{fontSize: 16, textAlign: "center", marginTop: 20}}>
//   Scan some badges.
// </Text>
// </View>
        

  }
}



const mapStateToProps = (state, props) => ({
  auth : state.auth,
  comments : state.comments,
  scanned : state.scanned,
  participants : state.participants,
  runtime : state.runtime,
  scans : GetRecentScannedParticipantsSelector(state, props)
});

export default connect(mapStateToProps, {syncRequest, participantsFetch})(Scanned);
