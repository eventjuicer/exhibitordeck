import React, {Component} from 'react';
import { connect } from 'react-redux';

import { Clipboard, StyleSheet, View, Image } from 'react-native';
import {Tile, List, Text, Button} from 'react-native-elements';
import {styles} from '../styles'

import {syncRequest as syncRequestAction} from '../redux/actions/sync';
import {logout as logoutAction} from '../redux/actions/logout';

class Options extends Component {

render () {

    const {syncRequest, logout} = this.props;
    const { goBack, navigate } = this.props.navigation;

    return (

      <View style={{marginTop: 50, paddingHorizontal: 30}}>

        <Text h3 style={{textAlign: "center"}}>Options</Text>

     <Button buttonStyle={{marginTop: 50}} borderRadius={2}  icon={{name: 'cached'}}
      onPress={() => syncRequest()}
      title="Sync"
    />


    <Button buttonStyle={{marginTop: 10}}  backgroundColor="red" borderRadius={2} icon={{name: 'exit-to-app'}}
     onPress={() => logout()}
     title="Logout"
   />

    <Button buttonStyle={{marginTop: 10}} color="#000" backgroundColor="transparent" icon={{name: 'cached'}}
     onPress={() => goBack()}
     title="Back"
   />


      <Text style={{fontSize: 13, textAlign: "center", paddingTop: 40}}>
       (c) eventjuicer.com ltd
      </Text>
      </View>

    )
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, {
  logout : logoutAction,
  syncRequest : syncRequestAction

})(Options);
