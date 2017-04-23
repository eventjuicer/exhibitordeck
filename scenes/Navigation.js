
import React, {Component} from 'react';
import {Platform, Image, Text} from 'react-native';
import { TabNavigator, StackNavigator, DrawerNavigator, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import Scanner from './Scanner';
import Scanned from './Scanned';
import Comments from './Comments';
import {Button} from 'react-native-elements';
import Options from './Options';
import NavButton from '../components/NavButton';

const DetailedNavigator = StackNavigator({

  People: {
    screen: Scanned,
    navigationOptions : ({navigation}) => ({
       title : "Your scans",
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

export const MainScreenNavigator = TabNavigator({
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
      height: Platform.OS == "ios" ? 60 : 85,
      paddingTop: Platform.OS == "ios" ? 20 : 30,
      paddingBottom: 17
    },
  },
});


export const MainStackNavigator = StackNavigator({

  Main : {
    screen : MainScreenNavigator
  },

  Options : {
     screen: Options,
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

const AppNavigator = ({ dispatch, nav }) => (
  <MainStackNavigator navigation={addNavigationHelpers({
    dispatch: dispatch,
    state: nav
  })} />
);

const mapStateToProps = state => ({
    nav: state.nav
});

export default connect(mapStateToProps, null)(AppNavigator);
