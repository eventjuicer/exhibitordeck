
import React from 'react';
import { StyleSheet, View, Text } from 'react-native'; 
import { connect } from 'react-redux';
import Scanner from '../components/Scanner' 
import Header from '../components/MyHeader'
import NoCameraPermission  from '../components/NoCameraPermission'

import {
  HasCameraPermissionSelector
} from '../redux';


class HomePage extends React.Component {

  render() {

      const {cameraPermission} = this.props

      return (
          <View style={styles.container}>
              <Header />        
                {cameraPermission ?  <Scanner /> : <NoCameraPermission />  } 
          </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

HomePage.defaultProps = {

}

export default connect((state, props) => ({
  cameraPermission : HasCameraPermissionSelector(state, props)
}), {})(HomePage);
