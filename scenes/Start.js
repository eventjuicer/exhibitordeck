
import React from 'react';
import { AppState, StyleSheet, View, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import {Permissions, AppLoading, Font} from 'expo';


//custom
import Navigation from './Navigation';
import SignIn from './SignIn'

import {
  participantsFetch,
  askCameraPermission,
  cameraShow,
  appState
} from '../redux/actions';


class Start extends React.Component{

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { 
      fontLoaded: false
    };

    const {askCameraPermission, appState} = props;
    
    askCameraPermission();
    
    appState( (AppState.currentState == "active") );

    this.fetchParticipants();
  }

  fetchParticipants(){
    const {participantsFetch} = this.props;
  //  this.timer = setInterval(() => participantsFetch(), 900000)
  }

  componentDidMount()
  {
    const {cameraShow} = this.props;

    AppState.addEventListener('change', this._handleAppStateChange);

    this.loadFonts();

    cameraShow();

  }

componentWillUnmount()
{
  AppState.removeEventListener('change', this._handleAppStateChange);

  //clearInterval(this.timer)
}

_handleAppStateChange = (nextAppState) => {

  const {appState} = this.props;

 if (nextAppState === 'active'){
    console.log('App has come to the foreground!')
    appState(true);
    this.fetchParticipants();
  }else{
    console.log("App minimized");
    appState(false);
    clearInterval(this.timer)
  }

 }

  async loadFonts() {
    await Font.loadAsync({
      'Roboto-Bold': require('../assets/Roboto-Bold.ttf'),
    });
    
    this.setState({fontLoaded: true});
  }


  render()
  {

      const {fontLoaded} = this.state;
      const {auth} = this.props;

      // return <SignIn />

      if (! fontLoaded ){
        return <AppLoading />;
      }

      // if (! ("token" in auth)){
      //   return <SignIn />
      // }

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

Start.defaultProps = {
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
)(Start);
