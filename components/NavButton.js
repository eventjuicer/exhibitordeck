
import React, {Component} from 'react';
import {Button, Icon} from 'react-native-elements';

class NavButton extends Component {

  render()
  {

    return (
      <Icon iconStyle={{marginRight: 15}} name="settings" onPress={() =>  this.props.navigate('Options') }  />
    );
  }

}

export default NavButton;
