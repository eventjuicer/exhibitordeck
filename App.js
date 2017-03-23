
import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import Expo, {AppLoading, Font} from 'expo';
import { TabNavigator, StackNavigator } from 'react-navigation';

import Scanner from './views/scanner';
import Scanned from './views/scanned';
import Comments from './views/comments';





const DetailedNavigator = StackNavigator({
  Leads: { screen: Scanned,
    navigationOptions : {
      header : {visible: false}
    }},
  Comments: { screen: Comments },
});

const MainScreenNavigator = TabNavigator({
  Scan: {
    screen: Scanner,
  },
  Leads: {
    screen: DetailedNavigator,
    navigationOptions : {
      title : "People"
    }
  },
},
{
  tabBarOptions: {
    activeTintColor: '#e91e63',
    labelStyle: {
      fontSize: 14,
    },
    style: {
      backgroundColor: 'blue',
      height: 100
    },
  },
});



// MainScreenNavigator.navigationOptions = {
//   title: 'My Chats',
// };



class App extends Component {

  state = {

    isReady: false
  }

  componentDidMount()
  {
   this.loadFonts();
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

    return <MainScreenNavigator />;
  }

}




Expo.registerRootComponent(App);

export default App;
