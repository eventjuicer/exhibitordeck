import React, {Component} from 'react';
import { connect } from 'react-redux';

import { StyleSheet, Text, View, Image, ListView } from 'react-native';
import {Tile, List, ListItem, Button} from 'react-native-elements';
import {styles} from '../styles'


class Options extends Component {

render () {

    const { navigate } = this.props.navigation;
    return (
  <View style={{paddingTop: 50}}>

      <Tile
   imageSrc={{require: ('../icons/test.png')}}
   title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolore exercitationem"
   featured
   caption="Some Caption Text"
/>






        <Button
         onPress={() => {}}
         title="Logout"
       />

       <Button
        onPress={() => this.props.navigation.goBack()}
        title="Sync"
      />


      <Button
       onPress={() => this.props.navigation.goBack()}
       title="Back"
     />

     <Text>
       (c) eventjuicer.com LTD
     </Text>

    </View>
    )
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, null)(Options);
