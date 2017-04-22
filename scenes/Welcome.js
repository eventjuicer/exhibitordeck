
import React, {Component} from 'react';
import { StyleSheet, View, BackAndroid } from 'react-native';
import { connect } from 'react-redux';
import {Permissions, AppLoading, Font} from 'expo';


//custom
import Navigation from './Navigation';


import {
  participantsFetch,
  askCameraPermission
} from '../redux/actions';


class Welcome extends Component{


  componentWillMount()
  {
      this.props.askCameraPermission();
  }

  componentDidMount()
  {
    this.loadFonts();
    this.props.participantsFetch();
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

export default connect(mapStateToProps, {participantsFetch, askCameraPermission})(Welcome);
