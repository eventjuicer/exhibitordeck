
import React, {Component} from 'react';
import { TabNavigator, StackNavigator, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import Scanner from './scenes/Scanner';
import Scanned from './scenes/Scanned';
import Comments from './scenes/Comments';

const DetailedNavigator = StackNavigator({
  Leads: { screen: Scanned,
    navigationOptions : {
      header : {visible: false}
    }},
  Comments: { screen: Comments },
});

export const MainScreenNavigator = TabNavigator({
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

const AppNavigator = ({ dispatch, nav }) => (
  <MainScreenNavigator navigation={addNavigationHelpers({
    dispatch: dispatch,
    state: nav
  })} />
);

const mapStateToProps = state => ({
    nav: state.nav
});

export default connect(mapStateToProps, null)(AppNavigator);
