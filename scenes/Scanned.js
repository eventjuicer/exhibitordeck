
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  ScrollView, 
  RefreshControl, 
  StyleSheet, 
  Text, 
  View, 
  Image 
} from 'react-native';

import {
  ListItem, 
  Button
} from 'react-native-elements';

var moment = require('moment');

import {styles, ScannedStyles} from '../styles'
const tintColor = '#ffcc00'
import {syncRequest} from '../redux/actions'

class Scanned extends Component {

  componentDidMount()
  {

    const {auth, scanned, comments, syncRequest}   = this.props;
    const lastSync = + new Date();

    this.timer = setInterval(() => syncRequest({scanned, comments, auth, lastSync}), 600000)

  }


  _getCommentsCountForCode = (id) => {

    const {comments} = this.props;
    const {state} = this.props.navigation;
    return (id in comments) && Array.isArray(comments[id]) ? comments[id].length : 0;

  }

_translateScanned = (code) => {

  const {participants} = this.props;

  const defaults = {fname: "First", lname : "Last", cname2 : "Some company"};

  return (code in participants) ? Object.assign({}, defaults, participants[code]) : defaults;
}

_renderScanned = () => {

 // const {navigateWithDebounce}  = this.props.navigation;

 const {navigate}  = this.props.navigation;
  const {scanned}   = this.props;

  return (<View>

  {

    Object.keys(scanned).reverse().slice(0,20).map(function(code, index)
    {

          let data = scanned[code];

          let translated = this._translateScanned(code);
          let title = `${translated.fname} ${translated.lname}`;
          let subtitle = `${translated.cname2} ${moment(data.ts).fromNow()}`;

          let noOfComments = this._getCommentsCountForCode(code);

          return (
            <ListItem
              key={index}
              title={<Text> {title} </Text>}
              subtitle={<View style={ScannedStyles.subtitleView}>
                        <Text style={ScannedStyles.subtitleViewText}>
                          { subtitle }
                        </Text>
                      </View>}
              badge={{ value: noOfComments, badgeTextStyle: { color: 'white' }, badgeContainerStyle: { backgroundColor: noOfComments ? '#2c24cc' : '#787878', marginTop: 5} }}
              onPress = {() => navigate('Comments', {id: code, user: title})}
          />)

    }, this)


  }

   </View>);


}

render () {

    const {auth, scanned, comments, syncRequest, runtime}   = this.props;
    const lastSync = + new Date();

    return (

      <ScrollView

        refreshControl={
          <RefreshControl
           refreshing={runtime.isSyncing}
           onRefresh={() => syncRequest({scanned, comments, auth, lastSync})}
           tintColor="#787878"
           title="Loading..."
           titleColor="#787878"
           colors={['#787878']}
           progressBackgroundColor="#ffffff"
         />
        }
        style={{paddingBottom: 50}}>

          {

            !Object.keys(scanned).length?

            (<View style={{marginTop: 50, paddingHorizontal: 30}}>
            <Text style={{fontSize: 16, textAlign: "center"}}>
              No data at the moment. Pull down to sync.
            </Text>
            <Text style={{fontSize: 16, textAlign: "center", marginTop: 20}}>
              Scan some badges.
            </Text>
            </View>)
          :

            this._renderScanned()
        }


    </ScrollView>

    )


  }
}



const mapStateToProps = state => ({
  auth : state.auth,
  comments : state.comments,
  scanned : state.scanned,
  participants : state.participants,
  runtime : state.runtime
});

export default connect(mapStateToProps, {syncRequest})(Scanned);
