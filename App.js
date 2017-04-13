
import React, {Component} from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import Expo, {Permissions, AppLoading, Font} from 'expo';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'


import Navigation, {MainScreenNavigator} from './Navigation';
import ScannerUnauth from './scenes/ScannerUnauth';
import {participantScanned} from './redux/reducers/scan';

const navReducer = (state, action) => {
//  console.log(state);
  const newState = MainScreenNavigator.router.getStateForAction(action, state);
  //console.log(newState);
  return (newState ? newState : state)
};

const appReducer = combineReducers({
  nav: navReducer,
  costam : participantScanned
});

const sagaMiddleware = createSagaMiddleware()

const store = createStore(appReducer);

//const store = createStore(appReducer, applyMiddleware(sagaMiddleware));

//sagaMiddleware.run(sagas);

/*    const { hasCameraPermission } = this.props;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <View><Text>No access to camera :/</Text></View>;
    } else {
      return (

*/

// MainScreenNavigator.navigationOptions = {
//   title: 'My Chats',
// };

///asdasdas///


class App extends Component {

  state = {
    isReady: false,
    hasCameraPermission : null,
    user : {}
  }

  componentWillMount()
  {
    this.checkCamera();
  }

  componentDidMount()
  {
    this.loadFonts();
    this.checkAuth();
  }

  setUser(user)
  {
    this.setState({
      user : user
    });
  }

  async onAuthenticated(user)
  {
    this.setUser(user);
    await AsyncStorage.setItem('@exhibitordeck:auth', JSON.stringify(user));

  }

  onLogout()
  {
    this.setUser({});
  }

  async checkCamera() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  async checkAuth()
  {
    try {
      const user = await AsyncStorage.getItem('@exhibitordeck:auth');
      if (user !== null)
      {
          console.log("login retrieved from storage!");
          this.setUser(JSON.parse(user));
      }
    }catch(error){}
  }

  async loadFonts() {
    await Font.loadAsync({
      'Roboto-Bold': require('./assets/Roboto-Bold.ttf'),
    });
    this.setState({isReady: true});
  }

  render(){

    if (!this.state.isReady) {
      return <AppLoading />;
    }

    if(! "participant_id" in this.state.user)
    {
      return <ScannerUnauth onAuthenticate={this.onAuthenticated.bind(this)} />;
    }

    return (<Provider store={store}><Navigation /></Provider>);

  }

}




Expo.registerRootComponent(App);

export default App;
