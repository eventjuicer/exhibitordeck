
import React from 'react';
import { AppState, StyleSheet, View, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import {Permissions, AppLoading, Font} from 'expo';


//custom
import Navigation from './Navigation';
//import SignIn from './SignIn'

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

    const {askCameraPermission, appState, participantsFetch} = props;
    
    askCameraPermission();
    
    appState( (AppState.currentState == "active") );

    participantsFetch();
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
}

_handleAppStateChange = (nextAppState) => {

  const {appState, participantsFetch} = this.props;

 if (nextAppState === 'active'){
    console.log('App has come to the foreground!')
    appState(true);
    participantsFetch();
  }else{
    console.log("App minimized");
    appState(false);
  }

 }

  async loadFonts() {
    // await Font.loadAsync({
    //   'Roboto-Bold': require('../assets/Roboto-Bold.ttf'),
    // });
    
    // this.setState({fontLoaded: true});
  }


  render()
  {

      const {fontLoaded} = this.state;
      const {auth} = this.props;

      console.log(auth);

      // return <SignIn />

      if (! fontLoaded ){
   //     return <AppLoading />;
      }

      // if (! ("token" in auth)){
      //   return <SignIn />
      // }

      if(! "participant_id" in auth)
      {
        return <ScannerUnauth />;
      }

      return (<Navigation />);



  //  const {user} = this.props;


    //     if (!this.state.isReady || !this.state.hasCameraPermission)
    //     {
    //     //  return <AppLoading />;
    //     }
    // //asdasd



  


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
