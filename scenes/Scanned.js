
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { ScrollView, RefreshControl, StyleSheet, Text, View, Image } from 'react-native';
import {List, ListItem, Button} from 'react-native-elements';



import {styles} from '../styles'
const tintColor = '#ffcc00'

import {syncRequest} from '../redux/actions'

class Scanned extends Component {


_translateScanned = (code) => {

  const {participants} = this.props;

  const defaults = {fname: "First", lname : "Last", cname2 : "Some company"};

  return (code in participants) ? Object.assign({}, defaults, participants[code]) : defaults;
}

_renderScanned = () => {

  const {navigate}  = this.props.navigation;
  const {scanned}   = this.props;

  return (<List>

  {

    scanned.map((scan, i) => {
      let translated = this._translateScanned(scan.code);
      let fullName = translated.fname + " " + translated.lname;

      return (
        <ListItem
          key={i}
          title={<Text> {fullName} </Text>}
          subtitle={<Text>{translated.cname2}</Text>}
          onPress = {() => navigate('Comments', {id: scan.code, user: fullName})}
      />)
    })

  }

   </List>);


}

render () {

    const {scanned, syncRequest, runtime}   = this.props;

    return (

      <ScrollView

        refreshControl={
          <RefreshControl
           refreshing={runtime.isSyncing}
           onRefresh={() => syncRequest()}
           tintColor="#ffffff"
           title="Loading..."
           titleColor="#ffffff"
           colors={['#ffffff']}
           progressBackgroundColor="#cc2c24"
         />
        }
        style={{paddingBottom: 50}}>

          {

            !scanned.length?

            (<View style={{marginTop: 50, paddingHorizontal: 30}}>
            <Text style={{fontSize: 16, textAlign: "center"}}>
              No data at the moment :( Scan some badges!
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
  scanned : state.scanned,
  participants : state.participants,
  runtime : state.runtime
});

export default connect(mapStateToProps, {syncRequest})(Scanned);
