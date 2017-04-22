import React, {Component} from 'react';
import { connect } from 'react-redux';

import { Alert, Clipboard, StyleSheet, ScrollView, View, Image, TextInput } from 'react-native';
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



class Options extends Component {

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

onDestroyingAction = () => {


}

render () {

    const {auth, options, syncRequest, logout, changeActionLabels, purgeScanned} = this.props;
    const { goBack, navigate } = this.props.navigation;
    const isLoggedIn = ("participant_id" in auth);
    const onActionEdit = this.onActionEdit;
    const hasScans = (this.scanned.length > 0);

    return (

<ScrollView>

<View style={{marginTop: 35, paddingHorizontal: 20}}>

<Text h4 style={{textAlign: "center"}}>Options</Text>

<Button buttonStyle={{marginTop: 10}} color="#000" backgroundColor="transparent" icon={{name: 'cached'}}
onPress={() => goBack()}
title="Back"
/>

<View style={{marginTop: 15}}>

{[1,2,3,4].map(function(index){

return (
<View key={index}>
<FormLabel>Quick comment #{index}</FormLabel>
<TextInput returnKeyType="send" style={{paddingVertical: 10, paddingHorizontal: 20, fontSize: 16, color: "#333333"}} defaultValue={"a"+index in options ? options["a"+index] : ""} maxLength={20} onChangeText={(text) => onActionEdit(text, index)}/>
</View>
)

})}

</View>

<Button buttonStyle={{marginTop: 50}} borderRadius={2}  icon={{name: 'cached'}}
onPress={() => syncRequest()}
title="Sync"
/>

{
  hasScans ?
  <Button buttonStyle={{marginTop: 10}}  backgroundColor="red" borderRadius={2} icon={{name: 'exit-to-app'}}
  onPress={() => Alert.alert("Are you sure?", null, [{text: "Erase", onPress: ()=> purgeScanned()}, {text: "Cancel"} ])}
  title="Clear data"
/> : null

}


{
  isLoggedIn ? <Button buttonStyle={{marginTop: 10}}  backgroundColor="red" borderRadius={2} icon={{name: 'exit-to-app'}}
  onPress={() => Alert.alert("Are you sure?", null, [{text: "Logout", onPress: ()=>logout(isLoggedIn) },{text: "Cancel"} ])}
  title="Logout"
/> : null
}


<Text style={{fontSize: 13, textAlign: "center", paddingVertical: 20}}>
(c) eventjuicer.com ltd
</Text>

</View>
</ScrollView>
    )
  }
}



const mapStateToProps = state => ({
  auth : state.auth,
  options : state.options,
  scanned : state.scanned
});

export default connect(mapStateToProps, {changeActionLabels, logout, syncRequest, purgeScanned})(Options);
