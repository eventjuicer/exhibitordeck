
import React, {Component} from 'react';
import { AppState, StyleSheet, View, BackAndroid } from 'react-native';
import { connect } from 'react-redux';
import {Permissions, AppLoading, Font} from 'expo';


//custom
import Navigation from './Navigation';


import {
  participantsFetch,
  askCameraPermission,
  cameraShow,
  appState
} from '../redux/actions';


class Welcome extends Component{


  componentWillMount()
  {
      this.props.askCameraPermission();
  }

  componentDidMount()
  {
    const {appState} = this.props;

    appState( (AppState.currentState == "active") );

    AppState.addEventListener('change', this._handleAppStateChange);

    this.loadFonts();

    this.props.cameraShow();

    this.props.participantsFetch();

  }

componentWillUnmount()
{
  AppState.removeEventListener('change', this._handleAppStateChange);
}

_handleAppStateChange = (nextAppState) => {

  const {appState} = this.props;

/*
 if (runtime.appState.match(/inactive|background/) && nextAppState === 'active')
 */

 if (nextAppState === 'active')
  {
    console.log('App has come to the foreground!')
    appState(true);
  }
  else
  {
    console.log("App minimized");
    appState(false);
  }

}

  async loadFonts() {
    await Font.loadAsync({
      'Roboto-Bold': require('../assets/Roboto-Bold.ttf'),
    });
    //this.setState({isReady: true});
  }


  render()
  {

      return (<Navigation />);

  //  const {user} = this.props;


    //     if (!this.state.isReady || !this.state.hasCameraPermission)
    //     {
    //     //  return <AppLoading />;
    //     }
    // //asdasd



    // if(! "participant_id" in user)
    // {
    //   return <ScannerUnauth />;
    // }


  }
}

Welcome.defaultProps = {
  auth : {},
  isReady: false
}

const mapStateToProps = state => ({
    auth: state.auth,
    options : state.options
});

export default connect(mapStateToProps, {appState, participantsFetch, askCameraPermission, cameraShow})(Welcome);
