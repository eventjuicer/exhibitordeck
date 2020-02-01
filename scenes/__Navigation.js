
import React from 'react';

import {
  Platform, 
  Image, 
  Text
} from 'react-native';

import { 
  createAppContainer
} from 'react-navigation';

import {createStackNavigator} from 'react-navigation-stack'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'

import {Button} from 'react-native-elements';

import Scanner from './Scanner';
import Scanned from './Scanned';
import Comments from './Comments';
import Options from './Options';
import Admin from './Admin';


import NavButton from '../components/NavButton';


const DetailedNavigator = createStackNavigator({

  People: {
    screen: Scanned,
    navigationOptions : ({navigation}) => ({
       title : "Your last 20 scans",
       headerRight :  <NavButton title="Logout" navigate={navigation.navigate}/>
    })
  },
  Comments: {
    screen: Comments,
    navigationOptions : ({navigation}) => ({
       title : `${navigation.state.params.user}`,
       headerRight :  <NavButton title="Logout" navigate={navigation.navigate}/>
    })
  }
},{
  mode : "card",
  headerMode: "float",
});



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


//
// export const Drawer = DrawerNavigator({
//
// Home: {
//    screen: MainScreenNavigator,
//    navigationOptions : {
//        drawerLabel: 'Home',
//    }
//  },
//  Options: {
//    screen: Options,
//    navigationOptions : {
//       title : 'Options',
//       drawerLabel: 'Options',
//    }
//  },
//
// });




export default createAppContainer(Container);