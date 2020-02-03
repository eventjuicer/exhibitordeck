
import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import {Button} from 'react-native-elements';
//custom
import Scanner from './Scanner';
import Scanned from './Scanned';
import Comments from './Comments';
import Options from './Options';
import Admin from './Admin';
import NavButton from '../components/NavButton';




const MainScreenNavigator = createMaterialTopTabNavigator({
  Scan: {
    screen: Scanner,
    navigationOptions : {
      tabBarLabel : "Scan"
    }
  },
  PeopleListAndDetails: {
    screen: DetailedNavigator,
    navigationOptions : {
      tabBarLabel : "People"
    }
  },
},{
  tabBarOptions: {
    activeTintColor: '#ffffff',
    labelStyle: {
      fontSize: 14,
    },
    style: {
      backgroundColor: '#cc2c24',
      height: Platform.OS == "ios" ? 80 : 85,
      paddingTop: Platform.OS == "ios" ? 30 : 30,
      paddingBottom: 17
    },
  },
});



const Container = createStackNavigator({

  Main : {
    screen : MainScreenNavigator
  },

  Options : {
     screen: Options,
     navigationOptions : {

     }
  },

  Admin : {
     screen: Admin,
     navigationOptions : {

     }
  }

},{
   headerMode : "none"
});


export default createAppContainer(Container);