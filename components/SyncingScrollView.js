
import React from 'react'
import { connect } from 'react-redux';
import { ScrollView, RefreshControl } from 'react-native';

import { syncRequest, IsAppSyncingSelector } from '../redux'

const SyncingScrollView = ({isSyncing, syncRequest, whatToSync, children}) => (

    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isSyncing}
          onRefresh={() => syncRequest(whatToSync)}
          tintColor="#787878"
          title="Loading..."
          titleColor="#787878"
          colors={['#787878']}
          progressBackgroundColor="#ffffff"
        />
      }
      style={{paddingBottom: 50}}
    >
    {children}
    </ScrollView>
)

SyncingScrollView.defaultProps = {
  whatToSync : "all"
}

export default connect((state, props)=>({
  isSyncing : IsAppSyncingSelector(state, props)
}), {syncRequest})(SyncingScrollView)