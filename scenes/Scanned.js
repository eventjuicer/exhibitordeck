
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import {List, ListItem, Button} from 'react-native-elements';



import {styles} from '../styles'
const tintColor = '#ffcc00'


class Scanned extends Component {


_translateScanned = (code) => {

  const {participants} = this.props;

  const defaults = {fname: "First", lname : "Last", cname2 : "Some company"};

  return (code in participants) ? Object.assign({}, defaults, participants[code]) : defaults;
}

render () {

    const {navigate}  = this.props.navigation;
    const {scanned}   = this.props;

    if(!scanned.length)
    {
      return (
        <View style={{marginTop: 50, paddingHorizontal: 30}}>
        <Text style={{fontSize: 16, textAlign: "center"}}>
          No data at the moment :( Scan some badges!
        </Text>
        </View>
      )
    }

    return (
      <ScrollView style={{paddingBottom: 50}}>
      <List>
      {
      scanned.map((scan, i) => {

      let translated = this._translateScanned(scan.code);

      let fullName = translated.fname + " " + translated.lname;

      return (<ListItem
        //roundAvatar
      //  avatar={{uri:scan.avatar_url}}
        key={i}
        title={<Text> {fullName} </Text>}
        subtitle={<Text>{translated.cname2}</Text>}
        onPress = {() => navigate('Comments', {id: scan.code, user: fullName})}
      />)
    })
      }
      </List>
    </ScrollView>

    )


  }
}





Scanned.defaultProps = {
  auth : {},
  scanned : [],
  participants : []
}

const mapStateToProps = state => ({
  auth : state.auth,
  scanned : state.scanned,
  participants : state.participants
});

export default connect(mapStateToProps, null)(Scanned);
