
import React from 'react';
import { AppState, StyleSheet, View, Text, BackHandler } from 'react-native';
 
import { connect } from 'react-redux';
import { AppLoading, Font} from 'expo';
import Scanner from '../components/Scanner'
import * as Permissions from 'expo-permissions';
 
import Header from '../components/MyHeader'


import {
  participantsFetch,
  askCameraPermission,
  cameraShow,
  appState
} from '../redux/actions';


class HomePage extends React.Component {

  constructor(){
    super();
    this.state = {
      cameraPermission : false
    }
  }
 
  async checkMultiPermissions() {
    const { status, expires, canAskAgain, granted } = await Permissions.askAsync(
      Permissions.CAMERA
    );
    return (status === 'granted')
  }

  async componentDidMount(){
   const cameraPermission = await this.checkMultiPermissions();
   this.setState({cameraPermission})
  }

  render() {

      const {cameraPermission} = this.state;
      
      return (
          <View style={styles.container}>
              <Header navigation={this.props.navigation} />
              {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {cameraPermission ?  <Scanner /> : <Text>no permission</Text> } 
              </View> */}
          </View>
      );
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1
  }
});

HomePage.defaultProps = {
  auth : {},
  isReady: false
}

export default connect(state => ({
  auth: state.auth
}), {
  appState, 
  participantsFetch, 
  askCameraPermission, 
  cameraShow}
)(HomePage);
