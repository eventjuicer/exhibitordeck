
import React, {Component} from 'react';
import {Button, Icon} from 'react-native-elements';
import {withNavigation} from 'react-navigation'

const NavButton = ({navigation, screen}) => (

  <Icon iconStyle={{marginRight: 15}} name="settings" onPress={() =>  navigation.navigate(screen) }  />

) 

NavButton.defaultProps = {
  screen : "Options"
}

export default withNavigation(NavButton);
