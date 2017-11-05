import React, {Component} from 'react';
import { connect } from 'react-redux';

import { Platform, Alert, Clipboard, StyleSheet, ScrollView, View, Image, TextInput } from 'react-native';
import {Tile, List, Text, Button} from 'react-native-elements';
import {styles} from '../styles'

import {
  logout,
  syncRequest,
  changeActionLabels,
  purgeScanned
} from '../redux/actions';


import { FormLabel, FormInput } from 'react-native-elements'

import { BackAndroid } from 'react-native';



class Admin extends Component {

componentWillMount()
{
  this.handleAndroidBackButton();
}

  handleAndroidBackButton = () =>
  {
    const {navigation} = this.props;

    BackAndroid.addEventListener('hardwareBackPress', function()
    {
      navigation.goBack();
    });
  }

onActionEdit = (text, index) => {

  const {changeActionLabels} = this.props;
  changeActionLabels(index, text);

}

render () {

    const {auth, scanned, options, syncRequest, logout, changeActionLabels, purgeScanned} = this.props;
    const { goBack, navigate } = this.props.navigation;
    const isLoggedIn = ("participant_id" in auth);
    const onActionEdit = this.onActionEdit;
    const hasScans = (Object.keys(scanned).length > 0);

    return (

<ScrollView style={{backgroundColor: "#ffffff", paddingHorizontal: 20}}>

<View style={{flexDirection: 'row', padding: 20}}>
<View style={{flex: 0.4}}>

<Button
  fontSize={16}
  color="#000"
  backgroundColor="transparent"
  icon={{name: 'chevron-left', color: "black"}}
  onPress={() => goBack()}
  title="Back"
/>

</View>

<View style={{flex: 0.6, paddingVertical: 7}}>
  <Text h4 >Caution!</Text>
</View>

</View>



<View style={{paddingVertical: 80}}>

{/* <Button buttonStyle={{marginTop: 50}} borderRadius={2}  icon={{name: 'cached'}}
onPress={() => syncRequest()}
title="Sync"
/> */}

{
  hasScans ?
  <Button buttonStyle={{marginTop: 10}}  backgroundColor="red" borderRadius={2} icon={{name: 'delete'}}
  onPress={() => Alert.alert("Are you sure?", null, [{text: "Erase", onPress: ()=> purgeScanned()}, {text: "Cancel"} ])}
  title="Erase ALL data"
/> : null

}


{
  isLoggedIn ? <Button buttonStyle={{marginTop: 10}}  backgroundColor="red" borderRadius={2} icon={{name: 'exit-to-app'}}
  onPress={() => Alert.alert("Are you sure?", null, [{text: "Logout", onPress: ()=>logout(isLoggedIn) },{text: "Cancel"} ])}
  title="Logout"
/> : null
}




</View>

</ScrollView>
    )
  }
}



const mapStateToProps = state => ({
  auth : state.auth,
  options : state.options,
  runtime : state.runtime,
  scanned : state.scanned
});

export default connect(mapStateToProps, {logout, syncRequest, purgeScanned})(Admin);
