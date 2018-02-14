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

import { BackHandler } from 'react-native';



class Options extends Component {

componentWillMount()
{
  this.handleAndroidBackButton();
}

  handleAndroidBackButton = () =>
  {
    const {navigation} = this.props;

    BackHandler.addEventListener('hardwareBackPress', function()
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
    const onActionEdit = this.onActionEdit;


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
  <Text h4 >Options</Text>
</View>

</View>


<View style={{marginTop: 15}}>

{[...Array(4)].map(function(el, index){

return (
<View key={index}>
<FormLabel>Quick comment #{index + 1}</FormLabel>
<TextInput
  returnKeyType="send"
  style={{height: 40, marginTop: 5,  borderWidth: Platform.OS == "ios" ? 1 : 0, borderColor: "#cccccc", backgroundColor: "#ffffff", paddingVertical: 10, paddingHorizontal: 20, fontSize: 16, color: "#333333"}}
  defaultValue={("comments" in options && typeof options.comments[index]!= "undefined") ? options.comments[index] : ""}
  maxLength={30}
  onChangeText={(text) => onActionEdit(text, index)}
/>
</View>
)

})}

<Text style={{fontSize: 13, textAlign: "center", paddingVertical: 40}}>
(c) eventjuicer.com ltd
</Text>


<Button
  fontSize={16}
  color="#000"
  backgroundColor="transparent"
  onPress={() => navigate("Admin")}
  title="admin"
/>

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
