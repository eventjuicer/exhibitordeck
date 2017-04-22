
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import {List, ListItem, Button} from 'react-native-elements';



import {styles} from '../styles'
const tintColor = '#ffcc00'


class Scanned extends Component {



translateScanned = (code) => {
  const {participants} = this.props;
  return {

    title : "test",
    subtitle : "costam"
  };
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
      <ScrollView>
      <List containerStyle={{marginBottom: 20}}>
      {
      scanned.map((scan, i) => {

      let translated = this.translateScanned(scan);

      return (<ListItem
        //roundAvatar
      //  avatar={{uri:scan.avatar_url}}
        key={i}
        title={translated.title}
        subtitle={translated.subtitle}
        onPress = {() => navigate('Comments', {id: scan.code, user: translated.title})}
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
  participants : state.participants,
});

export default connect(mapStateToProps, null)(Scanned);
