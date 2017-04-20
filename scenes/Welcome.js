
import React, {Component} from 'react';
import { StyleSheet, View, BackAndroid } from 'react-native';
import { connect } from 'react-redux';
import {Permissions, AppLoading, Font} from 'expo';


//custom
import Navigation from './Navigation';


import {participantsFetched as participantsFetchedAction} from '../redux/actions/fetchedVisitors';

class Welcome extends Component{


  componentWillMount()
  {
    this.checkCamera();
  }

  componentDidMount()
  {
  //  this.checkCamera();
    this.loadFonts();
    this.fetchVisitors();
    this.handleAndroidBackButton();
  }

  handleAndroidBackButton = () =>
  {
    // BackAndroid.addEventListener('hardwareBackPress', function()
    // {
    //   this.props.navigation.goBack();
    // });
  }

  async fetchVisitors()
  {
    const {participantsFetched} = this.props;

    await fetch('https://api.eventjuicer.com/public/v1/hosts/targiehandlu.pl/visitors-by-code')
        .then((response) => response.json())
        .then((responseJson) => {

            participantsFetched(responseJson);

        })
        .catch((error) => {
          console.error(error);
    });

  }

  async checkCamera() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    //this.setState({hasCameraPermission: status === 'granted'});
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
  isReady: false,
  hasCameraPermission : null
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {

  participantsFetched : participantsFetchedAction

})(Welcome);
