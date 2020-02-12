
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  Text, 
  View, 
  StyleSheet
} from 'react-native';

import {
  syncRequest, 
  GetRecentScannedParticipantsSelector
} from '../redux'

import SyncingScrollView from '../components/SyncingScrollView'
import Header from '../components/MyHeader'
import ScannedParticipant from '../components/ScannedParticipant'
import WarningUnauthenticated from '../components/WarningUnauthenticated'

class Scanned extends Component {

  componentDidMount(){
    const { syncRequest } = this.props;
    syncRequest("all");
}

render () {

    const {scanned }   = this.props;

    if(!scanned || !scanned.length){
      return (
      <View>
        <Header />
        <WarningUnauthenticated />
        <View style={{marginTop: 50, paddingHorizontal: 30}}>
        <Text style={{fontSize: 16, textAlign: "center"}}>
          No data at the moment. Pull down to force a sync.
        </Text>
        <Text style={{fontSize: 16, textAlign: "center", marginTop: 20}}>
          Scan some badges.
        </Text>
        </View>
      </View>
      )
   }

    return (
      <View>
        
        <Header />
        <WarningUnauthenticated />
        <SyncingScrollView>
        {scanned.map(item => <ScannedParticipant key={item.code} {...item} /> )}
        </SyncingScrollView>

      </View>
    )



        

  }
}



const mapStateToProps = (state, props) => ({
  // auth : state.auth,
  // comments : state.comments,
  // participants : state.participants,
  // runtime : state.runtime,
  scanned : GetRecentScannedParticipantsSelector(state, props)
});

export default connect(mapStateToProps, {syncRequest})(Scanned);
